import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../models/commands";

export class PingSlashCommand extends SlashCommand {
    constructor() {
        super({ name: "ping", description: "Shows my latencies." });
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
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
    }
}
