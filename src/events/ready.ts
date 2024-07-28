import { Events } from "discord.js";
import { Discord, On } from "discordx";
import { container } from "tsyringe";

import { Beans } from "~/framework/DI/Beans.js";

import type { ArgsOf, Client } from "discordx";

@Discord()
export class Ready {
	@On({ event: Events.ClientReady })
	clientReady([_client]: ArgsOf<Events.ClientReady>): void {
		const bot = container.resolve<Client>(Beans.IBotToken);

		bot.initApplicationCommands();

		console.log("Bot started");
	}
}
