/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const memberService = feathers.service("members");

async function getMember(userId) {
  const member = await memberService.find({
    query: {
      userId
    }
  });
  return member;
}

async function updateInfo(userId, data) {
  const member = await memberService.patch(userId, data);
  return member;
}

async function createMember(info) {
  const member = await memberService.create(info);
  return member;
}

export default {
  getMember,
  updateInfo,
  createMember
};
