import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { AuthModule } from '@app/auth/auth.module'
import { CategoryModule } from '@app/category/category.module'
import { ProductModule } from '@app/product/product.module'
import { UserModule } from '@app/user/user.module'
import { OrderModule } from '@app/order/order.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		CategoryModule,
		ProductModule,
		UserModule,
		OrderModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
