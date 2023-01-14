const Discord = require('discord.js');
const { discordLink } = require('../../../config');

    module.exports = {
        name: 'help',
        description: '[Others] Help menu.',
        type: Discord.ApplicationCommandType.ChatInput,  

        run: async (client, interaction) => {
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                .setPlaceholder("Selecione a categoria...")
                .setCustomId("commands_embed")
                .addOptions([
                    {
                        label: 'Menu Inicial',
                        description: 'Menu principal da embed',
                        emoji: '💻',
                        value: 'c_inicial',
                    },
                    {
                        label: 'Slash Commands',
                        description: 'Categoria de slash commands: (/)',
                        emoji: '🔩',
                        value: 'c_slash',
                    },
                    {
                        label: 'Regras Servidor',
                        description: 'Regras do servidor e discord',
                        emoji: '📜',
                        value: 'c_rules',
                    },
                    {
                        label: 'Suas informações',
                        description: 'Informações sobre o seu perfil',
                        emoji: '👤',
                        value: 'c_you',
                    },
                    {
                        label: 'Informações Bot',
                        description: 'Informações sobre o bot',
                        emoji: '🤖',
                        value: 'c_info',
                    },
                    {
                        label: 'Administradores',
                        description: 'Mostra todos os membros que possuí permissão de Administrador.',
                        emoji: '👑',
                        value: 'c_adm',
                    },
                    {
                        label: 'Fechar Menu',
                        description: `Tirou suas dúvidas? Finalize o menu para evitar poluição.`,
                        emoji: '⛔',
                        value: 'c_end',
                    },
                ])
            )

            await interaction.reply({
                components: [row],
                case: 'c_inicial',
                ephemeral: true,
                embeds: [
                    new Discord.EmbedBuilder()
                    .setColor(`#2F3136`)
                    .setAuthor({ name: `Help menu `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                    .setDescription(`\`COMO UTILIZAR\` \n\n> Caso tenha errado a categoria basta abrir o menu de seleção novamente e ir na categoria desejada.  \n\n> Terminou de visualizar o que queria? Para fechar o menu basta abrir as categoria novamente e selecionar a opção: \`FECHAR MENU\`. \n\n**Selecione a categoria de comandos abaixo.**`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))]
                })  
            }
        }   