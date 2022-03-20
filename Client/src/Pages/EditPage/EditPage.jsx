import React from "react";
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
import { Form, Formik } from "formik";
import { PostOnCreateSchema } from "../../Hooks/Validator/Schemas/Schemas";

const EditPage = (props) => {
  const { showAlertHandler, posts, announcements } = props;
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

  const saveUploadChanges = async (post) => {
    try {
      if (uploadType === "post") {
        await postService.patchPost(id, {
          ...post,
          updatedAt: new Date(),
        });
        navigate("/");
      } else if (uploadType === "announcement") {
        await announcementService.patchAnnouncement(id, {
          ...post,
          updatedAt: new Date(),
        });
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

      <Formik
        initialValues={{
          body: upload.body,
          title: upload.title,
        }}
        validationSchema={PostOnCreateSchema}
        onSubmit={(values) => saveUploadChanges(values)}
      >
        <Form>
          <Input
            name="title"
            placeholder="Title"
            className="editPostInput input"
          />

          <Textarea
            name="body"
            rows={15}
            className="editPostTextarea textarea"
            placeholder="What`s on your mind?"
          />

          <Button
            text="Save"
            type="Submit"
            name="savePostButton"
            classNameBlock="editPostButtonBlock"
            className="editPostButton button"
          />
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.postReducers.posts,
  announcements: state.announcementReducers.announcements,
  user: state.userReducers,
});

export default connect(mapStateToProps)(PagesWrapper(EditPage));
