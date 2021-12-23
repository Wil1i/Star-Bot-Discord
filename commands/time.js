const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "time",
  description: "Get remaining time for no-role",
  execute(client, message) {
    let mutedCount = 0;
    const allNoCategorys = ["adult", "grate", "game", "mafia"];
    const userMention = message.mentions.users.first();
    const embed = new MessageEmbed()
      .setColor(db.get("colors.main"))
      .setFooter(db.get("embeds.footer"));

    for (const category of allNoCategorys) {
      let isUserMutedFrom;

      if (userMention) {
        isUserMutedFrom = db.has(`users.${userMention.id}.${category}.expire`);
        embed.setAuthor(`${userMention.username}'s No-Roles`);
      }
      if (!userMention) {
        isUserMutedFrom = db.has(
          `users.${message.author.id}.${category}.expire`
        );
        embed.setAuthor(`${message.author.username}'s No-Roles`);
      }

      if (isUserMutedFrom) {
        let categoryMutedExpire;
        if (userMention)
          categoryMutedExpire = db.get(
            `users.${userMention.id}.${category}.expire`
          );

        if (!userMention)
          categoryMutedExpire = db.get(
            `users.${message.author.id}.${category}.expire`
          );

        const nowDate = new Date();
        const expireDate = new Date(categoryMutedExpire.toString());
        const Difference_In_Time = expireDate.getTime() - nowDate.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        embed.addField(category, `${Math.ceil(Difference_In_Days)} Days`, true);
        mutedCount++;
      }
    }
    if (mutedCount == 0 && !userMention)
      embed.setDescription(`Shoma Hich No-Role i Nadarid.`);
    if (mutedCount == 0 && userMention)
      embed.setDescription(`User Morede Nazar Hich No-Role i Nadarad.`);
    message.channel.send({ embeds: [embed] });
  },
};
