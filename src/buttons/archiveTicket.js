const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Tickets = require("../database/schemas/Tickets");
const TicketSetup = require("../database/schemas/TicketSetup");

module.exports = {
  id: "archive_ticket",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {client} client 
     */
  async execute(interaction, client) {
    const { guild, channel, member, message } = interaction;
    const i = interaction;

    const TicketSetupDB = await TicketSetup.findOne({
      GuildId: guild.id,
    });
    if (!TicketSetupDB)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Não consigo encontrar nenhum dado no sistema de tickets!`),
        ],
      });

    const TicketsDB = await Tickets.findOne({
      GuildId: guild.id,
      ChannelID: channel.id,
    });
    if (!TicketsDB)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Não foi possível encontrar dados sobre este ticket.`),
        ],
      });

    if (!member.roles.cache.find((r) => r.id === TicketSetupDB.SupportRoleID))
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Você não tem permissão para usar esta ação!`),
        ],
      });

    if (TicketsDB.Deleted == true)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`> O ticket foi excluído, não pode usar nenhuma ação!`),
        ],
      });

    if (TicketsDB.Archived == true)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Ticket já arquivado!`),
        ],
      });

    await i.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Você arquivou o ticket!`),
      ],
    });

    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Ticket arquivado por ${member}.`),
      ],
    });
    const supportpanel = await channel.send({
      embeds: [
        new EmbedBuilder().setColor("#2F3136").setDescription(
          `
              \`-\` Deseja abrir o ticket novamente depois de fechá-lo, pressione reabrir
              \`-\` Quer deletar o ticket aperte "Delete"!
              `
        ),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`open_ticket`)
            .setLabel(`Abrir Ticket`)
            .setEmoji("💬")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Delete`)
            .setEmoji("⛔")
            .setStyle(ButtonStyle.Danger)
        ),
      ],
    });

    channel.edit({ parent: TicketSetupDB.ArchiveCategoryID });
    message.delete(TicketsDB.MessageID);

    await Tickets.findOneAndUpdate(
      {
        ChannelID: channel.id,
      },
      { Archived: true, MessageID: supportpanel.id }
    );
  },
};
