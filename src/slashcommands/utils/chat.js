const Discord = require('discord.js')

module.exports = {
    name: "chat",
    description: "[Utils] Faça o bot enviar uma mensagem no chat",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
    {
      name: "chat",
      description: "Qual mensagem deseja enviar",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({
      ephemeral: true,
      embeds: [
        new Discord.EmbedBuilder()
        .setDescription(`Você não possui permissão para utilizar esse comando.`)
        .setColor(`#2F3136`)
        ],
    })

    const chat = interaction.options.getString("chat")

    const embed = new Discord.EmbedBuilder()
    .setDescription(`Mensagem postada com sucesso!`)
    .setColor(`#2F3136`)

    interaction.reply({ embeds: [embed], ephemeral: true})
    interaction.channel.send(`${chat}`)
  }
};