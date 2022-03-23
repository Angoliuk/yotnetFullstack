import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../../Common/Button/Button";
import "./PostCard.scss";
import { Loader } from "../../Common/Loader/Loader";
import CommentsBlock from "../../UploadBlocks/CommentsBlock/CommentsBlock";
import { usePostService } from "../../../Service/Requests/usePostService";
import { useCommentService } from "../../../Service/Requests/useCommentService";

const PostCard = (props) => {
  const { posts, userInfo, showAlertHandler, postId } = props;
  const commentService = useCommentService();
  const postService = usePostService();

  const post = posts.find((post) => post._id === postId);
  const createdAtDate = new Date(post.createdAt).toLocaleString();

  const [showButtonsForUserPosts, setShowButtonsForUserPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const dataRequest = useCallback(async () => {
    //here were comments in ()
    try {
      await commentService.getComments(postId);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `Error, try to reload this page. ${e}`,
        type: "error",
      });
    }
  }, [postId, showAlertHandler, commentService]);

  const deletePost = async () => {
    try {
      await postService.deletePost(postId);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `Error, try to delete post again. ${e}`,
        type: "error",
      });
    }
  };

  const showButtonsForUserPostsHandler = useCallback(
    () => setShowButtonsForUserPosts(!showButtonsForUserPosts),
    [showButtonsForUserPosts]
  );

  const ButtonsForUserPosts = () => (
    <div className="buttonsForUserPostsBlock">
      <Link to={`/edit/post/${postId}`}>
        <Button
          text="Edit"
          name={`editButton${postId}`}
          className="editButton button"
          classNameBlock="editButtonBlock"
        />
      </Link>

      <Button
        text="Delete"
        name={`deleteButton${postId}`}
        className="deleteButton button"
        onClick={deletePost}
      />
    </div>
  );

  const showCommentsHandler = () => {
    setShowComments(!showComments);

    if (!showComments) {
      dataRequest();
    }
  };

  //close buttons for user posts
  const clickHandler = useCallback(() => {
    if (!showButtonsForUserPosts) return null;

    showButtonsForUserPostsHandler();
  }, [showButtonsForUserPosts, showButtonsForUserPostsHandler]);

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [clickHandler, showButtonsForUserPosts]);
  //

  return postService.postLoading ? (
    <div className="loaderInPostCard">
      <Loader />
    </div>
  ) : (
    <div className="postCard">
      <div className="postInfoBlock">
        <div className="postAuthorInfoBlock">
          <div>
            <NavLink to={`/profile/${post.userId}`}>
              <img
                alt="author pic"
                className="postAuthorPic"
                src={
                  post?.user?.avatar
                    ? post.user.avatar
                    : "https://picsum.photos/60"
                }
              />
            </NavLink>
          </div>

          <div className="postInfoTextBlock">
            <p>
              {post.user.firstname} {post.user.lastname}
            </p>
            <p className="postDate">{createdAtDate}</p>
          </div>
        </div>

        <div>
          {userInfo._id === post.user._id && (
            <Button
              text="…"
              name={`showButtonsForUserPostsText${postId}`}
              className="button showButtonsForUserPostsText"
              onClick={showButtonsForUserPostsHandler}
            >
              ...
            </Button>
          )}

          {showButtonsForUserPosts && <ButtonsForUserPosts />}
        </div>
      </div>

      <div className="postCardContentBlock">
        <h3>{post.title}</h3>
        <p className="postBody">{post.body}</p>
        <div className="postPhotosBlock">
          {post.photos.map((photo) => {
            return (
              <img
                key={photo.filename}
                className="postPhotos"
                alt="post upload"
                src={photo.exactPath}
              />
            );
          })}
        </div>
      </div>

      <div>
        <p className="showCommentsText" onClick={showCommentsHandler}>
          comments
          {showComments ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-12-18h24z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M21 12l-18 12v-24z" />
            </svg>
          )}
        </p>

        {showComments && !commentService.commentLoading && (
          <CommentsBlock showAlertHandler={showAlertHandler} postId={postId} />
        )}

        {commentService.commentLoading && (
          <div className="loaderInPostCard">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userReducers,
  posts: state.postReducers.posts,
});

export default connect(mapStateToProps)(PostCard);
