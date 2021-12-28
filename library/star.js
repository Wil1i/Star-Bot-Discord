const fs = require("fs");
const { Collection } = require("discord.js");
const functions = new Collection();

const functionsDir = fs
  .readdirSync("./library")
  .filter((file) => file.endsWith(".js") && file !== "star.js");

for (const func of functionsDir) {
  const requiredFunction = require(`./${func}`);
  functions.set(func.replace(".js", ""), requiredFunction);
}

let db = {
  config() {
    functions.get("config").set();
  },
};

// Log
let log = {
  noRolesLog(client, executor, user, roleID, compelete) {
    if (!client || !executor || !user || !roleID)
      throw new Error("Enter a correct value for noRolesLog");

    functions
      .get("log")
      .noRolesLog({ client, executor, user, roleID, compelete });
  },

  noRoleAdd([client, executor, user, roleID, reason]) {
    if (!client || !executor || !user || !roleID || !reason)
      throw new Error("Enter correct value for noRoleAdd");
    functions.get("log").noRoleAdd(client, executor, user, roleID, reason);
  },

  hideExpired({ client, user, roleID, categoryName }) {
    if (!user) throw new Error("user !");
    if (!roleID) throw new Error("role !");
    if (!categoryName) throw new Error("category name !");
    if (!client || !user || !roleID || !categoryName)
      console.log("enter a correct value !");
    // throw new Error(`Enter a correct value for hideExpired`);
    functions.get("log").hideExpired({ client, user, roleID, categoryName });
  },

  voice(client, user, channel, state) {
    if (!client || !user || !channel || !state)
      throw new Error(`Enter a correct value for voice`);
    functions.get("log").voice(client, user, channel, state);
  },
};

// Permission
let permissions = {
  check(message, permissions) {
    if (!message || !permissions)
      throw new Error("Enter message and permission for checking permissions");
    return functions.get("permission").check(message, permissions);
  },

  roles(message, roles, rawPosition) {
    if (!message || !roles)
      throw new Error(
        "Enter message and roles and rawPosition for checking roles"
      );
    if (!rawPosition) rawPosition = false;
    return functions.get("permission").roles(message, roles, rawPosition);
  },
};

let noRoles = {
  expiredUsers() {
    return functions.get("expiredUsers").check();
  },
};

module.exports.db = db;
module.exports.log = log;
module.exports.permissions = permissions;
module.exports.noRoles = noRoles;
