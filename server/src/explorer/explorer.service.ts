import { Injectable, Logger } from '@nestjs/common';
import { BitcoindInterfaceService } from 'src/bitcoind-interface/bitcoind-interface.service';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { responseType } from 'src/bitcoind-interface/interface';
import { decodedBase58Check } from './interface';
import * as crypto from 'crypto'

@Injectable()
export class ExplorerService {
  private readonly base58check:any = require('base58check')
  private readonly OP_DUP:string = "76"; 
  private readonly OP_HASH160:string = "a9";
  private readonly OP_EQUALVERIFY:string = "88";
  private readonly OP_CHECKSIG:string ="ac"
  private readonly TO_PUSH:string = '14'
  constructor(
    private readonly responseHandlerService:ResponseHandlerService = ResponseHandlerService.instance,
    private readonly bitcoindService:BitcoindInterfaceService
  ){}

  async getTopBlocks():Promise<ResponseData>{
    try {
      
      const chainTipHash:string = "getbestblockhash"
      let parameters:Array<string> = []
      const chainTip:responseType<any>  = await this.bitcoindService.bitcoindGet(chainTipHash,parameters)
      let currentHash:string = chainTip.data.result
      
      const blocks:Array<any> = []
      const method:string = "getblock"
      parameters = [currentHash]
      let block:responseType<any>  = await this.bitcoindService.bitcoindGet(method,parameters)
      blocks.push(block.data.result)

      for(let i = 0;i<4;i++){
        parameters = [block.data.result.previousblockhash]
        block = await this.bitcoindService.bitcoindGet(method,parameters)
        blocks.push(block.data.result)
      }

      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(blocks,response);


    } catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get blocks",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }

  async getTopTransaction():Promise<ResponseData>{
    try  {
      const chainTipHash:string = "getbestblockhash"
      let parameters:Array<string| boolean> = []
      const chainTip:responseType<any> = await this.bitcoindService.bitcoindGet(chainTipHash,parameters)

      let currentHash:string = chainTip.data.result
      let method:string = "getblock"
      parameters = [currentHash]
      let transactions: Array<string | any> = []
      let block:responseType<any>  = await this.bitcoindService.bitcoindGet(method,parameters)
      transactions = [...block.data.result.tx]

      while(transactions.length < 5){
        parameters = [block.data.result.previousblockhash]
        block = await this.bitcoindService.bitcoindGet(method,parameters)
        transactions.push(...block.data.result.tx)
      }
      method = 'getrawtransaction';

      for(let i=0;i<transactions.length;i++){
        parameters = [transactions[i],true]
        const transaction = await this.bitcoindService.bitcoindGet(method,parameters)
        transactions[i] = transaction.data.result
      }
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(transactions,response);

      
    }catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get transactions",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }

  async searchBlockHeight(height:number):Promise<ResponseData>{
    try {
      let method:string = "getblockhash"
      let parameters:Array<number | boolean | string> = [height]
      const blockHash:string = (await this.bitcoindService.bitcoindGet(method,parameters)).data.result
      method = 'getblock'
      parameters = [blockHash,true];
      const block:any =  (await this.bitcoindService.bitcoindGet(method,parameters)).data.result

      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(block,response);

    } catch (error:unknown) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get block",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }

  async searchBlockHash(hash:string):Promise<ResponseData>{
    try {
      const method = 'getblock'
      const parameters = [hash,true];
      const block:any =  (await this.bitcoindService.bitcoindGet(method,parameters)).data.result
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(block,response);

    } catch (error:unknown) {
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get block",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }

  async searchForTransactionId(transactionId:string):Promise<ResponseData>{
    try  {
      const method = 'getrawtransaction';
      const parameters = [transactionId]
      const block = (await this.bitcoindService.bitcoindGet(method,parameters)).data.result
  
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(block,response);

    }catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get transactions",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }
  async getAddressBalance(address:string):Promise<ResponseData>{
    try  {
      const scriptHash:string = this.scriptHash(address);

      const parameters:Array<string> = [scriptHash];

      const method:string = "blockchain.scripthash.get_balance";
      const block:string = await this.bitcoindService.electr(parameters,method)
  
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(block,response);

    }catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get transactions",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(undefined,response)
    }
  }
  scriptHash(address:string):string{
    const prefix:string = address.slice(0,1)
    switch(prefix){
      case  "1":{
        return this.getP2PKH(address)
      }
      // To be implemented
      case "3":{
        return "script"
      }
      // To be implemeted
      case "b":{
        return "witness"
      }
    }
  }
  getP2PKH(address:string):string{
    //Decode the address to a public key hash
    let { data }:decodedBase58Check = this.base58check.decode(address,"hex");

    //Create a script pub by adding the opcodes for a P2PKH
    let scriptPubKey = this.OP_DUP + this.OP_HASH160 + this.TO_PUSH + data + this.OP_EQUALVERIFY + this.OP_CHECKSIG;

    //Hash the script pub key with sha256
    scriptPubKey = crypto.createHash('sha256')
    .update(Buffer.from(scriptPubKey, 'hex'))
    .digest('hex');

    //Reverse the hash of the scriptPubKey
    scriptPubKey = this.reverseHash(scriptPubKey)

    //Return the reversed hash as the script pub key.
    return scriptPubKey
  }
  reverseHash(scriptHash:string):string{
    //create reversed hash string
    let reversedHash:string = '';
    /*Loop througt the hash if and reverse it.

    The reversal algorithm takes two characters from the end, reverse them and append.
    to the reversedHash variable untill the characters are exhausted.

    e.g df018b is 8b01df
    
    The scriptHash is 64 characters hence if it's odd the its at the
    second character of the first two characters to be reversed you append the 
    first character, but if it's even its at the first, which is already appended,
    hence the second character is appended.
    */ 
    for(let i:number = scriptHash.length - 1;i>=0;i--){
      
      reversedHash += i % 2 != 0 ? scriptHash[i-1]:scriptHash[i+1]
    }
    return reversedHash;
  }
}
