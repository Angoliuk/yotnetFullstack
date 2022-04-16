import { connect } from "react-redux";
import PostCard from "../../UploadCards/PostCard/PostCard";
import "./PostsBlock.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "../../Common/Loader/Loader";
import { usePostService } from "../../../Service/Requests/usePostService";

const PostsBlock = (props) => {
  const { posts, showAlertHandler } = props;
  const postService = usePostService();

  const [pageNum, setPageNum] = useState(1);
  const [loadNewPosts, setLoadNewPosts] = useState(true);

  const dataRequest = useCallback(async () => {
    try {
      if (!loadNewPosts || postService.postLoading) {
        return null;
      }
      setPageNum((prevState) => prevState + 1);

      await postService.getPosts(pageNum, 10);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `Error, try to reload this page. ${e}`,
        type: "error",
      });
    } finally {
      setLoadNewPosts(false);
    }
  }, [pageNum, showAlertHandler, loadNewPosts]);

  //load new posts when you scroll to the end of page
  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (window.innerHeight + e.target.documentElement.scrollTop) <
          80 &&
        postService.xTotalCount > pageNum * 10
      ) {
        setLoadNewPosts(true);
      }
    },
    [postService.xTotalCount, pageNum]
  );

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [scrollHandler]);
  //

  const PostsListBlock = useCallback(
    () =>
      posts.map((post, i) => (
        <PostCard
          showAlertHandler={showAlertHandler}
          key={i}
          postId={post.id}
        />
      )),
    [posts, showAlertHandler]
  );

  return (
    <div className="postsBlockWrapper">
      <PostsListBlock />
      {postService.postLoading && (
        <div className="homeLoaderInPostsBlock">
          <Loader />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducers.posts,
});

export default connect(mapStateToProps)(PostsBlock);
