const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param {member} member 
     * @param {client} client 
     */
    async execute(member, client) {

        let role = await db.get(`${member.guild.id}_auto.AutoRole`)
        if (!role) {
            return;
        } else {
            member.roles.add(role).then(() => {
            })
        }
    }
}
