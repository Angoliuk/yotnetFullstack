import { UserDTO } from "./UserDTO.js";

export class AuthUserDTO extends UserDTO {
  accessToken;

  constructor(model) {
    super(model);
    this.accessToken = model.accessToken;
  }
}
