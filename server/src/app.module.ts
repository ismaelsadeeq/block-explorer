import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import {ConfigModule} from '@nestjs/config'
import { ExplorerModule } from './explorer/explorer.module';
import { BitcoindInterfaceModule } from './bitcoind-interface/bitcoind-interface.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ExplorerModule,
    BitcoindInterfaceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
