import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'include'
})
//Client Apollo
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
