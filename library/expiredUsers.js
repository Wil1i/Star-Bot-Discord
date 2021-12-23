const dataBase = require("quick.db");

module.exports = {
  check() {
    var expiredUsersList = [];
    const users = dataBase.get("users");
    if (!users) return false;
    for (let user of Object.keys(users)) {
      var categorys = {
        grate: false,
        adult: false,
        game: false,
      };

      const categorysDef = ["grate", "adult", "game", "mafia"];
      const nowDate = new Date();

      for (const category of categorysDef) {
        const expire =
          dataBase.get(`users.${user}.${category}.expire`) || false;

        if (expire) {
          const expireDate = new Date(expire);
          const remainingTime = expireDate - nowDate;
          if (remainingTime < 1) categorys[category] = true;
        }
      }

      expiredUsersList.push({
        user: user,
        grate: categorys["grate"],
        adult: categorys["adult"],
        game: categorys["game"],
      });
    }
    if (expiredUsersList.length !== 0) return expiredUsersList;
    if (expiredUsersList.length == 0) return false;
  },
};
