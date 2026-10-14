import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env before initializing any NestJS modules
dotenv.config({ path: resolve(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Serve static assets from 'public' folder
  app.useStaticAssets(join(process.cwd(), 'public'));

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(
    `\n🚀 Fortis Fit Telegram Mini App running at: http://localhost:${port}`,
  );
  console.log(
    `📡 API Endpoints available at: http://localhost:${port}/api/workout/schedule`,
  );
  console.log(
    `📱 Open in browser or Telegram Web App: http://localhost:${port}/\n`,
  );
}
bootstrap();
