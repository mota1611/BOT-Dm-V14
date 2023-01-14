const Discord = require("discord.js");
  
module.exports = {
    name: "avatar",
    description: "[Utils] Mostre o avatar de um membro.",
    options: [
        {
            name: 'user',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Mencione o usuário para ver o avatar.',
            require: true
        },  
    ],

    run: async (client, interaction, args) => {
      
      let user = interaction.options.getUser('user') || interaction.user;
      const button = new Discord.ButtonBuilder()
      .setEmoji("🖼")
      .setLabel("Download")
      .setStyle(5)
      .setURL(
        user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })
      )

      const row = new Discord.ActionRowBuilder().addComponents(button);
      let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

      let embed = new Discord.EmbedBuilder()
      .setTitle(`📷 Avatar de \`${user.tag}\``)
      .setColor(`#2F3136`)
      .setImage(avatar)

       interaction.reply({ embeds: [embed], components: [row] })
      
    }
}