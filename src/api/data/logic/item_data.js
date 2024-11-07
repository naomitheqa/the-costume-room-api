const { item } = require("../../../db/models");

class Item {
  constructor(id, name, description, count, status, group) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.count = count;
    this.status = status;
    this.group = group;
  }
}

module.exports.selectAllItems = async function () {
  const items = [];
  try {
    const temp = await item.findAll({
      raw: true,
    });

    temp.forEach((item) => {
      const itemObj = new Item(
        item.id,
        item.name,
        item.description,
        item.count,
        item.status,
        item.group
      );

      items.push(itemObj);
    });

    return items;
  } catch (err) {
    return 1;
  }
};
