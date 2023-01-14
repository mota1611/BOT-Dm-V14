const Discord = require('discord.js')

module.exports = {
    name: "painel",
    description: "[CONFIG] Enviar painel de verificação",
    type: Discord.ApplicationCommandType.ChatInput,
    Permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            name: "verificação",
            description: "[CONFIG] Enviar painel de verificação",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                name: "channel",
                description: "[CONFIG] canal para enviar o painel de verificação",
                type: Discord.ApplicationCommandOptionType.Channel,
                require: true
                }
            ]
        }
    ],

    run: async(client, interaction) => {

    let channel = interaction.options.getChannel(`channel`)
    interaction.reply({
        ephemeral: true,
        embeds: [
            new Discord.EmbedBuilder()
            .setDescription(`${interaction.user}, Painel de verificação enviado com sucesso para ${channel}!`)
            .setColor("#2F3136")
        ]
        })
    }
}
