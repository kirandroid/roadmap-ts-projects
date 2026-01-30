export class FileStorage {
  private saveFilePath: string;
  constructor(filePath: string) {
    this.saveFilePath = filePath;
  }

  async save(data: any): Promise<void> {
    await Bun.write(this.saveFilePath, data);
  }

  async load(): Promise<Bun.BunFile | null> {
    const file = Bun.file(this.saveFilePath);
    if (file.size === 0) {
      return null;
    }
    return file;
  }
}
