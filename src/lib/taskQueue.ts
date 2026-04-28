/**
 * Async Message Queue for Background Tasks
 * Simulates a message broker within the client-side context to handle heavy computations.
 */

type Task<T = any> = {
  id: string;
  type: string;
  payload: any;
  priority: 'high' | 'normal' | 'low';
  execute: () => Promise<T>;
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
};

class AsyncQueue {
  private queue: Task[] = [];
  private processing = false;
  private maxConcurrent = 2; // Simulating "worker" threads
  private activeCount = 0;

  /**
   * Add a new task to the message queue
   */
  push<T>(task: Omit<Task<T>, 'id'>): string {
    const id = Math.random().toString(36).substr(2, 9);
    const newTask = { ...task, id } as Task;
    
    // Simple priority sorting (High -> Normal -> Low)
    if (newTask.priority === 'high') {
      this.queue.unshift(newTask);
    } else {
      this.queue.push(newTask);
    }

    console.log(`[Queue] Task added: ${newTask.type} (${id})`);
    this.processQueue();
    return id;
  }

  /**
   * Process the next task in the queue
   */
  private async processQueue() {
    if (this.activeCount >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const task = this.queue.shift();
    if (!task) return;

    this.activeCount++;
    console.log(`[Queue] Processing: ${task.type} (${task.id}). Active: ${this.activeCount}`);

    try {
      const result = await task.execute();
      if (task.onSuccess) task.onSuccess(result);
    } catch (error) {
      console.error(`[Queue] Error in task ${task.id}:`, error);
      if (task.onError) task.onError(error as Error);
    } finally {
      this.activeCount--;
      this.processQueue(); // Check for next task
    }
  }

  /**
   * Get the current length of the queue
   */
  get length() {
    return this.queue.length;
  }
}

export const msgQueue = new AsyncQueue();
