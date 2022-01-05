const db = require("quick.db");
const index = require("../index");
const library = require("../library/star");
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  description: "Handle All Messages",
  execute(client, message) {
    if (message.author.bot || message.channel.type == "DM") return;

    // For bug report
    if (
      message.channel.id == "921858472679723068" &&
      message.content.toLowerCase().startsWith("!bug")
    ) {
      message.delete();
      const bugChannel = client.channels.cache.get("921858474336473148");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter("Atlantis")
        .setDescription(message.content.replace(`!bug`, ""))
        .setAuthor("New Bug Report");
      bugChannel
        .send({
          content: `||<@&921858423195308113> <@&922552262562295808>|| ${message.author}**'s bug report**`,
          embeds: [embed],
        })
        .then(async (msg) => {
          await msg.react(`<a:x_x:923960662756053032>`);
          await msg.react(`<a:x_y:923960664349896725>`);
        });
    }

    // Channel Handler
    //   Instagram
    if (message.channel.id == "924690456678383686" && !messageArry[1]) {
      message.delete();

      const instagramEmbed = new MessageEmbed()
        .setColor(config.colors.main)
        .setFooter(config.embeds.footer)
        .setDescription(
          `**${message.author.username}**'s Instagram: [${message.content}](https://www.instagram.com/${message.content})`
        );

      message.channel.send({ embeds: [instagramEmbed] });
    }

    // Command Handler
    const messageArry = message.content.split(" ");
    const prefix = db.get("bot.prefix").toString();
    const cmd = messageArry[0].replace(prefix, "");

    if (index.cmd.check(cmd)) {
      const grabCommand = index.cmd.get(cmd);

      if (!grabCommand.permissions && !grabCommand.roles)
        return grabCommand.execute(client, message);

      let isCommandAvailableOnPermission = false;
      let isCommandAvailableOnRole = false;

      if (grabCommand.permissions)
        isCommandAvailableOnPermission = library.permissions.check(
          message,
          grabCommand.permissions
        );

      if (grabCommand.roles)
        isCommandAvailableOnRole = library.permissions.roles(
          message,
          grabCommand.roles,
          grabCommand.rawPosition || false
        );

      if (isCommandAvailableOnPermission || isCommandAvailableOnRole)
        return grabCommand.execute(client, message);
    }
  },
};
