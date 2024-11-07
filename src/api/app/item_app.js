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
