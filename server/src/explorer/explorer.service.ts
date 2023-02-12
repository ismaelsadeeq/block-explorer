import { Injectable, Logger } from '@nestjs/common';
import { BitcoindInterfaceService } from 'src/bitcoind-interface/bitcoind-interface.service';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { responseType } from 'src/bitcoind-interface/interface';
import { decodedBase58Check } from './interface';
import * as crypto from 'crypto';
import { bech32, Decoded } from 'bech32';


@Injectable()
export class ExplorerService {

  
  private readonly base58check:any = require('base58check')
  private readonly OP_DUP:string = "76"; 
  private readonly OP_HASH160:string = "a9";
  private readonly OP_EQUALVERIFY:string = "88";
  private readonly OP_CHECKSIG:string ="ac";
  private readonly TO_PUSH:string = '14';
  private readonly OP_EQUAL:string = "87";
  private readonly SEGWIT_VERSION_0 = "00";
  private readonly SEGWIT_VERSION_1 = "51";

  constructor(
    private readonly responseHandlerService:ResponseHandlerService = ResponseHandlerService.instance,
    private readonly bitcoindService:BitcoindInterfaceService
  ){}

  async getTopBlocks():Promise<ResponseData>{
    try {
      
      //Declare the method for the best block hash and also the parameters which is empty
      let method:string = "getbestblockhash"
      let parameters:Array<string> = []

      // Get the best block hash from bitcoin node service
      const chainTip:responseType<any>  = await this.bitcoindService.bitcoindGet(method,parameters)
      let currentHash:string = chainTip.data.result
      
       //Assign the method for getting block with hash and also the parameters which is the block hash
      method = "getblock"
      parameters = [currentHash]

      // Get the top block from bitcoin node service with it's hash
      let block:responseType<any>  = await this.bitcoindService.bitcoindGet(method,parameters)

      //Declare the blocks and push the current block
      const blocks:Array<any> = []
      blocks.push(block.data.result)

      //Get remaining previous blocks
      let previousBlocks:number = 4

      for(let i = 0;i<previousBlocks;i++){
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
      return this.responseHandlerService.responseBody({},response)
    }
  }

  async getTopTransaction():Promise<ResponseData>{
    try  {
       //Declare the method for the best block hash and also the parameters which is empty
      let method:string = "getbestblockhash"
      let parameters:Array<string| boolean> = []

       // Get the best block hash from bitcoin node service
      const chainTip:responseType<any> = await this.bitcoindService.bitcoindGet(method,parameters)
      let currentHash:string = chainTip.data.result

      //assign the method for getting block with hash and also the parameters which is the block hash
      method = "getblock"
      parameters = [currentHash]

      
      // Get the top block from bitcoin node service with it's hash
      let block:responseType<any>  = await this.bitcoindService.bitcoindGet(method,parameters)

      // Declare transactions variable and append the transactions of the best block
      // to the block transactions.
      let blockTransactions:Array<any> = [...block.data.result.tx]
      let transactions: Array<string> = []

      // i is the number of transaction count
      // j is the number of transactions of the current block added.
      let i:number =0,j:number = 0;

      // Total number of transaction to be retrieved.

      let numberOfTransactions:number = 10;

      /* Add all the transactions in the current block and if the block
          current transactions retrieved finished while we did not reach 
          the numberOfTransactions needed get another block and repeat.
      */
      while(i < numberOfTransactions){
        if(j==blockTransactions.length){
          parameters = [block.data.result.previousblockhash]
          block = await this.bitcoindService.bitcoindGet(method,parameters)
          blockTransactions = [...block.data.result.tx]
          j = 0
        }
        transactions.push(blockTransactions[j])
        i+=1
        j+=1
      }

      //Get all the raw transactions decoded.
      method = 'getrawtransaction';

      for(let i=0;i<transactions.length;i++){
        // tthe true is added in other to get the decoded transaction
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
      return this.responseHandlerService.responseBody({},response)
    }
  }

  async searchBlockHeight(height:number):Promise<ResponseData>{
    try {
      //Declare the method for getting the block hash and add the block height as the paramether
      let method:string = "getblockhash"
      let parameters:Array<number | boolean | string> = [height]

      //Get the block hash of the height
      const blockHash:string = (await this.bitcoindService.bitcoindGet(method,parameters)).data.result


    
      //Assign the method for getting the block and add the block hash as the paramether
      method = 'getblock'
      parameters = [blockHash,true];

      // Get the block from bitcoin node service
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
      return this.responseHandlerService.responseBody({},response)
    }
  }

  async searchBlockHash(hash:string):Promise<ResponseData>{
    try {
      //Declare the method for getting the block and add the block hash as the paramether
      const method:string = 'getblock'
      const parameters:Array<string | boolean> = [hash,true];
      
      //Get the block from bitcoin node service
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
      return this.responseHandlerService.responseBody({},response)
    }
  }

  async searchForTransactionId(transactionId:string):Promise<ResponseData>{
    try  {
      
      //Declare the method for getting transaction and add the transaction Id as the paramether
      const method:string = 'getrawtransaction';
      const parameters:Array<string |boolean> = [transactionId,true]

       //Get the transaction from bitcoin node service
      const transaction:string = (await this.bitcoindService.bitcoindGet(method,parameters)).data.result
  
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }

      return this.responseHandlerService.responseBody(transaction,response);

    }catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get transactions",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody({},response)
    }
  }
  async getAddressBalance(address:string):Promise<ResponseData>{
    try  {
      // Parse an address into a scriptHash
      const scriptHash:string = this.scriptHash(address);

      // Add the script hash to the parameters
      const parameters:Array<string> = [scriptHash];

      // Declare the electrs method to get balance
      const method:string = "blockchain.scripthash.get_balance";


      //Get the balance from bitcoin node service
      const balance:any = await this.bitcoindService.electr(parameters,method)
  
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(balance,response);

    }catch(error:unknown){
      Logger.log(error)
      const response:Meta = {
        status:false,
        message:"failed to get address balance",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody({},response)
    }
  }
  async getAddressTransactions(address:string):Promise<ResponseData>{
    try  {
      // Parse an address into a scriptHash
      const scriptHash:string = this.scriptHash(address);

      // Add the script hash to the parameters
      const parameters:Array<string> = [scriptHash];

      // Declare the electrs method to get address transactions
      const method:string = "blockchain.scripthash.get_history";
      
      //Get the balance from bitcoin node service
      const transactions:any = await this.bitcoindService.electr(parameters,method)
  
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
      return this.responseHandlerService.responseBody({},response)
    }
  }




  //HELPER METHODS FOR CREATING SCRIPT HASH FROM AN ADDRESS
  scriptHash(address:string):string{
    const prefix:string = address.slice(0,1)
    switch(prefix){
      // P2PKH address types
      case  "1" :{
        return this.getP2PKH(address);
      }
      case  "m":{
        return this.getP2PKH(address);
      }
      case  "n":{
        return this.getP2PKH(address);
      }
      // P2SH address types
      case "3":{
        return this.getP2SH(address);
      }
      case "2":{
        return this.getP2SH(address);
      }
      // Pay to Witness address types
      case "b" :{
        return this.getSegwitAddress(address);
      }
      case "t":{
        return this.getSegwitAddress(address);
      }

    }
  }
  getP2PKH(address:string):string{
    //Decode the address to get the public key hash
    let { data }:decodedBase58Check = this.base58check.decode(address,"hex");

    //Create a script pub key  by adding the opcodes for a P2PKH
    let scriptPubKey = this.OP_DUP + this.OP_HASH160 + this.TO_PUSH + data + this.OP_EQUALVERIFY + this.OP_CHECKSIG;

    //Hash the script pub key with sha256
    scriptPubKey = crypto.createHash('sha256')
    .update(Buffer.from(scriptPubKey, 'hex'))
    .digest('hex');

    //Reverse and return  the hash of the scriptPubKey
    return this.reverseHash(scriptPubKey);
  }
  getP2SH(address:string):string {
    //Decode the address to get the script hash

    let {data}:decodedBase58Check = this.base58check.decode(address,'hex')

     //Create a script pub key by adding the opcodes for a P2SH
    let scriptPubKey:string = this.OP_HASH160 + this.TO_PUSH + data + this.OP_EQUAL;

    //Hash the script pub key with sha256
    scriptPubKey = crypto.createHash('sha256')
    .update(Buffer.from(scriptPubKey,'hex'))
    .digest('hex')

     //Reverse and return  the hash of the scriptPubKey
    return this.reverseHash(scriptPubKey)

  }
  getSegwitAddress(address:string):string {

    //Decode the address to get the Decode object wich has the words and prefix
    const decoded:Decoded = bech32.decode(address);

    //Get the version script hex from the get segwitversion method
    const versionScript:string =  this.getSegwitVersionScript(decoded.words[0])

    // Slice the data and get the witness program array.
    const witnessProgram:Array<number> = decoded.words.slice(1);

    // Encode the witness program
    const encoded:Array<number> = bech32.fromWords(witnessProgram);

    // convert the witness program to hex
    const witnessProgramHex:string = Buffer.from(encoded).toString('hex');  

    //Create a script pub key by adding the opcodes for a P2WPKH
    let scriptPubKey:string =  versionScript + this.TO_PUSH + witnessProgramHex;
     //Hash the script pub key with sha256
     scriptPubKey = crypto.createHash('sha256')
     .update(Buffer.from(scriptPubKey,'hex'))
     .digest('hex')

    //Reverse and return the hash of the scriptPubKey
    return this.reverseHash(scriptPubKey)

  }
  reverseHash(scriptPubKey:string):string{
    //create reversed hash string
    let reversedHash:string = '';
    /*Loop througt the hash if and reverse it.

    The reversal algorithm takes two characters from the end, reverse them and append.
    to the reversedHash variable untill the characters are exhausted.

    e.g df018b is 8b01df
    
    The scriptPubKey is 64 characters hence if it's odd the its at the
    second character of the first two characters to be reversed you append the 
    first character, but if it's even its at the first, which is already appended,
    hence the second character is appended.
    */ 
    for(let i:number = scriptPubKey.length - 1;i>=0;i--){
      
      reversedHash += i % 2 != 0 ? scriptPubKey[i-1]:scriptPubKey[i+1]
    }
    return reversedHash;
  }
  getSegwitVersionScript(version:number):string {
    // There are two version script 0 and 1 return the hex value of the opcodes
    switch(version){
      case 0:
        return this.SEGWIT_VERSION_0
      
      case 1:
        return this.SEGWIT_VERSION_1
    }
  }
}