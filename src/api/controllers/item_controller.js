import itemData from "../data/logic/item_data.js";
import { Validator } from "../../helpers/validator.js";

const validator = new Validator();

export class ItemController {
  async addItem(name, description, count, group) {
    if (
      validator.name(name) &&
      validator.description(description) &&
      Number.isInteger(count) &&
      group
    ) {
      try {
        const item = await itemData.selectItemByName(name);

        if (name === 1) {
          return await itemData.insertItem(
            name,
            description,
            count,
            "IN",
            group
          );
        } else {
          return 1;
        }
      } catch (err) {
        return err;
      }
    } else {
      return 0;
    }
  }
}
