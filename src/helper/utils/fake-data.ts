import { faker } from "@faker-js/faker";

export const getFakeUserData = () => {
  return {
    username: faker.internet.userName(),
    password: "Min8Chars",
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    gender: faker.person.sex(),
  };
};
