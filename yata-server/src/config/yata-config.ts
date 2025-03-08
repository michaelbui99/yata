import * as os from 'node:os';

export const DEFAULT_CONFIG_PATH = `${os.homedir()}/yata/yata-config.json`;

export type YataConfig = {
  dataFolder: string;
};

export function defaultConfig(): YataConfig {
  return {
    dataFolder: `${os.homedir()}/yata`,
  };
}
