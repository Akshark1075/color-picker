import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./ColorBox.css"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js'
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
    const {backgroundColor, name, moreUrl, showLink}=this.props;
    const isDarkColor=chroma(backgroundColor).luminance()<=0.08;
 
    const isLightColor=chroma(backgroundColor).luminance()>=0.65;
    return (<CopyToClipboard text={backgroundColor}onCopy={this.changeCopyState}>
    <div style={{background:backgroundColor}} className="ColorBox">
        <div style={{background:backgroundColor}} className={ `copy-overlay ${this.state.copied && "show" }`}/>
        <div className={ `copy-msg ${this.state.copied && "show" }`}><h1>Copied</h1>
            <h4 className={isLightColor? "dark-text" :""}>{backgroundColor}</h4>
            </div>
 
        <div className="copy-container">
        <div className="box-content">
        <span className={isDarkColor? "light-text":""}>{name}</span>
         </div>
        <button className={`copy-button ${isLightColor? "dark-text" :""}`}>Copy</button>
        
        
                </div> 
                {showLink && (
        <Link to={moreUrl} onClick={e=> e.stopPropagation()}>
        <span className={`see-more ${isLightColor? "dark-text" :""}`}>More</span>
        </Link>
        )}
        
    </div></CopyToClipboard>)
}
}
export default ColorBox