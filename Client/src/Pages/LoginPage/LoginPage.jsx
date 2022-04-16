import React from "react";
import { Button } from "../../Components/Common/Button/Button";
import { Input } from "../../Components/Common/Input/Input";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import { Loader } from "../../Components/Common/Loader/Loader";
import { Modal } from "../../Components/Common/Modal/Modal";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { useUserService } from "../../Service/Requests/useUserService";
import { Form, Formik } from "formik";
import { UserLoginSchema } from "../../Hooks/Validator/Schemas/Schemas";

const LoginPage = (props) => {
  const { showAlertHandler } = props;
  const navigate = useNavigate();
  const userService = useUserService();

  const processLogin = async (loginData) => {
    try {
      await userService.login(loginData);
      navigate("/home");
    } catch (e) {
      console.log(e);

      showAlertHandler({
        show: true,
        text: `${e}`,
        type: "error",
      });
    }
  };

  return (
    <div className="loginPageBlock">
      {userService.userLoading && Modal(<Loader />)}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={UserLoginSchema}
        onSubmit={(values) => processLogin(values)}
      >
        <Form>
          <Input name="email" label="Email" className="input inputLoginPage" />

          <Input
            name="password"
            type="password"
            label="Password"
            className="input inputLoginPage"
          />

          <Button type="Submit" text="Login" name="loginButton" />
        </Form>
      </Formik>
    </div>
  );
};

export default PagesWrapper(LoginPage);
