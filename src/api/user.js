/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

export const userService = feathers.service("users");

async function getUser(userId) {
  const user = await userService.get(userId);
  return user;
}

async function getAllUsers(params) {
  const users = await userService.find(params);
  return users;
}
async function updateInfo(userId, data) {
  const users = await userService.patch(userId, data);
  return users;
}

export { userService as userServiceRoot };

export default {
  getUser,
  getAllUsers,
  updateInfo
};
