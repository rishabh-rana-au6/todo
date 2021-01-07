import React, { Component } from "react";
import Button from "@material-ui/core/Button";
class TodoItem extends Component {


  constructor() {
    super();
    this.state = {
      editing: false,
      text: ""
    }

  }


  componentDidMount() {
    if (this._listItem) {
      this._listItem.classList.add("highlight");
      setTimeout(
        listItem => {
          listItem.classList.remove("highlight");
        },
        500,
        this._listItem
      );
    }
  }

  markCompleted = event => {
    this.props.onItemCompleted(this.props.id);
  };

  deleteItem = event => {
    this.props.onDeleteItem(this.props.id);
  };

  editItem = event => {
    this.setState({ editing: true })
  }

  handleTextChange = event => {
    this.setState({ text: event.target.value })
  }

  handleEditing = (event) => {
    this.props.itemEdited(this.state.text, this.props.id)
    this.setState({ editing: false })
  }

  render() {
    var itemClass =
      "form-check todoitem " + (this.props.completed ? "done" : "undone");

    return (
      <li className={itemClass} ref={li => (this._listItem = li)}>
       
        {this.state.editing ? <form className="row" style={{ display: "grid", gridTemplateColumns: "auto auto", width: "700px", marginLeft: "300px" }}>
          <div className="column">
            <input
              type="text"
              className="form-control"
              onChange={this.handleTextChange}
              defaultValue={this.props.text}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              className="btn_1"
              onClick={this.handleEditing}
              disabled={!this.state.text}
            >
              Done
              </Button>
          </div>
        </form> 

        :
        <div>
        <label className="form-check-label">

          {this.props.completed ? <input
            type="checkbox"
            className="form-check-input"
            onChange={this.markCompleted}
            checked
          /> : <input
              type="checkbox"
              className="form-check-input"
              onChange={this.markCompleted}
            />}

          
            {this.props.text}
        </label>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => {
                          if (window.confirm("Delete the item?")) {
                           let removeToCollection = this.deleteItem.bind(this, 121);
                           removeToCollection();
                           }
                         }}
        >
          X
        </button>
        <button style={{ float: 'right' }}
          type="button"

          onClick={this.editItem}
        >
          Edit
        </button>
          </div> }
      </li>
    );
  }
}

export default TodoItem;
