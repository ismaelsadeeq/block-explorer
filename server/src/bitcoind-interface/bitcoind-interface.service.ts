import { Injectable, Logger } from '@nestjs/common';
import  { AxiosError } from 'axios';
import { configData, getConfig, responseType } from './interface';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class BitcoindInterfaceService {
  private ElectrumCli:any = require('electrum-client')

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
  async electr(params :Array<string>,method:string): Promise<any> {

    const ecl:any = new this.ElectrumCli(parseInt(process.env.ELECTR_PORT), process.env.ELECTR_HOST, process.env.PROTOCOL) // tcp or tls
    await ecl.connect() // connect(promise)
    ecl.subscribe.on(method,(v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const response:any = await ecl.server_version(...params) // json-rpc(promise)
        await ecl.close()
        return response

    }catch(e){
        Logger.log(e)
        await ecl.close()
        return {
          "status":false,
          "message":e
        }
    }
   
  }
}
