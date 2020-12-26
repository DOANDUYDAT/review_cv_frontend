import feathers from "../services/socketClient";

const giftService = feathers.service("gifts");
const receiveService = feathers.service("gifts/receive");

async function getAllGifts() {
  const { data } = await giftService.find({});
  return data;
}

async function getGiftById(id) {
  const gift = await giftService.get(id);
  return gift;
}

async function createGift(data) {
  let myForm = new FormData();
  myForm.append("name", data.name);
  myForm.append("value", data.value);
  myForm.append("quantity", data.quantity);
  myForm.append("category", data.category);
  myForm.append("uri", data.image);

  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);

  const res = await fetch("http://localhost:3030/gifts", {
    method: "POST",
    body: myForm,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}

async function updateGift(data) {
  let myForm = new FormData();
  myForm.append("_id", data._id);
  myForm.append("name", data.name);
  myForm.append("value", data.value);
  myForm.append("quantity", data.quantity);
  myForm.append("category", data.category);
  myForm.append("uri", data.image);

  let myHeaders = new Headers();
  let token = "Bearer " + (await feathers.authentication.getAccessToken());
  myHeaders.append("Authorization", token);
  const res = await fetch(`http://localhost:3030/gifts/update-info`, {
    method: "POST",
    body: myForm,
    headers: myHeaders,
    redirect: "follow"
  });
  return res;
}

async function deleteGift(id) {
  const gift = await giftService.remove(id);
  return gift;
}

async function exchangeGift(_id) {
  const res = await receiveService.create({
    _id
  });
  return res;
}

export default {
  getAllGifts,
  getGiftById,
  createGift,
  deleteGift,
  updateGift,
  exchangeGift
};
