/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const memberService = feathers.service("members");
const updateInfoService = feathers.service("members/update-info");

async function getMember(userId) {
  const { data } = await memberService.find({
    query: {
      userId
    }
  });
  return data[0];
}

async function updateInfo(data) {
  console.log(data);
  const member = await updateInfoService.create(data);
  return member;
}

async function createMember(info) {
  const member = await memberService.create(info);
  return member;
}

async function getAllMembers() {
  // const skipNumber = pageNumber * 20;
  const { data } = await memberService.find({});
  return data;
}

export { updateInfoService };

export default {
  getMember,
  updateInfo,
  createMember,
  getAllMembers
};
