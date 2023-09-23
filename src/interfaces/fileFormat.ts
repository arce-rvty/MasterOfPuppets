
export interface FileFormat{
  puppets: FileFormatPuppet[],
}

export interface  FileFormatPuppet{
  name: string,
  image: string,
  order: number
}
