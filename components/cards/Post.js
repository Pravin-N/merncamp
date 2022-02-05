import { useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { imageSource } from "../../functions";
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  deleting,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
            <Avatar size={40} src={imageSource(post.postedBy)} />
            <span className="pt-2 ms-3">{post.postedBy.name}</span>
            <span className="pt-2 ms-3">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex align-items-start pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled
                  onClick={() => handleUnlike(post._id)}
                  className="text-danger pt-2 h5"
                />
              ) : (
                <HeartOutlined
                  onClick={() => handleLike(post._id)}
                  className="text-danger pt-2 h5"
                />
              )}
              <div className="pt-2 ps-1">
                {post && post.likes && post.likes.length} likes
              </div>

              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger pt-2 h5 ps-3"
              />
              <div className="pt-2 ps-1">
                <Link href={`/post/${post._id}`}>
                  <a>
                    {post && post.comments && post.comments.length} comments
                  </a>
                </Link>
              </div>

              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  <EditOutlined
                    className="text-danger pt-2 h5 ps-3 ms-auto"
                    onClick={() => {
                      router.push(`/user/posts/${post._id}`);
                    }}
                  />
                  {deleting ? (
                    <div className="pt-1 ps-3 h6">
                      <LoadingOutlined className="text-danger" />
                    </div>
                  ) : (
                    <DeleteOutlined
                      className="text-danger pt-2 h5 ps-3"
                      onClick={() => handleDelete(post)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {/* 2 comments */}
          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" }}
            >
              {post.comments.slice(0, commentsCount).map((c) => {
                return (
                  <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          size={20}
                          className="mb-1 mr-3"
                          src={imageSource(c.postedBy)}
                        />
                        &nbsp;
                        {c.postedBy.name}
                      </div>

                      <div>
                        <i className="text-muted">{c.text}</i>
                      </div>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(c.created).fromNow()}
                      {state &&
                        state.user &&
                        state.user._id === c.postedBy._id && (
                          <div className="ml-auto mt-1">
                            <DeleteOutlined
                              onClick={() => removeComment(post._id, c)}
                              className="pl-2 text-danger pointer"
                            />
                          </div>
                        )}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
