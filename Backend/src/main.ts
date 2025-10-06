import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { buildProcessState, writeErrorLog } from './utils/error-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow all origins
  app.enableCors({
    origin: '*',  // Accept requests from anywhere
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*', // Allow all headers
  });

  // Global error handling
  app.useGlobalFilters(new AllExceptionsFilter());

  // Process-level safety nets
  process.on('uncaughtException', async (err: any) => {
    const message = err?.message ?? 'Uncaught exception';
    const stack = err?.stack ? String(err.stack) : undefined;
    await writeErrorLog({
      timestamp: new Date().toISOString(),
      level: 'fatal',
      name: err?.name,
      message,
      stack,
      state: buildProcessState(),
    });
    // eslint-disable-next-line no-console
    console.error('[UncaughtException]', message);
  });

  process.on('unhandledRejection', async (reason: any) => {
    const message = typeof reason === 'object' && reason?.message
      ? String(reason.message)
      : 'Unhandled promise rejection';
    const stack = typeof reason === 'object' && reason?.stack
      ? String(reason.stack)
      : undefined;
    await writeErrorLog({
      timestamp: new Date().toISOString(),
      level: 'fatal',
      name: (reason && reason.name) || 'UnhandledRejection',
      message,
      stack,
      state: buildProcessState(),
    });
    // eslint-disable-next-line no-console
    console.error('[UnhandledRejection]', message);
  });

  await app.listen(3001);
}
bootstrap();
