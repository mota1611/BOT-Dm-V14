const Discord = require('discord.js')
    
module.exports = {
    name: "lock", 
    description: "[Moderation] Utilize para trancar um canal",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({               
                embeds: [
                new Discord.EmbedBuilder()
                .setDescription(`Você não possui permissao para utilizar esse comando!`)
                .setColor(`#2F3136`)
                ],
              ephemeral: true,
             })
        } else {
            
            interaction.reply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setDescription(`${interaction.user} o chat foi trancado com sucesso!`)
                  .setColor(`#2F3136`)
                  ],
              }).then(msg => { 
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                console.log(e)
                interaction.editReply({
                    ephemeral: true,
                    embeds: [
                      new Discord.EmbedBuilder()
                      .setDescription(`${interaction.user} Algo deu errado ao tentar trancar este chat.`)
                      .setColor(`#2F3136`)
                      ],
                  })          
            })
        })

            }
        }        
}