const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const handler = require("./src/handler/index");
const Discord = require('discord.js');
const fs = require('fs');

const myIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.MessageContent
]
const myPartials = [
  Partials.Channel,
  Partials.Message,
  Partials.Reaction
]
const client = new Client({
  partials: myPartials,
  intents: myIntents
});

require('dotenv').config();
module.exports = client; 

client.discord = Discord;
client.config = require('./config');
client.commands = new Collection();
client.slash = new Collection();
client.buttons = new Collection();

handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

/* VALIDAR TOKEN DO BOT */
const AuthenticationToken = process.env.TOKEN
if (!AuthenticationToken) {
  console.warn("[CRASH] O token de autenticação para o bot do Discord é necessário!".red)
  return process.exit();
};

/* LOGIN BOT */
client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Houve um erro ao conectar seu bot!".red);
    console.error(`Motivo: `.red + `${err}`.yellow);
    return process.exit();
});

/* SISTEMA DE IDIOMAS */
client.la = {};
let idiomas = fs.readdirSync('./src/idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""));
for(const idioma of idiomas){
    client.la[idioma] = require(`./src/idiomas/${idioma}`)
}
Object.freeze(client.la);

["buttons"].forEach((y) => {
  require(`./src/handler/${y}`)(client);
});

['giveawaysManager', 'giveawaysEventsHandler'].forEach((x) => {
  require(`./src/util/${x}`)(client);
});
