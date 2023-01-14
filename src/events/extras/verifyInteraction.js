const {
  Client,
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextInputStyle,
  TextInputBuilder,
  ModalBuilder,
} = require("discord.js");
const { default: mongoose } = require("mongoose");
const roleSchema = require("../../database/schemas/verifyRole");
const randomString = require("randomized-string");

module.exports = {
  name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction 
     * @param {client} client 
     */
    async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      switch (interaction.commandName) {
        case "painel":
          const channel = interaction.options.getChannel("channel");

          const embed = new EmbedBuilder()
          .setAuthor({name: `Seja Bem-Vindo(a) á ${interaction.guild.name}!`})
            .setDescription(`      
            \`\`VERIFIQUE-SE\`\`
            
            > Basta clicar no botão abaixo **VERIFICAR** e digitar o código que aparecerá no titulo!

            > Caso tenha errado, basta fechar o menu e clicar novamente no botão que será gerado um novo código!`)
            .setColor("#2F3136")

          const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("verifyMember")
              .setLabel("VERIFICAR")
              .setStyle(ButtonStyle.Success)
          );

          channel.send({
            embeds: [embed],
            components: [button],
          });

          break;
      }
    } else if (interaction.isButton()) {
      switch (interaction.customId) {
        case "verifyMember": {
          const verifyRole = await roleSchema.findOne({
            guildId: interaction.guild.id,
          });

          if (!verifyRole) {
            return interaction.reply({
              ephemeral: true,
              embeds:[
              new EmbedBuilder()
              .setDescription("Ninda não foi definido um cargo de verificação! Utilize `/setrole` para definir.")
              .setColor("#2F3136")
            ]
             });
          }

          const randomToken = randomString
            .generate({ length: 5, charset: "hex" })
            .toUpperCase();

          if (
            interaction.member.roles.cache.some(
              (role) => role.id === verifyRole.roleId
            )
          ) {
            return interaction.reply({
              ephemeral: true,
              embeds: [
                new EmbedBuilder()
                  .setDescription(`${interaction.user}, Você já verificou que não é um robô!`)
                  .setColor("#2F3136"),
              ],
              ephemeral: true,
            });
          }

          const modal = new ModalBuilder()
            .setCustomId("verifyUserModal")
            .setTitle(`Código de verificação: ${randomToken}`)
            .setComponents(
              new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                  .setCustomId("veryUserInput")
                  .setLabel("Código de verificação no titulo:")
                  .setStyle(TextInputStyle.Short)
                  .setRequired(true)
                  .setMaxLength(5)
              )
            ); //

          await interaction.showModal(modal);
          const modalSubmitInt = await interaction
            .awaitModalSubmit({
              filter: (i) => {
                return true;
              },
              time: 600000,
            })
            .catch((e) => {
              console.log(e);
            });

          if (
            modalSubmitInt.fields
              .getTextInputValue("veryUserInput")
              .toUpperCase() === randomToken
          ) {
            const role = interaction.guild.roles.cache.get(verifyRole.roleId);

            if (!role)
              return interaction.reply({
                ephemeral: true,
                embeds: [
                  new EmbedBuilder()
                  .setDescription("Cargo não encontrado!")
                  .setColor("#2F3136")
                ]
              });
            await interaction.member.roles.add(role).then((m) => {
              interaction
                .followUp({
                  ephemeral: true,
                  embeds: [
                    new EmbedBuilder()
                      .setTitle("Verification Successful!")
                      .setDescription(`${interaction.user} Você foi verificado com sucesso!`)
                      .setColor("#2F3136"),
                  ],
                  ephemeral: true,
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }

          if (
            modalSubmitInt.fields
              .getTextInputValue("veryUserInput")
              .toUpperCase() !== randomToken
          ) {
            interaction.followUp({ 
              ephemeral: true,
              embeds: [
                new EmbedBuilder()
                .setDescription(`${interaction.user}, Você digitou o código errado!`)
                .setColor("#2F3136")
              ] 
             });
          }
          break;
        }

        default:
          break;
      }
    }
  },
};

