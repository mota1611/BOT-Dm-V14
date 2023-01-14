const Discord = require('discord.js')

module.exports = {
    name: "privar", 
    description: "[Moderation] Utilize para privar um canal",
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
                embeds: [
                    new Discord.EmbedBuilder()
                    .setColor(`#2F3136`)
                    .setDescription(`O canal foi privado com sucesso!`)
                ], ephemeral: true
            }).then(msg => { 
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { [Discord.PermissionsBitField.Flags.ViewChannel]: false }).catch(e => {
                console.log(e)
                interaction.editReply({
                    embeds: [
                        new Discord.EmbedBuilder()
                        .setColor(`#2F3136`)
                        .setDescription('Ocorreu um erro ao tentar privar o canal')
                    ], ephemeral: true
                })
            })
        })
    }
    }
}
