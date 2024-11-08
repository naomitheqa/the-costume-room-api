const { item } = require("../../../db/models");
class Item {
  constructor(id, name, description, count, status, group, filePath) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.count = count;
    this.status = status;
    this.group = group;
    this.filePath = filePath;
  }
}

module.exports.insertItem = async function (
  name,
  description,
  count,
  status,
  group,
  filePath
) {
  try {
    const temp = await item.create({
      name: name,
      description: description,
      count: count,
      status: status,
      group: group,
      filePath: filePath,
    });

    if (temp) {
      return new Item(
        temp.dataValues.hashid,
        temp.dataValues.name,
        temp.dataValues.description,
        temp.dataValues.count,
        temp.dataValues.status,
        temp.dataValues.group,
        temp.dataValues.filePath
      );
    } else {
      return 2;
    }
  } catch (err) {
    console.log(err);
    console.log(
      "Failed to insert item. Please check the data that has been provided."
    );
  }
};

module.exports.selectItemByName = async function (name) {
  if (name) {
    try {
      const temp = await item.findOne({
        where: {
          name: name,
        },
      });

      if (temp) {
        return new Item(
          temp.dataValues.hashid,
          temp.dataValues.name,
          temp.dataValues.description,
          temp.dataValues.count,
          temp.dataValues.status,
          temp.dataValues.group,
          temp.dataValues.filePath
        );
      }
    } catch (err) {
      console.log(err);
    }
    return 1;
  }
};

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
        item.group.toUpperCase(),
        item.filePath
      );

      items.push(itemObj);
    });

    return items;
  } catch (err) {
    return 1;
  }
};
