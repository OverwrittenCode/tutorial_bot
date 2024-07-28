import "dotenv/config.js";
import "reflect-metadata";

import { dirname, importx } from "@discordx/importer";
import { NotBot } from "@discordx/utilities";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import { Beans } from "src/models/framework/DI/Beans.js";
import { container } from "tsyringe";

abstract class Main {
	private static readonly bot = new Client({
		intents: [
			IntentsBitField.Flags.Guilds,
			IntentsBitField.Flags.GuildMembers,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.GuildMessageReactions,
			IntentsBitField.Flags.GuildVoiceStates
		],

		silent: false,

		allowedMentions: {
			parse: ["users"]
		},

		guards: [NotBot],

		simpleCommand: {
			prefix: "!"
		}
	});

	public static async run() {
		container.registerInstance<Client>(Beans.IBotToken, this.bot);

		await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

		if (!process.env.BOT_TOKEN) {
			throw Error("Could not find BOT_TOKEN in your environment");
		}

		await this.bot.login(process.env.BOT_TOKEN);
	}
}

Main.run();
