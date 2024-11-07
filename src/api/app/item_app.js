import { ItemController } from "../controllers/item_controller.js";
import { ResponseController } from "../controllers/response_controller.js";
import { UserController } from "../controllers/users_controller.js";

const itemController = new ItemController();
const responseController = new ResponseController();
const userController = new UserController();

export const getAllItems = async function (req, res) {
  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans === null) {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    } else if (ans.isfound) {
      const items = await itemController.listAllItems();

      if (items === 1) {
        res
          .status(500)
          .json(
            responseController.CouldNotCompleteRequest(
              "Could not complete request to get all items.",
              { users: {} }
            )
          );
      } else {
        res.status(200).json(
          responseController.SuccessfulDataFetch("List of items retrieved.", {
            items: items,
            count: items.length,
          })
        );
      }
    }
  } catch (err) {
    res.status(500).json(new Error(err));
  }
};

export const addItem = async function (req, res) {
  const { name, description, count, group } = req.body;
  if (!(name && description && count && group)) {
    res
      .status(400)
      .json(responseController.BadRequest("Some data has not been provided."));
    return;
  }

  try {
    const ans = await userController.validateAccessToken(req.headers);

    if (ans.isfound && ans.userType === "ADMIN") {
      const item = await itemController.addItem(
        name,
        description,
        count,
        group
      );

      if (item === 0) {
        res.status(400).json(
          responseController.BadRequest(
            "Data provided for new admin is invalid.",
            {
              name: name,
              description: description,
              count: count,
              group: group,
            }
          )
        );
      } else if (item === 1) {
        res
          .status(409)
          .json(
            responseController.CausingDuplicate(
              "Item with listed name already exists.",
              { name: name }
            )
          );
      } else if (item === 2) {
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
            "Item with listed details has been created.",
            {
              id: item.hashid,
              name: item.name,
              description: item.description,
              status: item.status,
              count: item.count,
              group: item.group,
            }
          )
        );
      }
    } else {
      res.status(401).json(responseController.Unauthorized("Unauthorized."));
    }
  } catch (err) {
    res.status(500).json(new Error("Oops...", { cause: err }));
  }
};
