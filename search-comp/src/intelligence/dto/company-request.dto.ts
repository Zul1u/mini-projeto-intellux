import { IsIn, IsString } from 'class-validator';
import * as Lang from './types/supportedLang';

export class CompanyRequestDTO {
  @IsString()
  companyName!: string;

  @IsString()
  @IsIn(Lang.SUPPORTED_LANGS)
  language: Lang.SupportedLang;
}
