import { Container } from "inversify";
import TYPES from "./types";
import { IUserRepository } from "../repositories/user.repository.interface";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../services/user.service.interface";
import { UserService } from "../services/user.service";
import { IAuthController } from "../controller/auth.controller.interface";
import { AuthController } from "../controller/auth.controller";

const container = new Container();

container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.UserService).to(UserService);

export default container;
