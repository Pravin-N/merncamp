import { useContext } from "react";
import { UserContext } from "../../context";

const Home = () => {
  // this will give you access to the global state set in UserContext.
  const [state, setState] = useContext(UserContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center">Dashboard Page</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
