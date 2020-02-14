import React from 'react';
import Modal from './components/Modal'
import api from './services/api'

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for upcoming test",
    completed: true
  },
  {
    id: 3,
    title: "Sally's books",
    description: "Go to library to rent sally's books",
    completed: true
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use django with react",
    completed: false
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      viewCompleted: false,
      todoList: [],
      activeItem: {
        title: "",
        description: "",
        completed: false
      }
    }
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList = () => {
    api.get('todos/')
      .then(resp => this.setState({ todoList: resp.data }))
      .catch(err => console.log(err))
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  handleSubmit = item => {
    this.toggle()
    if (item.id) {
      api.put(`todos/${item.id}/`, item)
        .then(res => this.refreshList())
      return
    }
    api.post('todos/', item)
      .then(res => this.refreshList())
  }

  handleDelete = item => {
    api.delete(`todos/${item.id}`)
      .then(res => this.refreshList())
  }

  createItem = () => {
    const item = { title: "", description: "", completed: false }
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  ediItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true })
    }
    return this.setState({ viewCompleted: false })
  }

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onClick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active" : ""}>
          Complete
        </span>
        <span onClick={() => this.displayCompleted(false)} className={this.state.viewCompleted ? "" : "active"}>
          Incomplete
        </span>
      </div>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    )

    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.description}>
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.ediItem(item)}> Edit </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>Delete </button>
        </span>
      </li>
    ))
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button className="btn btn-primary" onClick={this.createItem}>Add task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    )
  }

}

export default App;
