import feathers from "../services/restClient";

async function login(data) {
  data = {
    ...data,
    strategy: "local"
  };
  const { user } = await feathers.authenticate(data);
  return user;
}

async function reAuthenticate() {
  const { user } = await feathers.reAuthenticate();
  return user;
}

async function logout() {
  await feathers.logout();
}

async function getCurrentUser() {
  const { user } = await feathers.get("authentication");
  return user;
}

export default { login, logout, reAuthenticate, getCurrentUser };
