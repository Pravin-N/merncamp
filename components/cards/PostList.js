import rendeHTML from "react-render-html";
import { useContext } from "react";
import moment from "moment";
import { Avatar } from "antd";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";
import { HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";
import {useRouter} from 'next/router'

const PostList = ({ posts, handleDelete, deleting}) => {
    const [state] = useContext(UserContext)

    const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post.postedBy.name[0]}</Avatar>
              <span className="pt-2 ms-3">{post.postedBy.name}</span>
              <span className="pt-2 ms-3">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex align-items-start pt-2">
                <HeartOutlined className="text-danger pt-2 h5" />
                <div className="pt-2 ps-1">3 likes</div>
                <CommentOutlined className="text-danger pt-2 h5 ps-3" />
                <div className="pt-2 ps-1">2 comments</div>
               {state && state.user && state.user._id === post.postedBy._id && (
                   <>
                    <EditOutlined className="text-danger pt-2 h5 ps-3 ms-auto" onClick={() => {
                        router.push(`/user/posts/${post._id}`)
                    }} />
                   {deleting ? (<div className="pt-1 ps-3 h6"><LoadingOutlined className="text-danger"/></div>) :
                (<DeleteOutlined className="text-danger pt-2 h5 ps-3" onClick={() => handleDelete(post)} />)}
                   </>
               )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
