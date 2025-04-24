import { LogLevel } from "src/enums/LogLevel.enum";
import { LogEntry } from "./log-entry.interface";

export interface LoggerOptions {
  toConsole?: boolean;
  toFile?: boolean;
  structured?: boolean;
  level: LogLevel;
  formatter?: (entry: LogEntry) => string;
}