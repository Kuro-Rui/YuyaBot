import { Message } from "discord.js";
import { Event } from "./event";
import { Yuya } from "../models/bot";
import { Logger } from "../models/logger";

export class PrefixCommandEvent extends Event {
    public readonly name = "messageCreate";
    protected _logger = new Logger("Events.PrefixCommand");

    public async handle(message: Message): Promise<void> {
        if (message.author.bot) return;

        const prefixes = [(message.client as Yuya).prefix, String(message.client.user)];
        let usedPrefix;
        for (const prefix of prefixes) {
            if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
                usedPrefix = prefix;
                break;
            }
        }
        if (!usedPrefix) return;

        // TODO: Better argument parsing (quoted words counts as 1 argument)
        // const regex = /"([^"]*)"|\S+/g;
        // const args: string[] = [];
        // for (
        //     let match;
        //     match;
        //     match = regex.exec(message.content.slice(usedPrefix.length).trim())
        // ) {
        //     args.push(match[1] || match[0]);
        // }

        const args = message.content
            .slice(usedPrefix.length)
            .trim()
            .split(/[^\S\n\r]+/g);
        const commandName = args.shift()?.toLowerCase();
        if (!commandName) return;

        await (message.client as Yuya).handlers.commands.handlePrefixCommand(
            message,
            commandName,
            ...args,
        );
    }
}
