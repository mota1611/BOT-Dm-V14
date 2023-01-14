const {InteractionType} = require("discord.js")
const schema = require(`${process.cwd()}/src/database/schemas/servidor.js`);
const serverSchema = require(`${process.cwd()}/src/database/schemas/servidor.js`)

module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {client} client 
     */
    async execute(interaction, client) {
 
    if (interaction.type !== InteractionType.ApplicationCommand) return;
        const command = client.slash.get(interaction.commandName);
    if (!command) return interaction.reply({ content: `Erro ao processar comando.`, ephemeral: true });
      let data = await serverSchema.findOne({guildID: interaction.guild.id});
    if(!data) {
        await new serverSchema({guildID: interaction.guild.id}).save();
    data = await serverSchema.findOne({guildID: interaction.guild.id});
    }
        
    if (command.ownerOnly) {
        if (interaction.user.id !== client.config.ownerID) {
            return interaction.reply({ content: `Acesso negado.`, ephemeral: true });
            }
        }
      if(command.premium){
            if(data.premium){
                if(data.premium <= Date.now()) return interaction.reply("Sua assinatura expirou!")
            } else {
                return interaction.reply("Este é um comando premium!")
            }
      }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args, data.idioma)
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
};
