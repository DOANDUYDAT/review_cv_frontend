/* eslint-disable no-unused-vars */
import feathers from "../services/socketClient";

const volunteerService = feathers.service("volunteers");
const updateInfoService = feathers.service("volunteers/update-info");
const acceptService = feathers.service("volunteers/accept");
const exchangePointService = feathers.service("volunteers/exchange-point");

async function getVolunteer(userId) {
  const { data } = await volunteerService.find({
    query: {
      userId
    }
  });
  return data[0];
}

async function accept(_id) {
  const res = await acceptService.create({
    _id
  });
  return res;
}

async function getListNewVolunteers() {
  const { data } = await volunteerService.find({
    query: {
      isAccept: false
    }
  });
  return data;
}

async function getListAcceptedVolunteers() {
  // const skipNumber = pageNumber * 20;
  const { data } = await volunteerService.find({
    query: {
      isAccept: true
    }
  });
  return data;
}

async function updateVolunteerInfo(data) {
  const volunteer = await updateInfoService.create(data);
  return volunteer;
}

async function createVolunteer(info) {
  const volunteer = await volunteerService.create(info);
  return volunteer;
}

async function exchangePoint(_id, amount, category) {
  const res = await exchangePointService.create({
    _id,
    amount,
    category
  });
  return res;
}

export { updateInfoService, exchangePointService };

export default {
  getVolunteer,
  getListNewVolunteers,
  accept,
  updateVolunteerInfo,
  createVolunteer,
  getListAcceptedVolunteers,
  exchangePoint
};
