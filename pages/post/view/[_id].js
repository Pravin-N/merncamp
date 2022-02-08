import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
  const head = () => {
    return (
      <Head>
        <title>MERNCAMP - A social network by dev for devs</title>
        <meta name="description" content={post.content} />
        <meta
          property="og:description"
          content="A social network by developers for other web developers"
        />
        <meta property="og:site_name" content="MERNCAMP" />
        <meta
          property="og:url"
          content={`https://merncamp.com/post/view/${post._id}`}
        />
        <meta property="og:image:secure_url" content={imageSource(post)} />
      </Head>
    );
  };

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/newyork.jpg";
    }
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/newyork.jpg" />
      <div className="row pt-5">
        <div className="col-md-8 offset-md-2">
          <a>
            <PostPublic key={post._id} post={post} />
          </a>
        </div>
      </div>
      {/* Social Network</ParallaxBG> */}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);

  // console.log(data);
  return {
    props: { post: data }, // will be passed to the page component as props
  };
}

export default SinglePost;
