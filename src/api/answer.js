/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const answerService = feathers.service("answers");
const dislikeService = feathers.service("answers/dislike");
const likeService = feathers.service("answers/like");
const acceptService = feathers.service("answers/accept");

const LIMIT_NUMBER = 20;

async function getAnswer(id) {
  const res = await answerService.get(id);
  return res;
}

async function createAnswer(data) {
  const res = await answerService.create(data);
  return res;
}

// async function getListAnswersByQuestionId(questionId, pageNumber) {
//   const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
//   const { data } = await answerService.find({
//     query: {
//       $limit: LIMIT_NUMBER,
//       $sort: {
//         createdAt: -1
//       },
//       $skip: skipNumber,
//       questionId
//     }
//   });
//   return data;
// }
async function getListAnswersByQuestionId(questionId) {
  const { data } = await answerService.find({
    query: {
      $sort: {
        createdAt: -1
      },
      questionId
    }
  });
  return data;
}
async function getTotalAnswer(questionId) {
  const { total } = await answerService.find({
    query: {
      questionId,
      $limit: 0
    }
  });
  return total;
}

async function likeAnswer(id) {
  const res = await likeService.create({
    _id: id
  });
  return res;
}

async function dislikeAnswer(id) {
  const res = await likeService.create({
    _id: id
  });
  return res;
}

async function acceptAnswer(_id) {
  const res = await acceptService.create({
    _id
  });
  return res;
}

export { acceptService, answerService as answerServiceRoot };

export default {
  getAnswer,
  getListAnswersByQuestionId,
  likeAnswer,
  createAnswer,
  dislikeAnswer,
  getTotalAnswer,
  acceptAnswer
};
