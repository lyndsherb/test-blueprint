import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Injectable()
class AppService {
  getHello(): object {
    return { "Hello": "World!" };
  }
}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }
}

@Module({
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
