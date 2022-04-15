export class UserDTO {
  email;
  password;
  firstname;
  lastname;
  avatar;
  age;
  uploads;

  constructor(model) {
    this.email = model.email;
    this.password = model.password;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.avatar = model.avatar;
    this.age = model.age;
    this.uploads = model.uploads;
  }
}
