const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "guildMemberUpdate",
  description: "When a user updated in guild",
  execute(client, oldMember, newMember) {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      oldMember.roles.cache.forEach(async (role) => {
        let isAdultRole = false;
        let isGrateRole = false;
        let isGameRole = false;

        if (!newMember.roles.cache.has(role.id)) {
          if (db.has("roles.adult"))
            isAdultRole = db.get("roles.adult").toString() == role.id;
          if (db.has("roles.grate"))
            isGrateRole = db.get("roles.grate").toString() == role.id;
          if (db.has("roles.game"))
            isGameRole = db.get("roles.game").toString() == role.id;

          if (isAdultRole || isGrateRole || isGameRole) {
            let Entry = NaN;
            try {
              const AuditLogFetch = await newMember.guild.fetchAuditLogs({
                limit: 1,
                type: "MEMBER_ROLE_UPDATE",
              });
              Entry = AuditLogFetch.entries.first();
            } catch {}

            const whiteList = [
              "921858433949528064",
              "923340846823268433",
              "921858439641182219",
              client.user.id,
            ];

            if (whiteList.includes(Entry.executor.id)) {
              library.log.noRolesLog(client, Entry, newMember, role.id, true);
              return;
            }

            newMember.roles.add(role.id);
            if (Entry.executor.id == client.user.id) return;
            library.log.noRolesLog(client, Entry, newMember, role.id);
          }
        }
      });
    }
  },
};
