import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../Components/Common/Button/Button";
import { Input } from "../../Components/Common/Input/Input";
import { Textarea } from "../../Components/Common/Textarea/Textarea";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import "./EditPage.scss";
import { Modal } from "../../Components/Common/Modal/Modal";
import { Loader } from "../../Components/Common/Loader/Loader";
import { useAnnouncementService } from "../../Service/Requests/useAnnouncementService";
import { usePostService } from "../../Service/Requests/usePostService";

const EditPage = (props) => {
  const { showAlertHandler, user, posts, announcements } = props;
  const navigate = useNavigate();
  const { id, uploadType } = useParams();
  const postService = usePostService();
  const announcementService = useAnnouncementService();

  const upload =
    uploadType === "post"
      ? posts.find((post) => String(id) === String(post._id))
      : announcements.find(
          (announcement) => String(id) === String(announcement._id)
        );

  const [postChanges, setPostChanges] = useState({
    body: upload.body,
    title: upload.title,
  });

  const postEditInputHandler = (event) =>
    setPostChanges({
      ...postChanges,
      [event.target.name]: event.target.value,
    });

  const saveUploadChanges = async () => {
    try {
      if (uploadType === "post") {
        await postService.patchPost(id, postChanges);
        navigate("/");
      } else if (uploadType === "announcement") {
        await announcementService.patchAnnouncement(
          id,
          postChanges,
          user,
          user.accessToken
        );
        navigate("/");
      } else {
        throw new Error("Unknown type of post");
      }
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    }
  };

  return (
    <div className="editPostBlock">
      {(postService.postLoading || announcementService.announcementLoading) &&
        Modal(<Loader />)}

      <Input
        name="title"
        value={postChanges.title}
        placeholder="Title"
        className="editPostInput input"
        onChange={postEditInputHandler}
      />

      <Textarea
        name="body"
        value={postChanges.body}
        onChange={postEditInputHandler}
        rows={15}
        className="editPostTextarea textarea"
        placeholder="What`s on your mind?"
      />

      <Button
        text="Save"
        name="savePostButton"
        classNameBlock="editPostButtonBlock"
        className="editPostButton button"
        onClick={saveUploadChanges}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducers.posts,
  announcements: state.announcementReducers.announcements,
  user: state.userReducers,
});

export default connect(mapStateToProps)(PagesWrapper(EditPage));
