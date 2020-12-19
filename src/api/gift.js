import feathers from "../services/socketClient";

const giftService = feathers.service("gifts");

async function getAllGifts() {
  const { data } = await giftService.find({});
  return data;
}

async function createGift(data) {
  let myForm = new FormData();
  myForm.append("name", data.name);
  myForm.append("value", data.value);
  myForm.append("quantity", data.quantity);
  myForm.append("category", data.category);
  myForm.append("uri", data.image);
  console.log(data.image);
  const res = await fetch("http://localhost:3030/gifts", {
    method: "POST",
    body: myForm,
    headers: {
      Authorization: "Bearer " + feathers.authentication.getAccessToken()
    }
  });
  return res;
}

async function deleteGift(info) {
  const gift = await giftService.remove(info);
  return gift;
}

export default {
  getAllGifts,
  createGift,
  deleteGift
};
