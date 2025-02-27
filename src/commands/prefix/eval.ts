import { Message } from "discord.js";
import * as discord from "discord.js";
import { inspect } from "util";
import { Yuya } from "../../models/bot";
import { PrefixCommand } from "../../models/commands";
import * as utils from "../../utils";

export const evalPrefixCommand = new PrefixCommand({
    name: "eval",
    description: "Execute asynchronous code.",
});

evalPrefixCommand.setExecutable(async (message: Message, ...args: string[]) => {
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
        const result = (message.client as Yuya).cleanMessage(
            inspect(
                await new Function(
                    ...Object.keys(env),
                    `return (async () => { ${args.join(" ")} })();`,
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
});
