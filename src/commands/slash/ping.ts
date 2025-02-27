import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../models/commands";

export const pingSlashCommand = new SlashCommand({
    name: "ping",
    description: "Shows my latencies.",
});

pingSlashCommand.setExecutable(async (interaction: ChatInputCommandInteraction) => {
    const embed = new EmbedBuilder({ title: "Pinging..." }).setColor("Red").addFields({
        name: "Discord WS",
        value: `\`\`\`ts\n${interaction.client.ws.ping} ms\n\`\`\``,
        inline: true,
    });
    const before = performance.now();
    const message = await interaction.reply({ embeds: [embed] });
    const after = performance.now();
    const delay = Math.round(after - before);
    embed
        .setTitle("Pong!")
        .setColor("Blue")
        .addFields({ name: "Typing", value: `\`\`\`ts\n${delay} ms\n\`\`\``, inline: true });
    await message.edit({ embeds: [embed] });
});
