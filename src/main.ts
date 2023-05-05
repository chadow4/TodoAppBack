import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from "fs";

async function bootstrap() {
  /* Only for https 
  // const httpsOptions = {
  //   cert: fs.readFileSync('/app/cert.pem'),
  //   key: fs.readFileSync('/app/key.pem'),
  // };
  // const app = await NestFactory.create(AppModule, { httpsOptions });
  */
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
