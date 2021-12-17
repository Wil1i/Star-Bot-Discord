const db = require("quick.db");

module.exports = {
  name: "guildMemberAdd",
  description: "Handle when new members joined in server",
  execute(client, member) {
    console.log(`--- WHEN A USER JOINED : ID : ${member.user.id}`);

    // Check and update NO-ROLES for user
    const userStats = db.get(`users.${member.user.id}.hides`);
    if (userStats) {
      const isUserHideFromAdult = userStats.adult == true;
      const isUserHideFromGrate = userStats.grate == true;
      const isUserHideFromGame = userStats.game == true;

      const adultRole = db.get("roles.adult");
      const grateRole = db.get("roles.grate");
      const gameRole = db.get("roles.game");

      if (isUserHideFromAdult) member.roles.add(adultRole);
      if (isUserHideFromGrate) member.roles.add(grateRole);
      if (isUserHideFromGame) member.roles.add(gameRole);
    }
  },
};
