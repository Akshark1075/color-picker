import React, {Component} from 'react'
import ColorBox from './ColorBox'
class SinglePalette extends Component{
    constructor(props){
        super(props)
        this.shades=this.generateShades(this.props.palette,this.props.colorId)
        console.log(this.shades)
    }
    generateShades(palette,colorToFilterBy){
        const allColors=palette.colors
        let shades=[]
        for (let key in allColors){
            shades=shades.concat(allColors[key].filter(color=>color.id===colorToFilterBy))
        }
        return shades.slice(1)
    }
    render(){
    return(
        <div className="Palette">
            <div className="Palette-colors">
        {this.shades.map(x=><ColorBox backgroundColor={x['hex']}name={x['name']} key={x['name']} showLink={false}/>)}
        </div>
        </div>
        )
    
    }
}
export default SinglePalette