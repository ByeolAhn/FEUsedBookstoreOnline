class UserModel {
  constructor({ _id, user_id, username, email, role, created, updated }) {
    this._id = _id;
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.created = new Date(created);
    this.updated = new Date(updated);
  }
}

export default UserModel;
