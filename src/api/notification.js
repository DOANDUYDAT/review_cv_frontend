/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const notificationService = feathers.service("notifications");

async function getNotification(id) {
  const res = await notificationService.get(id);
  return res;
}

async function getListNotifciationByListId(listId) {
  const { data } = await notificationService.find({
    query: {
      _id: {
        $in: listId
      },
      $sort: {
        createdAt: -1
      },
      $limit: 20
    }
  });
  return data;
}

export { notificationService as notificationServiceRoot };

export default {
  getNotification,
  getListNotifciationByListId
};
