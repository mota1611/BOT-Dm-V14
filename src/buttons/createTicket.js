const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Tickets = require("../database/schemas/Tickets");
const TicketSetup = require("../database/schemas/TicketSetup");
const TicketCount = require("../database/schemas/TicketCount");
const { discordID } = require("../../config");

module.exports = {
  id: "createTicket",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {client} client 
     */
  async execute(interaction, client) {
    const { guild, member } = interaction;
    const i = interaction;

    const TicketSetupDB = await TicketSetup.findOne({ GuildID: guild.id });
    if (!TicketSetupDB)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
          .setDescription(`Não é possível encontrar nenhum dado na configuração`)
          .setColor(`#2F3136`)
        ]
      });

    const TicketCountDB = TicketCount.findOne({ GuildID: guild.id });
    const Count = ((await TicketCountDB.countDocuments()) + 1).toString();

    const TicketLimit = await Tickets.findOne({
      GuildID: guild.id,
      Creator: member.id,
      Closed: false,
    });
    if (TicketLimit)
      return i.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
          .setDescription(`Você já tem um ticket aberto`)
          .setColor(`#2F3136`)
        ]
      });

    await guild.channels
      .create({
        name: `${"👤・Ticket" + `-` + interaction.user.username }`,
        topic: `**Seu ID:** ${member.id}\n**Ticket ID:** ${Count}`,
        parent: TicketSetupDB.OpenCategoryID,
        permissionOverwrites: [
          {
            id: member.id,
            allow: [
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
          {
            id: TicketSetupDB.SupportRoleID,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ManageMessages,
            ],
          },
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.client.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ManageMessages,
            ],
          },
        ],
      })
      .then(async (channel) => {
        await Tickets.create({
          GuildID: guild.id,
          ChannelID: channel.id,
          TicketID: Count,
          CreatorID: member.user.id,
          CreatorTag: member.user.tag,
          MembersID: member.id,
          CreatedAt: new Date().toLocaleString(),
          Deleted: false,
          Closed: false,
          Archived: false,
          MessageID: false,
        })
          .then(async () => {
            await TicketCount.create({
              GuildID: guild.id,
              TicketCount: Count,
            });
          })
          .then(async () => {
            channel.setRateLimitPerUser(3);
          });
        channel.setPosition(0);

        const Embed = new EmbedBuilder()
          .setColor("#2F3136")
          .setAuthor({ name: `Ticket ${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
          .setDescription(`
          **__Bem-Vindo(a) ao seu ticket__** 
          \n・Adiante o assunto para melhorar o seu suporte, tente detalhar para que seu atendimento seja o mais rápido possivel.
          \n> **ID do Ticket**: \`\`${Count}\`\``)

        await channel.send({
          content: `${interaction.user}`,
          embeds: [Embed],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId(`close_ticket`)
                .setLabel(`Finalizar Ticket`)
                .setEmoji("⛔")
                .setStyle(ButtonStyle.Danger)
            ),
          ],
        });

        await channel
          .send({
            content: `${member}`,
          })
          .then((message) => {
            setTimeout(() => {
              message.delete().catch(() => {});
            }, 5 * 1000);
          });

        await i.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
            .setDescription(`Ticket criado em: ${channel}`)
            .setColor(`#2F3136`)
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setLabel(`Atalho`)
              .setStyle(ButtonStyle.Link)
              .setURL(`https://discord.com/channels/${discordID}/${channel.id}`)
            )
          ],
        });
      });
  },
};
