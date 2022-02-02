import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";

const Home = () => {
  // this will give you access to the global state set in UserContext.
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // posts state
  const [posts, setPosts] = useState([]);

  // router
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchUserPosts();
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      console.log('user posts => ', data)
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log('post => ', content);
    try {
      const { data } = await axios.post("/create-post", { content, image });
      // console.log("Create Post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success("Post created");
        setContent("");
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData])
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log('Uploaded Image => ', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm('Are you sure you want to delete this post?')
      if(!answer) return;
      setDeleting(true);
      const {data} = await axios.delete(`/delete-post/${post._id}`);
      toast.error('Post Deleted');
      fetchUserPosts();
      setDeleting(false);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
              
            />
            <br />  
            <PostList posts={posts} handleDelete={handleDelete} deleting={deleting}/>
          </div>
          <div className="col-md-4">Sidebar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
