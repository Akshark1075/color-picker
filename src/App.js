import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Palette from "./Palette";
import seedColors from "./seedColors"
import generatePalette from "./colorHelpers.js";
import PaletteList from './PaletteList';
import SinglePalette from "./SinglePalette";
function findPalette(id) {
  return seedColors.find(function (palette) {
    return palette.id==id
  })
}
function App() {    

  return (
    <Switch>
      <Route exact path="/" render={(routeProps)=><PaletteList palettes={seedColors}{...routeProps}/>}/>
      <Route exact path="/palette/:id" render={(routeProps)=>{
      return <Palette paletteColors={generatePalette(findPalette(routeProps.match.params.id))}/>
    } 
    }/>
    <Route exact path="/palette/:paletteId/:colorId" render={routeProps=><SinglePalette {...routeProps} palette={generatePalette(findPalette(routeProps.match.params.paletteId) )} colorId={routeProps.match.params.colorId}/>}/>
    </Switch>
    
    // <div className="App">
    //  <Palette paletteColors={generatePalette(seedColors[2])}/>
    // </div>
  );
}

export default App;
