import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./UserPersonalBlock.scss";
import { Button } from "../../Common/Button/Button";
import { Input } from "../../Common/Input/Input";
import InputsWithUserData from "../../Common/InputsWithUserData/InputsWithUserData";
import { useUserService } from "../../../Service/Requests/useUserService";
import { Modal } from "../../Common/Modal/Modal";
import { Loader } from "../../Common/Loader/Loader";

const UserPersonalBlock = (props) => {
  const { showAlertHandler, accessToken, userId, userInfo } = props;
  const _id = useParams().id;
  const userService = useUserService();

  const [newPassword, setNewPassword] = useState("");
  const [showAvatarsBlock, setShowAvatarsBlock] = useState(false);

  const [user, setUser] = useState(userInfo);

  const inputChangeHandler = (event) =>
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });

  const passwordInputChangeHandler = (event) =>
    setNewPassword(event.target.value);

  const avatarChangeHandler = (event) => {
    setUser({
      ...user,
      avatar: event.target.src,
    });

    setShowAvatarsBlock(!showAvatarsBlock);
  };

  const updateUserProfile = async () => {
    try {
      await userService.updateUser(
        _id,
        { ...user, password: newPassword },
        accessToken
      );
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

  return (
    <div className="profilePagePersonalBlock">
      {userService.userLoading && Modal(<Loader />)}

      <p className="profilePagePersonalName">
        Information about{" "}
        {String(userId) === String(_id) ? "you" : user.firstname}
      </p>

      {String(userId) === String(_id) ? (
        <div>
          <InputsWithUserData
            showPassword={false}
            stateForInputs={user}
            onChangeInput={inputChangeHandler}
            onChangeAvatar={avatarChangeHandler}
            showAvatarsBlock={showAvatarsBlock}
          />

          <Input
            name="password"
            value={newPassword}
            htmlForText="Password"
            className="input personalInfoProfilePageInput"
            onChange={passwordInputChangeHandler}
            type="password"
          />

          <Button
            onClick={updateUserProfile}
            text="Save"
            name="saveButton"
            className="button personalInfoProfilePageButton"
          />
        </div>
      ) : (
        <div className="profilePagePersonalInfoBlock">
          <div>
            <img
              className="profilePagePersonalAvatar"
              alt="avatar"
              src={user.avatar ? user.avatar : "https://picsum.photos/200"}
            />
          </div>

          <div className="profilePagePersonalInfo">
            <p>
              Fullname: {user.firstname} {user.lastname}
            </p>
            <p>Age: {user.age}</p>
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
