const client = require("../../../index");
const colors = require('colors');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {client} client 
   */
  async execute(client) {

	const activities = [
		{ name: `By 🧡 Dm`, type: 2 },
		{ name: `Dúvidas? Utilize /help`, type: 0 },
		{ name: `${client.users.cache.size} Usuários`, type: 3 },
	];
	const status = [
		'online',
		// 'dnd'
		// 'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 10000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
// 0 = PLAYING
// 2 = LISTENING
// 3 = WATCHING
// 5 = COMPETING  
console.log(`${colors.blue("=======[ STATUS BOT ]======= ") + colors.green("-> ") + colors.cyan(`${client.user.username}`) + colors.cyan(" está online.")}`)
}};

/* MONGODB */
mongoose.set("strictQuery", true);
const mongo = process.env.MONGO_URL;

if (!mongo) {
  console.log(colors.red("=======[ MONGODB ]=======") + colors.yellow("-> ") + colors.red(" URI/URL do MongoDB não está sendo fornecido!"))
} else {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(colors.yellow("=======[ MONGODB ]=======") + colors.yellow("-> ") + colors.cyan(" Conectado com sucesso."))
  }).catch((err) => {
    console.log(colors.red("=======[ MONGODB ]=======") + colors.yellow("-> ") + colors.red(" Houve um erro ao tentar conectar no MongoDB!"))
    console.log(err)
  })
}