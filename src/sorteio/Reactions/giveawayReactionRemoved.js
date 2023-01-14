const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'giveawayReactionRemoved',
    execute(giveaway, member) {
        return member.send({
            embeds: [
                new EmbedBuilder()
                .setColor('#2F3136')
                .setTitle('🤔 Saiu do sorteio?')
                .setDescription(`Percebi que você saiu do [Sorteio](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}).\nGiveaway prize: \`${giveaway.prize}\`.\nIs this a mistake? Join again!`)
            ]
        })
    }
}