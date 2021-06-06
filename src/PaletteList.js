import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import { withStyles } from '@material-ui/core/styles';
import bg from './bg.svg'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
const styles={
    "@global":{
        
       ".fade-exit":{
            opacity:"1"
        },
        ".fade-exit-active":{
            opacity:"0",
            transition:"opacity 500ms ease-in-out"
        },
        
    },
    root:{
        backgroundColor:"blue",
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        backgroundColor: "#050839",
        backgroundImage: `url(${bg})`,
        overflow:"auto",
        paddingBottom:"20px"
        

    },
    container:{
        width:"50%",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        flexWrap:"wrap",
        "@media(max-width:400px)":{
          width:"75%",
              },
        "@media(max-width:576px)":{
        width:"57%",
            },
        "@media(min-width:576px)":{
            width:"57%",
        },
        "@media(min-width:768px)":{
            width:"65%",
        },
        "@media(min-width:992px)":{
            width:"50%",
        }
    },
    nav:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"White",
        width:"100%",
        margin:"12px 0",
        "& a":{
            color:"White"
        },
        "@media(max-width:576px)":{
            fontSize:"1 rem"
             },
    },
    title:{
        "@media(max-width:576px)":{
           fontSize:"1.3rem"
            },
    },
    palettes:{
        boxSizing:"border-box",
        width:"100%",
        display:"grid",
        gridTemplateColumns:" 30% 30% 30%",
        gridGap:"2.5 rem",
        "@media(max-width:576px)":{
            gridTemplateColumns:"100%",
            gridGap:"1.5rem",
            },
        "@media(min-width:576px)":{
            gridTemplateColumns:"50% 50%",
            gridGap:"2rem",
        },
        "@media(min-width:768px)":{
            gridTemplateColumns:" 30% 30% 30%",
            gridGap:"2.5rem",
        },
        "@media(min-width:992px)":{
          
        }

    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
class PaletteList extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.state={
            open:false,
            itemToBeDeleted:null,
            snackbarOpen:false,
            Transition:Slide
        }
    }
 handleClick(id){
this.props.history.push(`palette/${id}`)
 }  
 handleDelete(evt,id){
       
     evt.stopPropagation()
     this.handleClickOpen(id)
    
 }

 handleClickOpen = (id) => {
   this.setState({open:true, itemToBeDeleted:id})
  };
  confirmDelete=()=>{
    let paletteId=this.state.itemToBeDeleted
    this.setState({open:false, itemToBeDeleted:null,snackbarOpen:true},()=>{
    this.props.deletePalette(paletteId)
    })
  }

handleClose = () => {
    this.setState({open:false,  itemToBeDeleted:null})
  };
handleSnackbarClose = () => {
    this.setState({snackbarOpen:false})
  };
render(){
 
    const {palettes, classes}=this.props
    const {open}=this.state
    let allpalettes=palettes.map((x,i)=><CSSTransition className='fade' key={i} timeout={500}><MiniPalette {...x} handleClick={()=>this.handleClick(x.id)} key={x.id} deletePalette={this.handleDelete} /></CSSTransition>)
    return(<div className={classes.root}>
        <div className={classes.container}>
        <nav className={classes.nav}><h1 className={classes.title}>Shades</h1>
        <Link to="/palette/new">Create Palette</Link>
        </nav>
        
        <TransitionGroup className={classes.palettes}>
            {allpalettes}
            </TransitionGroup>
            <div>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Delete Palette?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this palette?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.confirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
            </div>
            <Snackbar
  open={this.state.snackbarOpen}
   TransitionComponent={this.state.Transition}
  message="Palette Deleted"
  key={this.state.Transition.name}
  onClose={this.handleSnackbarClose}
  autoHideDuration={2000}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  action={
    <IconButton
    edge="start"
       color="inherit"
    aria-label="Close"
    onClick={this.handleSnackbarClose}
  >
    <CloseIcon/>
  </IconButton>
  }
  />
     
        </div>)
}
}
export default withStyles(styles)(PaletteList)