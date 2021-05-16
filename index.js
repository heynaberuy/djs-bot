"$DISCORD_TOKEN"
//----------[PACKAGES]----------\\
const error = require("./utils/error")
const express = require("express");
const Discord = require("discord.js");
const client = new Discord.Client({
  presence: {
    activity: {
      name: "WOK",
      type: "COMPETING",
    },
    status: "idle",
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const app = express();

//----------[CONSTANTS]----------\\

app.use(express.static("./site/public"));

app.post("/restart/" + process.env.RESTART, (req, res) => {
  res.sendStatus(200);
  process.exit(2);
});

app.listen(4000, () => {
  console.log("Server has Started");
});

//errors
process.on("unhandledRejection", (e) => error.send("UnhandledRejection: "+e.stack ?? e))
process.on("uncaughtException", (e, o) => error.send("UnhandledRejection: "+(e.stack ?? e )+"\n"+o))

//----------[HANDLERS]----------\\

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerfiles = ["command_handler", "event_handler"];
handlerfiles.forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login("ODM4ODY0MjQ5OTU4MzAxNzA2.YJBTNg.zUfGbfpQzRM4ZSe8XC3TU9wP-1w");