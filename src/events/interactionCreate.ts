import { Events } from "discord.js";
import { Discord, On } from "discordx";
import { container } from "tsyringe";

import { Beans } from "~/framework/DI/Beans.js";

import type { ArgsOf, Client } from "discordx";

@Discord()
export class InteractionCreate {
	@On({ event: Events.InteractionCreate })
	interactionCreate([interaction]: ArgsOf<Events.InteractionCreate>): void {
		const bot = container.resolve<Client>(Beans.IBotToken);

		bot.executeInteraction(interaction);
	}
}
