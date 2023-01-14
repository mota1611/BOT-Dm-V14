const schema = require(`${process.cwd()}/src/database/schemas/servidor.js`);
const fs = require('fs');

module.exports = {
    name: "set-language",
    aliases: ["set-lang", "setlanguage", "lang"],
    run: async (client, message, args, idioma) => {
        const data = await schema.findOne({guildID: message.guild.id});
        let idiomas = fs.readdirSync(`./src/idiomas`).filter(archivo => archivo.endsWith(".json")).map(archivo => archivo.replace(/.json/, ""));
        if(!args[0]) return message.reply(eval(client.la[idioma]["comandos"]["ajustes"]["set-language"]["variable1"]));
        if(!idiomas.includes(args[0])) return message.reply(eval(client.la[idioma]["comandos"]["ajustes"]["set-language"]["variable2"]));
        data.idioma = args[0];
        data.save();
        return message.reply(eval(client.la[idioma]["comandos"]["ajustes"]["set-language"]["variable3"]))
    }
          }