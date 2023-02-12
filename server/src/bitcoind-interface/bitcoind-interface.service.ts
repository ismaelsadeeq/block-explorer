import { Injectable, Logger } from '@nestjs/common';
import  { AxiosError } from 'axios';
import { configData, getConfig, responseType } from './interface';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class BitcoindInterfaceService {

  private readonly ElectrumCli:any = require('electrum-client')

  constructor(
    private readonly httpService: HttpService,
  ){}

  async bitcoindGet(method:string,params:Array<any>):Promise<responseType<any,any>>{

    // create a payload of bitcoind parameters with the getConfig class
    const payload:configData = new getConfig(params,method).getConfig(); 
    // call the bitcoin-d rpc via  http service post request.
    const response:responseType<any,any> = await firstValueFrom(

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

    // Create a tcp connection with electrs
    const electrs:any = new this.ElectrumCli(parseInt(process.env.ELECTR_PORT), process.env.ELECTR_HOST, process.env.PROTOCOL) // tcp or tls
    await electrs.connect() // connect(promise)

    // Call the electrs rpc with the required method and params
    electrs.subscribe.on(method,(v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const response:any = await electrs.electr_client(method,params) // json-rpc(promise)
        //Close the tcp connection
        await electrs.close()
        return response

    }catch(e){
        Logger.log(e)
        await electrs.close()
        return {
          "status":false,
          "message":e
        }
    }
   
  }
}
