const db = require("quick.db");
const config = require("../functions/config");

module.exports = {
  name: "ready",
  description: "When bot is ready to use",
  execute(client) {
    console.log(`Bot ${client.user.tag} is now ready to use`);

    config.execute(client);
  },
};
