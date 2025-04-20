import { LogLevel } from "src/enums/LogLevel.enum";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  functionName: string;
  args: any[];
  returnValue?: any;
  error?: any;
  executionTimeMs?: number;
}