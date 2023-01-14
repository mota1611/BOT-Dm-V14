const Discord = require("discord.js");
const mongoose = require("mongoose");
const roleSchema = require("../../database/schemas/verifyRole");

module.exports = {
  name: "verificação",
  description: "[CONFIG] Setar o cargo para a verificação",
  Permissions: Discord.PermissionFlagsBits.Administrator,
  options: [
    {
      name: "adicionar",
      description: "[CONFIG] Setar o cargo para a verificação",
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "role",
          description: "cargo para a verificação",
          type: Discord.ApplicationCommandOptionType.Role,

        }
      ]
    }
  ],

  run: async(client, interaction) => {

    let role = interaction.options.getRole("role")
    const roleId = await roleSchema.findOne({ roleId: role.id });

    if (!roleId) {
      verifyRole = await new roleSchema({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        roleId: role.id,
      });
    await verifyRole.save().catch(console.error);
    await interaction.reply({
      ephemeral: true,
      embeds: [
        new Discord.EmbedBuilder()
        .setDescription(`O cargo ${role} foi setado com sucesso para a verificação!`)
        .setColor("#2F3136")
      ]
    })
  } else {
      await verifyRole.save().catch(console.error);
      await interaction.reply({
          ephemeral: true,
          embeds: [
            new Discord.EmbedBuilder()
            .setDescription(`O cargo ${role} já está setado no banco de dados!`)
            .setColor("#2F3136")
          ]
      })
  }
   }
}

