import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./auth.module";
import { QuestModule } from "./quest.module";
import { PermissionModule } from "./permission.module";
import { PaymentService } from "src/services/payment.service";
import { PaymentProxyService } from "src/services/payment-proxy";
import { PaymentController } from "src/controllers/payment.controller";
import { UserModule } from "./user.module";

@Module({
  imports: [JwtModule, AuthModule, forwardRef(() => QuestModule), UserModule, PermissionModule],
  providers: [PaymentService, PaymentProxyService],
  controllers: [PaymentController],
  exports: [PaymentService, PaymentProxyService]
})
export class PaymentModule {}
