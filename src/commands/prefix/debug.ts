import { Client, Message } from "discord.js";
import discord from "discord.js";
import { inspect } from "util";
import { PrefixCommand } from "../../models/commands";
import * as utils from "../../utils";

export class DebugPrefixCommand extends PrefixCommand {
    constructor() {
        super({ name: "debug", description: "Evaluate a statement of JavaScript code." });
    }

    private clean(client: Client, result: string): string {
        let cleaned = client.token ? result.replace(client.token, "[REDACTED]") : result;
        return cleaned;
    }

    public async execute(message: Message, ...args: string[]): Promise<void> {
        if (!args.length) return;
        if (args[0].startsWith("```")) {
            args[0] = args[0].replace(/^```(?:js|javascript|ts|typescript)?\n/, "");
        }
        if (args[args.length - 1].endsWith("```")) {
            args[args.length - 1] = args[args.length - 1].replace(/\n```$/, "");
        }

        const env = {
            message: message,
            client: message.client,
            author: message.author,
            channel: message.channel,
            guild: message.guild,
            discord: discord,
            utils: utils,
        };

        try {
            const result = this.clean(
                message.client,
                inspect(
                    await new Function(
                        ...Object.keys(env),
                        `return (async () => return ${args.join(" ")})();`,
                    )(...Object.values(env)),
                    {
                        breakLength: 40,
                        maxStringLength: 1900,
                        compact: false,
                    },
                ),
            );
            await message.react("✅");
            if (result === "undefined") return;
            await message.reply(`\`\`\`ts\n${result}\n\`\`\``);
        } catch (error) {
            await message.reply(`\`\`\`xl\n${error}\n\`\`\``);
        }
    }
}
