const config = require("../config.json");
const db = require("quick.db");

module.exports = {
  name: "config",
  description: "Config database",
  execute(client) {
    console.log("[DB] Checking DataBase...");
    if (!db.has("bot.token")) {
      db.set("bot.token", config.bot.token);
      console.log("[DB] Token registered in database");
    }

    if (!db.has("bot.prefix")) {
      db.set("bot.prefix", config.bot.prefix);
      console.log(`[DB] Prefix registered in database`);
    }

    if (!db.has("bot.colors.main")) {
      db.set("bot.colors.main", config.colors.main);
      console.log(`[DB] Main color registered in database`);
    }
    console.log("[DB] DataBase checked");
  },
};
