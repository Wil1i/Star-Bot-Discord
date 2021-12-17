const db = require("quick.db");

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

module.exports = {
  name: "hide",
  description: "Hide categorys using NO-Roles",
  execute(client, message) {
    //   CMD category mention time reason
    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();
    if (messageArry[4] && userMention) {
      const reason = message.content.replace(
        `${messageArry[0]} ${messageArry[1]} ${messageArry[2]} ${messageArry[3]}`,
        ""
      );
      const hideCategory = messageArry[1].toLowerCase();
      const availableHides = ["grate", "adult", "game"];
      // If hide category is not any item is available in availableHides dont do anything else continue
      if (!availableHides.includes(hideCategory)) return;
      // Add role to user
      //   Time by day
      const now = new Date();
      let expireTime = now;
      //   Hours
      if (messageArry[3].toLowerCase().endsWith("h")) {
        expireTime = now.addHours(
          parseInt(messageArry[3].toLowerCase().replace("h", ""))
        );
        // Days
      } else if (messageArry[3].toLowerCase().endsWith("d")) {
        expireTime = now.addHours(
          parseInt(messageArry[3].toLowerCase().replace("d", "")) * 24
        );
        //   Weeks
      } else if (messageArry[3].toLowerCase().endsWith("w")) {
        expireTime = now.addHours(
          parseInt(messageArry[3].toLowerCase().replace("w", "")) * 7 * 24
        );
      } else {
        //   Return syntax (only can use h = Hours, d = Days, w = Weeks)
        return false;
      }
      // Add role to user
      db.set(`users.${userMention.id}.hides.${hideCategory}`, true);
      db.set(`users.${userMention.id}.${hideCategory}.expire`, expireTime);

      const roleID = db.get(`roles.${hideCategory}`);
      const findUser = message.guild.members.cache.get(userMention.id);

      findUser.roles.add([roleID]);
    }
  },
};
