import { FileStorage } from "../storage/FileStorage";
import { ID_FILE_PATH } from "../utils/constants";

export class IdService {
  private storage: FileStorage;
  constructor() {
    this.storage = new FileStorage(ID_FILE_PATH);
  }

  async nextId(): Promise<number> {
    const idFile = await this.storage.load();
    if (idFile == null) {
      this.storage.save(1);
      return 1;
    }
    const id = parseInt(await idFile.text());
    if (isNaN(id)) {
      this.storage.save(1);
      return 1;
    }
    const nextId = id + 1;
    this.storage.save(nextId);
    return nextId;
  }
}
