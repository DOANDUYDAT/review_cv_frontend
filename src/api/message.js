/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const messageService = feathers.service("messages");

async function get(id, params) {
  const { user } = await messageService.get(id, params);
  return user;
}

async function sendMessage(data) {
  const response = await messageService.create(data);
  return response;
}

async function findMessageByRoomId(roomId) {
  const { data } = await messageService.find({
    query: {
      roomId,
      $sort: {
        createAt: -1
      },
      $limit: 100
    }
  });
  return data;
}

export { messageService as messageServiceRoot };

export default {
  get,
  sendMessage,
  findMessageByRoomId
};
