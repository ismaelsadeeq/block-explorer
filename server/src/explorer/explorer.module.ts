import { Module } from '@nestjs/common';
import { BitcoindInterfaceModule } from 'src/bitcoind-interface/bitcoind-interface.module';
import { ResponseHandlerModule } from 'src/response-handler/response-handler.module';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
  imports:[
    ResponseHandlerModule,
    BitcoindInterfaceModule
  ],
  controllers: [ExplorerController],
  providers: [ExplorerService]
})
export class ExplorerModule {}
