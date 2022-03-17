import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import { Textarea } from "../../Common/Textarea/Textarea";
import { Input } from "../../Common/Input/Input";
import { Modal } from "../../Common/Modal/Modal";
import { Loader } from "../../Common/Loader/Loader";
import "./NewUploadBlock.scss";
import { usePostService } from "../../../Service/Requests/usePostService";
import { useAnnouncementService } from "../../../Service/Requests/useAnnouncementService";

const NewUploadBlock = (props) => {
  const { userInfo, showAlertHandler } = props;
  const postService = usePostService();
  const announcementService = useAnnouncementService();

  const [showNewPostBlock, setShowNewPostBlock] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    isAnnouncement: false,
  });

  const newPostInputHandler = useCallback(
    (event) =>
      event.target.name === "isAnnouncement"
        ? setNewPost({
            ...newPost,
            [event.target.name]: event.target.checked,
          })
        : setNewPost({
            ...newPost,
            [event.target.name]: event.target.value,
          }),
    [newPost]
  );

  const createPost = async () =>
    await postService.createPost({
      title: newPost.title,
      body: newPost.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: userInfo._id,
    });

  const createAnnouncement = async () =>
    await announcementService.createAnnouncement({
      title: newPost.title,
      body: newPost.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: userInfo._id,
    });

  const createNewPost = async () => {
    try {
      newPost.isAnnouncement ? await createAnnouncement() : await createPost();
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    } finally {
      setNewPost({
        title: "",
        body: "",
      });
      setShowNewPostBlock(false);
    }
  };

  return (
    <>
      {userInfo.accessToken && (
        <Button
          text="What`s on your mind?"
          name="showNewPostBlock"
          classNameBlock="showNewPostBlockButtonBlock"
          className="showNewPostBlockButton button"
          onClick={() => setShowNewPostBlock(!showNewPostBlock)}
        />
      )}

      {showNewPostBlock &&
        Modal(
          <div className="createPostBlock">
            {(postService.postLoading ||
              announcementService.announcementLoading) &&
              Modal(<Loader />)}

            <Input
              name="title"
              value={newPost.title}
              placeholder="Title"
              className="createPostInput input"
              onChange={newPostInputHandler}
              classNameBlock="createPostInputBlock"
            />

            <Textarea
              name="body"
              value={newPost.body}
              onChange={newPostInputHandler}
              rows={15}
              className="createPostTextarea textarea"
              placeholder="What`s on your mind?"
            />

            <div className="isAnnouncementBlock">
              <input
                onChange={newPostInputHandler}
                placeholder=""
                type="checkbox"
                name="isAnnouncement"
                id="isAnnouncement"
                className="isAnnouncementCheckbox"
              />
              <label htmlFor="isAnnouncement">Post as announcement</label>
            </div>

            <Button
              onClick={createNewPost}
              text="Create"
              name="createPostButton"
              className="createPostButton button"
            />

            <Button
              onClick={() => setShowNewPostBlock(false)}
              text="Cancel"
              name="cancelCreatePostButton"
              className="cancelCreatePostButton button"
            />
          </div>
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userReducers,
});

export default connect(mapStateToProps)(NewUploadBlock);
