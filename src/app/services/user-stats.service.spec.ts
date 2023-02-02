import { TestBed } from '@angular/core/testing';

import { UserStatsService } from './user-stats.service';

describe('UserStatsServiceService', () => {
  let service: UserStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
