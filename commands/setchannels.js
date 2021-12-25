const config = require("../config.json");

module.exports = {
  name: "setchannels",
  description: "Edit channels setting",
  permissions: "ADMINISTRATOR",
  execute(client, message) {
    //   setchannels limit customNumber
    const messageArry = message.content.split(" ");

    if (!messageArry[2])
      return message.reply(
        `>>> **SYNTAX** : ${config.bot.prefix}${this.name} limit [custom limit number]`
      );

    const customNumber = parseInt(messageArry[2]);
    const section = messageArry[1].toLowerCase();

    const targetVoiceChannels = message.guild.channels.cache.filter(
      (channel) =>
        (channel.parentId == "921858427574165544" ||
          channel.parentId == "921858429260271656" ||
          channel.parentId == "921858433509097492") &&
        channel.type == "GUILD_VOICE"
    );

    const customChannels = [
      "921858558365159454",
      "921858563624808529",
      "921858715429261343",
      "922914335670542457",
      "923257738685984808",
      "923253288869171200",
      "923257695363010560",
      "923919046288748594",
      "922051658438041620",
    ];

    if (section == "limit") {
      let confirmed = "";
      let customConfirmed = "";

      targetVoiceChannels.forEach((channel) => {
        try {
          channel.setUserLimit(customNumber);
          confirmed += `<#${channel.id}> `;
        } catch (error) {
          console.log(`${this.name} => ${channel.id} => ${error}`);
        }
      });

      for (const channel of customChannels) {
        const findChannel = message.guild.channels.cache.get(channel);
        if (findChannel) {
          try {
            findChannel.setUserLimit(customNumber);
            customConfirmed += `<#${channel}>`;
          } catch (error) {
            console.log(`${this.name} => ${channel.id} => ${error}`);
          }
        }
      }

      message.reply(
        `>>> Voice channels limit successfully set to **${customNumber}**\n\n${confirmed}`
      );
      message.reply(
        `>>> Custom voice channels limit successfully set to **${customNumber}**\n\n${customConfirmed}`
      );
    }
  },
};
