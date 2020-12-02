/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const questionService = feathers.service("questions");
const closeQuestionService = feathers.service("questions/:questionId/close");

const LIMIT_NUMBER = 20;

async function getQuestion(id, params) {
  const res = await questionService.get(id, params);
  return res;
}

async function createQuestion(data, params) {
  const res = await questionService.create(data, params);
  return res;
}

async function getAllQuestions(pageNumber) {
  const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  const res = questionService.find({
    query: {
      $limit: LIMIT_NUMBER,
      $sort: {
        createdAt: -1
      },
      $skip: skipNumber
    }
  });
  return res;
}

async function closeQuestion() {
  const res = closeQuestionService.create();
  return res;
}

export default {
  getQuestion,
  createQuestion,
  getAllQuestions
};
