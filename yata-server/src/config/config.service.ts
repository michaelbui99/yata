import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { defaultConfig, YataConfig } from './yata-config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly YATA_CONFIG_ENV_VAR = 'YATA_CONFIG';
  private readonly DEFAULT_CONFIG_PATH = `${os.homedir()}/yata/yata-config.json`;

  public getConfig(): YataConfig {
    const configPath =
      process.env[this.YATA_CONFIG_ENV_VAR] ?? this.DEFAULT_CONFIG_PATH;
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
