import { Yuya } from "../bot";
import { allEvents } from "../../events";
import { Event } from "../../events/event";

export class EventsHandler {
    public readonly bot: Yuya;
    public readonly events = allEvents;

    constructor(bot: Yuya) {
        this.bot = bot;
        for (const event of this.events) {
            this.bot.on(event.name, event.handle.bind(event));
        }
    }

    public getEvent(name: string): Event | undefined {
        return this.events.find((event) => event.constructor.name == name);
    }
}
