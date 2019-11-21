import { body, validationResult } from "express-validator";
import { Validator } from "./validator";

export class RenewPasswordValidator extends Validator{
    
    constructor(){
        super();
        this.rules = [
            body('token').exists().withMessage('token is required'),
            body('newPassword').exists().withMessage('newPassword is required')
        ]
    }

    
   
}