import { Users } from './users.model';

describe('Users', () => {
  it('should create an instance', () => {
    expect(new Users(null,"testUserName","testEmail@email.com",new Date())).toBeTruthy();
  });
});
