import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import {
  TrendResponseDTO,
  TrendRequestDTO,
  CompanyRequestDTO,
  CompanyResponseDTO,
} from './dto';
import { IntelligencePromptFactory } from './prompts/intelligence-prompt.factory';

@Injectable()
export class IntelligenceService {
  constructor(
    private readonly openai: OpenAIService,
    private readonly prompts: IntelligencePromptFactory,
  ) {}

  async searchCompany(
    input: CompanyRequestDTO,
  ): Promise<{ status: number; data: CompanyResponseDTO }> {
    const prompt = this.prompts.searchCompany(input);
    const response = await this.openai.webSearch(prompt);

    const parsed = JSON.parse(response) as CompanyResponseDTO;

    return { status: 201, data: parsed };
  }

  async searchTrend(
    input: TrendRequestDTO,
  ): Promise<{ status: number; data: TrendResponseDTO }> {
    const prompt = this.prompts.searchMarketTrends(input);
    const response = await this.openai.webSearch(prompt);

    const parsed = JSON.parse(response) as TrendResponseDTO;

    return { status: 201, data: parsed };
  }
}
