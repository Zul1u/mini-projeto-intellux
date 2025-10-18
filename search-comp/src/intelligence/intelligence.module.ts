import { Module } from '@nestjs/common';
import { IntelligenceController } from './intelligence.controller';
import { IntelligenceService } from './intelligence.service';
import { OpenAIModule } from '../openai/openai.module';
import { IntelligencePromptFactory } from './prompts/intelligence-prompt.factory';

@Module({
  imports: [OpenAIModule],
  controllers: [IntelligenceController],
  providers: [IntelligenceService, IntelligencePromptFactory],
})
export class IntelligenceModule {}
