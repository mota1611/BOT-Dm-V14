const Discord = require('discord.js');
const { ownerID, discordLink } = require('../../../config');
const client = require('../../../index');

//////////////////////////////////////////////SELECT-MENU-HELP///////////////////////////////////////////////////////
module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {client} client 
     */
async execute(interaction, client) {
    if (interaction.isStringSelectMenu()) {
        await interaction.deferUpdate().catch(null)
        if (interaction.customId === 'commands_embed'){
            const value = interaction.values[0];    
            switch (value) {
                case 'c_inicial':
                    {
                    await interaction.editReply({
                        ephemeral: true,
                        embeds: [
                        new Discord.EmbedBuilder()
                            .setColor(`#2F3136`)
                            .setAuthor({ name: `Help menu `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                            .setDescription(`\`COMO UTILIZAR\` \n\n> Caso tenha errado a categoria basta abrir o menu de seleção novamente e ir na categoria desejada.  \n\n> Terminou de visualizar o que queria? Para fechar o menu basta abrir as categoria novamente e selecionar a opção: \`FECHAR MENU\`. \n\n**Selecione a categoria de comandos abaixo.**`)
                            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))]
                        })
                    }
                    break;
                    case 'c_slash':
                    {
                    await interaction.editReply({
                        ephemeral: true,
                        embeds: [ 
                        new Discord.EmbedBuilder()
                            .setColor(`#2F3136`)
                            .setAuthor({ name: `Comandos em slash (/)`, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`
                            \nEstou atualizando, em breve quando terminar tudo irei adicionar tudo!

                            \nQualquer dúvida ou problema entre em contato com <@${ownerID}>`)]
                        })
                    }
                    break; 
                    case "c_info":
                    {
                        await interaction.editReply({
                            ephemeral: true,
                            embeds: [ 
                            new Discord.EmbedBuilder()
                            .setColor(`#2F3136`)
                            .setAuthor({ name: `Informações de ` + client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`**Meus comandos se encontra todos em Slash (/) **`)
                            .addFields(
                                { name: '**> 💻 Servidores**', value: `\`${client.guilds.cache.size}\``, inline: true },
                                { name: '** > 👤 Usuários**', value: `\`${client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b)}\``, inline: true },
                                { name: '**> 🔌 Ping**', value: `\`${client.ws.ping}ms\``, inline: true },
                                { name: '**🖥 Memória**', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, inline: false },
                                { name: '**🌐 Online**', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
                                { name: '** Linguagem**', value: `\`JavaScript\``, inline: true },
                                { name: '** Versão**', value: `\`${require('discord.js').version.slice(0, 6)}\``, inline: true},
                                { name: '**🔱 Desenvolvedor**', value: `Bot desenvolvido por <@217417219674603520>`, inline: true }
                                ), 
                            ],
                        }) 
                    }
                    break;  
                    case 'c_adm':
                    {
                        let strFilter = interaction.guild.members.cache.filter(member => member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))
                        let strMap = strFilter.map(m => `> ${m.user} - \`${m.user.id}\``).join("\n")
                        
                        for (let i = 0; i < strMap.length; i += 1995) {
                        let strContent = strMap.substring(i, Math.floor(strMap.length, i + 1995));
                        await interaction.editReply({
                            ephemeral: true,
                            embeds: [ 
                            new Discord.EmbedBuilder()
                            .setAuthor({ name: `Administradores de ` + interaction.guild.name, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Total de administradores: \`${strFilter.size}\``)
                            .addFields({ name: `Lista :`, value: `${strContent}`})
                            .setColor(`#2F3136`)
                            ],
                        })
                    }}
                    break;
                    case 'c_rules':
                        {
                            interaction.editReply({
                                ephemeral: true,
                                embeds: [
                                    new Discord.EmbedBuilder()
                                    .setAuthor({ name: `Regras ` + interaction.guild.name, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                                    .setColor(`#2F3136`)
                                    .setDescription(`
                                    \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b__Boas Vindas ao Servidor!__

                                    > Para evitar punições siga os [Termos do Discord](https://discord.com/terms) e as regras abaixo:
                                    
                                    \`\`1.\`\` Mantenha um **ambiente seguro** no servidor, sem conteúdos que possuem flood, spam, textos indesejados, discriminação (racial ou qualquer outra), compartilhamento de dados pessoais, ameaças, entre outros;
                                    \`\`2.\`\` Você **não poderá realizar autopromoções** (divulgação) de servidores ou redes sociais;
                                    \`\`3.\`\` É importante que você **mantenha o respeito** com os membros do servidor (sem xingamentos, perturbações, entre outros).   
                                    \`\`4.\`\` Não publique qualquer conteúdo pornográfico, malware ou qualquer outro conteúdo que possa ser considerado ofensivo;
                                    \`\`5.\`\` Sejam respeitosos uns com os outros e mantenham as discussões construtivas;
                                    \`\`6.\`\` Se o membro estiver gritando, soprando, escutando músicas altas, ou fazendo qualquer tipo de coisa que atrapalhe a comunicação dentro das salas de bate papo será advertido, podendo ser mutado ou banido.
                                    \`\`7.\`\` Nenhuma discussão sobre política e religião!
                                    \`\`8.\`\` Proibido discussões não construtivas e que gerem ofensas, por mais que amigáveis.
                                    \`\`9.\`\` É legal fornecer informações precisas aos novos membros, mas deixe a moderação para os membros da staff. Respeite quando eles estiverem fazendo seu trabalho. Não ordene os demais membros e não ria nem zombe daqueles que são repreendidos.
                                    \`\`10.\`\` É proibido usar perfis fakes com o intuito de enganar os outros membros. Seja de bots, influencers, ou outras pessoas. Caso seja um imitador, deixe isso explícito no seu nome.
                                    \`\`11.\`\` Proibido usar imagens de perfil que contenham pornografia, entre outros.
                                    
                                    Não é possível colocar e especificar tudo, pois existem infinitas ocasiões, então se mantenha controlado(a) dentro do servidor para evitar punições!`)
                                ]
                            })
                        }
                    break;
                    case 'c_you':
                        {
                        const user = interaction.user;
                        const server = interaction.guild.members.cache.get(user.id);
                        let presence;
                            if (!server.presence.activities.length) presence = "Nenhum";
                            else presence = server.presence.activities.join(", ");

                            interaction.editReply({
                                ephemeral: true,
                                embeds: [
                                    new Discord.EmbedBuilder()
                                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
                                    .setAuthor({ name: `Suas informações em ` + interaction.guild.name, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                                    .setColor(`#2F3136`)
                                    .addFields(
                                        { name: `> Nome`, value: `${user.tag}`, inline: true },
                                        { name: "> ID", value: `\`${user.id}\``, inline: true },
                                        {
                                          name: "> Status",
                                          value: `\`\`\`${presence}\`\`\``,
                                        },
                                        {
                                          name: "> Conta Criada",
                                          value: `<t:${Math.ceil(user.createdTimestamp / 1000)}>`,
                                        },
                                        {
                                          name: "> Entrada no Servidor",
                                          value: `<t:${Math.ceil(server.joinedTimestamp / 1000)}:F>`,
                                        },
                                        {
                                          name: "> Bot:",
                                          value: `${user.bot ? "Sim" : "Não"}`,
                                          inline: true,
                                        },
                                        {
                                          name: `> Server Booster`,
                                          value: `${server.premiumSince
                                            ? `Desde <t:${Math.ceil(server.premiumSinceTimestamp / 1000)}>`
                                            : "Não"
                                            }`,
                                          inline: true,
                                        }
                                      )
                                ]
                            })
                        }
                    break;         
                    case 'c_end':
                    {
                        interaction.editReply({
                            ephemeral: true,
                            embeds: [
                                new Discord.EmbedBuilder()
                                .setAuthor({ name: `Help commands `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`\`TIROU SUAS DÚVIDAS?\` \n\nEm breve o menu será finalizado, caso precise novamente novamentes das informações utilize o comando \`/help\``)
                                .setColor(`#2F3136`)],
                            components: [
                                new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.StringSelectMenuBuilder()
                                    .setPlaceholder("Selecione a categoria...")
                                    .setCustomId("desativado")
                                    .setOptions({ label: 'Desativado', value: 'desativo' })
                                    .setDisabled(true)
                                )
                            ]
                        })  
                    setTimeout(() => interaction.deleteReply().catch(() => {}), 10000);
                }
                break;
            }
        }
    }
}};
