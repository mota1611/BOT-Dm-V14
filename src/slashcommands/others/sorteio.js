const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, ChannelType, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'sorteio',
    description: '[Others] Sistema de sorteio',
    options: [
        {
            name: 'iniciar',
            description: '🎉 Iniciar sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'duração', description: 'Insira a duração do sorteio', type: ApplicationCommandOptionType.String, required: true },
                { name: 'prêmio', description: 'Defina um prêmio para ganhar', type: ApplicationCommandOptionType.String, required: true },
                { name: 'vencedores', description: 'Insira o número de vencedores', type: ApplicationCommandOptionType.Number, required: true },
                { name: 'canal', description: 'Especifique o canal para onde enviar o sorteio', type: ApplicationCommandOptionType.Channel, channel_types: [ChannelType.GuildText], required: false }
            ]
        },
        {
            name: 'pause',
            description: '⏸️ Pausar sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Especifique o ID da mensagem de oferta', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'unpause',
            description: '⏯️ Despausar sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Especifique o ID da mensagem de oferta', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'finalizar',
            description: '⏹️ Finalizar sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Especifique o ID da mensagem de oferta', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'reroll',
            description: '🔃 Seleciona um novo vencedor do sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Especifique o ID da mensagem de oferta', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
        {
            name: 'deletar',
            description: '🚮 Excluir sorteio.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'message-id', description: 'Especifique o ID da mensagem de oferta', type: ApplicationCommandOptionType.String, required: true }
            ]
        },
    ],
    giveawayManagerOnly: true,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
     run: async(client,interaction) => {
        const sub = interaction.options.getSubcommand();

        const errorEmbed = new EmbedBuilder().setColor('#2F3136');
        const successEmbed = new EmbedBuilder().setColor('#2F3136');

        if(sub === 'iniciar') {
            const gchannel = interaction.options.getChannel('canal') || interaction.channel;
            const duration = interaction.options.getString('duração');
            const winnerCount = interaction.options.getNumber('vencedores');
            const prize = interaction.options.getString('prêmio');
            if(isNaN(ms(duration))) {
                errorEmbed.setDescription('Insira o formato correto para o sorteio! `1d, 1h, 1m, 1s`'); 
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
            
            return client.giveawaysManager.start(gchannel, {
                duration: ms(duration),
                winnerCount,
                prize,
                messages: client.config.messages
            }).then(async () => {
                if(client.config.giveawayManager.everyoneMention) {
                    const msg = await gchannel.send({ content: '@everyone' });
                    msg.delete();
                }
                successEmbed.setDescription(`Sorteio iniciado em: ${gchannel}!`)
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                console.log(err);
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        const messageid = interaction.options.getString('message-id');
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageid);
        if (!giveaway) {
            errorEmbed.setDescription(`Sorteio com ID ${messageid} não foi encontrado no banco de dados!`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if(sub === 'pause') {
            if(giveaway.isPaused) {
                errorEmbed.setDescription('Este sorteio já está pausado!')
            }
            await client.giveawaysManager.pause(interaction.options.getString('message-id'), {
                content: client.config.messages.paused,
                infiniteDurationText: client.config.messages.infiniteDurationText
            }).then(() => {
                successEmbed.setDescription('O sorteio foi pausado!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'unpause') {
            await client.giveawaysManager.unpause(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('O sorteio foi interrompido temporariamente!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'finalizar') {
            await client.giveawaysManager.end(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('O sorteio foi interrompido!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'reroll') {
            await client.giveawaysManager.reroll(interaction.options.getString('message-id'), {
                messages: {
                    congrat: client.config.messages.congrat,
                    error: client.config.messages.error
                }
            }).then(() => {
                successEmbed.setDescription('O sorteio tem um novo vencedor!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }

        if(sub === 'deletar') {
            await client.giveawaysManager.delete(interaction.options.getString('message-id')).then(() => {
                successEmbed.setDescription('O sorteio foi deletado!');
                return interaction.reply({ embeds: [successEmbed], ephemeral: true });
            }).catch((err) => {
                errorEmbed.setDescription(`Error \n\`${err}\``);
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            });
        }
    }
}