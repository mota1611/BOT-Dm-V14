const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Bot Latency Ping.",
    run: async(client, message) => {

        let PingEmbed = new EmbedBuilder()
        .setDescription(`Ping do bot atual é: \`${client.ws.ping}ms\``)
        .setColor(`#2F3136`)

        message.reply({ embeds: [PingEmbed] })    
    }
}