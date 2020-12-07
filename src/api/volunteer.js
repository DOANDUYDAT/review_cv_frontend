/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const volunteerService = feathers.service("volunteers");

async function getVolunteer(userId) {
  const volunteer = await volunteerService.get(userId);
  return volunteer;
}

async function accept(id, data, params) {
  // let volunteerIndex = users.findIndex(e => e.id == id);
  // users[volunteerIndex].isAccept = true;
  return true;
}

async function getAllNewVolunteers() {
  // return users.filter(e => e.isAccept == false);
  const res = await volunteerService.find({
    query: {
      isAccept: false
    }
  });
  return res;
}

async function updateVolunteerInfo(userId, data) {
  const volunteer = await volunteerService.patch(userId, data);
  return volunteer;
}

async function createVolunteer(info) {
  const volunteer = await volunteerService.create(info);
  return volunteer;
}

export default {
  getVolunteer,
  getAllNewVolunteers,
  accept,
  updateVolunteerInfo,
  createVolunteer
};
