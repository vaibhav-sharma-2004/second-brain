import { Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface requiredBodyType {
  username?: string;
  password: string;
  email?: string;
}
