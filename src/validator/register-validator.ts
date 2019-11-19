import { body, validationResult } from "express-validator";
import { Validator } from "./validator";

export class RegisterValidator extends Validator{
    
    constructor(){
        super();
        this.rules = [
            body('email').exists().withMessage('email is required'),
            body('email').isEmail().withMessage('email invalid format'),
            body('password').exists().withMessage('password is required'),
            body('firstname').exists().withMessage('firstname is required'),
            body('lastname').exists().withMessage('lastname is required'),
            body('pseudo').exists().withMessage('pseudo is required'),
            body('birthdate').exists().withMessage('birthdate is required'),
            body('birthdate').isISO8601().withMessage('birthdate must be a date ISO8601')
        ]
    }

    
   
}