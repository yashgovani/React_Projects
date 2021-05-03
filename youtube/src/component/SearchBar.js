import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
  }

  inputChangeHandler = (event) => {
      this.setState({term :event.target.value})
  }

  onFormSubmit = (event) => {
      event.preventDefault();
      this.props.onFormSubmit(this.state.term);
  }

  render() {
    return (
      <div className="search-bar ui segment">
        <form className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={this.inputChangeHandler}
            />
            <button
              onClick={this.onFormSubmit}
              type="submit"
              style={{ marginTop: '10px' }}
              className="ui primary button"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
