const db = require("quick.db");
const library = require("../library/star");

module.exports = {
  name: "voiceStateUpdate",
  description: "Handle when a user voice state updated",
  execute(client, oldState, newState) {
    // Server Mute Handler
    if (oldState.channel) {
      if (!oldState.serverMute && newState.serverMute) {
        // User server muted
        db.set(`users.${newState.id}.mute`, true);
      } else if (oldState.serverMute && !newState.serverMute) {
        // Server server unmuted
        db.set(`users.${newState.id}.mute`, false);
      }

      // Server Deafen Handler
      if (!oldState.serverDeaf && newState.serverDeaf) {
        // User server deafened
        db.set(`users.${newState.id}.deafen`, true);
      } else if (oldState.serverDeaf && !newState.serverDeaf) {
        // User server undeafened
        db.set(`users.${newState.id}.deafen`, false);
      }
    }

    // !----------------------------------------

    // Check database and update user
    if (!oldState.channel && newState.channel.id) {
      let isUserServerMute = db.get(`users.${newState.id}.mute`) || false;
      let isUserServerDeafen = db.get(`users.${newState.id}.deafen`) || false;

      if (!newState.serverMute && isUserServerMute) {
        // User is not server mute but in database user is server mute
        // set user server mute to true (in voice channel)
        newState.setMute(true);
      } else if (newState.serverMute && isUserServerMute) {
        // User is server mute but in database user is not server mute
        // set user server mute to true (in database)
        db.set(`users.${newState.id}.mute`, true);
      }

      if (!newState.serverDeaf && isUserServerDeafen) {
        newState.setDeaf(true);
      } else if (newState.serverDeafen && !isUserServerDeafen) {
        db.set(`users.${newState.id}.deafen`, true);
      }
    }

    // !-------------------------------------------

    if (!oldState.channel && newState.channel.id) {
      // User joined to a voice channel [get a log]
      library.log.voice(client, newState.id, newState.channel.id, "join");
    }

    if (oldState.channel && !newState.channel) {
      // User leaved from a voice channel [get a log]
      library.log.voice(client, newState.id, oldState.channel.id, "leave");
    }


    // !-----------------------------------
    // For when a user joined to connect to admin
    if(newState.channel){
      console.log(1)
      if(newState.channel.id == "921858542460350484" || newState.channel.id == "921858545794826310"){
        console.log(2)
        newState.channel.join().then(connection => {
          console.log("Succcessfully connected")
          // Play a sound for welcome
        }).catch(e => {
          console.log(e)
        })
      }
    }
  },
};
