const db = require("quick.db");
const config = require("../config.json");

module.exports = {
  name: "guildMemberAdd",
  description: "Handle when new members joined in server",
  execute(client, member) {
    // Check and update NO-ROLES for user

    if (member.user.id == "852897758515429376") member.ban();

    if (!db.get(`users.${member.user.id}.hides`)) return;

    const isUserHideFromAdult =
      db.get(`users.${member.user.id}.hides.adult`) == true || false;
    const isUserHideFromGrate =
      db.get(`users.${member.user.id}.hides.grate`) == true || false;
    const isUserHideFromGame =
      db.get(`users.${member.user.id}.hides.game`) == true || false;
    const isUserHideFromMafia =
      db.get(`users.${member.user.id}.hides.mafia`) == true || false;

    const adultRole = config.roles.noAdult;
    const grateRole = config.roles.noGrate;
    const gameRole = config.roles.noGame;
    const mafiaRole = config.roles.noMafia;

    if (isUserHideFromAdult) member.roles.add(adultRole);
    if (isUserHideFromGrate) member.roles.add(grateRole);
    if (isUserHideFromGame) member.roles.add(gameRole);
    if (isUserHideFromMafia) member.roles.add(mafiaRole);
  },
};
