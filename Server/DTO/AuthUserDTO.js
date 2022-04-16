import { UserDTO } from "./UserDTO.js";

export class AuthUserDTO extends UserDTO {
  accessToken;
  refreshToken;

  constructor(model) {
    super(model);
    this.accessToken = model.accessToken;
    this.refreshToken = model.refreshToken;
  }
}
