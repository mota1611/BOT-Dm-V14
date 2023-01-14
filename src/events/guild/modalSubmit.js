const Discord = require("discord.js");

module.exports = {
  name: 'interactionCreate',

  /**
   * @param {CommandInteraction} interaction 
   * @param {ModalSubmitInteraction} modal
   */
  async execute(interaction) {
    
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("alterar_username")) {
        const modal_bot_config_nome = new Discord.ModalBuilder()
          .setCustomId('modal_bot_config_nome')
          .setTitle(`Altere informações do bot abaixo.`)
        const nome_bot = new Discord.TextInputBuilder()
          .setCustomId('username_bot')
          .setLabel('Digite o nome do bot.')
          .setPlaceholder('Escreva o nome aqui.')
          .setStyle(Discord.TextInputStyle.Short)
  
        const firstActionRow = new Discord.ActionRowBuilder().addComponents(nome_bot);
        modal_bot_config_nome.addComponents(firstActionRow)
        await interaction.showModal(modal_bot_config_nome);
      }
    }
  
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("alterar_avatar")) {
        const modal_bot_config_avatar = new Discord.ModalBuilder()
          .setCustomId('modal_bot_config_avatar')
          .setTitle(`Altere informações do bot abaixo.`)
        const avatar_bot_modal = new Discord.TextInputBuilder()
          .setCustomId('bot_avatar')
          .setLabel('URL do avatar.')
          .setPlaceholder('URL aqui')
          .setStyle(Discord.TextInputStyle.Short)
        const SecondActionRow = new Discord.ActionRowBuilder().addComponents(avatar_bot_modal)
        modal_bot_config_avatar.addComponents(SecondActionRow)
        await interaction.showModal(modal_bot_config_avatar);
      }
    }
    //
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'modal_bot_config_nome') {
      const nome_bot = interaction.fields.getTextInputValue('username_bot');
  
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(`#2F3136`)
            .setDescription(`<@${interaction.user.id}>, Nome do bot alterado com sucesso!`)
            .setTimestamp()
        ]
      })
      interaction.client.user.setUsername(nome_bot)
    }
    //
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'modal_bot_config_avatar') {
      const avatar_bot = interaction.fields.getTextInputValue('bot_avatar');
  
      interaction.reply({
        ephemeral: true,
        embeds: [
          new Discord.EmbedBuilder()
            .setColor(`#2F3136`)
            .setDescription(`<@${interaction.user.id}>, avatar do bot alterado com sucesso!`)
            .setImage(avatar_bot)
        ]
      })
      interaction.client.user.setAvatar(avatar_bot)
    }
  }};