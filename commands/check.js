const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "check",
  execute(client, message) {
    const expiredUsers = library.noRoles.expiredUsers();
  },
};
