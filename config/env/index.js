if (process.env.NODE_ENV === "production") {
  module.exports = require("./production.js");
} else {
  module.exports = require("./development.js");
}




// export let env;

// if (process.env.NODE_ENV === "production") {
//   env = ("./production");
// } else {
//   env = ("./development");
// }

// export default env;