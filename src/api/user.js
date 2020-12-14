/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

export const userService = feathers.service("users");
export const activeService = feathers.service("users/active");
export const deactiveService = feathers.service("users/deactive");
export const turnOnService = feathers.service("users/turn-on-notification");
export const turnOffService = feathers.service("users/turn-off-notification");

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

async function activeUser(userId) {
  const user = await activeService.create({
    userId
  });
  return user;
}

async function deactiveUser(userId) {
  const user = await deactiveService.create({
    userId
  });
  return user;
}

async function turnOnNotify(userId) {
  const user = await turnOnService.create({
    userId
  });
  return user;
}

async function turnOffNotify(userId) {
  const user = await turnOffService.create({
    userId
  });
  return user;
}

export { userService as userServiceRoot };

export default {
  getUser,
  getAllUsers,
  updateInfo,
  activeUser,
  deactiveUser,
  turnOnNotify,
  turnOffNotify
};
