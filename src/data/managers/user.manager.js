import {Users}  from "../models/user.model.js";
import  {Manager}  from "./manager.js";

const userManager = new Manager(Users)
export const{create,read,readById,readByEmail,update,destroy} = userManager