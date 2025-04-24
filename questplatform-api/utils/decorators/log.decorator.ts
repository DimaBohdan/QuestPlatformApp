import { LogLevel } from "src/enums/LogLevel.enum";
import { LoggerService } from "src/services/logger.service";

const defaultLogger = new LoggerService({
  toConsole: false,
  toFile: true,
  structured: false,
  level: LogLevel.INFO,
});

export function Log(level: LogLevel = LogLevel.INFO, logger = defaultLogger): MethodDecorator {
  return (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value;
    if (!originalMethod) return descriptor;
    descriptor.value = async function (...args: any[]) {
      const functionName = propertyKey.toString();
      const start = Date.now();
      try {
        const result = await originalMethod.apply(this, args);
        logger.log({
          timestamp: new Date().toISOString(),
          level,
          functionName,
          args,
          returnValue: result,
          executionTimeMs: Date.now() - start,
        });
        return result;
      } catch (error) {
        logger.log({
          timestamp: new Date().toISOString(),
          level: LogLevel.ERROR,
          functionName,
          args,
          error: error?.message ?? error,
          executionTimeMs: Date.now() - start,
        });
        throw error;
      }
    };
    return descriptor;
  };
}
