// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 'john', password: 'changeme' },
    { id: 'chris', password: 'secret' },
  ];

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async setRefreshToken(id: string, refreshToken: string) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.refreshToken = refreshToken;
    }
  }

  async removeRefreshToken(id: string) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.refreshToken = undefined;
    }
  }
}
