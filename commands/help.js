const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const library = require("../library/star");

module.exports = {
  name: "help",
  help: false,
  execute(client, message) {
    const commandsFile = fs
      .readDirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setFooter(config.embeds.footer)
      .setThumbnail(message.guild.iconURL({ size: 1024, dynamic: true }));

    for (const i of commandsFile) {
      const command = require(`./${i}`);
      if (command.help === false && command.description && command.name) {
        if (!command.permissions && !command.roles) {
          embed.addField(
            `${config.bot.prefix}${command.name}`,
            `${command.description}`,
            true
          );
          continue;
        }

        if (command.permissions) {
          const isUserHavePermission = library.permissions.check(
            message,
            command.permissions
          );
          if (!isUserHavePermission) continue;
          embed.addField(
            `${config.bot.prefix}${command.name}`,
            command.description,
            true
          );
        }

        if (command.roles) {
          if (!command.rawPosition) command.rawPosition = false;
          const isUserHaveRole = library.roles(
            message,
            command.roles,
            command.rawPosition
          );
          if (!isUserHaveRole) continue;
          embed.addField(
            `${config.bot.prefix}${command.name}`,
            command.description,
            true
          );
        }
      }
    }
    message.channel.send({ embeds: [embed] });
  },
};
