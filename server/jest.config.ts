import type { Config } from '@jest/types';
// Explanation: This file just for configure Typescript tests and transform it to Commonjs code
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
};
export default config;
