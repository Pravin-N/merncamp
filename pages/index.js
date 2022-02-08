import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";

const Home = ({ posts }) => {
  // this will give you access to the global state set in UserContext.
  const [state, setState] = useContext(UserContext);

  const head = () => {
    return (
      <Head>
        <title>MERNCAMP - A social network by dev for devs</title>
        <meta
          name="description"
          content="A social network by developers for other web developers"
        />
        <meta
          property="og:description"
          content="A social network by developers for other web developers"
        />
        <meta property="og:site_name" content="MERNCAMP" />
        <meta property="og:url" content="https://merncamp.com" />
        <meta
          property="og:image:secure_url"
          content="http://merncamp.com/images/newyork.jpg"
        />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/newyork.jpg" />
      <div className="row pt-5 px-5">
        {posts.map((post) => (
          <div className="col-md-4">
            <Link href={`/post/view/${post._id}`}>
              <a>
                <PostPublic key={post._id} post={post} />
              </a>
            </Link>
          </div>
        ))}
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
