import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class Doc extends React.Component{
    componentDidMount(){
      document.title = "RasputinTM Login"
    }
  
    render(){
      return(
        <App />
      )
    }
  }
  
ReactDOM.render(<Doc />, document.getElementById('root'));