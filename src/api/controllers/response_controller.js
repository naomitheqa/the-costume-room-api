import { Response } from "../data/classes/response";

export class ResponseController {
  BadRequest(message, data = {}) {
    const err = new Response(400, message, data);
    return err;
  }

  LoginSuccess(message, data) {
    const success = new Response(200, message, data);
    console.log(data);
    return success;
  }

  NotFound(message, data = {}) {
    const err = new Response(404, message, data);
    return err;
  }

  SuccessfulNoContent() {
    const success = new Response(204);
    return success;
  }

  Unauthorized(message, data) {
    const err = new Response(401, message, (data = "N/A"));
    return err;
  }

  UserCreated(message, data) {
    const success = new Response(201, message, data);
    return success;
  }

  CausingDuplicate(message, data) {
    const err = new Response(409, message, data);
    return err;
  }

  CouldNotCompleteRequest(message, data) {
    const err = new Response(500, message, data);
    return err;
  }

  SuccessfulDataFetch(message, data) {
    const success = new Response(200, message, data);
    return success;
  }
}
