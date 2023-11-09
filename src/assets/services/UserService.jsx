import axios from "axios";

export class UserService {
  static serverURL = "http://localhost:3000";

  static getAllUsers() {
    let dataURL = `${this.serverURL}/users`;
    return axios.get(dataURL);
  }

  static getUser(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.get(dataURL);
  }

  static createUser(user) {
    let dataURL = `${this.serverURL}/users`;
    return axios.post(dataURL, user);
  }

  static updateUser(user, userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.put(dataURL, user);
  }

  static deleteUser(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.delete(dataURL);
  }
  static getGroups() {
    let dataURL = `${this.serverURL}/groups`;
    return axios.get(dataURL);
  }

  static getGroup(user) {
    let groupId = user.groupId;
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.get(dataURL);
  }
  static createGroup(group) {
    let dataURL = `${this.serverURL}/groups`;
    return axios.post(dataURL, group);
  }

  static updateGroup(group, groupId) {
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.put(dataURL, group);
  }

  static deleteGroup(groupId) {
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.delete(dataURL);
  }
}
