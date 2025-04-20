import { LogEntry } from "./log-entry.interface";

export interface LoggerOptions {
  toConsole?: boolean;
  toFile?: boolean;
  structured?: boolean;
  formatter?: (entry: LogEntry) => string;
}