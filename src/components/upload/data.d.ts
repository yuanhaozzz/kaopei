export interface sign {
  action: String,
  serviceLine: String,
  mediaType: String,
  method: String,
  ext: String,
  contentType: String,
}

export interface UploadParam {
  url: string,
  file: any,
  headers: any,
  isSign: boolean
}