import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Palette from "./Palette";
import seedColors from "./seedColors"
import generatePalette from "./colorHelpers.js";
import PaletteList from './PaletteList';
import SinglePalette from "./SinglePalette";
import CreatePalette from './CreatePalette'

class App extends Component {    
constructor(props){
  super(props);
  const storedPalettes=JSON.parse(window.localStorage.getItem("palettes"))
  this.state={palettes:storedPalettes || seedColors}
  this.savePalette=this.savePalette.bind(this)
  this.findPalette=this.findPalette.bind(this)
  this.syncLocalStorage=this.syncLocalStorage.bind(this)
  this.deletePalette=this.deletePalette.bind(this)
}

findPalette(id) {
  return this.state.palettes.find(function (palette) {
    return palette.id==id
  })
}
savePalette(newPalette){
 
  this.setState((currentState)=>{
    return {palettes: [...currentState.palettes,newPalette]}
  },this.syncLocalStorage)
}
deletePalette(id){
this.setState({palettes:this.state.palettes.filter(p=> p.id !==id)},this.syncLocalStorage)
}
syncLocalStorage(){
  window.localStorage.setItem("palettes",JSON.stringify(this.state.palettes) )
}
render(){
  return (
    <Switch>
      <Route exact path="/palette/new" render={routeProps=><CreatePalette savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}/>
      <Route exact path="/" render={(routeProps)=><PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette}{...routeProps}/>}/>
      <Route exact path="/palette/:id" render={(routeProps)=>{
      return <Palette paletteColors={generatePalette(this.findPalette(routeProps.match.params.id))}/>
    } 
    }/>
    <Route exact path="/palette/:paletteId/:colorId" render={routeProps=><SinglePalette {...routeProps} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId) )} colorId={routeProps.match.params.colorId}/>}/>
    </Switch>
    
    // <div className="App">
    //  <Palette paletteColors={generatePalette(seedColors[2])}/>
    // </div>
  );
}
}

export default App;
