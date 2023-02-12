import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { Component } from 'react';
export class EditForm extends Component {
  state = {
    currentTodo: {},
    edit: '',
  };
  componentDidMount() {
    const { currentTodo } = this.props;
    this.setState({ currentTodo: currentTodo });
  }
  onClickClose = () => {
    this.props.closeForm();
  };
  handleInputChange = e => {
    this.setState({ edit: e.target.value });
  };
  submitForm = e => {
    e.preventDefault();
    const newTodo = this.state.currentTodo;   
    newTodo.text = this.state.edit;
    this.setState({ currentTodo: newTodo });
    this.props.shangeTodo(this.state.currentTodo);
    this.onClickClose();
  };
  render() {
    const { currentTodo } = this.state;
    return (
      <div
        style={{
          position: 'fixed',
          background: 'rgb(249 245 245 / 75%)',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchFormStyled onSubmit={this.submitForm}>
          <BtnEdit type="button" onClick={this.onClickClose}>
            <MdOutlineCancel size="16px" color="red" />
          </BtnEdit>

          <FormBtn type="submit">
            <RiSaveLine size="16px" color="green" />
          </FormBtn>

          <InputSearch
            placeholder="EDIT TODO"
            name="edit"
            required
            defaultValue={currentTodo.text}
            autoFocus
            onChange={this.handleInputChange}
          />
        </SearchFormStyled>
      </div>
    );
  }
}
