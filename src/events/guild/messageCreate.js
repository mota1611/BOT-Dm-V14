const Discord = require('discord.js');
const serverSchema = require(`${process.cwd()}/src/database/schemas/servidor.js`) // premium
const antilinkSchema = require('../../database/schemas/antilink'); // antilink

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
      
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
let data = await serverSchema.findOne({guildID: message.guild.id});
  if(!data) {
  await new serverSchema({guildID: message.guild.id}).save();
  data = await serverSchema.findOne({guildID: message.guild.id});
  }
        //Se quiser que o bot não retorne nada caso o comando não existe
        //if (!command) { return }

        //Se quiser que o bot retorne alguma mensagem
    
      
        if (!command) {
            return message.reply({ content: `Comando não encontrado`, ephemeral: true })
        }
        
        //Se quiser que o bot não retorne nada ao usar um comando apenas para dev
        /*if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) { return }
        }*/

        //se quiser que o bot retorne alguma mensagem
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) {
                return message.reply({ content: `Apenas meu desenvolvedor pode usar esse comando!`, ephemeral: true })
            }
        }
      if(command.premium){
            if(data.premium){
                if(data.premium <= Date.now()) return message.reply({content: "Sua assinatura premium expirou!",  ephemeral: true})
            } else {
                return message.reply({content: `Este é um comando premium!`, ephemeral: true })
            }
  }
        
        await command.run(client, message, args, data.idioma);
    }
}

////////////////////////////////////////////// ANTILINK ///////////////////////////////////////////////////////
module.exports = {
    name: 'messageCreate',

    /**
     * @param {msg} message 
     * @param {client} client 
     */
    async execute(msg, client) {

    if(!msg.guild) return;
    if(msg.author?.bot) return;

    const guild = msg.guild;

    let requireDB = await antilinkSchema.findOne({ _id: guild.id })
    if(!requireDB) return;

    if(requireDB.logs === false) return;

    if(requireDB.logs === true) {

    if(!guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return;
    if(msg.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

    const e = new Discord.EmbedBuilder()
    .setDescription(`Em *${guild.name}* não é permitido divulgação de links!`)
    .setColor('#2F3136')

    const url = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    setTimeout(async() => {

    if(url.test(msg) || msg.content.includes('discord.gg/')) {
        msg.channel.send({ embeds: [e], content: `${msg.author}` }).then(mg => setTimeout(mg.delete.bind(mg), 10000 ))
        msg.delete();

        return;
    } 
    }, 2000); 
        }
    }
}