const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Bot Latency Ping.",
    run: async(client, interaction) => {

        let PingEmbed = new EmbedBuilder()
        .setDescription(`Ping do bot atual é: \`${client.ws.ping}ms\``)
        .setColor(`#2F3136`)

        interaction.reply({ embeds: [PingEmbed], ephemeral: true, allowedMentions: { repliedUser: false } })    
    }
}