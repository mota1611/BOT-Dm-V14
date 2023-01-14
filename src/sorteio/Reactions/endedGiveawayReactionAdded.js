const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'endedGiveawayReactionAdded',
    execute(giveaway, member, reaction) {
        reaction.users.remove(member.user);
        return member.send({
            embeds: [
                new EmbedBuilder()
                .setColor('#2F3136')
                .setTitle('🤔 Confuso?')
                .setDescription(`Ops, aparentemente você entrou em um [Sorteio] já encerrado(https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})!\nProbably a mistake...`)
            ]
        }).catch(() => {});
    }
}