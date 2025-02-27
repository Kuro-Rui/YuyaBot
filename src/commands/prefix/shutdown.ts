import { Message } from "discord.js";
import { PrefixCommand } from "../../models/commands";

export const shutdownPrefixCommand = new PrefixCommand({
    name: "shutdown",
    aliases: ["die"],
    description: "Shuts down the bot.",
});

shutdownPrefixCommand.setExecutable(async (message: Message) => {
    await message.reply("Shutting down...");
    await message.client.destroy();
});
