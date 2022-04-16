export class UserDTO {
  id;
  email;
  password;
  firstname;
  lastname;
  avatar;
  age;
  uploads;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.password = model.password;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.avatar = model.avatar;
    this.age = model.age;
    this.uploads = model.uploads;
    if (model?.expanded) {
      this.expanded = model.expanded;
    }
  }
}
