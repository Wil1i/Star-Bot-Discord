const db = require("quick.db");
const config = require("../config.json");
const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "rhide",
  description: "Remove hide from users",
  permissions: ["ADMINISTRATOR"],
  execute(client, message) {
    message.delete();
    //   CMD category mention reason
    const userMention = message.mentions.users.first();
    const messageArry = message.content.split(" ");
    const rHideEmbed = new MessageEmbed()
      .setColor(db.get("colors.main"))
      .setFooter(db.get("embeds.footer"));

    // Return syntax
    if (!messageArry[3] || !userMention) {
      rHideEmbed.setDescription(
        `**SYNTAX** : ${db.get("prefix")}${
          this.name
        } [category] [mention] [reason]`
      );
      message.channel.send({ embeds: [rHideEmbed] });
      return;
    }

    const findUser = message.guild.members.cache.get(userMention.id);
    const roleID = db.get(`roles.${messageArry[1].toLowerCase()}`);

    if (
      db.has(`users.${userMention.id}.${messageArry[1].toLowerCase()}.expire`)
    ) {
      db.delete(
        `users.${userMention.id}.${messageArry[1].toLowerCase()}.expire`
      );
      if (findUser) findUser.roles.remove([roleID]);
      //   Done embed
      rHideEmbed.setDescription(
        `Successfully **${messageArry[1]}** Removed From ${userMention}`
      );
    } else {
      // User is not hide from target category
      if (findUser) {
        if (findUser.roles.cache.has(roleID)) {
          findUser.roles.remove([roleID]);

          rHideEmbed.setDescription(
            `Successfully **${messageArry[1]}** Removed From ${userMention} (Just Role)`
          );
          message.channel.send({ embeds: [rHideEmbed] });

          // Log to losPunishment
          const webhook = new WebhookClient({
            url: config.webhooks.losePunishment,
          });
          const embed = new MessageEmbed()
            .setAuthor(
              `Log | No-Roles removed with command`,
              findUser.user.displayAvatarURL({ dynamic: true })
            )
            .setThumbnail(
              message.author.displayAvatarURL({ dynamic: true, size: 1024 })
            )
            .addField(
              "Username",
              `${message.author.username} | ${message.author}`,
              true
            )
            .addField(
              "Removed for",
              `${findUser.user.username} | ${findUser.user}`,
              true
            )
            .addField("Role", `<@&${roleID}>`, true)
            .setFooter(config.embeds.footer)
            .setTimestamp();

          webhook.send({
            username: client.user.username,
            avatarURL: client.user.displayAvatarURL(),
            embeds: [embed],
          });

          return;
        }
      }
      rHideEmbed.setDescription(
        `User ${userMention} Is Not Muted From **${messageArry[1].toLowerCase()}**`
      );
    }

    message.channel.send({ embeds: [rHideEmbed] });
  },
};
