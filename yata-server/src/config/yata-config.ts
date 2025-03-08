import * as os from 'node:os';

export type YataConfig = {
  dataFolder: string;
};

export function defaultConfig(): YataConfig {
  return {
    dataFolder: `${os.homedir()}/yata`,
  };
}
