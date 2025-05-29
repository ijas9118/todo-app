import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import container from "../inversify/container";
import TYPES from "../inversify/types";
import { authenticate } from "../middlewares/auth.middleware";
import { IAuthController } from "../controller/auth.controller.interface";

const router = Router();

const authController = container.get<IAuthController>(TYPES.AuthController);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/refresh", authController.refresh);
router.post("/logout", authenticate, authController.logout);

export default router;
