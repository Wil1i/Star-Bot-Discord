const config = require("../config.json");

module.exports = {
  check(message, permission) {
    if (permission == "dev-only") {
      const developers = config.bot.developers;
      for (const developer of developers) {
        if (message.author.id == developer) return true;
      }

      return false;
    }
  },
};
