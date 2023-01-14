module.exports = {

/* CONFIGURAÇÃO PADRÃO */
    botClientID: "1016350055789232129",
    botPrefix: "!",
    ownerID: "217417219674603520",
    discordID: "1055254090281648138",
    discordLink: "https://discord.gg/9JgrnMZfww",
    webhookError: "https://discord.com/api/webhooks/1062876184364466268/YaTUEWCIxzxmUXcnEDp8SIEybYr8llgBML7GdNvEzw9PD6Hjy8iPHg-iuw3QykySib-n",
    
/* SISTEMA DE SORTEIO */
    giveawayManager: {
        privateMessageInformation: true,
        everyoneMention: false,
        reaction: '🎉'
    },
    messages: {
        giveaway: '🎉 **Sorteio**',
        giveawayEnded: '🎉 **Sorteio Finalizado**',
        title: 'Prêmio: {this.prize}',
        drawing: 'O sorteio termina em: {timestamp}',
        dropMessage: 'Seja o primeiro e reaja a 🎉!',
        inviteToParticipate: 'Reaja com 🎉 para participar do sorteio!',
        winMessage: 'Parabéns, {winners}! Você ganhou: **{this.prize}**!',
        embedFooter: '{this.winnerCount} Vencedor(es)',
        noWinner: 'Sorteio cancelado, sem participações válidas.',
        hostedBy: 'Iniciado por: {this.hostedBy}',
        winners: 'Vencedores(as):',
        endedAt: 'Terminou em',
        paused: '⚠️ **O sorteio está pausado!**',
        infiniteDurationText: '`NUNCA`',
        congrat: 'Novo(s) vencedor(es): {winners}! Parabéns, seu prêmio é **{this.prize}**!',
        error: 'Reroll cancelado, sem participações válidas.'
    }
}

