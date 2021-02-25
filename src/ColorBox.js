import React, {Component} from 'react'

import "./ColorBox.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state={copied:false}
        this.changeCopyState=this.changeCopyState.bind(this)
    }
    changeCopyState(){
this.setState({copied:true},()=>setTimeout(()=>this.setState({copied:false}),1500))
    }
   
render(){
    const {backgroundColor, name}=this.props;
    return (<CopyToClipboard text={backgroundColor}onCopy={this.changeCopyState}>
    <div style={{background:backgroundColor}} className="ColorBox">
        <div style={{background:backgroundColor}} className={ `copy-overlay ${this.state.copied && "show" }`}/>
        <div className={ `copy-msg ${this.state.copied && "show" }`}><h1>Copied</h1>
            <h4>{backgroundColor}</h4>
            </div>
 
        <div className="copy-container">
        <div className="box-content">
        <span>{name}</span>
         </div>
        <button className="copy-button">Copy</button>
        
        
                </div>
        <span className="see-more">More</span>
        
    </div></CopyToClipboard>)
}
}
export default ColorBox