import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchesService {
  async findAll(): Promise<string> {
    return new Promise((resolve) => {
      resolve('This action returns all Matches');
    });
  }
}
