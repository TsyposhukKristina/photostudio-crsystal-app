import {GoogleAuthProvider, User, getAuth, signInWithPopup, signOut} from "firebase/auth";
import { Observer } from "../abstract/Observer";
import { AuthService } from '../servises/AuthService';
import { TServices } from "../abstract/Types";
  
  export class LogicService extends Observer {
    emailAdmin: string | null = "em000324@g.bstu.by"
      user: any;
  }