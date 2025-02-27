import {
    ApplicationCommand,
    ChatInputCommandInteraction,
    Collection,
    Message,
    MessageFlags,
} from "discord.js";
import { Yuya } from "../bot";
import { PrefixCommand, SlashCommand } from "../commands";
import { Logger } from "../logger";
import { allPrefixCommands, allSlashCommands } from "../../commands";

export class CommandsHandler {
    public readonly bot: Yuya;
    private readonly logger = new Logger("CommandsHandler");
    // TODO: Cooldowns handling
    private cooldowns: Collection<string, Collection<string, number>> = new Collection();
    public readonly prefixCommands: Collection<string, PrefixCommand> = new Collection();
    public readonly slashCommands: Collection<string, SlashCommand> = new Collection();

    constructor(bot: Yuya) {
        this.bot = bot;
    }

    public async initialize(): Promise<void> {
        this.logger.info("Initializing commands...");
        this.loadPrefixCommands();
        this.loadSlashCommands();
        await this.refreshSlashCommands();
    }

    public loadPrefixCommands(commands: PrefixCommand[] = allPrefixCommands): void {
        commands.forEach((command) => {
            this.prefixCommands.set(command.name, command);
            if (command.cooldown > 0) this.cooldowns.set(command.name, new Collection());
        });
        this.logger.info(`Loaded ${commands.length} prefix commands.`);
    }

    public loadSlashCommands(commands: SlashCommand[] = allSlashCommands): void {
        commands.forEach((command) => {
            this.slashCommands.set(command.data.name, command);
            if (command.cooldown > 0) this.cooldowns.set(command.data.name, new Collection());
        });
        this.logger.info(`Loaded ${commands.length} slash commands.`);
    }

    public async refreshSlashCommand(command: SlashCommand): Promise<void> {
        if (!(this.bot.application && this.bot.application.commands.cache.size)) return;

        const applicationCommand = this.bot.application.commands.cache.find(
            (c) => c.name === command.data.name,
        );
        if (!applicationCommand) {
            this.logger.error(`Slash command "${command.data.name}" not found.`);
            return;
        }

        try {
            await this.bot.application.commands.edit(applicationCommand, command.data);
            this.logger.info(`Successfully refreshed slash command "${applicationCommand.name}"!`);
        } catch (error) {
            this.logger.error(
                `An error occured when refreshing slash command "${applicationCommand.name}":`,
                error,
            );
        }
    }

    public async refreshSlashCommands(commands: SlashCommand[] = allSlashCommands): Promise<void> {
        if (!this.bot.application) return;

        this.logger.info(`Refreshing ${commands.length} application commands...`);
        try {
            await this.bot.application.commands.set(
                commands.map((slashCommand) => slashCommand.data),
            );
            this.logger.info(`Successfully refreshed ${commands.length} slash commands!`);
        } catch (error) {
            this.logger.error(`An error occured when refreshing slash commands:`, error);
        }
    }

    public getPrefixCommand(name: string): PrefixCommand | undefined {
        for (const [commandName, command] of this.prefixCommands.entries()) {
            if (
                commandName === name.toLowerCase() ||
                command.aliases.some((alias) => alias === name.toLowerCase())
            ) {
                return command;
            }
        }
    }

    public getSlashCommand(name: string): SlashCommand | undefined {
        return this.slashCommands.get(name.toLowerCase());
    }

    public getApplicationCommand(name: string): ApplicationCommand | undefined {
        if (!this.bot.application) {
            this.logger.info(
                `I can't get application command "${name}" because the application is not cached yet.`,
            );
            return;
        }

        return this.bot.application.commands.cache.find((c) => c.name === name.toLowerCase());
    }

    public async fetchApplicationCommand(name: string): Promise<void> {
        if (!this.bot.application) {
            this.logger.info(
                `I can't fetch application command "${name}" because the application is not cached yet.`,
            );
            return;
        }

        const id = this.getApplicationCommand(name)?.id;
        if (!id) {
            this.logger.error(`Application command "${name}" not found.`);
            return;
        }

        try {
            const appCommand = await this.bot.application.commands.fetch(id);
            this.logger.info(`Fetched application command "${appCommand.name}".`);
        } catch (error) {
            this.logger.error(
                `An error occured when fetching application command "${name}":`,
                error,
            );
        }
    }

    public async fetchApplicationCommands(): Promise<void> {
        if (!this.bot.application) {
            this.logger.info(
                "I can't fetch application commands because the application is not cached yet.",
            );
            return;
        }

        try {
            const appCommands = await this.bot.application.commands.fetch();
            if (!appCommands.size) return;
            this.logger.info(`Fetched ${appCommands.size} application commands.`);
        } catch (error) {
            this.logger.error("An error occured when fetching application commands:", error);
        }
    }

    public async handlePrefixCommand(
        message: Message,
        name: string,
        ...args: string[]
    ): Promise<void> {
        const command = this.getPrefixCommand(name);
        if (!command) {
            this.logger.error(`Prefix command "${name}" not found.`);
            return;
        }
        if (!(await command.check(message))) return;

        try {
            await command.execute(message, ...args);
        } catch (error) {
            this.logger.error(
                `An error occured while running prefix command "${command.name}":`,
                error,
            );
            await message.reply({
                content: "An error occured while running this command.",
                allowedMentions: { repliedUser: false },
            });
        }
    }

    public async handleSlashCommand(interaction: ChatInputCommandInteraction): Promise<void> {
        const command = this.getSlashCommand(interaction.commandName);
        if (!command) {
            this.logger.error(`Slash command "${interaction.commandName}" not found.`);
            return;
        }
        if (!(await command.check(interaction))) {
            await command.reply(interaction, {
                content: "You don't have permission to run this command.",
                flags: [MessageFlags.Ephemeral],
            });
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            this.logger.error(
                `An error occured while running slash command "${command.data.name}":`,
                error,
            );
            await command.reply(interaction, {
                content: "An error occured while running this command.",
                flags: [MessageFlags.Ephemeral],
            });
        }
    }
}
