export class UnknownError extends Error {
  public isCrashable = false;
  constructor(error: Error) {
    super(error.message);
    this.name = error.name;
    this.stack = error.stack;
  }
}
