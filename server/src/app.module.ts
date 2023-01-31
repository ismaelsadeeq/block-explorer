import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import {ConfigModule} from '@nestjs/config'
import { ExplorerModule } from './explorer/explorer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ExplorerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
