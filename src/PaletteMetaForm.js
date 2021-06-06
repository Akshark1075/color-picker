import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
export default class FormDialog extends Component{
    constructor(props){
            super(props);
            this.state={open:false,newPaletteName:"", emojiPickerOpen:false}
         
    }
  componentDidMount(){
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
     
        var isUnique= this.props.palettes.every((palette)=>{
          
           return palette.paletteName.toLowerCase() != value.toLowerCase()
         })
  
         return isUnique
        
       })
  }
  componentWillUnmount(){
    ValidatorForm.removeValidationRule('isPaletteNameUnique');
  }
  handleClickOpen = () => {
    this.setState({open:true})
  };

  handleClose = () => {
    this.setState({open:false})
  };
  handleChange=(evt)=>{
    
    this.setState({[evt.target.name]:evt.target.value})
  }
  openEmojiPicker=()=>{
    this.setState({emojiPickerOpen:true,open:false})
  }
  closeEmojiPicker=()=>{
    this.setState({emojiPickerOpen:false})
  }
  savePalette=(emoji)=>{
    this.setState({emojiPickerOpen:false},()=>{
      this.props.handleSubmit(this.state.newPaletteName, emoji.native)
    })

    
  }
  render(){
const {open, emojiPickerOpen}=this.state

  return (
    <div>
        
        <Button variant="contained"  color="primary" onClick={this.handleClickOpen}>Save</Button>
        <Dialog open={emojiPickerOpen} title="Pick an emoji"onClose={this.closeEmojiPicker}>
        <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
        <Picker onSelect={this.savePalette} />
        </Dialog>
       <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={this.openEmojiPicker}>
        <DialogContent>
          <DialogContentText>
           Please enter a name for your new palette. Make sure it is unique!!
          </DialogContentText>
          
          <TextValidator  label="Palette name"
                    onChange={this.handleChange}
                    name="newPaletteName"
                    value={this.state.newPaletteName}
                    fullWidth
                    margin='normal'
                    validators={['required','isPaletteNameUnique']}
                    errorMessages={['this field is required', 'Palette name is already taken']}/>
          
          
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          
          <Button variant="contained"  color="primary" type="submit">Save</Button>
        
        </DialogActions>
        </ValidatorForm> 
       
      </Dialog>
    </div>
  );
}
}
