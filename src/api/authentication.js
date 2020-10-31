import feathers from "../services/restClient";

async function authenticate(data) {
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

export default { authenticate, logout, reAuthenticate };
