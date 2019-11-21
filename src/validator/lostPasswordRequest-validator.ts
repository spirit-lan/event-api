import { body, validationResult } from "express-validator";
import { Validator } from "./validator";

export class LostPasswordRequestValidator extends Validator{
    
    constructor(){
        super();
        this.rules = [
            body('email').exists().withMessage('email is required'),
            body('email').isEmail().withMessage('email invalid format')
        ]
    }

    
   
}