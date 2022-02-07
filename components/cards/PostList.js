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
import Post from "../../components/cards/Post";

const PostList = ({
  posts,
  handleDelete,
  deleting,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);

  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            post={post}
            handleDelete={handleDelete}
            deleting={deleting}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            removeComment={removeComment}
            key={post._id}
          />
        ))}
    </>
  );
};

export default PostList;
