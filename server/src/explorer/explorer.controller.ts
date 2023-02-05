import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ExplorerService } from './explorer.service';

@Controller('api/v1')
export class ExplorerController {
  constructor(
    private readonly explorerService:ExplorerService
  ){
  }

  @Get('top-blocks')
  @HttpCode(HttpStatus.OK)
  async getTopBlock(): Promise<ResponseData>{
    return await this.explorerService.getTopBlocks()
  }
  @Get('top-transaction')
  @HttpCode(HttpStatus.OK)
  async getTopTransaction(): Promise<ResponseData>{
    return await this.explorerService.getTopTransaction()
  }
}
