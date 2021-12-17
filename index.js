// Import librarys
console.clear();
console.log("[LIB] Importing librarys.");

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const library = require("./library/star");
const db = require("quick.db");

// Create main client
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});

// Find commands & events directory and filter files with .js
console.log("[REGISTERING] Registering events and commands.");
const commandsDirectory = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const eventsDirectory = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// Create collection for commands and events in client
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// Register commands and events
for (const command of commandsDirectory) {
  const rCommand = require(`./commands/${command}`);
  if (rCommand.execute && rCommand.name) {
    client.commands.set(rCommand.name, rCommand);
    console.log(
      `[REGISTERING] Command ${rCommand.name} successfully registered`
    );
  } else {
    console.log(`[REGISTRING] Can't register ${command} command`);
  }
}

for (const eventFile of eventsDirectory) {
  const rEvent = require(`./events/${eventFile}`);
  if (rEvent.execute && rEvent.name) {
    client.events.set(rEvent.name, rEvent);
    client.on(rEvent.name, (arg1, arg2, arg3) => {
      rEvent.execute(client, arg1, arg2, arg3);
    });

    console.log(`[REGISTERING] event ${rEvent.name} successfully registered`);
  } else {
    console.log(`[REGISTRING] Can't register ${eventFile} event`);
  }
}

let cmd = {
  check(commandName) {
    if (client.commands.has(commandName)) return true;
    if (!client.commands.has(commandName)) return false;
  },
  get(commandName) {
    return client.commands.get(commandName);
  },
};

module.exports.cmd = cmd;

client.login(config.bot.token);
