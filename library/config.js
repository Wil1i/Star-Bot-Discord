const config = require("../config.json");
const db = require("quick.db");

module.exports = {
  set() {
    console.log("[DB] Checking DataBase...");

    if (!db.has("bot.token") && config.bot.token) {
      db.set("bot.token", config.bot.token);
      console.log("[DB] Token registered in database");
    }

    if (!db.has("bot.prefix") && config.bot.prefix) {
      db.set("bot.prefix", config.bot.prefix);
      console.log(`[DB] Prefix registered in database`);
    }

    if (!db.has("bot.colors.main") && config.colors.main) {
      db.set("bot.colors.main", config.colors.main);
      console.log(`[DB] Main color registered in database`);
    }

    if (!db.has("bot.colors.log") && config.colors.log) {
      db.set("bot.colors.log", config.colors.log);
      console.log(`[DB] Log color registered in database`);
    }

    if (!db.has("embeds.footer") && config.embeds.footer) {
      db.set("embeds.footer", config.embeds.footer);
      console.log(`[DB] Footer text registered in database`);
    }

    if (!db.has("guilds.main") && config.guilds.main) {
      db.set("guilds.main", config.guilds.main);
      console.log(`[DB] Main guild registered in database`);
    }

    console.log("[DB] DataBase checked");
  },
};
