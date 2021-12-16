const configFunc = require("./config");
const logFunc = require("./log");
const permissionFunc = require("./permission");

let db = {
  config(client) {
    if (!client) throw new Error("Enter client for config\nClient not exist");
    configFunc.execute(client);
  },
};

// Log
let log = {
  noRolesLog(client, executor, user, roleID) {
    if (!client || !executor || !user || !roleID)
      throw new Error(
        "Enter correct data for noRolesLog\nRequired : client , executor , username , roleID"
      );
    logFunc.noRolesLog({ client, executor, user, roleID });
  },
};

// Permission
let permissions = {
  check(message, permissions) {
    if (!message || !permissions)
      throw new Error("Enter message and permission for checking permissions");
    return permissionFunc.check(message, permissions);
  },
};

module.exports.db = db;
module.exports.log = log;
module.exports.permissions = permissions;
