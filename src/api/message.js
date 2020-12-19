/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const messageService = feathers.service("messages");

async function get(id, params) {
  const { user } = await messageService.get(id, params);
  return user;
}

async function create(data) {
  const response = await messageService.create(data);
  return response;
}

async function FindMessagesByUserId() {
  const messages = await messageService.find({
    query: {
      isRead: true
    }
  });
  console.log(messages);
  return messages;
}

export { messageService as messageServiceRoot };

export default {
  get,
  create,
  FindMessagesByUserId
};
