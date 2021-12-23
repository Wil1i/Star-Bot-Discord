const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rhide",
  description: "Remove hide from users",
  permissions: ["ADMINISTRATOR"],
  execute(client, message) {
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

    if (
      db.has(`users.${userMention.id}.${messageArry[1].toLowerCase()}.expire`)
    ) {
      db.delete(
        `users.${userMention.id}.${messageArry[1].toLowerCase()}.expire`
      );
      const roleID = db.get(`roles.${messageArry[1].toLowerCase()}`);
      const findUser = message.guild.members.cache.get(userMention.id);
      if (findUser) {
        if (findUser.roles.cache.has(roleID))
          findUser.roles.remove(["921047050211196968"]);
      }
      //   Done embed
      rHideEmbed.setDescription(
        `Successfully **${messageArry[1]}** Removed From ${userMention}`
      );
    } else {
      // User is not hide from target category
      rHideEmbed.setDescription(
        `User ${userMention} Is Not Muted From **${messageArry[1].toLowerCase()}**`
      );
    }

    message.channel.send({ embeds: [rHideEmbed] });
  },
};
