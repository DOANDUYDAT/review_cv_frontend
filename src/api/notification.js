/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const notificationService = feathers.service("notifications");

async function getNotification(id) {
  const res = await notificationService.get(id);
  return res;
}

export { notificationService as notificationServiceRoot };

export default {
  getNotification
};
