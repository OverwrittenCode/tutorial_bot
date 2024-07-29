import { Events } from "discord.js";
import { Discord, On } from "discordx";
import { container } from "tsyringe";

import { Beans } from "~/framework/DI/Beans.js";

import type { ArgsOf, Client } from "discordx";

@Discord()
export class InteractionCreate {
	private static readonly MAX_SAFE_DEFER_RESPONSE_WAIT = 2500; // don't wait until 3000ms as there may be some delay
	private static readonly DISCORDX_PAGINATION_ID = "pagination"; // @discordx/pagination handled this for us

	@On({ event: Events.InteractionCreate })
	public async interactionCreate([interaction]: ArgsOf<Events.InteractionCreate>) {
		const hasRecievedTooLate =
			Date.now() > interaction.createdTimestamp + InteractionCreate.MAX_SAFE_DEFER_RESPONSE_WAIT;

		const isManaged =
			(interaction.isButton() || interaction.isStringSelectMenu()) &&
			interaction.customId.toLowerCase().includes(InteractionCreate.DISCORDX_PAGINATION_ID);

		if (hasRecievedTooLate || isManaged) {
			return;
		}

		const bot = container.resolve<Client>(Beans.IBotToken);

		bot.executeInteraction(interaction);
	}
}
