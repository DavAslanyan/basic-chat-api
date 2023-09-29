import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { PORT } from "./options/constant/env-key.const";
import { swaggerConst } from "./options/constant/swagger.const";
import { MongoExceptionFilter } from "./options/filter/mongo-exception.filter";
import { Logger } from "@nestjs/common";
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get(PORT) || 9000;

  app.enableShutdownHooks();
  app.useGlobalPipes();
  app.useGlobalFilters(new MongoExceptionFilter());

  const docConfig = new DocumentBuilder()
    .addBearerAuth()
    .setDescription("The chat Api")
    .setTitle("Chat Api")
    .setVersion("1.0");

  for (const tag of Object.values(swaggerConst.tag)) {
    docConfig.addTag(tag);
  }
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const schema = SwaggerModule.createDocument(app, docConfig.build(), options);
  SwaggerModule.setup("/api-docs", app, schema);
  await app.listen(port, () => {
    Logger.log("Server listening on port " + port);
  });
}
bootstrap();
