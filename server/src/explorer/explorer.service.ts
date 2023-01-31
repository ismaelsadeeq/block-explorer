import { Injectable } from '@nestjs/common';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';


@Injectable()
export class ExplorerService {
  constructor(
    private readonly responseHandlerService:ResponseHandlerService = ResponseHandlerService.instance,
  ){}

  async getTopTenBlocks():Promise<any>{

  }

  
}
