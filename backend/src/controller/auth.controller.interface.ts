import { RequestHandler } from "express";

export interface IAuthController {
  register: RequestHandler;
  login: RequestHandler;
  refresh: RequestHandler;
  logout: RequestHandler;
}
