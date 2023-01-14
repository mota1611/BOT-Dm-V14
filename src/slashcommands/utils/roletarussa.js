const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "roleta",
    description: "[Utils] Roleta russa, sobreviva ou morra.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [ 
        {
            name: "russa",
            description: "[Utils] Roleta russa, sobreviva ou morra.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
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
                    description: "Tempo de timeout",
                    required: true,
                    choices: [
                        {
                            name: '5 Minutos',
                            value: '5m',
                        }
                    ],
                }
            ],
        }
    ],

    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({
            ephemeral: true,
            embeds: [
              new Discord.EmbedBuilder()
              .setDescription(`Você não possui permissão para utilizar esse comando.`)
              .setColor(`#2F3136`)
            ],
        })
        let usuario = interaction.options.getUser("usuário")
        let membro = interaction.guild.members.cache.get(usuario.id);
        let tempo = interaction.options.getString("tempo")

        const numero = Math.floor(Math.random() * 11)
        const embed1 = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("#2F3136")
            .setDescription(`${membro} Pegou o revolver, colocou uma munição e girou o tambor, mirou em sua cabeça e apertou o gatilho...`)
            .setTimestamp()

        if(numero >= 5) {
            let duracao = ms(tempo);
            membro.timeout(duracao).then(() => {
                    const embed2 = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setColor("#2F3136") 
                    .setDescription(`${membro} Você morreu! E tomou timeout de 5 minutos!`)
                    .setTimestamp()

            interaction.reply({embeds: [embed1]}).then(() => {
                setTimeout(() => {
                    interaction.editReply({embeds: [embed2]})
                }, 3000);
                })
            })
        }else {
            const embed3 = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("#2F3136")
            .setDescription(`${membro} Você sobreviveu! Tente novamente utilizando \`/roleta russa\``)
            .setTimestamp()

            interaction.reply({embeds: [embed1]}).then(() => {
                setTimeout(() => {
                    interaction.editReply({embeds: [embed3]})
                }, 3000)
            })
        }

    }
}