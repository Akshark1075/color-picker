import React, {Component} from 'react'
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import DraggableColorBox from "./DraggableColorBox.js"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList"
const drawerWidth = 400;

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height:"calc(100vh - 64px)",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class CreatePalette extends Component{
  constructor(props){
    super(props)
    this.state={
      open: false,
      colors:[],
      background:'#000000',
      newColorName:"",
      newPaletteName:"",

    }
    
    this.handleSubmit=this.handleSubmit.bind(this)
    this.removeColor=this.removeColor.bind(this)
   
  }
  // onSortEnd = (oldIndex, newIndex) => {
  //   this.setState((curState) => ({
  //     colors: arrayMove(curState.colors, oldIndex, newIndex),
  //   }))
  // }

    handleDrawerOpen = () => {
      this.setState({open:true})
    };
  
    handleDrawerClose = () => {
      this.setState({open:false})
    };
    handleChangeComplete = (color) => {
      this.setState({background:color.hex})
    };
    handleAddColor= (evt) => {
    
      this.setState(prevItems => {
        
        return  {colors: [...prevItems.colors,{color:this.state.background,name:this.state.newColorName}]}}
      )}
     handleChange=(evt)=>{
    
      this.setState({[evt.target.name]:evt.target.value})
    }
    handleClear=(evt)=>{
    
      this.setState({colors:[]})
    }
    removeColor(colorName){
      this.setState((curState)=>{
return {colors: curState.colors.filter(color=>color.name!==colorName)}
      })
    }

  //  handleRandom= (evt) => {
   
  //     this.setState(prevItems => {
  //       let randomNumber=Math.floor(Math.random() * 999999)
        
  //       return  {colors: [...prevItems.colors,{color:this.state.background,name:this.state.newColorName}]}}
  //     )}
   
   
   componentDidMount() {
      
      ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
     
       var isUnique= this.state.colors.every((color)=>{
         
          return color.name.toLowerCase() != value.toLowerCase()
        })
        
        return isUnique
       
      })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
     
          return this.state.colors.every((color)=>{
             return color.color != this.state.background 
           });
        
    });
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
     
      var isUnique= this.props.palettes.every((palette)=>{
        
         return palette.paletteName.toLowerCase() != value.toLowerCase()
       })

       return isUnique
      
     })
  }
  componentWillUnmount(){
  
      ValidatorForm.removeValidationRule('isColorNameUnique');
      ValidatorForm.removeValidationRule('isColorUnique');
      ValidatorForm.removeValidationRule('isPaletteNameUnique');

  }
 handleSubmit(evt){
       const newPalette={
      paletteName:this.state.newPaletteName,
      colors:this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push("/")

  }
      render(){
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: this.state.open,
          })}
          color="default"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a palette
            </Typography>
            <div style={{display:"inline-block"}}>

          <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator  label="Palette name"
                    onChange={this.handleChange}
                    name="newPaletteName"
                    value={this.state.newPaletteName}
                    validators={['required','isPaletteNameUnique']}
                    errorMessages={['this field is required', 'Palette name is already taken']}/>
          <Button variant="contained"  color="primary" type="submit">Save Palette</Button>
          </ValidatorForm>
          <Button variant="contained" color="secondary" onClick={()=>{this.props.history.goBack()}}>Go back</Button>
            </div>
          </Toolbar>
          
        </AppBar>
        <Drawer
          className={this.props.classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
        >     
          <div className={this.props.classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              { <ChevronLeftIcon /> }
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
        <Button variant="contained" color="secondary"onClick={this.handleClear}>Clear Palette</Button>
        <Button variant="contained" color="primary">Random Color</Button>
        </div>
         <ChromePicker color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }/>
<ValidatorForm
               
                onSubmit={this.handleAddColor}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Color name"
                    onChange={this.handleChange}
                    name="newColorName"
                    value={this.state.newColorName}
                    validators={['required','isColorNameUnique','isColorUnique']}
                    errorMessages={['this field is required', 'Color name must be unique','Color must be unique']}
                />



      <Button variant="contained" color="primary" type="submit" style={{backgroundColor:this.state.background}} >Add Color</Button>
      </ValidatorForm>
        </Drawer>
        <main

          className={clsx(this.props.classes.content, {
            [this.props.classes.contentShift]: this.state.open,
          })}
        >
          <div className={this.props.classes.drawerHeader} />

          <DraggableColorList colors={this.state.colors} removeColor={this.removeColor}/>
         
        </main>
      </div>
    );
        }
  }
  export default withStyles(useStyles,{withTheme:true}) (CreatePalette)
