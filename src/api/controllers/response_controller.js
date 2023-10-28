import { Response } from "../data/classes/response";

export class ResponseController{
    BadRequest(message,data='N/A'){
        const err = new Response (400, message, data);
        return err;
    };

    LoginSuccess(message, data){
        const success = new Response (200, message, data);
        return success;
    };

    NotFound(message, data='N/A'){
        const err = new Response (404, message, data);
        return err;
    };
}