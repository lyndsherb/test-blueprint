import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './modules/database.module.js';

@Injectable()
class AppService {
  getHello(): object {
    return { data: "Hello World!" };
  }
}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  getHello(): object {
    return this.appService.getHello();
  }
}

@Controller("cats")
class CatsController {
  @Get()
  fetch(): object {
    return { data: "Cats will be fetched by this endpoint" }
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
