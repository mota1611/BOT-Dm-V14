const {
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
} = require("discord.js");
const { discordLink } = require('../../../config');
const Tickets = require("../../database/schemas/Tickets");
const TicketSetup = require("../../database/schemas/TicketSetup");
const TicketCount = require("../../database/schemas/TicketCount");

module.exports = {
      name: "ticket",
      description: "[Others] configuração de ticket",
      type: ApplicationCommandType.ChatInput,
      Permissions: PermissionFlagsBits.Administrator,
      options: [
        {
          name: "setup",
          description: "setup do ticket",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "channel",
              description: "canal do painel do ticket",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              require: true
            },
            {
              name: "transcript_channel",
              description: "Canal de transcript",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              require: true
            },
            {
              name: "open_category",
              description: "Categoria do ticket",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildCategory],
              require: true
            },
            {
              name: "closed_category",
              description: "Categoria de fechados",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildCategory],
              require: true
            },
            {
              name: "archive_category",
              description: "Categoria de arquivos",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildCategory],
              require: true
            },
            {
              name: "support_role",
              description: "Cargo de suporte",
              type: ApplicationCommandOptionType.Role,
              require: true
            },
          ]
        },
        {
          name: "delete",
          type: ApplicationCommandOptionType.Subcommand,
          description: "Delete configuração de ticket",
          options: [
            {
              name: "options",
              type: ApplicationCommandOptionType.String,
              description: "nao sei",
              require: true,
              choices: [
                { name: `ticket setup`, value: `setup` },
                { name: `tickets`, value: `tickets` },
                { name: `ticket count`, value: `count` }
              ]
            }
          ]
        },
        {
          name: "remove-user",
          description: "Remover usuário do ticket",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "user",
              description: "Remova o usuário do ticket",
              type: ApplicationCommandOptionType.User,
              require: true
            }
          ],
        },
        {
          name: "add-user",
          description: "Adicionar usuário do ticket",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "user",
              description: "Adicione usuário ao ticket",
              type: ApplicationCommandOptionType.User,
              require: true
            }
          ]
        }
      ],
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

    run: async (client, interaction) => {

    const { guild, channel, options } = interaction;
    const i = interaction;
    const TicketsDB = await Tickets.findOne({ GuildID: guild.id });
    const TicketSetupDB = await TicketSetup.findOne({ GuildID: guild.id });
    const TicketCountDB = await TicketCount.findOne({ GuildID: guild.id });

    if (i.options.getSubcommand() === "setup") {
      if (TicketSetupDB)
        return i.reply({
          content: `Já existe um painel configurado neste servidor!`,
          ephemeral: true,
        });

      const Channel = options.getChannel("channel");
      const TranscriptChannel = options.getChannel("transcript_channel");
      const OpenCategory = options.getChannel("open_category");
      const ClosedCategory = options.getChannel("closed_category");
      const ArchiveCategory = options.getChannel("archive_category");
      const SupportRole = options.getRole("support_role");

      await TicketSetup.findOneAndUpdate(
        { GuildID: guild.id },
        {
          ChannelID: Channel.id,
          TranscriptID: TranscriptChannel.id,
          OpenCategoryID: OpenCategory.id,
          ClosedCategoryID: ClosedCategory.id,
          ArchiveCategoryID: ArchiveCategory.id,
          SupportRoleID: SupportRole.id,
        },
        {
          new: true,
          upsert: true,
        }
      );

      channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `Ticket ${interaction.guild.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
            .setDescription(`Crie um **TICKET** clicando o botão abaixo e descreva sua necessidade.`)
            .setFooter({ text: `Lembre-se de não abrir um ticket sem necessidade` })
            .setColor(`#2F3136`)
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`createTicket`)
              .setLabel(`Abrir Ticket`)
              .setStyle(ButtonStyle.Secondary)
          ),
        ],
      });

      i.reply({
        content: `Ticket criado com sucesso!`,
        ephemeral: true,
      });
    } // End of setup

    if (options.getSubcommand() === "remove-user") {
      const user = options.getMember("user");
      const TicketDB = await Tickets.findOne({
        GuildID: guild.id,
        ChannelID: channel.id,
      });
      if (!TicketDB)
        return i.reply({
          content: `Comando só pode ser utilizado em tickets!`,
          ephemeral: true,
        });

      interaction.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: false,
      });

      await Tickets.findOneAndUpdate(
        { GuildID: guild.id, ChannelID: channel.id },
        { $pull: { MembersID: user.id } }
      );

      i.reply({
        content: `Você removeu ${user} do ticket!`,
        ephemeral: true,
      });
    } // End of add

    if (options.getSubcommand() === "add-user") {
      const user = options.getMember("user");
      const TicketDB = await Tickets.findOne({
        GuildID: guild.id,
        ChannelID: channel.id,
      });
      if (!TicketDB)
        return i.reply({
          content: `Comando só pode ser utilizado em tickets!`,
          ephemeral: true,
        });

      interaction.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
      });

      await Tickets.findOneAndUpdate(
        { GuildID: guild.id, ChannelID: channel.id },
        { $push: { MembersID: user.id } }
      );

      i.reply({
        content: `> Você adicionou ${user} ao ticket!`,
        ephemeral: true,
      });
    } // End of add

    if (options.getSubcommand() === "delete") {
      const DelOptions = options.getString("options");

      switch (DelOptions) {
        case "setup": {
          if (!TicketSetupDB) {
            return i.reply({
              content: `Não há dados relacionados à configuração do ticket.`,
              ephemeral: true,
            });
          } else {
            await TicketSetup.findOneAndDelete({
              GuildId: guild.id,
            });

            return i.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("#2F3136")
                  .setDescription(`Painel do ticket deletado!`),
              ],
              ephemeral: true,
            });
          }
        } // End of setup

        case "tickets": {
          if (!TicketsDB) {
            return i.reply({
              content: `Nenhum ticket para deletar!`,
              ephemeral: true,
            });
          } else {
            await Tickets.deleteMany({ GuildID: guild.id });

            return i.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("#2F3136")
                  .setDescription(`Ticket foi deletado com sucesso!`),
              ],
              ephemeral: true,
            });
          }
        } // End of tickets

        case "count": {
          if (!TicketCountDB) {
            return i.reply({
              content: `> Nenhuma contagem de tickets encontrada para excluir!`,
              ephemeral: true,
            });
          } else {
            await TicketCount.deleteMany({ GuildID: guild.id });

            return i.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("#2F3136")
                  .setDescription(`Contagem de tickets deletadas com sucesso!`),
              ],
              ephemeral: true,
            });
          }
        } // End of count
      }
    } // End of delete system
  },
};
