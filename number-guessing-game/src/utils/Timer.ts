export class Timer {
  private startTime?: number;

  start(): void {
    this.startTime = Date.now();
  }

  stop(): number {
    if (!this.startTime) throw new Error("Timer not started");
    const endTime = Date.now();
    const duration = endTime - this.startTime;
    this.startTime = undefined;
    return duration;
  }
}
