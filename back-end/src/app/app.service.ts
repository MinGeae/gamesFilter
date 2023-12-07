import { Injectable } from '@nestjs/common';
import { data } from '../data/data';

@Injectable()
export class AppService {
  getList(): Record<string, any> {
    return data;
  }
}
