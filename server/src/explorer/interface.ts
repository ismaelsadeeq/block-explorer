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