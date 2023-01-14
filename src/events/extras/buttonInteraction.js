const { EmbedBuilder, PermissionsBitField, ButtonInteraction } = require('discord.js');
const { ownerID } = require('../../../config');

module.exports = {
    name: "interactionCreate",
      async execute(interaction, client) {
      if (!interaction.isButton()) return;
  
      const button = client.buttons.get(interaction.customId);
  
      if (!button) return;
  
      if (button == undefined) return;
  
      if (button.permission && !interaction.member.permissions.has(button.permission)) return interaction.reply({ embeds: [ new EmbedBuilder().setDescription( `Você não tem a permissão necessária para realizar esta ação!`).setColor("#f8312f") ], ephemeral: true });
  
      if (button.developer && interaction.user.id !== "217417219674603520" ) return interaction.reply({ embeds: [ new EmbedBuilder().setDescription( `Apenas o desenvolvedor pode interagir com o botão!.`).setColor("#f8312f") ], ephemeral: true });
  
      button.execute(interaction, client);
    },
  };
  