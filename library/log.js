const { MessageEmbed, WebhookClient } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports = {
  cmd(client, message) {
    const cmdLogEmbed = new MessageEmbed()
      .setColor(config.colors.main)
      .setFooter(config.embeds.footer)
      .addField("User", `${message.author} | ${message.author.tag}`, true)
      .addField("Command", `${message.content.split(" ")[0]}`, true);
    const logChannel = client.channels.cache.get(config.channels.cmd);
    if (!logChannel) return false;
    logChannel.send({ embeds: [cmdLogEmbed] });
  },

  //? Log for no roles (when a user removed NO ROLES from another user without command) NO ROLEs : No-Grate , No-Adult and...
  noRolesLog({ client, executor, user, roleID, compelete }) {
    let webhookURL = config.webhooks.losePunishment || undefined;

    const findGuild = client.guilds.cache.get(db.get("guilds.main").toString());
    const findExecutor = findGuild.members.cache.get(executor.executor.id);
    const noRoleEmbed = new MessageEmbed()
      .setColor(db.get("bot.colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor(
        "Log | No-Roles rmeoved without command",
        user.user.displayAvatarURL({ dynamic: true })
      )
      .addField(
        `Username`,
        `${findExecutor.user.username} | <@${findExecutor.user.id}>`,
        true
      )
      .addField(`Removed for`, `${user.user.tag} | <@${user.user.id}>`, true)
      .addField(`Role`, `<@&${roleID}>`, true)
      .setThumbnail(
        findExecutor.user.displayAvatarURL({ size: 1024, dynamic: true })
      )
      .setTimestamp();

    if (compelete) noRoleEmbed.setDescription(`WhiteList : TRUE`);

    const noRoleWebhook = new WebhookClient({ url: webhookURL });

    noRoleWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [noRoleEmbed],
      content: `admin-${findExecutor.user.id}\nuser-${user.user.id}`,
    });
  },

  hideExpired({ client, userID, roleID, categoryName }) {
    let webhookURL = config.webhooks.hideExpired || undefined;
    const user = client.users.cache.get(userID)
    if(!user) return false;
    if (db.has("webhooks.hideExpired"))
      webhookURL = db.get("webhooks.hideExpired");

    const hideExpiredEmbed = new MessageEmbed()
      .setColor(config.colors.log)
      .setFooter(config.embeds.footer)
      .setAuthor("Hide Expired")
      .addField("Username", user.author.id || "**-**", true)
      .addField(
        "Expired",
        `${categoryName || "**-**"} | <@&${roleID || "**-**"}>`,
        true
      )
      .setThumbnail(
        user.author.displayAvatarURL({ dynamic: true, size: 1024 }) || ""
      )
      .setTimestamp();

    const hideExpiredWebhook = new WebhookClient({ url: webhookURL });

    hideExpiredWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [hideExpiredEmbed],
    });
  },

  noRoleAdd(client, executor, user, roleID, reason) {
    let webhookURL = config.webhooks.noRolesLog;

    const noRoleEmbed = new MessageEmbed()
      .setColor(db.get("colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor(
        "Log | No-Role Added",
        user.displayAvatarURL({ dynamic: true })
      )
      .addField(
        `Username`,
        `${executor.author.username} | <@${executor.author.id}>`,
        true
      )
      .addField(`Added for`, `${user.tag} | <@${user.id}>`, true)
      .addField(`Role`, `<@&${roleID}>`, true)
      .addField(`Reason`, reason.toString(), true)
      .setThumbnail(
        executor.author.displayAvatarURL({ size: 1024, dynamic: true })
      )
      .setTimestamp();

    const noRoleWebhook = new WebhookClient({ url: webhookURL });

    noRoleWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [noRoleEmbed],
      content: `admin-${executor.author.id}-\nuser-${user.id}-`,
    });
  },

  voice(client, user, channel, state) {
    let webhookURL = config.webhooks.voice || undefined;
    let isVoiceLogEnable = db.get("log.voice") || false;
    if (!isVoiceLogEnable) return;

    if (db.has("webhooks.voice"))
      webhookURL = db.get("webhooks.voice").toString();

    const voiceEmbed = new MessageEmbed()
      .setColor(db.get("colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor("Log | Voice State Update");

    if (state == "join") {
      voiceEmbed.setDescription(
        `User <@${user}> joined to voice channel <#${channel}>`
      );
    } else if (state == "leave") {
      voiceEmbed.setDescription(
        `User <@${user}> leaved from voice channel <#${channel}>`
      );
    }

    webhookURL.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [voiceEmbed],
    });
  },
};
