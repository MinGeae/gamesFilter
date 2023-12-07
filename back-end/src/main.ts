import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, AppModule],
})
class MainModule implements OnApplicationShutdown {
  async onApplicationShutdown(signal: string) {
    console.log(`[admin server] shutdown by signal: ${signal}`);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
