import React, { Component } from "react";
import TodoList from "./TodoList";
import "./styles.css";
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import queryString from 'query-string'
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
        let params = queryString.parse(this.props.location.search)


        const newItem = {
            parentId: params.id,
            id: String(Date.now()),
            text: this.state.text,
            done: false
        };

        axios({
            method: 'post',
            url: 'http://localhost:5000/addToDo',
            data: {
                newItem: newItem
            }
        })

            .then(function (response) {
                console.log(response)
            })

        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ""
        }));
    };
    markItemCompleted = itemId => {
        let params = queryString.parse(this.props.location.search)
        var updatedItems = this.state.items.map(item => {
            if (itemId === item.id) item.done = !item.done;

            return item;
        });

        axios({
            method: 'post',
            url: 'http://localhost:5000/marked',
            data: {
                parentId: params.id,
                updatedItems: updatedItems
            }
        })

            .then(function (response) {
                console.log(response)
            })

        // State Updates are Merged
        this.setState({
            items: [].concat(updatedItems)
        });
    };

    handleDeleteItem = itemId => {
        let params = queryString.parse(this.props.location.search)
        var updatedItems = this.state.items.filter(item => {
            return item.id !== itemId;
        });
        axios({
            method: 'post',
            url: 'http://localhost:5000/deleteToDo',
            data: {
                parentId : params.id,
                updatedItems: updatedItems
            }
        })

            .then(function (response) {
                console.log(response)
            })
        this.setState({
            items: [].concat(updatedItems)
        });


    };

    itemEdited = (text, itemId) => {
        let params = queryString.parse(this.props.location.search)
        var updatedItems = this.state.items.map(item => {
            if (item.id == itemId){
                item.text = text;
                item.done = false;

            } 
            return item;
         
        });

        axios({
            method: 'post',
            url: 'http://localhost:5000/marked',
            data: {
                parentId: params.id,
                updatedItems: updatedItems
            }
        })

            .then(function (response) {
                console.log(response)
            })

        this.setState({
            items: [].concat(updatedItems)
        });


    }

    componentDidMount() {
        console.log("hii")
        let params = queryString.parse(this.props.location.search)
        const self = this;
        axios({
            method: 'post',
            url: 'http://localhost:5000/getToDos',
            data: {
                id: params.id,
            }
        })

            .then(function (response) {
                self.setState({ items: response.data[0].toDos })
            })

    }

    render() {
        return (
            <div>
                <div className="apptitle">TODO LIST</div>
                <Link to = "/"><Button >Go Home</Button></Link>
                <div className="row">
                    <div className="col-md-3">
                        <form className="row" style={{ display: "grid", gridTemplateColumns: "auto auto", width: "700px", marginLeft: "300px" }}>
                            <div className="column">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleTextChange}
                                    value={this.state.text}
                                />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="btn_1"
                                    onClick={this.handleAddItem}
                                    disabled={!this.state.text}
                                >
                                    {"ADD ToDo number  " +
                                        (this.state.items.length + 1)

                                    }
                                </Button>
                            </div>
                        </form>
                        <TodoList
                            items={this.state.items}
                            onItemCompleted={this.markItemCompleted}
                            onDeleteItem={this.handleDeleteItem}
                            itemEdited = {this.itemEdited}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
