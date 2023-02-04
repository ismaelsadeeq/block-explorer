import { Injectable, Logger } from '@nestjs/common';
import  { AxiosError, AxiosResponse } from 'axios';
import { configData, getConfig, responseType } from './interface';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BitcoindInterfaceService {

  constructor(
    private readonly httpService: HttpService,
  ){}

  async bitcoindGet(method:string,params:Array<any>):Promise<responseType<any,any>>{
    let payload:configData = new getConfig(params,method).getConfig(); 
    let response:responseType<any,any> = await firstValueFrom(
      this.httpService.post(process.env.URL,JSON.stringify(payload)).pipe(
        catchError((error: AxiosError) => {
          Logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return response;
  }
}
