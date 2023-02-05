import { Injectable, Logger } from '@nestjs/common';
import { BitcoindInterfaceService } from 'src/bitcoind-interface/bitcoind-interface.service';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { responseType } from 'src/bitcoind-interface/interface';

@Injectable()
export class ExplorerService {

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


}
