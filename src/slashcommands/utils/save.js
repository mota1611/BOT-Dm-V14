const Discord = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: "salvar",
    description: "[Utils] Salve as mensagens do chat ",
    type: Discord.ApplicationCommandType.ChatInput,


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                .setDescription("permissões insuficientes.")
                .setColor(`#2F3136`)
            ]
        });
        let channel = interaction.channel;
        const attachment = await discordTranscripts.createTranscript(channel, {
            fileName: `${channel.name}.html`,
        });

        let embed = new Discord.EmbedBuilder()
        .setDescription(`As mensagens do chat <#${channel.id}> foram salvas e foi enviada em seu privado!`)
        .setColor(`#2F3136`)

        interaction.reply({ embeds: [embed], ephemeral: true })
        await interaction.user.send({files: [attachment] })//.then(msg => {
        //     setTimeout(() => {
        //         msg.delete(0);
        //     }, 5000) // deleta a mensagem com o arquivo em 5 segundos.
        // });
    }
}
