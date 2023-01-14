
const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "bate-ponto",
    description: "[Others] sistema de bate ponto",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let terminar = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("terminar")
                .setLabel("Finalizar Ponto")
                .setStyle("Danger")
                .setEmoji('❗')
            )
        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: "Ponto iniciado" })
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setColor("#2F3136")
            .setTimestamp()
            .setFooter({text: "Ponto aberto"})
            .setFields(
                { name: "> Usuário:", value: `**${interaction.user.tag}** - \`${interaction.user.id}\``, inline: true },
                { name: "> Iníciado:", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                { name: "> Status:", value: '***Ponto aberto***', inline: false },
            )


        const msg = await interaction.channel.send({content: `${interaction.user}`, embeds: [embed], components: [terminar]})
        interaction.reply({content: "Ponto iniciado com sucesso, quando terminar basta finaliza-lo!", ephemeral: true})
        const collector = msg.createMessageComponentCollector()

        collector.on('collect', async(collected) => {

            if(collected.user.id != interaction.user.id) return collected.reply(
                { content: `Somente a pessoa que executou o comando (\`${interaction.user.tag}\`) pode interagir com ele.`, ephemeral: true }
            );

            if( collected.customId === "terminar" ) {
                
                const terminou = new Discord.EmbedBuilder()
                    .setAuthor({ name: "Ponto encerrado" })
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
                    .setColor("#2F3136")
                    .setTimestamp()
                    .setFooter({text: "Ponto finalizado"})
                    .setFields(
                        { name: "> Usuário:", value: `**${interaction.user.tag}** - \`${interaction.user.id}\``, inline: true },
                        { name: "> Iníciado:", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                        { name: "> Status:", value: `***Ponto Finalizado***`, inline: true },
                    )
                msg.edit({ 
                    embeds: [terminou],
                    components: []
                })
            }
        })
    }
}