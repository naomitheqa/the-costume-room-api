import itemData from "../data/logic/item_data.js";
import { Validator } from "../../helpers/validator.js";

const validator = new Validator();

export class ItemController {
  /**
   * Return list of all items in the db
   * @returns {Promise<*|number|*[]>}
   */
  async listAllItems() {
    const items = [];
    try {
      const temp = await itemData.selectAllItems();

      if (temp === 1) {
        return 1;
      } else {
        temp.forEach((item) => {
          const tempItem = {
            id: item.id,
            name: item.name,
            description: item.description,
            count: item.count,
            status: item.status,
            group: item.group,
          };

          items.push(tempItem);
        });
        return items;
      }
    } catch (err) {
      return err;
    }
  }

  async addItem(name, description, count, group) {
    if (
      validator.name(name) &&
      validator.description(description) &&
      Number.isInteger(count) &&
      group
    ) {
      try {
        const item = await itemData.selectItemByName(name);

        if (item === 1) {
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
