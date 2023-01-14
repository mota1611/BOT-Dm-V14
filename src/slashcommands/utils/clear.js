const Discord = require('discord.js')

module.exports = {
  name: "clear",
  description: "[Utils] Apaga mensagens no chat.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "Informe a quantidade de mensagens que deseja apagar.",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "usuario",
      description: "Selecione o usuário pelo qual deseja apagar as mensagens.",
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    },
  ],

  run: async (client, interaction, args) => {

    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return interaction.reply({
      ephemeral: true,
      embeds: [
        new Discord.EmbedBuilder()
        .setDescription(`Você não possui permissão para utilizar esse comando.`)
        .setColor(`#2F3136`)
        ],
    });

    let amount = interaction.options.getInteger("quantidade");
    let User = interaction.options.getUser("usuario");
    let Response = new Discord.EmbedBuilder()

    const Messages = await interaction.channel.messages.fetch();

    if (amount > 100) return interaction.reply({
      ephemeral: true,
      embeds: [
        new Discord.EmbedBuilder()
        .setDescription(`Você só pode apagar 1-99 mensagens`)
        .setColor(`#2F3136`)
        ],
    })
    if (amount < 1) return interaction.reply({
      ephemeral: true,
      embeds: [
        new Discord.EmbedBuilder()
        .setDescription(`Você não pode apagar menos de 1 mensagem`)
        .setColor(`#2F3136`)
        ],
    })
    
    if (User) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === User.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });
      interaction.channel.bulkDelete(filtered, true).then(async (messages) => {
        Response.setDescription(
          `Deletando **${messages.size}** mensagens de <@${User.id}>.`
        );
        await interaction.reply({
          embeds: [Response],
          ephemeral: true,
        });
        setTimeout(() => {
          interaction.editReply({
            ephemeral: true,
              embeds: [
                  new Discord.EmbedBuilder()
                  .setDescription(`${interaction.user}, Limpei com sucesso as mensagens de <@${User.id}>.`)
                  .setColor(`#2F3136`)
                  ],
          })
      }, 3000)
      setTimeout(() => {
          interaction.editReply({
            ephemeral: true,
              embeds: [
                  new Discord.EmbedBuilder()
                  .setDescription(`${interaction.user}, Para fechar essa mensagem clique em "ignorar mensagem".`)
                  .setColor(`#2F3136`)
                  ],
          })
      }, 7000)

      });
    } else {
      interaction.channel.bulkDelete(amount, true).then(async (messages) => {
        Response.setDescription(
          `**${messages.size}** mensagens deletadas.`
        );
        interaction.reply({
          embeds: [Response],
          ephemeral: true,
        })
      });
    }
  },
};
