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
      const grateExpire = dataBase.get(`users.${user}.grate.expire`);
      const adultExpire = dataBase.get(`users.${user}.adult.expire`);
      const gameExpire = dataBase.get(`users.${user}.game.expire`);

      const nowDate = new Date();

      if (grateExpire) {
        const grateExpireDate = Date.parse(grateExpire);
        const grateRemainingTime = grateExpireDate - nowDate;
        if (grateRemainingTime < 1) categorys["grate"] = true;
      }

      if (adultExpire) {
        const adultExpireDate = Date.parse(adultExpire);
        const adultRemainingTime = adultExpireDate - nowDate;
        if (adultRemainingTime < 1) categorys["adult"] = true;
      }

      if (gameExpire) {
        const gameExpireDate = Date.parse(gameExpire);
        const gameRemainingTime = gameExpireDate - nowDate;
        if (gameRemainingTime < 1) categorys["game"] = true;
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
