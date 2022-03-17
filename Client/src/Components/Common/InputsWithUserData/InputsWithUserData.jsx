import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";
import "./InputsWithUserData.scss";

const InputsWithUserData = (props) => {
  const avatarLinks = [
    "https://preview.redd.it/yom0nq8tznsz.jpg?width=640&crop=smart&auto=webp&s=f71630cd970ede845f2c992ffc8ffe4f5c59f289",
    "https://preview.redd.it/nnpgvr3260b41.jpg?width=640&crop=smart&auto=webp&s=922220e69118a0b46b56247ad5fb9af5654794a0",
    "https://live.staticflickr.com/38/115048538_653a9c8251_n.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/46/81/76/1000_F_246817612_wzXPUIGvJNno61KneBgH4weaJsdZ0Gun.jpg",
  ];
  const {
    stateForInputs,
    onChangeInput,
    onChangeAvatar,
    showAvatarsBlock,
    showPassword,
  } = props;

  return (
    <div>
      <Input
        name="email"
        value={stateForInputs.email}
        htmlForText="Email"
        onChange={onChangeInput}
        className="input personalInfoProfilePageInput"
        type="email"
      />

      {showPassword && (
        <Input
          name="password"
          value={stateForInputs.password}
          htmlForText="Password"
          onChange={onChangeInput}
          className="input personalInfoProfilePageInput"
          type="password"
        />
      )}

      <Input
        name="firstname"
        value={stateForInputs.firstname}
        htmlForText="Firstname"
        onChange={onChangeInput}
        className="input personalInfoProfilePageInput"
      />

      <Input
        name="lastname"
        value={stateForInputs.lastname}
        htmlForText="Lastname"
        onChange={onChangeInput}
        className="input personalInfoProfilePageInput"
      />

      <Input
        name="age"
        value={stateForInputs.age}
        htmlForText="Age"
        onChange={onChangeInput}
        className="input personalInfoProfilePageInput"
        type="number"
      />

      <img
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
        )}
    </div>
  );
};

export default InputsWithUserData;
