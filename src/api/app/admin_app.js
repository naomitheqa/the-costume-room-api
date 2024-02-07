import { UserController } from "../controllers/users_controller.js";
import { ResponseController } from "../controllers/response_controller.js";
import { AdminController } from "../controllers/admin_controller.js";

const userController = new UserController();
const responseController = new ResponseController();
const adminController = new AdminController();

export const addAdmin = async function (req, res) {
  const { firstName, lastName, email } = req.body;
  if (!(firstName && lastName && email)) {
    res
      .status(400)
      .json(responseController.BadRequest("Some data has not been provided."));
    return;
  }

  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans.isfound && ans.userType === "ADMIN") {
      const user = await adminController.createAdmin(
        firstName,
        lastName,
        email
      );
      if (user === 0) {
        res
          .status(400)
          .json(
            responseController.BadRequest(
              "Data provided for new admin is invalid.",
              { firstName: firstName, lastName: lastName, email: email }
            )
          );
      } else if (user === 1) {
        res
          .status(409)
          .json(
            responseController.CausingDuplicate(
              "User with listed email already exists.",
              { email: email }
            )
          );
      } else if (user === 2) {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not create user due to server side error. Please contact your administrator.",
              {}
            )
          );
      } else {
        res.status(201).json(
          responseController.UserCreated(
            "Admin with listed details has been created.",
            {
              id: user.hashid,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
            }
          )
        );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
    return;
  }
};

export const addUser = async function (req, res) {
  const { firstName, lastName, email, expiryDate } = req.body;
  if (!(firstName && lastName && email && expiryDate)) {
    res
      .status(400)
      .json(responseController.BadRequest("Some data has not been provided."));
    return;
  }
  try {
    const ans = await userController.validateAccessToken(req.headers);
    if (ans.isfound && ans.userType === "ADMIN") {
      const user = await adminController.createUser(
        firstName,
        lastName,
        email,
        expiryDate
      );
      if (user === 0) {
        res.status(400).json(
          responseController.BadRequest(
            "Data provided for new user is invalid.",
            {
              firstName: firstName,
              lastName: lastName,
              email: email,
              expiryDate: expiryDate,
            }
          )
        );
      } else if (user === 1) {
        res
          .status(409)
          .json(
            responseController.CausingDuplicate(
              "User with listed email already exists.",
              { email: email }
            )
          );
      } else {
        res.status(201).json(
          responseController.UserCreated(
            "User with listed details has been created.",
            {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              expiryDate: user.expiryDate,
            }
          )
        );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
    return;
  }
};

export const getAllAdmins = async function (req, res) {
  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans.isfound && ans.userType === "ADMIN") {
      const admins = await adminController.listAdmins();

      if (admins === 1) {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not complete request to get all admins.",
              { admins: {} }
            )
          );
      } else {
        res
          .status(200)
          .json(
            responseController.SuccessfulDataFetch(
              "List of admins retrieved.",
              { admins: admins, count: admins.length }
            )
          );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
    return;
  }
};

export const getAllUsers = async function (req, res) {
  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans.isfound && ans.userType === "ADMIN") {
      const users = await adminController.listGeneralUsers();

      if (users === 1) {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not complete request to get all general users.",
              { users: {} }
            )
          );
      } else {
        res
          .status(200)
          .json(
            responseController.SuccessfulDataFetch(
              "List of general users retrieved.",
              { users: users, count: users.length }
            )
          );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
    return;
  }
};

export const removeUser = async function (req, res) {
  const { id } = req.body;
  if (!id) {
    res
      .status(400)
      .json(responseController.BadRequest("A user id has not been provided."));
    return;
  }

  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans.isfound && ans.userType === "ADMIN") {
      const confirm = await adminController.deleteUser(id, req.headers);

      if (confirm.response === -1) {
        res.status(400).json(
          responseController.BadRequest("Cannot perform self delete.", {
            userId: id,
            adminId: confirm.adminId,
          })
        );
      } else if (confirm.response === false) {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not complete request to remove listed user.",
              { userId: id }
            )
          );
      } else if (confirm.response === true) {
        res.status(204).json(responseController.SuccessfulNoContent());
      } else {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not complete request to remove listed user.",
              { userId: id, err: confirm.response }
            )
          );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
    return;
  }
};
