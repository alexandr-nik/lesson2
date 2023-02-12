import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
    indexonChange: null,
  };

  handleSubmit = text => {
    const todo = {
      text,
      id: nanoid(),
    };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };
  deleteTodo = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(item => item.id !== id);
    this.setState({ todos: [...newTodos] });
  };
  editTodo = index => {
    const { todos } = this.state;
    const editTodo = todos[index];
    this.setState({
      currentTodo: editTodo,
      isEditing: true,
      indexonChange: index,
    });
  };
  shangeTodo = changeTodo => {
    const todos = this.state.todos;
    todos[this.state.indexonChange] = changeTodo;
    this.setState({todos: todos})
  };
  closeForm = () => {
    this.setState({ isEditing: false });
  };
  componentDidMount() {
    const localTodo = localStorage.getItem('todos');
    if (localTodo) {
      this.setState({ todos: [...JSON.parse(localTodo)] });
    }
  }
  componentDidUpdate(prevState, nextState) {
    if (prevState !== nextState) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {this.state.todos.map((elem, index) => {
            return (
              <GridItem key={elem.id}>
                <Todo
                  text={elem.text}
                  counter={index + 1}
                  id={elem.id}
                  deleteTodo={this.deleteTodo}
                  editTodo={() => this.editTodo(index)}
                />
              </GridItem>
            );
          })}
          {this.state.isEditing && (
            <EditForm
              currentTodo={this.state.currentTodo}
              shangeTodo={this.shangeTodo}
              closeForm={this.closeForm}
            />
          )}
          {!this.state.todos.length && <Text>No todo</Text>}
        </Grid>
      </>
    );
  }
}
