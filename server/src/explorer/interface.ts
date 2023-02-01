export interface block {
  hash:string,
  confirmations:number
  height:number
  versio: 536870912,
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
