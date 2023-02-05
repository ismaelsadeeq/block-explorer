import { Injectable, Logger } from '@nestjs/common';
import { BitcoindInterfaceService } from 'src/bitcoind-interface/bitcoind-interface.service';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';

@Injectable()
export class ExplorerService {

  constructor(
    private readonly responseHandlerService:ResponseHandlerService = ResponseHandlerService.instance,
    private readonly bitcoindService:BitcoindInterfaceService
  ){}

  async getTopBlocks():Promise<ResponseData>{
    try {
      
      const chainTipMethod:string = "getchaintips"
      let parameters:Array<string> = []
      const chainTip = await this.bitcoindService.bitcoindGet(chainTipMethod,parameters)
      let currentHash:string = chainTip.data.result[0].hash
      
      const blocks:Array<any> = []
      const method:string = "getblock"
      parameters = [currentHash]
      let block:any = await this.bitcoindService.bitcoindGet(method,parameters)
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
      const chainTipMethod:string = "getchaintips"
      let parameters:Array<string> = []
      const chainTip = await this.bitcoindService.bitcoindGet(chainTipMethod,parameters)

      let currentHash:string = chainTip.data.result[0].hash
      let method:string = "getblock"
      parameters = [currentHash]
      let transactions: Array<string | any> = []
      let block = await this.bitcoindService.bitcoindGet(method,parameters)
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


}
