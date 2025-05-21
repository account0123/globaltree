export interface File {
  _id: string;
  tag: string;
  url: string;
  metadata:
    | {
        type: "Image";
        width: number;
        height: number;
      }
    | {
        type: "File";
      };
}

export class FileDTO {
  _id: string;
  tag: string;
  url: string;
  metadata: File["metadata"];

  constructor(file: File) {
    this._id = file._id;
    this.tag = file.tag;
    this.url = file.url;
    this.metadata = file.metadata;
  }
}
