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

module.exports.insertItem = async function (
  name,
  description,
  count,
  status,
  group
) {
  try {
    const temp = await item.create({
      name: name,
      description: description,
      count: count,
      status: status,
      group: group,
    });

    if (temp) {
      return new Item(
        temp.dataValues.hashid,
        temp.dataValues.name,
        temp.dataValues.description,
        temp.dataValues.count,
        temp.dataValues.status,
        temp.dataValues.group
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
          temp.dataValues.group
        );
      }
    } catch (err) {
      console.log(err);
    }
    return 1;
  }
};
