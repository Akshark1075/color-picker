import React, {Component} from 'react'
import { Link } from 'react-router-dom'
class PaletteList extends Component{
    
render(){
    const {palettes}=this.props
    let allpalettes=palettes.map(x=><Link to={`palette/${x.id}`}>{x.paletteName}</Link>)
    return(<div><h1>React Colors</h1>
        {allpalettes}</div>)
}
}
export default PaletteList