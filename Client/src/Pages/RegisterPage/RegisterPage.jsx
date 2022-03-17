import React, { useState } from "react";
import { Button } from "../../Components/Common/Button/Button";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import "./RegisterPage.scss";
import InputsWithUserData from "../../Components/Common/InputsWithUserData/InputsWithUserData";
import { Loader } from "../../Components/Common/Loader/Loader";
import { Modal } from "../../Components/Common/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserService } from "../../Service/Requests/useUserService";

const RegisterPage = (props) => {
  const userService = useUserService();
  const { showAlertHandler } = props;
  const navigate = useNavigate();

  const [showAvatarsBlock, setShowAvatarsBlock] = useState(false);

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    age: 0,
    avatar:
      "https://preview.redd.it/yom0nq8tznsz.jpg?width=640&crop=smart&auto=webp&s=f71630cd970ede845f2c992ffc8ffe4f5c59f289",
  });

  const inputChangeHandler = (event) =>
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });

  const avatarChangeHandler = (event) => {
    setRegisterData({
      ...registerData,
      avatar: event.target.src,
    });

    setShowAvatarsBlock(!showAvatarsBlock);
  };

  const processRegister = async () => {
    try {
      await userService.register(registerData);
      navigate("/home");
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    }
  };

  return (
    <div className="registerPageMainBlock">
      {userService.userLoading && Modal(<Loader />)}

      <InputsWithUserData
        showPassword={true}
        stateForInputs={registerData}
        onChangeInput={inputChangeHandler}
        onChangeAvatar={avatarChangeHandler}
        showAvatarsBlock={showAvatarsBlock}
      />

      <Button onClick={processRegister} text="Register" name="registerButton" />
    </div>
  );
};

export default PagesWrapper(RegisterPage);
