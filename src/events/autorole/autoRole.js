const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {client} client 
     */
    async execute(interaction, client) {

        if (interaction.isButton()) {
            if (interaction.customId === "auto_role") {

                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setDescription(`${interaction.user}, Insira o **ID** do cargo que deseja para o autorole!`)
                            .setColor("#2F3136")
                    ], ephemeral: true
                })


                const coletor = interaction.channel.createMessageCollector({
                    filter: i => i.author.id === interaction.user.id,
                    max: 1,
                })

                coletor.on('collect', async (mensagem) => {
                    try {
                        let mention_role = mensagem.content
                        let cargo = interaction.guild.roles.cache.get(mention_role)

                        if (cargo === undefined) {
                            interaction.editReply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setDescription(`${interaction.user}, **ID** do cargo inválido.`)
                                        .setColor("#2F3136")
                                ],
                            }).then(() => { mensagem.delete() })
                        } else {

                            await db.set(`${mensagem.guild.id}_auto`, { AutoRole: `${mention_role}` })

                            interaction.editReply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setDescription(`O Cargo <@&${mention_role}> foi adicionado ao AutoRole com sucesso!`)
                                        .setColor("#2F3136")
                                ]
                            }).then(() => { mensagem.delete() })
                        }
                    } catch {
                        interaction.editReply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`Cargo inválido.`)
                                    .setColor("#2F3136")
                            ]
                        }).then(() => { mensagem.delete() })
                    }
                })
            }
        }
    }
}