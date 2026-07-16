import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get databaseUrl(): string {
    const value = process.env.DATABASE_URL;
    if (!value) {
      throw new Error('DATABASE_URL is not defined');
    }
    return value;
  }

  get port(): number {
    return Number(process.env.API_PORT ?? 8000);
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get frontendUrl(): string {
    const value = process.env.FRONTEND_URL;
    if (!value) {
      throw new Error('FRONTEND_URL is not defined');
    }
    return value;
  }
}
