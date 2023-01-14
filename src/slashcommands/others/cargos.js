const Discord = require("discord.js");
const { discordLink } = require("../../../config");

module.exports = {
    name: 'cargos',
    description: '[Others] Menu de cargos',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({               
                embeds: [
                new Discord.EmbedBuilder()
                .setDescription(`Você não possui permissao para utilizar esse comando!`)
                .setColor(`#2F3136`)
                ],
              ephemeral: true,
             })
        } else {

        let embed = new Discord.EmbedBuilder()
            .setColor(`#2F3136`)
            .setAuthor({ name: `Menu de cargos `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
            .setDescription(`\`COMO UTILIZAR\` \n\n> *Abra o menu de seleção e escolha o cargo que deseja receber.*  \n\n> *Caso tenha errado o cargo desejado, basta selecionar novamente o mesmo cargo que será removido.*`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const dropdown = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('cargos2')
                    .setPlaceholder('Selecione seu cargo...')
                    .addOptions(
                        {
                            label: 'Faixa Preta',
                            description: 'Clique aqui para resgatar o cargo Faixa Preta.',
                            // emoji: '',
                            value: 'faixap',
                        },
                        {
                            label: 'Faixa Rosa',
                            description: 'Clique aqui para resgatar o cargo Faixa Rosa.',
                            // emoji: '',
                            value: 'faixar',
                        },
                        // {
                        //     label: 'Desbugar Menu',
                        //     description: 'Clique aqui para desbugar o menu.',
                        //     // emoji: '',
                        //     value: 'dbug',
                        // },
                    ),
            );

        interaction.channel.send({
            components: [dropdown],
            embeds: [embed],
        })
        await interaction.reply({
            ephemeral: true,
            content: `${interaction.user}, menu dropdownRoles adicionado com sucesso!`,
        })
    }
}}