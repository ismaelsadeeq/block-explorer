//The explorer helper interfaces file.

//The interfaces for a decoded base58check which has a data and prefix. 
export interface decodedBase58Check {
  data:string,
  prefix:string
}

export interface searchType {
  type:string
  hash?:string
}