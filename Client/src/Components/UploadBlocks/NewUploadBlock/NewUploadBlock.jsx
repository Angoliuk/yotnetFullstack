import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import { Textarea } from "../../Common/Textarea/Textarea";
import { Input } from "../../Common/Input/Input";
import { Modal } from "../../Common/Modal/Modal";
import { Loader } from "../../Common/Loader/Loader";
import "./NewUploadBlock.scss";
import { usePostService } from "../../../Service/Requests/usePostService";
import { useAnnouncementService } from "../../../Service/Requests/useAnnouncementService";
import { Form, Formik } from "formik";
import { PostOnCreateSchema } from "../../../Hooks/Validator/Schemas/Schemas";
import { Checkbox } from "../../Common/Checkbox/Checkbox";
import { DropZone } from "../../Common/DropZone/DropZone";

const NewUploadBlock = (props) => {
  const { userInfo, showAlertHandler } = props;
  const postService = usePostService();
  const announcementService = useAnnouncementService();

  const [showNewPostBlock, setShowNewPostBlock] = useState(false);

  const createNewPost = async (values) => {
    try {
      const upload = {
        title: values.title,
        body: values.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userInfo._id,
        photos: values.photos,
      };

      values.isAnnouncement
        ? await announcementService.createAnnouncement(upload)
        : await postService.createPost(upload);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    } finally {
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

            <Formik
              initialValues={{
                title: "",
                body: "",
                isAnnouncement: false,
                photos: [],
              }}
              validationSchema={PostOnCreateSchema}
              onSubmit={(values) => {
                createNewPost(values);
              }}
            >
              <Form encType="multipart/form-data" method="post">
                <Input
                  name="title"
                  placeholder="Title"
                  className="createPostInput input"
                />

                <Textarea
                  name="body"
                  rows={15}
                  className="createPostTextarea textarea"
                  placeholder="What`s on your mind?"
                />

                <Checkbox
                  classNameBlock="isAnnouncementBlock"
                  label="Post as announcement"
                  placeholder=""
                  name="isAnnouncement"
                  className="isAnnouncementCheckbox"
                />

                <DropZone
                  dropZoneClassname="photosForPostUpload"
                  filesClassname="photosForPostPreview"
                  filesBlockClassname="photosBlockForPostPreview"
                  elemOnActive={<p>Drop here...</p>}
                  elemOnPassive={<p>You can drop some files</p>}
                  filesInputClassname="photosForPostInput"
                  fieldName="photos"
                  acceptedTypes="image/*"
                  deleteOnClick={true}
                />

                <Button
                  type="Submit"
                  text="Create"
                  name="createPostButton"
                  className="createPostButton button"
                />

                <Button
                  text="Cancel"
                  onClick={() => setShowNewPostBlock(false)}
                  name="cancelCreatePostButton"
                  className="cancelCreatePostButton button"
                />
              </Form>
            </Formik>
          </div>
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userReducers,
});

export default connect(mapStateToProps)(NewUploadBlock);
