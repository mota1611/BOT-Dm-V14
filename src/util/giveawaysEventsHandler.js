const { readdirSync } = require('fs');
require('colors');

module.exports = (client) => {
    if(client.config.giveawayManager.privateMessageInformation) {
        readdirSync('./src/sorteio/').forEach(async (dir) => {
            const events = readdirSync(`./src/sorteio/${dir}`).filter(file => file.endsWith('.js'));
        
            for(const file of events) {
                const event = require(`${__dirname}/../sorteio/${dir}/${file}`);
                if(event.name) {
                    console.log(`[SORTEIO EVENTS]`.cyan + ` Event ${file.split(".")[0]} carregado!`);
                
                    client.giveawaysManager.on(event.name, (...args) => event.execute(...args, client))
                    delete require.cache[require.resolve(`${__dirname}/../sorteio/${dir}/${file}`)];
                } else {
                    console.log(`[SORTEIO EVENTS]`.red + ` Falha ao carregar evento: ${file.split('.')[0]}!`);
                    continue;
                }
            }
        });
    } else {
        return console.log(`[WARNING]`.yellow + ` As informações da mensagem privada estão desativadas!`);
    }

}