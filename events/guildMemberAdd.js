const db = require("quick.db");

module.exports = {
  name: "guildMemberAdd",
  description: "Handle when new members joined in server",
  execute(client, member) {
    //   Check if user is server deafen or server mute in database
    if (db.has(`users.${member.user.id}.voice.mute`)) {
      // user is server mute
    }
    if (db.has(`users.${member.user.id}.voice.deafen`)) {
      // user is server deafen
    }

    // Check if user is hide from any categorys in database
    if (db.has(`users.${member.user.id}.hides`)) {
      for (const category of db.get(`users.${member.user.id}.hides`)) {
      }
    }
  },
};
