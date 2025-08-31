import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://semaphore-olive.vercel.app','https://fantastic-tribble-7v7g94gprg7phxvjv-3000.app.github.dev']
  });
  await app.listen(3001);
}
bootstrap();