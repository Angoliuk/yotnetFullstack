import React from "react";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import NewUploadBlock from "../../Components/UploadBlocks/NewUploadBlock/NewUploadBlock";
import PostsBlock from "../../Components/UploadBlocks/PostsBlock/PostsBlock";

const HomePage = (props) => {
  const { showAlertHandler } = props;

  return (
    <>
      <NewUploadBlock showAlertHandler={showAlertHandler} />
      <PostsBlock showAlertHandler={showAlertHandler} />
    </>
  );
};

export default PagesWrapper(HomePage);
