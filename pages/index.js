import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const Home = ({ posts }) => {
  // this will give you access to the global state set in UserContext.
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(() => {
  //   // console.log("SOCKETIO ON JOIN", socket);
  //   socket.on("receive-message", (newMessage) => {
  //     alert(newMessage);
  //   });
  // }, []);

  useEffect(() => {
    // console.log("SOCKETIO ON JOIN", socket);
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => {
    return (
      <Head>
        <title>DEVSOCIAL - A social network by dev for devs</title>
        <meta
          name="description"
          content="A social network by developers for other web developers"
        />
        <meta
          property="og:description"
          content="A social network by developers for other web developers"
        />
        <meta property="og:site_name" content="DEVSOCIAL" />
        <meta property="og:url" content="https://devsocial.com" />
        <meta
          property="og:image:secure_url"
          content="http://devsocial.com/images/newyork.jpg"
        />
      </Head>
    );
  };

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/newyork.jpg" />
      <div className="container">
        {/* <button
          onClick={() => {
            socket.emit("send-message", "this is ryan!!");
          }}
        >
          Send message
        </button> */}
        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic key={post._id} post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Social Network</ParallaxBG> */}
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  // console.log(data);
  return {
    props: { posts: data }, // will be passed to the page component as props
  };
}

export default Home;
