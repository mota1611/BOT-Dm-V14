module.exports = {
    name: 'giveawayRerolled',
    execute(giveaway, winners) {
        winners.forEach((winner) => {
            return winner.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor('#2F3136')
                    .setTitle('🎁 Parabéns!')
                    .setDescription(`Parabéns, você ganhou o [Sorteio](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})!\nYour prize is: \`${giveaway.prize}\``)
                ]
            }).catch(() => {});
        });
    }
}