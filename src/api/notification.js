/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const notificationService = feathers.service("notifications");

async function getNotification(id) {
  const res = await notificationService.get(id);
  return res;
}

async function getListNotifciationByToUserId(userId) {
  const { data } = await notificationService.find({
    query: {
      to: userId
    }
  });
  return data;
}

export { notificationService as notificationServiceRoot };

export default {
  getNotification,
  getListNotifciationByToUserId
};
