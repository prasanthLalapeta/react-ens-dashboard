import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '../../config/env';

const createApolloClient = new ApolloClient({
  uri: config.ensSubGraphUrl,
  cache: new InMemoryCache(),
});

export default createApolloClient;
