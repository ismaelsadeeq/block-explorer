import { AxiosAdapter, AxiosBasicCredentials, AxiosProxyConfig, AxiosRequestTransformer, AxiosResponseHeaders, AxiosResponseTransformer, CancelToken, InternalAxiosRequestConfig, Method, RawAxiosResponseHeaders, TransitionalOptions } from "axios";

export interface block {
  hash:string,
  confirmations:number
  height:number
  version: number,
  versionHex: number,
  merkleroot: string,
  time: number,
  mediantime: number,
  nonce: number,
  bits: string,
  difficulty: number,
  chainwork: string,
  nTx: number,
  previousblockhash: string,
  strippedsize: number,
  size: number,
  weight: number,
  tx: Array<string>
}


export interface configData {
  jsonrpc:string,
  id:string,
  method:string,
  params:any[]
}


export interface responseType<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  request?: any;
}
export class getConfig {
  constructor(
    private readonly params:any[],
    private readonly method:string
    ){
  }
  getConfig():configData{
    
    return {
        "jsonrpc":"1.0",
        "id":"curltext",
        "method":this.method,
        "params":this.params
      
    }
  }
}
