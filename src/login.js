import React from 'react';
import sha256 from 'crypto-js/sha256';

class LoginForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {userID: '', password: '', error: ''};
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUserID = event => {
      this.setState({userID: event.target.value});
    }

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    }
  
    handleSubmit = event => {
      var userID = this.state.userID;
      var password = this.state.password;
      password = sha256(password);
      event.preventDefault();
      const current = this;

        (async function () {      
          var text = null;
          //const url = 'http://localhost:7071';
          const url = 'https://rasputintmfauserservice.azurewebsites.net';
          await fetch(url + '/api/GetUser?userID=' + userID)
                .then(response => { 
                  console.log("Response: ", response);
                  if (response.status >= 400 && response.status < 600) {
                    current.setState({ error: response.statusText});
                  }
                  return response.json(); 
                } )
                .then(json => { text = json; } )
                .catch(error => { console.log("Error: ", error); });
                if (text !== null) {
                    current.setState({ error: ''});
                    console.log(text);
                }
        })();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            UserID:
            <input type="text" name="userID" value={this.state.userID} onChange={this.handleChangeUserID} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <span>{this.state.error}</span>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export { LoginForm };