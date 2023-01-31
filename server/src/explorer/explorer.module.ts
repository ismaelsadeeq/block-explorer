import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
  imports:[
    ResponseHandlerModule,
    HttpModule
  ],
  controllers: [ExplorerController],
  providers: [ExplorerService]
})
export class ExplorerModule {}
