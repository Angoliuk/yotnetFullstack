import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import CommentCard from "../../UploadCards/CommentCard/CommentCard";
import { Textarea } from "../../Common/Textarea/Textarea";
import "./CommentsBlock.scss";
import { Loader } from "../../Common/Loader/Loader";
import { useCommentService } from "../../../Service/Requests/useCommentService";

const CommentsBlock = (props) => {
  const { userInfo, showAlertHandler, comments, postId } = props;
  const commentService = useCommentService();

  const [newComment, setNewComment] = useState({
    text: "",
  });

  const newCommentInputHandler = (event) =>
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });

  const createNewComment = async () => {
    try {
      await commentService.createComment({
        body: newComment.text,
        createdAt: new Date(),
        updatedAt: new Date(),
        postId: postId,
        userId: userInfo._id,
      });
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    } finally {
      setNewComment({
        ...newComment,
        text: "",
      });
    }
  };

  const CommentsListBlock = useCallback(() => {
    const commentsForPost = comments.filter(
      (comment) => comment.postId === postId
    );
    //filter comments for current post
    return commentsForPost && commentsForPost.length > 0 ? (
      commentsForPost.map((comment) => (
        <CommentCard
          key={comment._id}
          commentId={comment._id}
          userId={userInfo._id}
          showAlertHandler={showAlertHandler}
        />
      ))
    ) : (
      <p className="textNoComments">
        You can write first comment
        <svg
          className="svgNoComments"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 32 32"
        >
          <path
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"
          />
          <path
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"
          />
          <path
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"
          />
          <line
            x1="13.5"
            x2="14.5"
            y1="21.5"
            y2="21.5"
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="20.5"
            x2="21.5"
            y1="21.5"
            y2="21.5"
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"
          />
          <line
            x1="21.25"
            x2="22.75"
            y1="6.25"
            y2="7.75"
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="22.75"
            x2="21.25"
            y1="6.25"
            y2="7.75"
            fill="none"
            stroke="#29abe2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </p>
    );
  }, [comments, postId, userInfo._id, showAlertHandler]);

  return (
    <div>
      {userInfo.accessToken && (
        <div>
          <Textarea
            name="text"
            value={newComment.text}
            onChange={newCommentInputHandler}
            rows={7}
          />

          <Button
            text="comment"
            name={`commentButton${postId}`}
            className="commentButton"
            classNameBlock="commentButtonBlock"
            onClick={createNewComment}
          />
        </div>
      )}

      {commentService.commentLoading && (
        <div className="commentLoaderInCommentsBlock">
          <Loader />
        </div>
      )}

      <CommentsListBlock />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userReducers,
  comments: state.postReducers.comments,
});

export default connect(mapStateToProps)(CommentsBlock);
