import { Message } from "discord.js";
import { PrefixCommand } from "../../models/commands";

export class ShutdownPrefixCommand extends PrefixCommand {
    constructor() {
        super({ name: "shutdown", aliases: ["die"], description: "Shuts down the bot." });
    }

    public async execute(message: Message): Promise<void> {
        await message.reply("Shutting down...");
        await message.client.destroy();
    }
}
