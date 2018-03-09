import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

export default function toast(config) { 
    const props = Object.assign(config);
    let dialogProps = {
        modal: false,
        open: true,
        contentStyle: {width:"20%"}
    };
    const rootReactClass = MuiThemeProvider;
    const reactClass = Dialog;

    let div = document.createElement('div');
    document.body.appendChild(div);
    let dialogIcon = (type) => { 
        switch (type) { 
            case 'success':
                return <i className="dialogIcon success fa fa-check"></i>;
            case 'error':
                return <i className="dialogIcon error fa fa-times"></i>;
            default:
                return null;
        }   
    }
    let body = (
        <div>{dialogIcon(props.type)}<span style={{color:"#565656"}}>{props.message}</span></div>
    );

    function setProps(partialProps) {
        let _dialogProps = Object.assign(dialogProps, partialProps);
        let element = React.createElement(reactClass, _dialogProps, body);
        let mui = React.createElement(rootReactClass, {}, element);
        ReactDOM.render(mui,div);
    }

    function close(){
        setProps({open:false});
        destroy();
      }
    
      function destroy(){
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
          if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
          }
      }
    
    let dialog = React.createElement(reactClass, dialogProps, body);
    let mui = React.createElement(rootReactClass, {}, dialog);
   
    
    ReactDOM.render(
        mui,div
    );
    
    setTimeout(()=>{
        close();
    }, props.duration || 1500);
    
    return {
        close: close,
        destroy:destroy
      };
}

