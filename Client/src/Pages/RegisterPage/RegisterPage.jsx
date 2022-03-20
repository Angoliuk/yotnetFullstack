import React from "react";
import { Button } from "../../Components/Common/Button/Button";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import "./RegisterPage.scss";
import { Loader } from "../../Components/Common/Loader/Loader";
import { Modal } from "../../Components/Common/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserService } from "../../Service/Requests/useUserService";
import { Form, Formik } from "formik";
import { Input } from "../../Components/Common/Input/Input";
import { UserRegisterSchema } from "../../Hooks/Validator/Schemas/Schemas";

const RegisterPage = (props) => {
  const userService = useUserService();
  const { showAlertHandler } = props;
  const navigate = useNavigate();

  // const [showAvatarsBlock, setShowAvatarsBlock] = useState(false);
  // const avatarLinks = [
  //   "https://preview.redd.it/yom0nq8tznsz.jpg?width=640&crop=smart&auto=webp&s=f71630cd970ede845f2c992ffc8ffe4f5c59f289",
  //   "https://preview.redd.it/nnpgvr3260b41.jpg?width=640&crop=smart&auto=webp&s=922220e69118a0b46b56247ad5fb9af5654794a0",
  //   "https://live.staticflickr.com/38/115048538_653a9c8251_n.jpg",
  //   "https://as1.ftcdn.net/v2/jpg/02/46/81/76/1000_F_246817612_wzXPUIGvJNno61KneBgH4weaJsdZ0Gun.jpg",
  // ];

  // const avatarChangeHandler = (event) => {
  //   setRegisterData({
  //     ...registerData,
  //     avatar: event.target.src,
  //   });

  //   setShowAvatarsBlock(!showAvatarsBlock);
  // };

  const processRegister = async (registerData) => {
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

      <Formik
        initialValues={{
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          age: 0,
          avatar:
            "https://preview.redd.it/yom0nq8tznsz.jpg?width=640&crop=smart&auto=webp&s=f71630cd970ede845f2c992ffc8ffe4f5c59f289",
        }}
        validationSchema={UserRegisterSchema}
        onSubmit={(values) => processRegister(values)}
      >
        <Form>
          <Input
            name="email"
            label="Email"
            className="input personalInfoProfilePageInput"
            type="email"
          />
          <Input
            name="password"
            label="Password"
            className="input personalInfoProfilePageInput"
            type="password"
          />
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
      />

      {showAvatarsBlock &&
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
          </div>
        )} */}
          <Button type="Submit" text="Register" name="registerButton" />
        </Form>
      </Formik>
    </div>
  );
};

export default PagesWrapper(RegisterPage);
