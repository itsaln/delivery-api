import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { AuthModule } from '@app/auth/auth.module'
import { CategoryModule } from '@app/category/category.module'
import { ProductModule } from '@app/product/product.module'
import { UserModule } from '@app/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		CategoryModule,
		ProductModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
