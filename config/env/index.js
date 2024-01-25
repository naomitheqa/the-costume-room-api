if (process.env.NODE_ENV === "production") {
  module.exports = require("./production");
} else {
  module.exports = require("./development");
}




// export let env;

// if (process.env.NODE_ENV === "production") {
//   env = ("./production");
// } else {
//   env = ("./development");
// }

// export default env;