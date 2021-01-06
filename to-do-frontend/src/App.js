import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import allToDo from './allToDo'
import toDoList from './oneToDo'

function App() {



    return (
        <Router>


            <Route exact path="/" component={allToDo} />

             <Route exact path="/toDoList" component = {toDoList}/> 


        </Router>

    );
}

export default App;