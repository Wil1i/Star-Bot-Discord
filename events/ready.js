const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "ready",
  description: "When bot is ready to use",
  execute(client) {
    console.log(`Bot ${client.user.tag} is now ready to use`);

    library.db.config(client);
  },
};
