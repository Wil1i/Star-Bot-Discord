// Import librarys
console.clear();
console.log("[LIB] Importing librarys.");

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const permission = require("./functions/permission");
const db = require("quick.db");

// Create main client
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
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
    console.log(`[REGISTRING]Can't register ${command} command`);
  }
}

for (const event of eventsDirectory) {
  const rEvent = require(`./events/${event}`);
  if (rEvent.execute && rEvent.name) {
    client.events.set(rEvent.name, rEvent);
    console.log(`[REGISTERING] event ${rEvent.name} successfully registered`);
  } else {
    console.log(`[REGISTRING]Can't register ${event} event`);
  }
}

// Handle events
client.on("ready", () => {
  client.events.get("ready").execute(client);
});

client.on("messageCreate", (message) => {
  const messageArry = message.content.split(" ");
  const prefix = db.get("bot.prefix").toString();
  const cmd = messageArry[0].replace(prefix, "");

  if (client.commands.has(cmd)) {
    const grabCommand = client.commands.get(cmd);
    if (!grabCommand.permission) return grabCommand.execute(client, message);

    const isCommandAvailable = permission.check(
      message,
      grabCommand.permission
    );
    if (isCommandAvailable) return grabCommand.execute(client, message);
  }

  if (client.events.has("messageCreate"))
    client.events.get("messageCreate").execute(client, message);
});

client.login(config.bot.token);
