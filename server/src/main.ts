import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = {
    origin:process.env.CLIENT_ORIGIN, //[arr of origins]
    credentails:true
  }


  //enabling cors
  app.enableCors(options)
  
  await app.listen(process.env.PORT || 3000);
}
try {
  bootstrap();
}catch(error){
  console.log(error)
}
