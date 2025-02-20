import { DebugPrefixCommand } from "./prefix/debug";
import { EvalPrefixCommand } from "./prefix/eval";
import { HelpPrefixCommand } from "./prefix/help";
import { ShutdownPrefixCommand } from "./prefix/shutdown";
import { HelpSlashCommand } from "./slash/help";
import { PingSlashCommand } from "./slash/ping";
import { UptimeSlashCommand } from "./slash/uptime";
import { PrefixCommand, SlashCommand } from "../models/commands";

// Prefix commands is ONLY for dev commands
export const allPrefixCommands = [
    new DebugPrefixCommand(),
    new EvalPrefixCommand(),
    new HelpPrefixCommand(),
    new ShutdownPrefixCommand(),
] as PrefixCommand[];

export const allSlashCommands = [
    new HelpSlashCommand(),
    new PingSlashCommand(),
    new UptimeSlashCommand(),
] as SlashCommand[];
