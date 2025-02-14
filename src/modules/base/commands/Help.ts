"use strict";

import type Context from "../../../utils/Context";
import Command from "../../../utils/Command";
import { Emotes } from "../../../utils/Constants";
import { ApplicationCommandOptionType, ColorResolvable, resolveColor } from "discord.js";

export default class extends Command {
	constructor() {
		super({
			name: "help",
			category: "utils",
			description: "Display all the commands of the bot",
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "command",
					description: "Get the help of this command",
					required: false
				}
			],
			examples: ["help", "help botinfo"]
		});
	}

	async run(ctx: Context) {
		if (ctx.args.getString("command")) {
			const command: Command = ctx.client.modules.findCommand(ctx.args?.getString("command")?.toLowerCase());
			if (!command) return ctx.reply(`The command \`${ctx.args.getString("command")}\` doesn't exist.`);
			return ctx.reply({
				embeds: [
					{
						color: resolveColor(ctx.client.config.bot.mainColor as ColorResolvable),
						title: `Help - ${command.name}`,
						description: command.description,
						image: {
							url: "https://cdn.discordapp.com/attachments/841212595343982601/881955847511613450/Divider_2.gif"
						},
						fields: [
							{
								name: "Exemples",
								value:
									command.examples.length > 0
										? command.examples.map(x => "`" + x + "`").join("\n")
										: "Aucun exemple",
								inline: true
							}
						]
					}
				]
			});
		}

		const category: string[] = [];

		ctx.client.commands.fetch.each((command: Command) => {
			if (!category.includes(command.category) && !command.disabled) {
				category.push(command.category);
			}
		});

		await ctx.reply({
			embeds: [
				{
					color: resolveColor(ctx.client.config.bot.mainColor as ColorResolvable),
					title: `${Emotes.SUCCESS} Help`,
					image: {
						url: "https://cdn.discordapp.com/attachments/841212595343982601/881955847511613450/Divider_2.gif"
					},
					fields: category.map(x => {
						return {
							name: x.toUpperCase(),
							value: ctx.client.commands.fetch
								.filter((cmd: Command) => cmd.category === x && !cmd.staffOnly)
								.map((cmd: Command) => `\`${cmd.name}\``)
								.join(", ")
						};
					})
				}
			],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: "Example button",
							style: 3,
							customId: `example:${ctx.author.id}:${ctx.guild.id}`
						}
					]
				}
			]
		});
	}
}
