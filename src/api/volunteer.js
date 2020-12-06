/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const volunteerService = feathers.service("volunteers");
const users = [
  {
    id: "001",
    userName: "Le Thanh",
    email: "lethanh98@gmail.com",
    phone: "0123456789",
    company: "Viettel",
    website: "viettel.com.vn",
    isActive: "Từ chối",
    isAccept: false
  },
  {
    id: "002",
    userName: "Duong Thoa",
    email: "duongthoa98@gmail.com",
    phone: "0123445566",
    company: "Viettel",
    website: "viettel.com.vn",
    isActive: "Đang xử lý",
    isAccept: false
  },
  {
    id: "003",
    userName: "Doan Dat",
    email: "doandat98@gmail.com",
    phone: "0336221717",
    company: "Viettel",
    website: "viettel.com.vn",
    isActive: "Đang xử lý",
    isAccept: false
  }
];

async function getVolunteer(userId) {
  const user = await volunteerService.get(userId);
  return user;
}

async function accept(id, data, params) {
  let volunteerIndex = users.findIndex(e => e.id == id);
  users[volunteerIndex].isAccept = true;
  return true;
}

async function getAllNewVolunteers() {
  return users.filter(e => e.isAccept == false);
}

async function updateVolunteerInfo(userId, data) {
  const users = await volunteerService.patch(userId, data);
  return users;
}

async function createVolunteer(info) {
  console.log(info);
  const volun = await volunteerService.create(info);
  return volun;
}

export default {
  getVolunteer,
  getAllNewVolunteers,
  accept,
  updateVolunteerInfo,
  createVolunteer
};
