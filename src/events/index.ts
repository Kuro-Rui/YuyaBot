import { Event } from "./event";
import { PrefixCommandEvent } from "./prefixCommand";
import { ReadyEvent } from "./ready";
import { SlashCommandEvent } from "./slashCommand";

export const allEvents = [
    new PrefixCommandEvent(),
    new ReadyEvent(),
    new SlashCommandEvent(),
] as Event[];
