const { MessageEmbed, WebhookClient } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports = {
  //? Log for no roles (when a user removed NO ROLES from another user without command) NO ROLEs : No-Grate , No-Adult and...
  noRolesLog({ client, executor, username, roleID }) {
    let webhookURL = config.webhooks.noRolesLog || undefined;
    if (db.has("webhooks.noRolesLog"))
      webhookURL = db.get("webhooks.noRolesLog");

    const noRoleEmbed = new MessageEmbed()
      .setColor(db.get("bot.colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor("NO ROLES Log")
      .addField(`Username`, executor, true)
      .addField(`Removed for`, username, true)
      .addField(`Role`, `<@&${roleID}>`, true)
      .setTimestamp();

    const noRoleWebhook = new WebhookClient({ url: webhookURL });

    noRoleWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [noRoleEmbed],
    });
  },
};
