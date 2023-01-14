const Discord = require("discord.js")

module.exports = {
    name: "limpar",
    description: `[Bot] Limpe todas as mensagens do bot em sua DM!`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const dm = await interaction.member.createDM();
        await interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                .setDescription(`${interaction.user}, Limpando sua Dm..`)
                .setColor(`#2F3136`)
                ],
              ephemeral: true,
        })

        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setDescription(`${interaction.user}, Limpei com sucesso sua Dm.`)
                    .setColor(`#2F3136`)
                    ],
                  ephemeral: true,
            })
        }, 5000)

        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setDescription(`${interaction.user}, Para fechar essa mensagem clique em (ignorar mensagem).`)
                    .setColor(`#2F3136`)
                    ],
                  ephemeral: true,
            })
        }, 15000)

        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 99 });

        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
}