import { Client, ClientOptions, TeamMemberRole, User } from "discord.js";
import { CommandsHandler } from "./handlers/commands";
import { EventsHandler } from "./handlers/events";
import { Logger } from "./logger";
import config from "../../config.json";

export class Yuya extends Client {
    private readonly logger = new Logger("Yuya");
    public readonly handlers: { commands: CommandsHandler; events: EventsHandler };

    constructor(options: ClientOptions) {
        super(options);
        this.handlers = { commands: new CommandsHandler(this), events: new EventsHandler(this) };
        if (config.mobile) {
            const { DefaultWebSocketManagerOptions } = require("@discordjs/ws");
            DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord iOS";
        }
    }

    public async start(): Promise<void> {
        if (!this.token) {
            this.logger.error("The token is not provided.");
            return;
        }

        this.logger.info("Starting bot...");
        await this.login(this.token);
    }

    public async isOwner(id: string): Promise<boolean> {
        if (!this.application) return false;

        const application = await this.application.fetch();
        if (!application.owner) {
            this.logger.error(`Application "${application.name}" doesn't have an owner!`);
            return false;
        }

        if (application.owner instanceof User) return application.owner.id === id;
        else {
            return application.owner.members.some((member) => {
                return (
                    member.id === id &&
                    [TeamMemberRole.Admin, TeamMemberRole.Developer].includes(member.role)
                );
            });
        }
    }

    public get prefix(): string {
        return config.prefix;
    }
}
