const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "dm",
  description: "Send dm to target users",
  execute(client, message) {
    const embed = new MessageEmbed()
      .setColor(db.get("colors.main"))
      .setFooter(db.get("embeds.footer"));

    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();
    const roleMention = message.mentions.roles.first();
    if (!messageArry[2]) {
      embed.setDescription(
        `**SYNTAX** : ${db.get("prefix")}${this.name} [mention/all] [text]`
      );
      return message.channel.send(embed);
    }

    const text = message.content.replace(
      `${messageArry[0]} ${messageArry[1]}`,
      ""
    );

    if (messageArry[1].toLowerCase() == "all") {
      let all = 0;
      let now = 0;
      let messageID = false;

      embed.setDescription(
        `Sending message to **${
          message.guild.members.cache.filter((member) => !member.bot).size
        }** users\nPlease wait...`
      );

      message.channel
        .send({ content: `**Sent Messages** : 0`, embeds: [embed] })
        .then((msg) => {
          messageID = msg.id;

          message.guild.members.cache.forEach((member) => {
            if (!member.user.bot) {
              if (now == 5) {
                setTimeout(() => {
                  now = 0;
                }, 5000);
              }

              now++;
              member
                .send(text)
                .then(() => {
                  all++;
                  console.log(
                    `[${all}] message sent to ${member.user.username}`
                  );
                })
                .catch(() => {
                  all++;
                  console.log(
                    `[${all}] Can't send message to ${member.user.username}`
                  );
                });
            }
          });
          message.channel.messages.fetch(messageID).then((fetched) => {
            if (fetched) {
              fetched.edit({
                content: `**Sent Messages** : ${all}`,
              });
            }
          });
        });
    } else if (userMention) {
      // Work with usermention
      userMention
        .send(text)
        .then(() => {
          embed.setDescription(`Message successfully sent to user`);
        })
        .catch(() => {
          embed.setDescription(`Can't send message to this user!`);
        });
      message.channel.send({ emebds: [embed] });
    } else if (roleMention) {
      // Work with rolemention
      const usersHaveRole = message.guild.members.cache.filter((member) =>
        member.roles.cache.has(roleMention.id)
      );
      usersHaveRole.forEach((user) => {
        user.send(text);
      });
    } else {
      // Return syntax
      embed.setDescription(
        `**SYNTAX** : ${db.get("prefix")}${this.name} [mention/all] [text]`
      );
      message.channel.send({ embeds: [embed] });
    }
  },
};
