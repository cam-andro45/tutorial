import logo from './logo.svg';
import React, { Component, setState } from "react";
import './App.css';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
 

const data = new FormData();

class App extends Component {
  constructor() {
    super();

    this.state = {
      checkedS: false,
      otherOption: "",
      option: "",
      file: new Object(),
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeOption = this.handleChangeOption.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  menuItems (){
    let items = ["%",",",".","Otro"];
    let showItems = items.map((item)=>{
      return <MenuItem value={item}>{item}</MenuItem>
    })
    return showItems
  }

  handleChange(e){
    console.log(e.target.value)
    let option="";
    let flag=false;
    if(e.target.value === 1){
      option = "%";
    } else if(e.target.value === 2){
      option = ",";
    } else if(e.target.value === 3){
      option = ".";
    } else if(e.target.value === 4){
      flag = true;
    }
    this.setState({
      checkedS: flag,
      option: option
    })
  }

  handleChangeOption(e){
    this.setState({otherOption: e.target.value})
  }

  handleChangeFile(e){
    const archivos = e.target.files;
    console.log(archivos)

    data.append('archivo', archivos[0]);
    this.setState({file: data})
  }

  async onSubmit(e){
    let option;
    if(!this.state.checkedS){
      option = this.state.option
    } else {
      option = this.state.otherOption
    }
    const req = await axios.post("http://localhost:4001/?delimiter="+option,data,{
      headers: {
      "Content-Type": "multipart/form-data",
      }
    })
    console.log(req)
  }

  render(){
    return (
      <div className="App">
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            spacing={8}
          >
            <Grid className="App-header" item xs>
              <Container  maxWidth="sm">
                <div style={{ marginTop: "10px" }} >
                  Cargue de datos de archivos csv
                </div>
              </Container >
            </Grid>
            <Grid item xs>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={8}
              >
                <Grid item xs>
                  <InputLabel required id="demo-simple-select-label">Tipo de separador</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={this.handleChange}
                  >
                    <MenuItem value={1}>%</MenuItem>
                    <MenuItem value={2}>,</MenuItem>
                    <MenuItem value={3}>.</MenuItem>
                    <MenuItem value={4}>Otro</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs>
                  <TextField 
                    required 
                    disabled={!this.state.checkedS}
                    id="standard-required" 
                    label="Separador"
                    onChange={this.handleChangeOption}
                    value={this.state.otherOption} />
                </Grid>
                <Grid item xs>
                  <form action="/profile" method="post" name="recfile" enctype="multipart/form-data">
                  <input onChange={this.handleChangeFile} name="recfile" id="icon-button-file" type="file" className="input-file" />
                  <label htmlFor="icon-button-file" name="recfile">
                    <IconButton color="primary" aria-label="upload file" name="recfile" component="span">
                      <AttachFileIcon />
                    </IconButton>
                  </label>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Button onClick={this.onSubmit} variant="contained" color="primary" aria-label="enviar">
                Enviar
              </Button>
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;
