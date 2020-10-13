import feathers from "../services";

async function authenticate(data) {
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

export { authenticate, logout, reAuthenticate };
