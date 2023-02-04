import { Module } from '@nestjs/common';
import { BitcoindInterfaceService } from './bitcoind-interface.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule,
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
