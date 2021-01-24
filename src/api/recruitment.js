/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const recruitmentService = feathers.service("recruitments");
const primaryService = feathers.service("recruitments/primary");

async function getRecruitment(recruitmentId) {
  const res = await recruitmentService.get(recruitmentId);
  return res;
}

async function createRecruitment(data) {
  const res = await recruitmentService.create(data);
  return res;
}

async function getListRecruitment(listId) {
  const { data } = await recruitmentService.find({
    query: {
      _id: {
        $in: listId
      }
    }
  });

  return data;
}

async function setPrimary(id) {
  const res = await primaryService.create({
    recruitmentId: id
  });
  return res;
}

export default {
  getRecruitment,
  getListRecruitment,
  createRecruitment,
  setPrimary
};
