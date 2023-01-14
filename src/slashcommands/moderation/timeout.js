const ms = require("ms")
const Discord = require("discord.js")
    
module.exports = {
    name: 'castigo',
    description: '[Moderation] Coloque um membro de castigo.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Selecione um membro',
            required: true,
        },
        {
            name: 'tempo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Selecione um tempo, Se prefere um tempo.',
            required: true,
            choices: [
                {
                    name: '30 Segundos',
                    value: '30s',
                },
                {
                    name: '1 Minuto',
                    value: '1m',
                },
                {
                    name: '5 Minutos',
                    value: '5m',
                },
                {
                    name: '10 Minutos',
                    value: '10m',
                },
                {
                    name: '15 Minutos',
                    value: '15m',
                },
                {
                    name: '30 Minutos',
                    value: '30m',
                },
                {
                    name: '45 Minutos',
                    value: '45m',
                },
                {
                    name: '1 Hora',
                    value: '1h',
                },
                {
                    name: '2 Horas',
                    value: '1h',
                },
                {
                    name: '5 Horas',
                    value: '1h',
                },
                {
                    name: '12 Horas',
                    value: '12h',
                },
                {
                    name: '24 Horas',
                    value: '24h',
                },
                {
                    name: '1 Dia',
                    value: '24h',
                },
                {
                    name: '3 dias',
                    value: '72h',
                },
                {
                    name: '1 Semana',
                    value: '168h',
                },
            ]
        },
        {
            name: 'motivo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Digite o motivo.',
            required: false,
        },
    ],

    run: async (client, interaction, args) => {

        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({            
                embeds: [
                new Discord.EmbedBuilder()
                .setDescription(`Você não possui permissao para utilizar esse comando!`)
                .setColor(`#2F3136`)
                ],
              ephemeral: true,
             });
        } else {

            let usuario = interaction.options.getUser("usuário")
            let tempo = interaction.options.getString("tempo")
            let motivo = interaction.options.getString("motivo") || `Nenhum`

            let membro = interaction.guild.members.cache.get(usuario.id);
            let servericon = interaction.guild.iconURL({ dynamic: true })

            let duracao = ms(tempo);
            membro.timeout(duracao, motivo).then(() => {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setThumbnail(servericon)
                            .setTitle(`${usuario.username} Foi punido.`)
                            .addFields(
                                { name: `Usuário Punido:`, value: `${membro.user}`, inline: false, },
                                { name: `Administrador:`, value: `${interaction.user}`, inline: false, },
                                { name: `Tempo:`, value: `\`${tempo}\``, inline: false, },
                                { name: `Motivo`, value: `\`${motivo}\``, inline: false, }
                            )
                            .setColor(`#2F3136`)
                    ],
                })
            })
            membro.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setThumbnail(servericon)
                        .setTitle(`Você recebou um timeout`)
                        .setColor(`#2F3136`)
                        .setFooter({ text: `Horario do timeout` })
                        .setTimestamp()
                        .setDescription(`<@${membro.user.id}>, um administrador do servidor \`${interaction.guild.name}\` colocou você de castigo por \`${tempo}\` \n\nMotivo: ${motivo}`)
                ],
            })
        }
    }
}