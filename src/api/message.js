/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const messageService = feathers.service("messages");

async function get(id, params) {
  const { user } = await messageService.get(id, params);
  return user;
}

async function create(data) {
  const response = await messageService.create(data);
  return response;
}

async function FindMessagesByUserId(params) {
  const messages = await messageService.find(params);
  return messages;
}

export default messageService;
