interface TaskCleaner {
  clear(taskId: string): Promise<void>;
}
  