/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const recruitmentService = feathers.service("recruitments");

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

export default {
  getRecruitment,
  getListRecruitment,
  createRecruitment
};
