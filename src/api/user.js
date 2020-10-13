import feathers from "../services";

const userService = feathers.service("users");

async function get(id, params) {
  const { user } = await userService.get(id, params);
  return user;
}

export { get };
