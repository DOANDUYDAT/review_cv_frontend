/* eslint-disable no-unused-vars */
import feathers from "../services/restClient";
import memberService from "./member";
import specialistService from "./specialist";
import volunteerService from "./volunteer";
import userService from "./user";

const ADMIN_ROLE = "admin";
const MEMBER_ROLE = "member";
const SPECIALIST_ROLE = "specialist";
const VOLUNTEER_ROLE = "volunteer";

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

async function getCurrentUserId() {
  const { user } = await feathers.get("authentication");
  return user._id;
}

async function getRole() {
  const { user } = await feathers.get("authentication");
  return user.role;
}

async function getUserByRole() {
  const id = await getCurrentUserId();
  const role = await getRole();
  if (role === MEMBER_ROLE) {
    return memberService.getMember(id);
  } else if (role === SPECIALIST_ROLE) {
    return specialistService.getSpecialist(id);
  } else if (role === VOLUNTEER_ROLE) {
    return volunteerService.getVolunteer(id);
  } else if (role === ADMIN_ROLE) {
    const user = await userService.getUser(id);
    return {
      user: {
        userName: "ADMIN",
        _id: id,
        role: role,
        email: user.email,
        phone: user.phone
      }
    };
  } else {
    return null;
  }
}

export default {
  login,
  logout,
  reAuthenticate,
  getCurrentUserId,
  getRole,
  getUserByRole
};
