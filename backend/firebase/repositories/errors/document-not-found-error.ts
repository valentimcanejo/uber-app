export class DocumentNotFoundError extends Error {
  constructor(collectionName: string) {
    super(`Document of collection ${collectionName} doesn't exist`);
  }
}
