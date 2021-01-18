/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const questionService = feathers.service("questions");
const closeService = feathers.service("questions/close");
const likeService = feathers.service("questions/like");

const LIMIT_NUMBER = 10;

async function getQuestion(id, params) {
  const res = await questionService.get(id, params);
  return res;
}

async function createQuestion(data, params) {
  const res = await questionService.create(data, params);
  return res;
}

async function getListQuestions(pageNumber) {
  const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  const { data } = await questionService.find({
    query: {
      $limit: LIMIT_NUMBER,
      $sort: {
        createdAt: -1
      },
      $skip: skipNumber
    }
  });
  // const res = await questionService.find({
  //   query: {
  //     $sort: {
  //       createdAt: -1
  //     }
  //   }
  // });

  return data;
}

async function getTotalQuestion() {
  const { total } = await questionService.find({
    query: {
      $limit: 0
    }
  });
  return total;
}

async function closeQuestion(questionId) {
  const res = await closeService.create({
    _id: questionId
  });
  return res;
}

async function likeQuestion(questionId) {
  const res = await likeService.create({
    _id: questionId
  });
  return res;
}

async function getTotalQuestionInMonth(month) {
  const currentYear = new Date().getFullYear();
  const { total } = await questionService.find({
    query: {
      createdAt: {
        $gte: new Date(currentYear, month, 1).getTime(),
        $lt: new Date(currentYear, month + 1, 1).getTime()
      },
      $limit: 0
    }
  });
  return total;
}

async function search(text) {
  const query = {
    $text: text.trim()
  };

  if (text.trim()) {
    console.log(query);
    const { data } = await questionService.find({
      query
    });

    return data;
  } else {
    return getListQuestions(1);
  }
}

export { questionService as questionServiceRoot };

export default {
  getQuestion,
  createQuestion,
  getListQuestions,
  closeQuestion,
  likeQuestion,
  getTotalQuestionInMonth,
  getTotalQuestion,
  search
};
