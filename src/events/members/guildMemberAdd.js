const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const joinSchema = require("../../database/schemas/joinSchema");
  
  module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const { user, guild } = interaction;
  
      joinSchema.findOne({ guildId: guild.id }, async (err, data) => {
        if (!data) {
          return;
        } else {
          client.channels.cache
            .get(data.channelId)
            .send({
              content:`${user}`,
              embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: user.tag, iconURL: interaction.displayAvatarURL({ dynamic: true }) })
                  .setColor("#2F3136")
                  .setDescription(`${user}, Entrou no servidor! \n\n**${guild.name}** agora possuí ${guild.memberCount} membros!`)

                  .setThumbnail(interaction.displayAvatarURL({ dynamic: true, size: 4096 }))
                  .setFooter({ text: `ID do usuário: ` + user.id })
              ],
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  };
  