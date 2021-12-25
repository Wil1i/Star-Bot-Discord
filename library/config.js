const config = require("../config.json");
const db = require("quick.db");

module.exports = {
  set() {
    console.log("[DB] Checking DataBase...");

    // Set bot section
    if (!db.has("bot.prefix") && config.bot.prefix) {
      db.set("bot.prefix", config.bot.prefix);
      console.log(`[DB] Prefix registered in database`);
    }

    // Set colors section
    if (!db.has("bot.colors.main") && config.colors.main) {
      db.set("bot.colors.main", config.colors.main);
      console.log(`[DB] Main color registered in database`);
    }

    if (!db.has("bot.colors.log") && config.colors.log) {
      db.set("bot.colors.log", config.colors.log);
      console.log(`[DB] Log color registered in database`);
    }

    // Set embed section
    if (!db.has("embeds.footer") && config.embeds.footer) {
      db.set("embeds.footer", config.embeds.footer);
      console.log(`[DB] Footer text registered in database`);
    }

    // Set roles section
    if (!db.has("roles.noGrate") && config.roles.noGrate) {
      db.set("roles.noGrate", config.roles.noGrate);
      console.log(`[DB] No-Grate role registered in database`);
    }

    if (db.has("roles.noAdult") && config.roles.noAdult) {
      db.set("roles.noAdult", config.roles.noAdult);
      console.log(`[DB] No-Adult role registered in database`);
    }

    if (db.has("roles.noGame") && config.roles.noGame) {
      db.set("roles.noGame", config.roles.noGame);
      console.log(`[DB] No-Game role registered in database`);
    }

    if (db.has("roles.noMafia") && config.roles.noMafia) {
      db.set("roles.noMafia", config.roles.noMafia);
      console.log(`[DB] No-Mafia role registered in database`);
    }

    // Set guilds section
    if (!db.has("guilds.main") && config.guilds.main) {
      db.set("guilds.main", config.guilds.main);
      console.log(`[DB] Main guild registered in database`);
    }

    console.log("[DB] DataBase checked");
  },
};
