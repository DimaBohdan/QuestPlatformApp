export interface ITaskCleanerService {
  clear(taskId: string): Promise<void>;
}