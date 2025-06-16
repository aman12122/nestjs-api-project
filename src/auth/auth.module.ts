import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module"; // Add this import

@Module({
  imports: [PrismaModule], // Add PrismaModule to imports
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}