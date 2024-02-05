/* eslint-disable class-methods-use-this */
import { Response } from "../data/classes/response.js";

export class ResponseController {
  BadRequest(message, data = {}) {
    return new Response(400, message, data);
  }

  LoginSuccess(message, data) {
    const success = new Response(200, message, data);
    console.log(data);
    return success;
  }

  NotFound(message, data = {}) {
    return new Response(404, message, data);
  }

  SuccessfulNoContent() {
    return new Response(204);
  }

  Unauthorized(message, data) {
    return new Response(401, message, (data = "N/A"));
  }

  UserCreated(message, data) {
    return new Response(201, message, data);
  }

  CausingDuplicate(message, data) {
    return new Response(409, message, data);
  }

  CouldNotCompleteRequest(message, data) {
    return new Response(500, message, data);
  }

  SuccessfulDataFetch(message, data) {
    return new Response(200, message, data);
  }

  ServerSideError(message) {
    return new Response(500, message);
  }
}
