import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  return {
     firstName: faker.name.firstName(),
     lastName: faker.name.lastName(),
     email: faker.internet.email(),
     password: faker.internet.password(),
  };
}

export const user = createRandomUser();