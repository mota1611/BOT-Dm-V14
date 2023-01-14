const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'role',
	description: "[Moderation] adicione cargo ao mesmo",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	options: [
        {
            name: 'add',
            description: 'Adicione cargo ao membro.',
            type: 1,
            options: [
                {
                    name: 'role',
                    description: 'Cargo que deseja adicionar.',
                    type: 8,
                    required: true
                },
                {
                    name: 'user',
                    description: 'Usuário que irá receber o cargo.',
                    type: 6,
                    required: true
                }
            ]
        }
    ],
	run: async (client, interaction) => {
	 if(interaction.options._subcommand === 'add') {
            try {
                const member = interaction.guild.members.cache.get(interaction.options.get('user').value);
                const role = interaction.options.get('role').role;
    
                await member.roles.add(role.id);
                const embed = new EmbedBuilder()
                .setDescription(`O cargo foi adicionado com sucesso ${role} to ${member}`)
                .setColor(`#2F3136`)
                return interaction.reply({ embeds: [embed] })
            } catch {
                return interaction.reply({ content: `Não consegui adionar o cargo ao membro...`, ephemeral: true });
            }

        }
    }
};
