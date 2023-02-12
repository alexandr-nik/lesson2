import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: '',
  };

  handleChangeSearch = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.search);

    e.currentTarget.reset();
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmitForm}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.handleChangeSearch}
        />
      </SearchFormStyled>
    );
  }
}
