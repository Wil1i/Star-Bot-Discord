const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "ready",
  description: "When bot is ready to use",
  execute(client) {
    // function removeHide(client, categoryName, userData) {
    //   const guild = client.guilds.cache.get(db.get("guilds.main").toString());
    //   const findUser = guild.members.cache.get(userData.user);
    //   const roleID = db.get(`roles.${categoryName}`);
    //   db.delete(`users.${userData.user}.${categoryName}.expire`);
    //   findUser.roles.remove([roleID]);
    //   library.log.hideExpired({ client, findUser, roleID, categoryName });
    // }

    // function updateExpiredUsers(client) {
    //   const expiredUsers = library.noRoles.expiredUsers();
    //   if (expiredUsers) {
    //     for (const userData of expiredUsers) {
    //       if (userData.grate) removeHide(client, "grate", userData);
    //       if (userData.adult) removeHide(client, "adult", userData);
    //       if (userData.game) removeHide(client, "game", userData);
    //       if (userData.mafia) removeHide(client, "mafia", userData);
    //     }
    //   }
    // }

    // library.db.config();
    console.log(`Bot ${client.user.tag} is now ready to use`);

    // updateExpiredUsers(client);
    // setInterval(() => {
    //   console.log("[NO-ROLES] Cheking Expired Users...");
    //   updateExpiredUsers(client);
    // }, 10800000);
  },
};
