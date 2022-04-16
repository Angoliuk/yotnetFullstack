import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  CommentOnCreateSchema,
  CommentUpdateSchema,
} from "../../../Hooks/Validator/Schemas/Schemas";
import { useCommentService } from "../../../Service/Requests/useCommentService";
import { Button } from "../../Common/Button/Button";
import { Loader } from "../../Common/Loader/Loader";
import { Textarea } from "../../Common/Textarea/Textarea";
import "./CommentsCard.scss";

const CommentCard = (props) => {
  const { showAlertHandler, comments, userId, commentId } = props;
  const commentService = useCommentService();

  const comment = comments.find((comment) => comment.id === commentId);
  const createdAtDate = new Date(comment.createdAt).toLocaleString();

  const [editingComment, setEditingComment] = useState(false);
  const [showButtonsForUserComments, setShowButtonsForUserComments] =
    useState(false);

  const deleteComment = async () => {
    try {
      commentService.deleteComment(commentId);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e.message}`,
        type: "error",
      });
    }
  };

  const saveChangedComment = async (commentChanges) => {
    try {
      await commentService.patchComment(commentId, commentChanges);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e.message}`,
        type: "error",
      });
    } finally {
      setEditingComment(false);
    }
  };

  const showButtonsForUserCommentsHandler = useCallback(
    () => setShowButtonsForUserComments(!showButtonsForUserComments),
    [showButtonsForUserComments]
  );

  const ButtonsForUserComments = () => (
    <div className="buttonsForUserCommentCard">
      <Button
        text="Edit"
        name={`editButton${commentId}`}
        className="editButton button"
        classNameBlock="editButtonBlock"
        onClick={() => {
          setEditingComment(true);
          setShowButtonsForUserComments(false);
        }}
      />

      <Button
        text="Delete"
        name={`deleteButton${commentId}`}
        className="deleteButton button"
        onClick={deleteComment}
      />
    </div>
  );

  const clickHandler = useCallback(() => {
    if (!showButtonsForUserComments) return null;

    showButtonsForUserCommentsHandler();
  }, [showButtonsForUserComments, showButtonsForUserCommentsHandler]);

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [clickHandler, showButtonsForUserComments]);
  return commentService.commentLoading ? (
    <div className="commentLoaderInCommentCard">
      <Loader />
    </div>
  ) : (
    <div className="commentCard">
      <div className="commentInfoBlock">
        <div className="commentAuthorInfoBlock">
          <div>
            <NavLink to={`/profile/${comment.userId}`}>
              <img
                alt="author pic"
                className="commentAuthorPic"
                src={
                  comment?.expanded?.user?.avatar
                    ? comment.expanded.user.avatar
                    : "https://picsum.photos/60"
                }
              />
            </NavLink>
          </div>

          <div className="commentInfoTextBlock">
            <p>
              {comment.expanded.user.firstname} {comment.expanded.user.lastname}
            </p>
            <p className="commentDate">{createdAtDate}</p>
          </div>
        </div>

        <div>
          {userId === comment.expanded.user.id && editingComment === false && (
            <Button
              text="…"
              name={`showButtonsForUserCommentsText${commentId}`}
              className="button showButtonsForUserPostsText"
              onClick={showButtonsForUserCommentsHandler}
            >
              ...
            </Button>
          )}

          {showButtonsForUserComments && <ButtonsForUserComments />}
        </div>
      </div>

      <div>
        {userId === comment.expanded.user.id && editingComment ? (
          <Formik
            initialValues={{ body: comment.body }}
            validationSchema={CommentUpdateSchema}
            onSubmit={(values) => saveChangedComment(values)}
          >
            <Form>
              <Textarea name="body" rows={5} />

              <Button
                text="save changes"
                name={`saveButton${commentId}`}
                type="Submit"
                className="commentButton"
                classNameBlock="commentButtonBlock"
              />
            </Form>
          </Formik>
        ) : (
          <p className="commentBody">{comment.body}</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.postReducers.comments,
  user: state.userReducers,
});

export default connect(mapStateToProps)(CommentCard);
