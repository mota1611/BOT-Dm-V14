const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const Tickets = require("../database/schemas/Tickets");
const TicketSetup = require("../database/schemas/TicketSetup");

module.exports = {
  id: "close_ticket",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {client} client 
     */
  async execute(interaction, client) {
    const { guild, channel, member } = interaction;
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
            .setDescription(`Não consigo encontrar nenhum dado no sistema de tickets`),
        ],
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

    if (TicketsDB.Closed == true)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Ticket já fechado`),
        ],
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

    await i.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Você fechou o ticket!`),
      ],
    });

    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Ticket fechado por: ${member}.`),
      ],
    });

    channel
      .edit({ parent: TicketSetupDB.ClosedCategoryID })
      .then(async (channel) => {
        TicketsDB.MembersID.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            ViewChannel: false,
            SendMessages: false,
            ReadMessageHistory: false,
          });
        });
      });
    const supportpanel = await channel.send({
      embeds: [
        new EmbedBuilder().setColor("#2F3136").setDescription(
          `
          \`-\` Quer salvar o ticket, por favor pressione "Arquivar Ticket"
          \`-\` Deseja abrir o ticket novamente depois de fechá-lo, pressione reabrir
          \`-\` Deseja excluir o ticket pressione "Excluir"!
          `
        ),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`archive_ticket`)
            .setLabel(`Salvar Ticket`)
            .setEmoji("📦")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId(`open_ticket`)
            .setLabel(`Reabrir`)
            .setEmoji("💬")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Excluir`)
            .setEmoji("⛔")
            .setStyle(ButtonStyle.Danger)
        ),
      ],
    });

    await Tickets.findOneAndUpdate(
      {
        ChannelID: channel.id,
      },
      { Closed: true, MessageID: supportpanel.id }
    );
  },
};
