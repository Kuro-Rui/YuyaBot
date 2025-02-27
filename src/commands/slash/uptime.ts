import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "../../models/commands";
import { formatDuration } from "../../utils/time";

export const uptimeSlashCommand = new SlashCommand({
    name: "uptime",
    description: "Shows my uptime.",
});

uptimeSlashCommand.setExecutable(async (interaction: ChatInputCommandInteraction) => {
    const duration = formatDuration(Math.floor(interaction.client.uptime / 1000));
    const since = Math.floor(interaction.client.readyTimestamp / 1000);
    await interaction.reply(`I have been up for **${duration}** (since <t:${since}:F>)`);
});
