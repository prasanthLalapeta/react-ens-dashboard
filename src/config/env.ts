type NodeEnv = 'development' | 'production';

// eslint-disable-next-line operator-linebreak
const env: NodeEnv =
  // eslint-disable-next-line operator-linebreak
  (process.env.REACT_APP_NODE_ENV as unknown as NodeEnv) ||
  'development';

type ConfigParams = {
  ensSubGraphUrl: string;
  collectionId: string;
};

type Config = {
  production: ConfigParams;
  development: ConfigParams;
};

const config: Config = {
  // The production development environment settings
  production: {
    ensSubGraphUrl:
      'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    collectionId: 'domains',
  },
  // The local development environment settings
  development: {
    ensSubGraphUrl:
      'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    collectionId: 'domains',
  },
};

export default config[env];
