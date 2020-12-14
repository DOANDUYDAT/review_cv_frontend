import feathers from "../services/restClient";

const giftService = feathers.service("gifts");

async function getAllGifts(params) {
  const gift = await giftService.find(params);
  return gift;
}

async function createGift(info) {
  const gift = await giftService.create(info);
  return gift;
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
