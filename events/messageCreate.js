const config = require("../config.json");
const db = require("quick.db");
const {} = require("discord.js");

module.exports = {
  name: "messageCreate",
  description: "Handle All Messages",
  execute(client, message) {
    if (message.author.bot || message.channel.type == "DM") return;
  },
};
