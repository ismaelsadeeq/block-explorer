import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExplorerController } from './explorer.controller';
import { ExplorerService } from './explorer.service';

@Module({
  imports:[
    HttpModule
  ],
  controllers: [ExplorerController],
  providers: [ExplorerService]
})
export class ExplorerModule {}
