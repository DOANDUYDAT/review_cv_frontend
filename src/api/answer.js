/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const answerService = feathers.service("answers");
const dislikeService = feathers.service("answers/dislike");
const likeService = feathers.service("answers/like");

const LIMIT_NUMBER = 20;

async function getAnswer(id) {
  const res = await answerService.get(id);
  return res;
}

async function createAnswer(data) {
  const res = await answerService.create(data);
  return res;
}

async function getListAnswersByQuestionId(questionId) {
  // const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  // const res = answerService.find({
  //   query: {
  //     $limit: LIMIT_NUMBER,
  //     $sort: {
  //       createdAt: -1
  //     },
  //     $skip: skipNumber
  //   }
  // });
  const res = answerService.find({
    query: {
      questionId,
      $sort: {
        createdAt: -1
      }
    }
  });
  return res;
}

async function likeAnswer(id) {
  const res = likeService.create({
    _id: id
  });
  return res;
}

async function dislikeAnswer(id) {
  const res = likeService.create({
    _id: id
  });
  return res;
}

export default {
  getAnswer,
  getListAnswersByQuestionId,
  likeAnswer,
  createAnswer,
  dislikeAnswer
};