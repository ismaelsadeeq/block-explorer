import { Module } from '@nestjs/common';
import { BitcoindInterfaceService } from './bitcoind-interface.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule,
    //Enable http Module to be asynchronous and timeout after 5s and set 5 max redirects
    HttpModule.registerAsync({
      useFactory:()=>({
        timeout: 5000,
        maxRedirects: 5,
      })
    }),
  ],
  providers: [BitcoindInterfaceService],
  exports: [BitcoindInterfaceService]

})
export class BitcoindInterfaceModule {}
