export interface File {
  id: string;
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
  id: string;
  tag: string;
  url: string;
  metadata: File["metadata"];

  constructor(file: File) {
    this.id = file.id;
    this.tag = file.tag;
    this.url = file.url;
    this.metadata = file.metadata;
  }
}
