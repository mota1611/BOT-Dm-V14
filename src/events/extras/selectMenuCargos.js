// const Discord = require('discord.js');

// // ////////////////////////////////////////////SELECT-MENU-CARGOS///////////////////////////////////////////////////////
// module.exports = {
//     name: 'interactionCreate',
//     /**
//      * @param {CommandInteraction} interaction 
//      */
//     async execute(interaction) {

//     let boys = interaction.guild.roles.cache.get("1063485399634284605");
//     let girls = interaction.guild.roles.cache.get("1063485433251631125");
//     const member = interaction.member

//     if (interaction.isStringSelectMenu()) {
//     await interaction.deferUpdate().catch(null)
//     if (interaction.customId === 'cargos2'){
//         const value = interaction.values[0];    
//         switch (value) {
//       //boys
//       case 'faixap':
//         {
//         if (member.roles.cache.some(role => role.id == boys)) {
//           interaction.reply({
//             ephemeral: true,
//             embeds: [
//               new Discord.EmbedBuilder()
//                 .setDescription(`${interaction.user}, Adicionei o cargo ${boys} em você com sucesso!`)
//                 .setColor('#2F3136')
//             ]
//         })
//         member.roles.add(boys)
//         }
//         else {
//         interaction.reply({
//             ephemeral: true,
//             embeds: [
//                 new Discord.EmbedBuilder()
//                 .setDescription(`${interaction.user}, Removi o cargo ${boys} de você com sucesso!`)
//                 .setColor('#2F3136')
//             ],
//         })
//         member.roles.remove(boys)
//         }
//       }
//       //girls
//       break;
//       case 'faixar':
//         {
//         if (member.roles.cache.some(role => role.id == girls)) {
//           interaction.reply({
//             ephemeral: true,
//             embeds: [
//               new Discord.EmbedBuilder()
//                 .setDescription(`${interaction.user}, Adicionei o cargo ${girls} em você com sucesso!`)
//                 .setColor('#2F3136')
//             ]
//           })
//           member.roles.add(girls)  
//         }
//         else {
//          interaction.reply({
//             ephemeral: true,
//             embeds: [
//             new Discord.EmbedBuilder()
//                 .setDescription(`${interaction.user}, Removi o cargo ${girls} de você com sucesso!`)
//                 .addFieldssetColor('#2F3136')
//             ],
//             })
//             member.roles.remove(girls)
//         }
//       }
//     //
//         }   
//     }
// }
// }}