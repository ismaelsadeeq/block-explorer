//Creating interface for bitcoind interface and axios object types


import { AxiosResponseHeaders, RawAxiosResponseHeaders,} from "axios";

//The bitcoin-d config object variables and their types

export interface configData {
  jsonrpc:string,
  id:string,
  method:string,
  params:any[]
}


// Creating the axios responseType interface 
export interface responseType<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  request?: any;
}


// Creating a class for initializing and returning instance of config-data for bitcoind
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
