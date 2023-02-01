import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ExplorerService } from './explorer.service';

@Controller('api/v1')
export class ExplorerController {
  constructor(
    private readonly explorerService:ExplorerService
  ){
  }

  @Get('ten-blocks')
  @HttpCode(HttpStatus.OK)
  async getBlock(): Promise<any>{
    return await this.explorerService.getTopTenBlocks()
  }
}
