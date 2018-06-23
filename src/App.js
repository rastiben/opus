import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_USER = gql`
{
  currentUser {
    email
  }
}
`;

const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password){
    email
  }
}
`;

export default class App extends Component { 

  render() {

    let email;
    let password;

    return (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if( loading ) return "";
          if( error ) return "";
          
          return (
            <div>
              {data.currentUser != null ? data.currentUser.email : ""}
              <Mutation
                mutation={LOGIN_USER}
                update={(cache, { data: { login } }) => {
                  cache.writeQuery({
                    query: CURRENT_USER,
                    data: { currentUser: login }
                  });
                }}
              >
                {currentUser => (
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        currentUser({ variables: { 
                          email: email.value,
                          password: password.value
                        } });
                        email.value = "";
                        password.value = "";
                      }}
                    >
                      <input
                        ref={node => {
                          email = node;
                        }}
                        value="spencer@handlebarlabs.com"
                      />
                      <input
                        ref={node => {
                          password = node;
                        }}
                        type="password"
                      />
                      <button type="submit">Se connecter</button>
                    </form>
                  </div>
                )}
              </Mutation>
            </div>
          )

        }}
      </Query>
    );

  }

}
