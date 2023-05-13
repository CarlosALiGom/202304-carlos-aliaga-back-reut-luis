import { type Types } from "mongoose";

export interface RobotStructure {
  name: string;
  imgSource: string;
  speed: number;
  endurance: number;
  created: string;
}

export interface RobotApiStructure extends RobotStructure {
  id: string;
}

export interface RobotsDataStructure {
  robots: RobotStructure[];
}

export interface RobotsMockStructure extends RobotStructure {
  _id: Types.ObjectId;
}
