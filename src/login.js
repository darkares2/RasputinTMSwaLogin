import React from 'react';
import sha256 from 'crypto-js/sha256';

class LoginForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {userID: '', password: '', error: '', loggedIn: false};
  
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
                        current.setState({loggedIn: true});
                    }
                }
        })();
    }
  
    render() {
        if (this.state.loggedIn) {
            window.location.href = 'https://www.google.dk'; 
            return <div />;
        }

        const formStyle = {
            margin: 'auto',
            padding: '10px',
            border: '1px solid #c9c9c9',
            borderRadius: '5px',
            background: '#f5f5f5',
            width: '220px',
              display: 'block'
        };
        const labelStyle = {
            margin: '10px 0 5px 0',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '15px',
        };
        const inputStyle = {
            margin: '5px 0 10px 0',
            padding: '5px', 
            border: '1px solid #bfbfbf',
            borderRadius: '3px',
            boxSizing: 'border-box',
            width: '100%'
        };
        const submitStyle = {
            margin: '10px 0 0 0',
            padding: '7px 10px',
            border: '1px solid #efffff',
            borderRadius: '3px',
            background: '#3085d6',
            width: '100%', 
            fontSize: '15px',
            color: 'white',
            display: 'block'
        };
      return (
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <label style={labelStyle}>
            UserID:
            <input style={inputStyle} type="text" name="userID" value={this.state.userID} onChange={this.handleChangeUserID} />
          </label>
          <label style={labelStyle}>
            Password:
            <input style={inputStyle} type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <span>{this.state.error}</span>
          <input type="submit" value="Submit" style={submitStyle} />
        </form>
      );
    }
  }

  export { LoginForm };