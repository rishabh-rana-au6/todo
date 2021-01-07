import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = [ ]


const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case ("SAVE_TODO"):
            console.log("reducer")


            const newToDo = action.payload


            return [
                ...state, newToDo
            ]
        default :
        return [
            ...state
        ]
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(userReducer, composeEnhancers(applyMiddleware(thunk)))

export default store