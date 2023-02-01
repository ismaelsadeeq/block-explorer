import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Axios } from 'axios';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
  imports:[
    ResponseHandlerModule,
    HttpModule,
    HttpModule.registerAsync({
      useFactory:()=>({
        timeout: 5000,
        maxRedirects: 5,
      })
    }),
    Axios,
  ],
  controllers: [ExplorerController],
  providers: [ExplorerService]
})
export class ExplorerModule {}
