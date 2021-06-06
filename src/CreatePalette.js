import React, {Component} from 'react'
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList"
import arrayMove from 'array-move';
import PaletteMetaForm from './PaletteMetaForm'
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
  toolbar:{

    "@media(max-width:576px)":{
      paddingRight:"2px",
      },
      "@media(max-width:725px)":{
        paddingLeft:"5px",
        paddingRight:"5px",
        }, 
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "@media(max-width:576px)":{
      marginRight:"0px",
      },
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
    "@media(max-width:700px)":{
     width:"100%"
      },
    
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
    padding: "0px",
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
  navDiv:{
       display:"flex",
       flexDirection:"row",
    justifyContent:"space-between",
    width:"100%"
      
    
  },
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
     justifyContent:'center',
   height:'100%'
  },
  picker:{
    width:"80% !important",
    marginTop:"2rem"
  },
  addColor:{
    width:"100%",
    marginTop:"1rem",
    fontSize:"1rem",
    padding:"1rem"
  },
  input:{
    width:"100%",

  },
  btnDiv:{
    display:"flex",
    
  },
  






})

class CreatePalette extends Component{
  static defaultProps={
    maxColors:20
  };
  constructor(props){
    super(props)
    this.state={
      open: false,
      colors:this.props.palettes[0].colors,
      background:'#000000',
      newColorName:"",
      

    }
    
    this.handleSubmit=this.handleSubmit.bind(this)
    this.removeColor=this.removeColor.bind(this)
   
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState((curState)=>{return {colors: arrayMove(curState.colors, oldIndex, newIndex)}})
  }

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
        
        return  {colors: [...prevItems.colors,{color:this.state.background,name:this.state.newColorName}],
                newColorName:""
                }              


                          

                }
      )}
      handleChange=(evt)=>{
    
        this.setState({[evt.target.name]:evt.target.value})
      }
    handleClear=(evt)=>{
    
      this.setState({colors:[]})
    }
    removeColor(colorName){
      this.setState( {colors: this.state.colors.filter(color=>color.name!==colorName)})
    }

   handleRandom= (evt) => {
    
     if(this.state.colors.length <this.props.maxColors){
       var isDuplicate=true
       let allColors=this.props.palettes.map(palette=>palette.colors).flat()
       let randomNumber;
       let randColor;
       console.log(isDuplicate)
      while(isDuplicate){
       randomNumber=Math.floor(Math.random()*allColors.length)
       randColor=allColors[randomNumber]
     
  isDuplicate=this.state.colors.some(color=>color.name==randColor.name)
 
      }

   
      this.setState(prevItems => {
        return  {colors: [...prevItems.colors,randColor]}
      }    
      )}
    }

   
   
   componentDidMount() {
      
      ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
     
       var isUnique= this.state.colors.every((color)=>{
         
          return color.name.toLowerCase() != value.toLowerCase()
        })
        
        return isUnique
       
      })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
          var isUnique=! this.state.colors.some((color)=>{
         
            return color.color === this.state.background 
          })
          
          return isUnique
         
          
        
    });
 
  }
  componentWillUnmount(){
  
      ValidatorForm.removeValidationRule('isColorNameUnique');
      ValidatorForm.removeValidationRule('isColorUnique');
    

  }
 handleSubmit(newName,emoji){
       const newPalette={
      id:newName.toLowerCase().replace(/ /g,"-"),
      paletteName:newName,
      colors:this.state.colors,
      emoji:emoji
    }
    this.props.savePalette(newPalette)
    this.props.history.push("/")

  }
      render(){
       let isPaletteFull = this.state.colors.length >=this.props.maxColors
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
          <Toolbar className={this.props.classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={this.props.classes.navDiv}>
            <Typography variant="h6" noWrap>
              Create a palette
            </Typography>
            <div className={this.props.classes.btnDiv}>
        
          <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.handleSubmit}/>
          <Button variant="contained" color="secondary" onClick={()=>{this.props.history.goBack()}}>Back</Button>
            </div>
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
          <div className={this.props.classes.container}>
          <Typography variant="h4"gutterBottom>Design Your Palette</Typography>
          <div>
        <Button variant="contained" color="secondary"onClick={this.handleClear}>Clear Palette</Button>
        <Button variant="contained" color="primary" onClick={this.handleRandom}>Random Color</Button>
        </div>
        
         <ChromePicker color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete } className={this.props.classes.picker}/>
<ValidatorForm
               
               onSubmit={this.handleAddColor}
               onError={errors => console.log(errors)}
               style={{width:"80%"}}
           >
                <TextValidator
                    label="Color name"
                    onChange={this.handleChange}
                    name="newColorName"
                    variant="filled"
                    margin="normal"
                    value={this.state.newColorName}
                    className={this.props.classes.input}
                    validators={['required','isColorNameUnique','isColorUnique']}
                    errorMessages={['this field is required', 'Color name must be unique','Color must be unique']}
                />



      <Button variant="contained" color="primary" type="submit" disabled={isPaletteFull} style={{backgroundColor:isPaletteFull?"grey":this.state.background}} className={this.props.classes.addColor}>{isPaletteFull?"Palette is full":"Add Color"}</Button>
      </ValidatorForm>
      </div>
        </Drawer>
        <main

          className={clsx(this.props.classes.content, {
            [this.props.classes.contentShift]: this.state.open,
          })}
        >
          <div className={this.props.classes.drawerHeader} />

          <DraggableColorList colors={this.state.colors} removeColor={this.removeColor} axis='xy' distance={20} onSortEnd={this.onSortEnd}/>
         
        </main>
      </div>
    );
        }
  }
  export default withStyles(useStyles,{withTheme:true}) (CreatePalette)
