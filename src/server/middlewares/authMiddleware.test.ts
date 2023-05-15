import jwt from "jsonwebtoken";
import auth from "./authMiddleware.js";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const token = "token-test";
  const res = {};
  const next = jest.fn();

  describe("When it receives an authorization header with a valid token and a next function", () => {
    test("Then it should call the received next function", () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      jwt.verify = jest.fn();

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an authorization header with an invalid token and a next function", () => {
    test("Then it should call the received next function with a 401 'Invalid token' error", () => {
      const expectedError = new CustomError(401, "Invalid token");
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };
      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
