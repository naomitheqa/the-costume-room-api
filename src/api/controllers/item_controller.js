import itemData from "../data/logic/item_data.js";
import "dotenv/config";
import { Validator } from "../../helpers/validator.js";
import { fetchItemImage, uploadImage } from "../../helpers/image_mgmt.js";

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
            filePath: item.filePath,
          };

          items.push(tempItem);
        });
        return items;
      }
    } catch (err) {
      return err;
    }
  }

  async addItem(name, description, count, group, file) {
    if (
      validator.name(name) &&
      validator.description(description) &&
      Number.isInteger(count) &&
      group
    ) {
      try {
        const item = await itemData.selectItemByName(name);
        const imgData = await uploadImage(process.env.BUCKET_NAME, "", file);
        console.log(`Uploaded img: ${imgData}`);

        if (item === 1) {
          return await itemData.insertItem(
            name,
            description,
            count,
            "IN",
            group,
            file.name
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
