import { userApi } from "./userApi";

export function fetchUsers(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userApi);
    }, delay);
  });
}

export function fetchUserById(id, delay = 800) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userApi.find((user) => user.id === Number(id));

      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with id ${id} not found`));
      }
    }, delay);
  });
}
