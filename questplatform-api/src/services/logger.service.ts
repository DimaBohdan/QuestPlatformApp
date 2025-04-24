import * as fs from 'fs';
import * as path from 'path';
import { LogLevel } from 'src/enums/LogLevel.enum';
import { LogEntry } from 'utils/interfaces/log-entry.interface';
import { LoggerOptions } from 'utils/interfaces/logger.options';

export class LoggerService {
  constructor(private options: LoggerOptions = { toConsole: true, toFile: false, structured: false, level: LogLevel.INFO }) {}

  log(entry: LogEntry) {
    const minLevel = this.options.level;
    if (entry.level > minLevel) return;
    const formatted = this.options.structured
      ? JSON.stringify(entry)
      : this.options.formatter?.(entry) ?? this.defaultFormatter(entry);
    if (this.options.toConsole) {
      console.log(formatted);
    }
    if (this.options.toFile) {
      fs.appendFileSync(path.join(process.cwd(), 'logs', 'app.log'), formatted + '\n');
    }
  }
  private defaultFormatter(entry: LogEntry): string {
    const base = `[${entry.timestamp}] [${LogLevel[entry.level]}] ${entry.functionName}`;
    if (entry.error) return `${base} threw error: ${entry.error}`;
    return `${base} called with args: ${JSON.stringify(entry.args)} returned: ${JSON.stringify(entry.returnValue)} in ${entry.executionTimeMs}ms`;
  }
}
