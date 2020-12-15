/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const commentService = feathers.service("comments");
// const dislikeService = feathers.service("comments/dislike");
const likeService = feathers.service("comments/like");
// const acceptService = feathers.service("answers/accept");

const LIMIT_NUMBER = 20;

async function getComment(id) {
  const res = await commentService.get(id);
  return res;
}

async function createComment(data) {
  const res = await commentService.create(data);
  return res;
}

async function getListCommentsByAnswerId(answerId) {
  // const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  const { data } = await commentService.find({
    query: {
      // $limit: LIMIT_NUMBER,
      $sort: {
        createdAt: -1
      },
      // $skip: skipNumber,
      answerId
    }
  });
  return data;
}

// async function getTotalAnswer(questionId) {
//   const { total } = await answerService.find({
//     query: {
//       questionId,
//       $limit: 0
//     }
//   });
//   return total;
// }

async function likeComment(id) {
  const res = await likeService.create({
    _id: id
  });
  return res;
}

// async function dislikeAnswer(id) {
//   const res = await likeService.create({
//     _id: id
//   });
//   return res;
// }

// async function acceptAnswer(_id) {
//   const res = await acceptService.create({
//     _id
//   });
//   return res;
// }

export { commentService as commentServiceRoot };

export default {
  getComment,
  getListCommentsByAnswerId,
  likeComment,
  createComment
  // dislikeAnswer,
  // getTotalAnswer,
  // acceptAnswer
};
