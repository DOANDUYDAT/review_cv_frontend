/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const volunteerService = feathers.service("volunteers");
const updateInfoService = feathers.service("volunteers/update-info");

async function getVolunteer(userId) {
  const { data } = await volunteerService.find({
    query: {
      userId
    }
  });
  return data[0];
}

async function accept(id, data, params) {
  // let volunteerIndex = users.findIndex(e => e.id == id);
  // users[volunteerIndex].isAccept = true;
  return true;
}

async function getAllNewVolunteers() {
  // return users.filter(e => e.isAccept == false);
  const { data } = await volunteerService.find({
    query: {
      isAccept: false
    }
  });
  return data;
}

async function getAllVolunteers() {
  // const skipNumber = pageNumber * 20;
  const { data } = await volunteerService.find({});
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

export { updateInfoService };

export default {
  getVolunteer,
  getAllNewVolunteers,
  accept,
  updateVolunteerInfo,
  createVolunteer,
  getAllVolunteers
};
