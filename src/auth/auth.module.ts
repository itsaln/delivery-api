import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '@app/config/jwt.config'
import { PrismaService } from '@app/prisma.service'
import { AuthService } from '@app/auth/auth.service'
import { AuthController } from '@app/auth/auth.controller'
import { JwtStrategy } from '@app/auth/jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
