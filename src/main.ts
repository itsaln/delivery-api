import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()
	await app.listen(5200)
}

bootstrap()
