const ParallaxBG = ({ url, children = "MERNCAMP" }) => {
  return (
    <div
      className="container-fluid "
      style={{
        backgroundImage: "url( " + url + " )",
        backgroundAttachment: "fixed",
        padding: "50px 0px 25px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <h1 className="display-1 font-weight-bold text-center">{children}</h1>

      {/* {JSON.stringify(state)} */}
    </div>
  );
};

export default ParallaxBG;
