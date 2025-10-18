import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async webSearch(prompt: string): Promise<string> {
    const model = process.env.OPENAI_MODEL || 'gpt-5-mini';

    const res = await this.client.responses.create({
      model,
      input: prompt,
      tools: [{ type: 'web_search' }],
      tool_choice: 'auto',
    });

    return res.output_text ?? JSON.stringify(res);
  }
}
