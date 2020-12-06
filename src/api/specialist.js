/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";

const specialistService = feathers.service("specialists");
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

async function getSpecialist(userId) {
  const user = await specialistService.get(userId);
  return user;
}

async function accept(id, data, params) {
  let specialistIndex = users.findIndex(e => e.id == id);
  users[specialistIndex].isAccept = true;
  // const newData = {
  //   isAccept: true
  // }
  // const newParams = {
  //   query: {
  //     age: {
  //       $lte: 18
  //     }
  //   }
  // }
  // const response = await specialistService.patch(id, data, params);
  return true;
}

async function getAllNewSpecialists() {
  return users.filter(e => e.isAccept == false);
}

async function updateSpecialistInfo(userId, data) {
  const users = await specialistService.patch(userId, data);
  return users;
}

export default {
  getSpecialist,
  getAllNewSpecialists,
  accept,
  updateSpecialistInfo
};
