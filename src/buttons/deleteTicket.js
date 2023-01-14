const { EmbedBuilder } = require("discord.js");
const Tickets = require("../database/schemas/Tickets");
const TicketSetup = require("../database/schemas/TicketSetup");
const TicketCount = require("../database/schemas/TicketCount");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  id: "delete_ticket",
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
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("#2F3136")
            .setDescription(`Não foi possível encontrar dados sobre este ticket`),
        ],
      });

    const TicketCountDB = TicketCount.findOne({ GuildID: guild.id });
    const Count = (await TicketCountDB.countDocuments()).toString();

    const TChannel = guild.channels.cache.get(TicketSetupDB.TranscriptID);

    const attachment = await createTranscript(channel, {
      limit: -1,
      returnType: "attachment",
      saveImages: true,
      minify: true,
      fileName: `Ticket-${TicketsDB.CreatorTag}-${Count}.html`,
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
            .setDescription(`Ticket já foi deletado!`),
        ],
      });

    await i.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Você deletou o ticket!`),
      ],
    });

    await Tickets.findOneAndUpdate(
      {
        ChannelID: channel.id,
      },
      { Closed: true, Deleted: true, Archived: true }
    );

    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .setDescription(`Ticket sendo deletado em \`5\` segundos!`),
      ],
    });

    TicketsDB.MembersID.forEach((m) => {
      channel.permissionOverwrites.edit(m, {
        ViewChannel: false,
        SendMessages: false,
        ReadMessageHistory: false,
      });
    });

    TChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("#2F3136")
          .addFields({
            name: `Data:`,
            value: `
            \`-\` **Ticket ID:** ${Count}
            \`-\` **Membro ID:** ${TicketsDB.CreatorID}
            \`-\` **Quem Abriu:** ${TicketsDB.CreatorTag}
            \`-\` **Ticket Criado em:** ${TicketsDB.CreatedAt}
            \`-\` **Fechado Por:** ${member}`,
          })
          .setFooter({
            text: `Criado por ${TicketsDB.CreatedAt}`,
            iconURL: guild.iconURL(),
          }),
      ],
      files: [attachment],
    });
    setTimeout(() => {
      Tickets.findOneAndDelete({
        GuildID: guild.id,
        ChannelID: channel.id,
      }).catch((err) => console.log(err));

      channel.delete();
    }, 5 * 1000);
  },
};
