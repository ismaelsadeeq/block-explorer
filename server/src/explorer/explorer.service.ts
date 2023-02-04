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

  async getTopTenBlocks():Promise<ResponseData>{
    try {
      
      const chainTipMethod:string = "getchaintips"
      let parameters:Array<string> = []
      const chainTip = await this.bitcoindService.bitcoindGet(chainTipMethod,parameters)
      let currentHash:string = chainTip.data.result[0].hash
      
      const blocks = []
      const method = "getblock"
      parameters = [currentHash]
      let block = await this.bitcoindService.bitcoindGet(method,parameters)
      blocks.push(block.data.result)
      
      for(let i = 0;i<9;i++){
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


}
