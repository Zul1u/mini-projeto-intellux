import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OpenAIModule,
    IntelligenceModule,
  ],
})
export class AppModule {}
