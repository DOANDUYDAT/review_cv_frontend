/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const cvService = feathers.service("cvs");
const interestService = feathers.service("cvs/interest");
const reviewCvService = feathers.service("cvs/review-cv");
const publicService = feathers.service("cvs/public");
const writeCVService = feathers.service("cvs/new-cv");
import authService from "./authentication";

const LIMIT_NUMBER = 10;

async function uploadCv(cv) {
  const fData = new FormData();
  fData.append("uri", cv.file);
  fData.append("exp", cv.exp);
  fData.append("field", cv.field);
  fData.append("position", cv.position);
  fData.append("location", cv.location);
  fData.append("timeType", cv.timeType);
  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);
  const res = await fetch("http://localhost:3030/cvs/uploads", {
    method: "POST",
    body: fData,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}

async function getAllCvs(pageNumber) {
  const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  let query = {
    $sort: {
      createdAt: -1
    },
    $limit: LIMIT_NUMBER,
    $skip: skipNumber
  };
  const role = await authService.getRole();
  if (role === "volunteer") {
    query = {
      ...query,
      listReview: []
    };
  }

  const { data } = await cvService.find({
    query
  });
  return data;
}

async function interestedCv(cvId) {
  const res = await interestService.create({
    cvId
  });
  return res;
}

async function getCvById(id) {
  const cv = await cvService.get(id);
  return cv;
}

async function getListCvById(listCvId) {
  const { data } = await cvService.find({
    query: {
      _id: {
        $in: listCvId
      }
    }
  });
  return data;
}
async function reviewCv(cvId) {
  const res = await reviewCvService.create({
    cvId
  });
  return res;
}

async function getListCvByFilter(filter) {
  const role = await authService.getRole();
  let query = {
    $sort: {
      createdAt: -1
    }
  };
  if (role === "volunteer") {
    query = {
      ...query,
      listReview: []
    };
  }
  for (let [key, value] of Object.entries(filter)) {
    if (value.length) {
      query[key] = { $in: value };
    }
  }

  const { data } = await cvService.find({
    query
  });
  return data;
}

async function publicCv(cvId, toUserId) {
  const cv = await publicService.create({
    cvId,
    toUserId
  });
  return cv;
}

async function getTotalCv() {
  const { total } = await cvService.find({
    query: {
      $limit: 0
    }
  });
  return total;
}

async function getListOnlineCv(userId) {
  const { data } = await cvService.find({
    query: {
      userId,
      type: "online"
    }
  });
  return data;
}

async function getListUploadCv(userId) {
  const { data } = await cvService.find({
    query: {
      userId,
      type: "upload",
      $sort: {
        createdAt: -1
      }
    }
  });
  return data;
}

async function writeNewCv(data) {
  const cv = await writeCVService.create(data);
  return cv;
}

async function editCv(cvId, data) {
  const cv = await cvService.patch(cvId, data);
  return cv;
}

async function deleteCv(cvId) {
  const cv = await cvService.remove(cvId);
  return cv;
}

async function getTotalCvInMonth(month) {
  const currentYear = new Date().getFullYear();
  const { total } = await cvService.find({
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
  if (text.trim()) {
    const role = await authService.getRole();
    let query = {
      $search: text.trim()
    };
    if (role === "volunteer") {
      query = {
        ...query,
        listReview: []
      };
    }
    const { data } = await cvService.find({
      query
    });
    return data;
  } else {
    return getAllCvs(1);
  }
}

async function getListUnreviewCv(pageNumber) {
  const skipNumber = (pageNumber - 1) * LIMIT_NUMBER;
  const { data } = await cvService.find({
    query: {
      listReview: [],
      $limit: LIMIT_NUMBER,
      $skip: skipNumber
    }
  });
  return data;
}

async function getTotalUnreviewCv() {
  const { total } = await cvService.find({
    query: {
      listReview: [],
      $limit: 0
    }
  });
  return total;
}

export default {
  uploadCv,
  getTotalCvInMonth,
  interestedCv,
  getAllCvs,
  getCvById,
  getListCvById,
  reviewCv,
  getListCvByFilter,
  getTotalCv,
  publicCv,
  getListOnlineCv,
  getListUploadCv,
  deleteCv,
  editCv,
  writeNewCv,
  search,
  getListUnreviewCv,
  getTotalUnreviewCv
};
