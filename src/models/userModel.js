class UserModel {
  constructor(id, username, password, university) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.university = university;
  }
}

export default new UserModel();
