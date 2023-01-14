const fs = require("node:fs");
const colors = require('colors');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Buttons', 'Stats').setBorder('|', '=', "0", "0")

//Carregar eventos
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./src/events");
    for (const folder of eventFolders) {
        const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            
            if (event.name) {
                // console.log(colors.green("=======[ EVENTS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.cyan(" Sistema carregado com sucesso."))
            } else {
                console.log(colors.red("=======[ EVENTS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.red(" Falha ao carregar evento"))
                continue;
            }
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

//Carregar comandos de prefixo
const loadCommands = async function (client) {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            
            if (command.name) {
                client.commands.set(command.name, command);
                // console.log(colors.white("=======[ PREFIX COMMANDS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.cyan(" Sistema carregado com sucesso."))
            } else {
                console.log(colors.red("=======[ PREFIX COMMANDS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.red(" Falha ao carregar o comando."))
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
            command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
        }
    }
}

//Carregar slashcommands
const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./src/slashcommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./src/slashcommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../slashcommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                // console.log(colors.white("=======[ SLASH COMMANDS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.cyan(" Sistema carregado com sucesso."));
            } else {
                console.log(colors.red("=======[ SLASH COMMANDS ]=======") + colors.green("-> ") + colors.gray(`${file}`) + colors.red(" Falha ao carregar o comando."));
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // SlashCommands em servidor específico
        // await client.guilds.cache
        //    .get("ID DO SEU SERVIDOR")
        //    .commands.set(slash);

        // SlashCommands global
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands,
}