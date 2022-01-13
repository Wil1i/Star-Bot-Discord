const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "ready",
  description: "When bot is ready to use",
  execute(client) {
    function removeHide(client, categoryName, userData) {
      const guild = client.guilds.cache.get(db.get("guilds.main").toString());
      const findUser = guild.members.cache.get(userData.user);
      if(findUser){

        const roleID = db.get(`roles.${categoryName}`);
        findUser.roles.remove(roleID.toString());
        console.log(`Done for ${userData.user} => ${findUser.user.tag}`)
        const findUserNew = guild.members.cache.get(userData.user);
        if(findUserNew.roles.cache.has(roleID.toString())){
          library.devMsg(client, `Please remove \`${roleID.toString()}\` for user \`${findUser.user.tag}\` with id \`${userData.user}\``)
        }else{
          db.delete(`users.${userData.user}.${categoryName}.expire`);
          library.log.hideExpired({ client, findUser, roleID, categoryName });
        }

      }else{
        console.log(`Can't find user ${userData.user}`)
      }
    }

    function updateExpiredUsers(client) {
      const expiredUsers = library.noRoles.expiredUsers();
      if (expiredUsers) {
        for (const userData of expiredUsers) {
          if (userData.grate) removeHide(client, "grate", userData);
          if (userData.adult) removeHide(client, "adult", userData);
          if (userData.game) removeHide(client, "game", userData);
          if (userData.mafia) removeHide(client, "mafia", userData);
        }
      }
    }

    // library.db.config();
    console.log(`Bot ${client.user.tag} is now ready to use`);

    // updateExpiredUsers(client);
    // setInterval(() => {
    //   console.log("[NO-ROLES] Cheking Expired Users...");
    //   updateExpiredUsers(client);
    // }, 10800000);

    // const expiredUsers = library.noRoles.expiredUsers()
    // console.log(expiredUsers)
    updateExpiredUsers(client)
  },
};
