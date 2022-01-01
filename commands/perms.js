const { Permissions } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "perms",
  permissions: ["ADMINISTRATOR"],
  execute(client, message) {
    const newRegister =
      message.channel.guild.roles.cache.get("922104326896381992");
    const r2 = message.channel.guild.roles.cache.get("921858432057880647");
    const r3 = message.channel.guild.roles.cache.get("921858432057880647");

    let categorys = [
      "921858417340076094",
      "921858422956245082",
      "921858424222912512",
      "921858426106150932",
      "921858427574165544",
      "921858429260271656",
      "921858432133369866",
      "921858430623420466",
      "921858433509097492",
      "921858435073576960",
      "922871416838320199",
      "922912826182488114",
      "924323681180725288",
      "921858440433926194",
      "921858438919766077",
    ];

    let count = 0;
    message.guild.channels.cache.forEach((channel) => {
      channel.permissionOverwrites.create(newRegister, {
        VIEW_CHANNEL: false,
      });

      channel.permissionOverwrites.create(r2, {
        MANAGE_CHANNEL: true,
        SEND_MESSAGES: true,
        MENTION_EVERYONE: true,
        READ_MESSAGE_HISTORY: true,
        CONNECT: true,
        SPEAK: true,
        MUTE_MEMBERS: true,
        DEAFEN_MEMBERS: true,
        MOVE_MEMBERS: true,
      });
      count += 1;
    });
    message.channel.send(`Done for register role and role 1 !\n\n**${count}**`);

    count = 0;
    categorys.forEach((category) => {
      const find = message.guild.channels.cache.get(category);
      find.permissionOverwrites.create(r3, {});
      count += 1;
    });
  },
};
