import { Injectable, Logger } from '@nestjs/common';
import { ResponseData } from 'src/response-handler/interface/response.handler.interface';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { Meta } from 'src/response-handler/interface/response.handler.interface';
import { HttpService } from '@nestjs/axios';
import  { AxiosError } from 'axios';
import { configData, getConfig } from './interface';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ExplorerService {

  constructor(
    private readonly responseHandlerService:ResponseHandlerService = ResponseHandlerService.instance,
    private readonly httpService: HttpService,
  ){}

  async getTopTenBlocks():Promise<ResponseData>{
    try {
      
      const payload:configData = new getConfig([],"getchaintips").getConfig(); 

      const { data } = await firstValueFrom(
        this.httpService.post(process.env.URL,JSON.stringify(payload)).pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
      const response:Meta = {
        status:true,
        message:"success",
        pagination:undefined
      }
      return this.responseHandlerService.responseBody(data,response)
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
