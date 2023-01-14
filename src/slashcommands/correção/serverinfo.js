const Discord = require('discord.js');

module.exports = {
    name: "server",
    description: "[Utils] Mostra informações do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'info',
            description: '[Utils] Mostra informações do servidor.',
            type: Discord.ApplicationCommandOptionType.Subcommand
        }
    ],

    run: async (client, interaction, args) => {

        let server_icon = interaction.guild.iconURL({ dinamyc: true })
        if (server_icon) {
        interaction.reply({ 
            embeds: [
                new Discord.EmbedBuilder()
                .setColor(`#2F3136`)
                .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                .addFields(
                    {
                        name: `> \\📌 Geral:`,
                        value: `Owner: ${interaction.guild.members.cache.get(interaction.guild.ownerId)}\nMembros: \`${interaction.guild.memberCount + 1}\`\nImpulsos: \`${interaction.guild.premiumSubscriptionCount}\``,
                        inline: true
                    },
                    {
                        name: `> \\💬 Canais:`,
                        value: `Geral: \`${interaction.guild.channels.cache.size}\`\nChats: \`${interaction.guild.channels.cache.filter(a => a.type === "GUILD_TEXT").size}\`\nCalls: \`${interaction.guild.channels.cache.filter(a => a.type === "GUILD_VOICE").size}\``,
                        inline: true
                    },
                    {
                        name: `> \\💼 Cargos:`,
                        value: `\`${interaction.guild.roles.cache.size}\``,
                        inline: true
                    },
                    {
                        name: `\\😎 Emojis:`,
                        value: `\`${interaction.guild.emojis.cache.size}\``,
                        inline: true
                    },
                    {   
                        name: `\\💻 Guild ID:`,
                        value: `\`${interaction.guild.id}\``, 
                        inline: false
                   },
                    {
                        name: `\\📅 Data de criação:`,
                        value: `\`${interaction.guild.createdAt.toLocaleDateString("pt-br")}\``,
                        inline: false
                    })
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(5)
                                .setLabel(`Icone de ${interaction.guild.name}`)
                                .setURL(server_icon),
                        )
                ],
            })
        } else {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setColor(`#2F3136`)
                    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                    .addFields(
                        {
                            name: `> \\📌 Geral:`,
                            value: `Owner: ${interaction.guild.members.cache.get(interaction.guild.ownerId)}\nMembros: \`${interaction.guild.memberCount + 1}\`\nImpulsos: \`${interaction.guild.premiumSubscriptionCount}\``,
                            inline: true
                        },
                        {
                            name: `> \\💬 Canais:`,
                            value: `Geral: \`${interaction.guild.channels.cache.size}\`\nChats: \`${interaction.guild.channels.cache.filter(a => a.type === "GUILD_TEXT").size}\`\nCalls: \`${interaction.guild.channels.cache.filter(a => a.type === "GUILD_VOICE").size}\``,
                            inline: true
                        },
                        {
                            name: `> \\💼 Cargos:`,
                            value: `\`${interaction.guild.roles.cache.size}\``,
                            inline: true
                        },
                        {
                            name: `\\😎 Emojis:`,
                            value: `\`${interaction.guild.emojis.cache.size}\``,
                            inline: true
                        },
                        {   
                            name: `\\💻 Guild ID:`,
                            value: `\`${interaction.guild.id}\``, 
                            inline: false
                       },
                        {
                            name: `\\📅 Data de criação:`,
                            value: `\`${interaction.guild.createdAt.toLocaleDateString("pt-br")}\``,
                            inline: false
                        })
                    ],
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setStyle(5)
                                    .setLabel(`${interaction.guild.name} Não possui um icone.`)
                                    .setURL('https://discord.com/app')
                                    .setDisabled(true)
                        )
                    ],
            })
        }
    }
 }
