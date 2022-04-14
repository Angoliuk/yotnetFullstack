import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./UserPersonalBlock.scss";
import { Button } from "../../Common/Button/Button";
import { Input } from "../../Common/Input/Input";
import { useUserService } from "../../../Service/Requests/useUserService";
import { Modal } from "../../Common/Modal/Modal";
import { Loader } from "../../Common/Loader/Loader";
import { Form, Formik } from "formik";
import { UserUpdateSchema } from "../../../Hooks/Validator/Schemas/Schemas";

const UserPersonalBlock = (props) => {
  const { showAlertHandler, accessToken, userId, userInfo } = props;
  const id = useParams().id;
  const userService = useUserService();

  const updateUserProfile = async (user) => {
    try {
      await userService.updateUser(id, user, accessToken);
      showAlertHandler({
        show: true,
        text: `Everything successfully saved`,
        type: "success",
      });
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    }
  };

  const deleteUserProfile = async () => {
    try {
      await userService.deleteUser(userId);
      // window.reload();
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    }
  };

  return (
    <div className="profilePagePersonalBlock">
      {userService.userLoading && Modal(<Loader />)}

      <p className="profilePagePersonalName">
        Information about{" "}
        {String(userId) === String(id) ? "you" : userInfo.firstname}
      </p>
      {String(userId) === String(id) ? (
        <>
          <Formik
            initialValues={{
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              age: userInfo.age,
            }}
            validationSchema={UserUpdateSchema}
            onSubmit={(values) => updateUserProfile(values)}
          >
            <Form>
              <div>
                {/* <Input
                name="password"
                label="Password"
                className="input personalInfoProfilePageInput"
                type="password"
              /> */}

                <Input
                  name="firstname"
                  label="Firstname"
                  className="input personalInfoProfilePageInput"
                />

                <Input
                  name="lastname"
                  label="Lastname"
                  className="input personalInfoProfilePageInput"
                />

                <Input
                  name="age"
                  label="Age"
                  className="input personalInfoProfilePageInput"
                  type="number"
                />

                {/* <img
                onClick={onChangeAvatar}
                title="click to choose new avatar"
                className="chosenAvatar"
                alt="avatar"
                src={stateForInputs.avatar}
              /> */}

                {/* {showAvatarsBlock &&
        Modal(
          <div className="avatarModalBlock">
            {avatarLinks.map((avatar, i) => {
              return (
                <div key={i}>
                  <img
                    onClick={onChangeAvatar}
                    name="avatar"
                    id={`avatar${i}`}
                    className="avatarImg"
                    src={avatar}
                    alt="avatar pic"
                  />
                </div>
              );
            })}
        )} */}
                <Button
                  type="Submit"
                  text="Save"
                  name="saveButton"
                  className="button personalInfoProfilePageButton"
                />
              </div>
            </Form>
          </Formik>
          <Button
            text="Delete"
            onClick={deleteUserProfile}
            name="deleteButton"
            className="button personalInfoProfilePageDeleteButton"
          />
        </>
      ) : (
        <div className="profilePagePersonalInfoBlock">
          <div>
            <img
              className="profilePagePersonalAvatar"
              alt="avatar"
              src={
                userInfo.avatar ? userInfo.avatar : "https://picsum.photos/200"
              }
            />
          </div>

          <div className="profilePagePersonalInfo">
            <p>
              Fullname: {userInfo.firstname} {userInfo.lastname}
            </p>
            <p>Age: {userInfo.age}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.userReducers.accessToken,
  userId: state.userReducers._id,
});

export default connect(mapStateToProps)(UserPersonalBlock);
