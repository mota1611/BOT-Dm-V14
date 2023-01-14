const { EmbedBuilder } = require("discord.js");
const Tickets = require("../database/schemas/Tickets");
const TicketSetup = require("../database/schemas/TicketSetup");

module.exports = {
  id: "open_ticket",
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
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Não consigo encontrar nenhum dado no sistema de tickets`),
        ],
        ephemeral: true,
      });

    const TicketsDB = await Tickets.findOne({
      GuildId: guild.id,
      ChannelID: channel.id,
    });
    if (!TicketsDB)
      return i.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Não foi possível encontrar dados sobre este ticket`),
        ],
        ephemeral: true,
      });

    if (!member.roles.cache.find((r) => r.id === TicketSetupDB.SupportRoleID))
      return i.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Você não tem permissão para usar esta ação!`),
        ],
        ephemeral: true,
      });

    if (TicketsDB.Deleted == true)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`O ticket foi excluído, não pode usar nenhuma ação`),
        ],
      });

    if (TicketsDB.Closed == false)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Ticket já aberto`),
        ],
      });

    await i.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Você abriu o ticket`),
      ],
    });

    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Ticket re-aberto por: ${member}`),
      ],
    });

    channel.edit({ parent: TicketSetupDB.OpenCategoryID });
    message.delete(TicketsDB.MessageID);
    TicketsDB.MembersID.forEach((m) => {
      channel.permissionOverwrites.edit(m, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });
    });

    await Tickets.findOneAndUpdate(
      {
        ChannelID: channel.id,
      },
      { Closed: false, Archived: false }
    );
  },
};
