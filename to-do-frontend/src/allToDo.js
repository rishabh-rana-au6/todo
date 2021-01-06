import React, { Component } from "react";
import TodoList from "./TodoList";
import "./styles.css";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

class App extends Component {
  state = {
    items: [],
    text: ''
  };

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };


  handleAddItem = event => {
    event.preventDefault();

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:5000/eventData',
    //   data: {
    //     tickets: this.state.items,
    //     text: this.state.text
    //   }
    // })

    //   .then(function (response) {
    //     console.log(response)
    //   })

    const newItem = {
      id: String(Date.now()),
      name: this.state.text,
      toDos: []
    };

    console.log(newItem)
    
    axios({
      method: 'post',
      url: 'http://localhost:5000/newToDoList',
      data: {
        newToDo: newItem

      }
    })

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));

    

      
  };
  // markItemCompleted = itemId => {
  //   var updatedItems = this.state.items.map(item => {
  //     if (itemId === item.id) item.done = !item.done;

  //     return item;
  //   });

  //   // State Updates are Merged
  //   this.setState({
  //     items: [].concat(updatedItems)
  //   });
  // };
  
  componentDidMount(){
    axios({
      method : "get",
      url: 'http://localhost:5000/getAllToDoLists'
    }).then((response) => {
      console.log(response)
      this.setState({items : response.data})
    })
  }

  componentWillUnmount(){
    

  }



  handleDeleteItem = itemId => {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });
    axios({
      method: 'post',
      url: 'http://localhost:5000/deleteAList',
      data: {
        itemId: itemId
      }
    })
    
    this.setState({
      items: [].concat(updatedItems)
    });
  };

  render() {
    return (
      <div>
        <div className="apptitle">TODO LIST</div>
        <div className="row">
          <div className="col-md-3">

              <form className="row" style={{display : "grid", gridTemplateColumns : "auto auto", width : "700px", marginLeft : "300px"}}>
          <div >
            <input
              type="text"
              className="form-control"
              onChange={this.handleTextChange}
              value={this.state.text}
            />
          </div>
              <div style={{ marginTop: "10px"}}>
            <Button
              variant="contained"
              color="primary"
              className="btn_1"
              onClick={this.handleAddItem}
              disabled={!this.state.text}
            >
              ADD new List 
                
            </Button>
          </div>
        </form>
            {
              this.state.items.map(item => (
                <div style={{ display: "grid", gridTemplateColumns: "300px auto", gridGap : "30px",marginLeft : "400px", marginTop : "30px"}}>
                  <Link to={`/toDoList?id=${item.id}`} style={{textDecoration : "none"}}><div style={{ backgroundColor: "#f8a5c2", borderRadius : "50px", color : "white", width : "300px", height : "60px",   display: "flex",
  alignItems: "center",
  justifyContent: "center", fontWeight : "100px", cursor : "pointer"}} >
                    {/* <Link to={{ pathname: '/toDoList', query: { id: 1 } }}><h3>{item.text}</h3></Link> */}
                    <h3>{item.name}</h3>
                  
                 
                  </div></Link>
                <div>
                 <button style={{height : "30px", width :"30px", marginTop: "10px"}}
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={ () => {this.handleDeleteItem(item.id)}}
                  >
                  X
        </button>
        </div>
        </div>
               
              ))
            }
            
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
