import { Injectable, Logger } from '@nestjs/common';
import { DEFAULT_CONFIG_PATH, defaultConfig, YataConfig } from './yata-config';
import * as fs from 'fs';
import * as path from 'path';
import { Optional } from '../optional';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private config: YataConfig | undefined;
  private readonly YATA_CONFIG_ENV_VAR = 'YATA_CONFIG';

  public getConfig(): YataConfig {
    if (!this.config) {
      this.logger.log('Loading config...');
      this.config = this.loadConfig();
      this.logger.log('Config loaded: ' + JSON.stringify(this.config, null, 4));
    }
    return this.config;
  }

  private loadConfig(): YataConfig {
    const configPath = Optional.of(
      process.env[this.YATA_CONFIG_ENV_VAR],
    ).orElseGet(() => DEFAULT_CONFIG_PATH);
    if (!fs.existsSync(path.resolve(configPath))) {
      return defaultConfig();
    }

    const contents = fs.readFileSync(configPath, 'utf-8');
    if (!contents) {
      return defaultConfig();
    }

    try {
      const deserialized = JSON.parse(contents) as YataConfig;
      return this.validateConfig(deserialized) ? deserialized : defaultConfig();
    } catch (e) {
      console.error(e);
      return defaultConfig();
    }
  }

  private validateConfig(obj: object): boolean {
    return Object.keys(obj).some(
      (key) => key === 'dataFolder' && typeof obj['dataFolder'] === 'string',
    );
  }
}
