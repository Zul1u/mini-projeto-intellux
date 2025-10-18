import { Body, Controller, Get, Post } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { TrendRequestDTO } from './dto/trend-request.dto';
import { CompanyRequestDTO } from './dto/company-request.dto';

@Controller('search')
export class IntelligenceController {
  constructor(private readonly service: IntelligenceService) {}

  @Get('health')
  health() {
    return {
      status: 200,
      service: 'search-comp',
      model: process.env.OPENAI_MODEL,
    };
  }

  @Post('company')
  async searchCompany(@Body() body: CompanyRequestDTO) {
    return this.service.searchCompany(body);
  }

  @Post('trend')
  async searchTrend(@Body() body: TrendRequestDTO) {
    return this.service.searchTrend(body);
  }
}
