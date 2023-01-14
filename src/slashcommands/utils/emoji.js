const Discord = require("discord.js")

module.exports = {
    name: "emoji-info", 
    description: "[Utils] Veja informações de um emoji.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "emoji",
            description: "Insira o nome exato do emoji.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {

        let emojiString = interaction.options.getString("emoji")
        let emoji = client.emojis.cache.find(emoji => `<:${emoji.name}:${emoji.id}>` === emojiString) || client.emojis.cache.find(emoji => emoji.name === emojiString) || client.emojis.cache.get(emojiString);

        if (!emoji) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("#2F3136")
                    .setDescription(`Não encontrei o emoji, siga o modelo abaixo\n\`/emoji-info [nome]\``)
                ]
            });
        } else if (emoji) {
            try {

            if (!emoji.animated) {

                let img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
                let botao = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setStyle(Discord.ButtonStyle.Link)
                            .setLabel("Download")
                            .setEmoji("📎")
                            .setURL(img)
                    );

                    let embed = new Discord.EmbedBuilder()
                    .setColor("#2F3136")
                    .setTitle("Informações do Emoji:")
                    .setThumbnail(`${img}`)
                    .setDescription(`
                    Nome do emoji: \`${emoji.name}\`
                    ID do emoji: \`${emoji.id}\`
                    Menção do emoji: \`${emoji}\`
                    O emoji é: \`Imagem (png/jpg)\`
                    Criado em: <t:${parseInt(emoji.createdTimestamp / 1000)}>`)
                    
                
                
                
                
                    interaction.reply({ embeds: [embed], components: [botao] })
            } 

            else if (emoji.animated) {

                    let img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;
                    let botao = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(Discord.ButtonStyle.Link)
                                .setLabel("Download")
                                .setEmoji("📎")
                                .setURL(`${img}`)
                        );
    
                        let embed = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle("Informações do Emoji:")
                        .setThumbnail(img)
                        .setDescription(`
                         Nome do emoji: \`${emoji.name}\`
                         ID do emoji: \`${emoji.id}\`
                         Menção do emoji: \`${emoji}\`
                         O emoji é: \`Gif\`
                         Criado em: <t:${parseInt(emoji.createdTimestamp / 1000)}>`)
                               
                        await interaction.reply({ embeds: [embed], components: [botao] })

            }

        } catch (e) { 
            interaction.reply(`Houve um erro ao tentar utilizar esse comando, ${interaction.user}`)
        }

        }

    }
}