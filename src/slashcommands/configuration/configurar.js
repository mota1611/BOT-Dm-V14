const {
EmbedBuilder, 
ApplicationCommandType, 
ApplicationCommandOptionType,
ButtonBuilder, 
ActionRowBuilder, 
ButtonStyle,} = require("discord.js");
const leaveSchema = require("../../database/schemas/leaveSchema");
const joinSchema = require("../../database/schemas/joinSchema");
const antilinkSchema = require('../../database/schemas/antilink')
const { discordLink } = require("../../../config");

  module.exports = {
    name: "configurar",
    description: "[CONFIG] Sistema de entrada/saida",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "desativar",
        description: "[CONFIG] Desative as mensagens de saída e entrada do servidor.",
        type: ApplicationCommandOptionType.Subcommand,
      },
      {
        name: "saída",
        description: "[CONFIG] Sete o canal para mensagens de saída do servidor.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "channel",
            description: "[CONFIG] Canal para as mensagens de saída do servidor.",
            type: ApplicationCommandOptionType.Channel,
            require: true,
          }
        ]
      },
      {
        name: "entrada",
        description: "[CONFIG] Sete o canal para mensagens de entrada do servidor.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "channel",
            description: "[CONFIG] Canal para as mensagens de saída do servidor.",
            type: ApplicationCommandOptionType.Channel,
            require: true,
          }
        ]
      },
      {
        name: "bot",
        description: "[CONFIG] Alterar nome e avatar do bot.",
        type: ApplicationCommandOptionType.Subcommand
      },
      {
        name: "autorole",
        description: "[CONFIG] Sete o cargo para o autorole.",
        type: ApplicationCommandOptionType.Subcommand
      }, 
      {
        name: "antilink",
        description: "[CONFIG] ative/desative o antilink no servidor!.",
        type: ApplicationCommandOptionType.Subcommand
      },
    ],

     run: async(client, interaction) => {

      const guild = interaction.guild;
      const sub = interaction.options.getSubcommand();
      switch (sub) {
        case "saída":
          {
            if (interaction.options.getSubcommand() === "saída") {
              const channel = interaction.options.getChannel("channel");
              const leaveSys = await leaveSchema.findOne({
                guildId: interaction.guild.id,
              });
  
              if (!leaveSys) {
                leaveChannel = new leaveSchema({
                  guildId: interaction.guild.id,
                  channelId: channel.id,
                });
  
                await leaveChannel.save().catch((err) => console.log(err));
                const successEmbed = new EmbedBuilder()
                  .setDescription(`Canal de mensagens de saída definido para **${channel.name}**!`)
                  .setColor("#2F3136");
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
              if (leaveSys) {
                await leaveSchema.findOneAndUpdate(
                  { guildId: interaction.guild.id },
                  { channelId: channel.id }
                );
                const successEmbed = new EmbedBuilder()
                  .setDescription(`Canal de mensagens de saída atualizado para **${channel.name}**!`)
                  .setColor("#2F3136");
  
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
            }
          }
          break;
        case "entrada":
          {
            if (interaction.options.getSubcommand() === "entrada") {
              const channel = interaction.options.getChannel("channel");
              const joinSys = await joinSchema.findOne({
                guildId: interaction.guild.id,
              });
  
              if (!joinSys) {
                joinChannel = new joinSchema({
                  guildId: interaction.guild.id,
                  channelId: channel.id,
                });
  
                await joinChannel.save().catch((err) => console.log(err));
                const successEmbed = new EmbedBuilder()
                  .setDescription(`Canal de mensagens de entrada definido para **${channel.name}**!`)
                  .setColor("#2F3136");
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
              if (joinSys) {
                await joinSchema.findOneAndUpdate(
                  { guildId: interaction.guild.id },
                  { channelId: channel.id }
                );
                const successEmbed = new EmbedBuilder()
                  .setDescription(`Canal de mensagens de saída atualizado para **${channel.name}**!`)
                  .setColor("#2F3136");
  
                await interaction.reply({
                  embeds: [successEmbed],
                  ephemeral: true,
                });
              }
            }
          }
          break;
        case "desativar":
          {
            if (interaction.options.getSubcommand() === "desativar") {
              await joinSchema.findOneAndDelete({
                guildId: interaction.guild.id,
              });
              await leaveSchema.findOneAndDelete({
                guildId: interaction.guild.id,
              });
  
              const successEmbed = new EmbedBuilder()
                .setDescription(`Sistema de mensagens desativado e data deletada com sucesso!`)
                .setColor("#2F3136");
              await interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            }
          }
          break;
        case "bot":
          {
            await interaction.reply({
              components: [
                  new ActionRowBuilder()
                      .addComponents(
                          new ButtonBuilder()
                              .setCustomId("alterar_username")
                              .setLabel("Alterar Nome")
                              .setEmoji("<:tag:1013500029341814864>")
                              .setStyle(ButtonStyle.Secondary),
                          new ButtonBuilder()
                              .setCustomId("alterar_avatar")
                              .setLabel("Alterar Avatar")
                              .setEmoji("🖼")
                              .setStyle(ButtonStyle.Secondary),
                      )
              ],
              ephemeral: true,
              embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: `Bot config `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                  .setDescription(`\`COMO UTILIZAR\` \n\n> Utilize o botão **ALTERAR NOME** para mudar o nome do bot. \n\n> Utilize o botão **ALTERAR AVATAR** para mudar a foto do bot.  \n\n> Terminou de fazer suas alterações pelo menu? Para fechar basta clica em: \`ignorar mensagem\``)
                  .setColor(`#2F3136`)
              ],
          })
        }
        break;
      case "autorole":
        {
          await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Menu de configuração `, iconURL: client.user.displayAvatarURL({ dynamic: true }), url: discordLink })
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`\`COMO UTILIZAR\`\` \n\n*Clique no botão de acordo com oque você deseja configurar.*`)
                    .setColor("#2F3136")
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                          .setCustomId("auto_role")
                          .setLabel("Sistema de AutoRole")
                          .setStyle(2)
                          .setEmoji("👤"),
                    )
            ], ephemeral: true
          })
        }
        break;
        case "antilink":
          {
            await interaction.deferReply();
            let requireDB = await antilinkSchema.findOne({ _id: guild.id })
            const sistema = requireDB?.logs === true ? '📗 Ativado' : '📕 Desativado';
        
            const e2 = new EmbedBuilder()
              .setAuthor(`Antilink`)
              .setThumbnail(client.user.displayAvatarURL())
              .setColor('#2F3136')
              .setDescription(`Antilink de ${guild.name}\n\nNo momento se encontra \`${sistema}\`.\nUse o botão abaixo para configurar o antilink no servidor!`)
              .setFooter({ text: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
              .setTimestamp(new Date())
        
            const b = new ButtonBuilder()
              .setLabel(`Ativar`)
              .setCustomId(`true`)
              .setStyle(3)
              .setEmoji(``)
        
            const b1 = new ButtonBuilder()
              .setLabel(`Desativar`)
              .setCustomId(`false`)
              .setStyle(4)
              .setEmoji(``)
        
            const ac = new ActionRowBuilder().addComponents(b, b1)
            const tf = await interaction.editReply({ embeds: [e2], components: [ac] })
            const coll = tf.createMessageComponentCollector();
        
            coll.on('collect', async(ds) => {
                if(ds.user.id !== interaction.user.id) return;
                if(ds.customId === `true`) {
        
              const e = new EmbedBuilder()
                .setDescription(`O sistema de antilink foi definido como \`ATIVO\``)
                .setColor('#2F3136')
        
                ds.update({ embeds: [e], components: [], ephemeral: true })
                await antilinkSchema.findOneAndUpdate({ _id: guild.id }, {
                    $set: { logs: true }
                  }, { upsert: true })
                } 
        
                else
                if(ds.customId === `false`) {
        
              const e = new EmbedBuilder()
                .setDescription(`O sistema de antilink foi definido como \`DESATIVADO\`!`)
                .setColor('#2F3136')
                   
                ds.update({ embeds: [e], components: [], ephemeral: true })
                await antilinkSchema.findOneAndUpdate({ _id: guild.id }, {
                    $set: { logs: false }
                  }, { upsert: true })
                }
            })
          }
        break;
        //
      }
    },
  };