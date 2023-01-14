// const { EmbedBuilder, WebhookClient } = require('discord.js');
// const { webhookError, ownerID } = require('../../config');
// const colors = require('colors');

// module.exports = {
//     name: 'ready',
//     /**
//      * @param {client} client 
//      */
//     async execute(client) {

// const webhook = new WebhookClient({ url: webhookError });
// process.on("unhandledRejection", (reason, p) => {
//     console.log(colors.gray("—————————————————————————————————"));
//     console.log(
//       colors.white("["),
//       colors.red.bold("AntiCrash"),
//       colors.white("]"),
//       colors.gray(" : "),
//       colors.white.bold("Unhandled Rejection/Catch")
//     );
//     console.log(
//       colors.white("["),
//       colors.yellow.bold(`Motivo`),
//       colors.white("]"),
//       colors.gray(" : "),
//       colors.white.bold(reason.message),
//     );
//     console.log(colors.gray("—————————————————————————————————"));
//     console.log(reason, p);

//     const embed1 = new EmbedBuilder()
//     .setAuthor({name: "Unhandled Rejection/Catch" })
//     .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
//     .setColor("#2F3136")
//     .setTimestamp()
//     .addFields(
//       { name: "Reason", value: `${reason}` },
//       { name: "Promise", value: `${p}` }
//     )
//   return webhook.send({ content: `<@${ownerID}> Teve erro aqui disgraça`, embeds: [embed1] });
//  });

// process.on("uncaughtException", (err, origin) => {
//     console.log(colors.gray("—————————————————————————————————"));
//     console.log(
//        colors.white("["),
//        colors.red.bold("AntiCrash"),
//        colors.white("]"),
//        colors.gray(" : "),
//        colors.white.bold("Uncaught Exception/Catch")
//     );
//     console.log(
//       colors.white("["),
//       colors.yellow.bold(`Motivo`),
//       colors.white("]"),
//       colors.gray(" : "),
//       colors.white.bold(err.message),
//     );
//     console.log(colors.gray("—————————————————————————————————"));
//     console.log(err, origin);

//     const embed2 = new EmbedBuilder()
//     .setAuthor({name: "Unhandled Rejection/Catch" })
//     .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
//     .setColor("#2F3136")
//     .setTimestamp()
//     .addFields(
//       { name: "Error", value: `${err}` },
//       { name: "Origin", value: `${origin}` }
//     )
//   return webhook.send({ content: `<@${ownerID}> Teve erro aqui disgraça`, embeds: [embed2] });
//         })
//     }
// }
