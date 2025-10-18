import { IsIn, IsString } from 'class-validator';
import * as Lang from './types/supportedLang';

export class TrendRequestDTO {
  @IsString()
  market!: string;

  @IsString()
  @IsIn(Lang.SUPPORTED_LANGS)
  language!: Lang.SupportedLang;

  @IsString()
  region!: string;
}
