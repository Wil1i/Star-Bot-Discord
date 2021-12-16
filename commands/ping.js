const db = require("quick.db");
const library = require("../library/star");
const config = require("../config.json");

module.exports = {
  name: "ping",
  execute(client, message) {
    // db.set("embeds.footer", config.embeds.footer);
    // db.set(
    //   "webhooks.noRolesLog",
    //   "https://discord.com/api/webhooks/921046608647442433/LJD_RS7Y-ZXg5JnZr-b1BB6hQht637JZE5A6t5Xq3U4Mmlp3rNwJT57UV__qXSAmx1rd"
    // );
    // library.log.noRolesLog(client, message, message, "921047050211196968");
    // const commandIsAvailable = library.permissions.check(
    //   message,
    //   "ADMINISTRATOR"
    // );
  },
};
