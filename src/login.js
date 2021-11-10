import React from 'react';
import sha256 from 'crypto-js/sha256';

class LoginForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {user: null, userID: '', password: '', error: '', loggedIn: false};
  
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
      password = sha256(password).toString();
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
                    console.log(password);
                    if (text.Password !== password)
                        current.setState({ error: 'Invalid credentials'});
                    else {
                        current.setState({loggedIn: true, user: text});
                    }
                }
        })();
    }
  
    render() {
        if (this.state.loggedIn) {
          console.log("User: ", this.state.user);
          if (this.state.user.TypeId === 0)
            window.location.href = 'https://gray-forest-04b12b603.azurestaticapps.net?userID=' + this.state.user.UserID; 
          else if (this.state.user.TypeId === 1)
            window.location.href = 'https://gentle-smoke-0b15fc503.azurestaticapps.net?userID=' + this.state.user.UserID; 
          return <div />;
        }

      return (
        <form className="fancy" onSubmit={this.handleSubmit}>
          <label>
            UserID:
            <input className="input" type="text" name="userID" value={this.state.userID} onChange={this.handleChangeUserID} />
          </label>
          <br/>
          <label>
            Password:
            <input className="input" type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <span>{this.state.error}</span>
          <button className="button-7" type="submit">Login</button>
        </form>
      );
    }
  }

  export { LoginForm };