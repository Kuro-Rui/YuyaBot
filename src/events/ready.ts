import { Event } from "./event";
import { Yuya } from "../models/bot";
import { Logger } from "../models/logger";

export class ReadyEvent extends Event {
    public readonly name = "ready";
    protected _logger = new Logger("Events.Ready");

    public async handle(client: Yuya): Promise<void> {
        this.logger.info(`${client.user?.username} is online! Initializing commands...`);
        await client.handlers.commands.initialize();
    }
}
