import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../../Common/Button/Button";
import "./PostCard.scss";
import { Loader } from "../../Common/Loader/Loader";
import CommentsBlock from "../../UploadBlocks/CommentsBlock/CommentsBlock";
import { usePostService } from "../../../Service/Requests/usePostService";
import { useCommentService } from "../../../Service/Requests/useCommentService";
import { Modal } from "../../Common/Modal/Modal";

const PostCard = (props) => {
  const { posts, userInfo, showAlertHandler, postId } = props;
  const commentService = useCommentService();
  const postService = usePostService();

  const post = posts.find((post) => post.id === postId);
  const createdAtDate = new Date(post.createdAt).toLocaleString();

  const [showButtonsForUserPosts, setShowButtonsForUserPosts] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [enlargedPhoto, setEnlargedPhoto] = useState();

  const dataRequest = useCallback(async () => {
    try {
      await commentService.getComments(postId);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e.message}`,
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
        text: `${e.message}`,
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
                  post?.expanded?.user?.avatar
                    ? post.expanded.user.avatar
                    : "https://picsum.photos/60"
                }
              />
            </NavLink>
          </div>

          <div className="postInfoTextBlock">
            <p>
              {post.expanded.user.firstname} {post.expanded.user.lastname}
            </p>
            <p className="postDate">{createdAtDate}</p>
          </div>
        </div>

        <div>
          {userInfo.id === post.expanded.user.id && (
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
          {post.photos.map((photo) => (
            <img
              onClick={() => setEnlargedPhoto(photo)}
              key={photo.filename}
              className="postPhotos"
              alt="upload"
              src={photo.exactPath}
            />
          ))}
          {enlargedPhoto &&
            Modal(
              <div
                onClick={() => setEnlargedPhoto()}
                className="enlargedPhotoBlock"
              >
                <img
                  className="enlargedPhoto"
                  src={enlargedPhoto.exactPath}
                  alt={enlargedPhoto.fillename}
                />
              </div>,
              () => setEnlargedPhoto()
            )}
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
