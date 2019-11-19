import { body } from "express-validator";
import { Validator } from "./validator";

export class LoginValidator extends Validator{
    
    constructor(){
        super();
        this.rules = [
            body('login').exists().withMessage('login is required'),
            body('login').isEmail().withMessage('login invalid format, must be an email'),
            body('password').exists().withMessage('password is required')
        ]
    }

    
   
}