import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
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
  @Get('top-transactions')
  @HttpCode(HttpStatus.OK)
  async getTopTransaction(): Promise<ResponseData>{
    return await this.explorerService.getTopTransaction()
  }

  @Get('search-block-height/:height')
  @HttpCode(HttpStatus.OK)
  async searchBlockHeight(@Param('height') height:string): Promise<ResponseData> {
    return this.explorerService.searchBlockHeight(parseInt(height))

  }
  @Get('search-block-hash/:hash')
  @HttpCode(HttpStatus.OK)
  async searchBlockHash(@Param('hash') hash:string): Promise<ResponseData> {
    return this.explorerService.searchBlockHash(hash)

  }
  @Get('search-transaction/:txId')
  @HttpCode(HttpStatus.OK)
  async searchTransactionId(@Param('txId') txId:string): Promise<ResponseData> {
    return this.explorerService.searchForTransactionId(txId)

  }
  @Get('address-balance/:address')
  @HttpCode(HttpStatus.OK)
  async getAddressBalance(@Param('address') adress:string): Promise<ResponseData> {
    return this.explorerService.getAddressBalance(adress)
  }
  @Get('address-transactions/:address')
  @HttpCode(HttpStatus.OK)
  async getAddressTransactions(@Param('address') address:string):Promise<ResponseData>{
    return this.explorerService.getAddressTransactions(address);
  }
  @Get('get-type/:value')
  @HttpCode(HttpStatus.OK)
  async getType(@Param('value') value:string):Promise<ResponseData>{
    return this.explorerService.getType(value);
  }
}
