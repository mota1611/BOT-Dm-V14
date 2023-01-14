const { ButtonBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType } = require('discord.js');
const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'eventos',
    description: '[Others] Iniciar inscrições de evento!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
           name: 'canal',
           description: 'Mencione o canal.',
           type: Discord.ApplicationCommandOptionType.Channel,
           channelTypes: [
            Discord.ChannelType.GuildText
          ],
           requi23006e: true,
        },
        {
           name: 'evento',
           type: Discord.ApplicationCommandOptionType.String,
           description: 'Insira qual será o evento.',
           requi23006e: true,
        },
        {
           name: 'descrição',
           type:  ApplicationCommandOptionType.String,
           description: 'Insira a descrição do evento!',
           requi23006e: true,
        },
        {
            name: "tempo",
            type: Discord.ApplicationCommandOptionType.String,
            description: "Selecione o tempo do evento.",
            requi23006e: true,
            choices: [
              {
                name: "30 Segundos",
                value: "30s",
              },
              {
                name: "1 Minuto",
                value: "1m",
              },
              {
                name: "5 Minutos",
                value: "5m",
              },
              {
                name: "10 Minutos",
                value: "10m",
              },
              {
                name: "15 Minutos",
                value: "15m",
              },
              {
                name: "30 Minutos",
                value: "30m",
              },
              {
                name: "45 Minutos",
                value: "45m",
              },
              {
                name: "1 Hora",
                value: "1h",
              },
              {
                name: "2 Horas",
                value: "2h",
              },
              {
                name: "5 Horas",
                value: "5h",
              },
              {
                name: "12 Horas",
                value: "12h",
              },
              {
                name: "1 Dia",
                value: "24h",
              },
              {
                name: "3 dias",
                value: "72h",
              },
              {
                name: "1 Semana",
                value: "168h",
              },
            ],
          },

    ],

    run: async(client,interaction) => {
      if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageEvents))
       return interaction.reply({
        ephemeral: true,
        embeds: [
          new Discord.EmbedBuilder()
          .setDescription(`Você não possui permissão para utilizar esse comando.`)
          .setColor(`#2F3136`)
          ],
      });
       
       
      let channelEvent = interaction.options.getChannel(`canal`)
      let Evento = interaction.options.getString(`evento`)
      let Tempo = interaction.options.getString(`tempo`)
      let Descrição = interaction.options.getString(`descrição`)

      if(!channelEvent)
       return interaction.reply({
        ephemeral: true,
        embeds: [
          new Discord.EmbedBuilder()
          .setDescription(`Erro ao tentar enviar para este canal, tente novamente!`)
          .setColor(`#2F3136`)
          ],
      });

      let botãoEvento = new Discord.ActionRowBuilder()
       .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("participar")
          .setEmoji("🎉")
          .setLabel("- Participar")
          .setStyle(Discord.ButtonStyle.Primary),
          new Discord.ButtonBuilder()
           .setCustomId(`sair`)
           .setEmoji("🤯")
           .setLabel('- Sair')
           .setStyle(Discord.ButtonStyle.Danger)
       )

      let embedEvento = new Discord.EmbedBuilder()
       .setAuthor({ name: `Iniciado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
       .setTitle(`${Evento}`)
       .setDescription(`> **Descrição:** ${Descrição}\n> **Tempo:** ${Tempo}\n\n*Para participar do Evento clique no botão "🎉"* \n*Para sair do Evento clique no botão "👋"!*`)
       .setTimestamp()
       .setColor(`#2F3136`)
     
       const msg = await channelEvent.send({ embeds: [embedEvento], components: [botãoEvento] }).catch((e) => {
        interaction.reply({ embeds: [new Discord.EmbedBuilder()
            .setColor(`#2F3136`)
            .setDescription(`Não foi possível promover o evento!`)
        ] });
      }); 
      interaction.reply({
        ephemeral: true,
        embeds: [
          new Discord.EmbedBuilder()
          .setDescription(`Evento iniciado:\nEvento: ${Evento}\nDescrição: ${Descrição}\nTempo: ${Tempo}`)
          .setColor(`#2F3136`)
          ],
      });

       const collector = msg.createMessageComponentCollector({
        time: ms(Tempo),
      });

          collector.on("end", (i) => {
            msg.edit({ components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                      .setDisabled(true)
                      .setCustomId("botao")
                      .setLabel("Participar")
                      .setEmoji("🎉")
                      .setStyle(Discord.ButtonStyle.Primary),
                      new Discord.ButtonBuilder()
                      .setDisabled(true)
                      .setCustomId("botao1")
                      .setLabel('Sair')
                      .setEmoji("👋")
                      .setStyle(Discord.ButtonStyle.Danger)
                  )
              ]});
              msg.channel.send({ embeds: [new Discord.EmbedBuilder()
               .setAuthor({ name: `Anfitrião: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
               .setColor(`#2F3136`)
               .setTitle(`inscrições Encerradas!`)
               .setTimestamp()
               .setDescription(`\`\`\`Lista de Participantes\`\`\`\n- ${list.join(`\n- `)}\n⠀\n\`\`\`⠀\`\`\``)
            ]})
          });

          let list = [];

           collector.on('collect', async (i) => {
              if(i.customId.startsWith(`participar`)) {
                 if(list.includes(i.user)) return i.reply({
                    ephemeral: true,
                    embeds: [
                      new Discord.EmbedBuilder()
                      .setDescription(`Você já está na participando!`)
                      .setColor(`#2F3136`)],
                });
 
                 list.push(i.user);
 
                 await msg.edit({ content: `<@everyone>`, embeds: [embedEvento.setFields(
                    {
                       name: '\`\`\`Lista de Participantes:\`\`\`',
                       value: `\n⠀\n| - ${list.join(`\n | - `)}`,
                       inline: false, 
                    }
                   )], components: [botãoEvento] })
                i.reply({
                    ephemeral: true,
                    embeds: [
                      new Discord.EmbedBuilder()
                      .setDescription(`Nome Adicionado!`)
                      .setColor(`#2F3136`)],
                });

              } else if (i.customId.startsWith(`sair`)) {                               
                if(!list.includes(i.user)) return i.reply({
                    ephemeral: true,
                    embeds: [
                      new Discord.EmbedBuilder()
                      .setDescription(`Você não está na lista!`)
                      .setColor(`#2F3136`)],
                });
                 
                 list = list.filter(user => user.id != i.user.id)
                 await msg.edit({ embeds: [embedEvento.setFields(
                    {
                       name: '\`\`\`Lista de Participantes:\`\`\`',
                       value: `\n⠀\n| - ${list.join(`\n | - `)}`,
                       inline: false, 
                    }
                   )], components: [botãoEvento] })
                i.reply({
                    ephemeral: true,
                    embeds: [
                      new Discord.EmbedBuilder()
                      .setDescription(`Nome Removido!`)
                      .setColor(`#2F3136`)],
                  });
                }
           })




    }
};