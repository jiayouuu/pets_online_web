export type UploadFileParams={
    chunk:Blob,
    fileId:string,
    chunkIndex:number,
    totalChunks:number,
    fileName:string;
    hash:string;
}