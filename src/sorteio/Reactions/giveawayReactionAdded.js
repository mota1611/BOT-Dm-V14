const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'giveawayReactionAdded',
    execute(giveaway, member, reaction) {
        return member.send({
            embeds: [
                new EmbedBuilder()
                .setColor('#2F3136')
                .setTitle(`👏 Boa sorte!`)
                .setDescription(`Ótimo, você entrou no [Sorteio](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})!\nGiveaway prize: \`${giveaway.prize}\`\nBoa Sorte!`)
            ]
        }).catch(() => {});
    }
}