import { UserStats } from './user-stats.model';

describe('UserStats', () => {
  it('should create an instance', () => {
    expect(new UserStats(null,new Date(),new Date(),0,0,0,0,0,0,0,0,0,0,0)).toBeTruthy();
  });
});
