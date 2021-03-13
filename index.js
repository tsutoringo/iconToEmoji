const dotenv = require("dotenv");
const Eris = require("eris");
const config = require("./config");
const commands = require("./commands");

dotenv.config();

const bot = new Eris.CommandClient(process.env.DISCORD_BOT_TOKEN, {}, config.ERIS_COMMAND_CONFIG);

bot.registerCommand(commands.emoji.label, commands.emoji.generator, commands.emoji.options);

bot.connect();