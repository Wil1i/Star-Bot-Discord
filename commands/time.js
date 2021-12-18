const db = require("quick.db");
db.set("embeds.footer", "Test Footer");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "time",
  description: "Get remaining time for no-role",
  execute(client, message) {
    const allNoCategorys = ["adult", "grate", "game"];
    const nowDate = new Date();
    const userMention = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setColor(db.get("colors.main"))
      .setFooter(db.get("embeds.footer"));

    for (const i of allNoCategorys) {
      const isUserMutedFrom = db.has(`users.${userMention.id}.${i}.expire`);
      if (isUserMutedFrom) {
        const categoryMuted = db.get(`users.${userMention.id}.${i}.expire`);
        const grateExpireDate = Date.parse(categoryMuted);
        const grateRemainingTime = grateExpireDate - nowDate;

        console.log(grateRemainingTime);
        embed.addField(i, grateRemainingTime.toString(), true);
      }
    }
    message.channel.send({ embeds: [embed] });
  },
};
