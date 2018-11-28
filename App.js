import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChapters: 0
    };
  }

  onAddChapter = () => {
    this.setState({
      numChapters: this.state.numChapters + 1
    });
  };

  render() {
    const chapters = [];
    const navlist = [];

    for (var i = 0; i < this.state.numChapters; i += 1) {
      chapters.push(<Chapter key={i} chapterId={i} />);
      navlist.push(<Link to={`/${i + 2}`}>Ch {`${i + 2}`}</Link>);
    }

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="Background">
              <p>Consent - future of agreements</p>
              <div>
                <Chapter chapterId={-1} />
                {chapters}
              </div>
              <p>
                <a href="#" onClick={this.onAddChapter}>
                  Add Chapter
                </a>
              </p>
              <div className="navbar">
                <Link to="/1">Ch 1</Link>
                {navlist}
                <Route path="/:id" render={props => <Child {...props} />} />
              </div>
            </div>
          </header>
        </div>
      </Router>
    );
  }
}

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphList: [{}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.onAddParagraph = this.onAddParagraph.bind(this);
    this.onRemoveParagraph = this.onRemoveParagraph.bind(this);
  }

  handleChange(id, event) {
    var paragraphList2 = [...this.state.paragraphList];
    paragraphList2[id].value = event.target.value;
    this.setState({ paragraphList: paragraphList2 });
  }

  handleSubmit(id, event) {
    event.preventDefault(); //undviker att sidan refreshar
    var paragraphList2 = [...this.state.paragraphList];
    paragraphList2[id].edit = false;

    this.setState({
      paragraphList: paragraphList2
    });
  }

  handleClick(id, event) {
    //event kan tas bort, tar bara med infon att clickade
    var paragraphList2 = [...this.state.paragraphList];
    paragraphList2[id].edit = this.state.edit ? false : true;

    this.setState({
      paragraphList: paragraphList2
    });
  }

  onAddParagraph() {
    this.setState({
      paragraphList: [...this.state.paragraphList, {}]
    });
  }

  onRemoveParagraph(paragraphId) {
    var clone = [...this.state.paragraphList];
    clone.splice(paragraphId, 1);
    this.setState({
      paragraphList: clone
    });
  }

  render() {
    return (
      <div className="chapter">
        <div id="children-pane">
          Ch
          {this.props.chapterId + 2}
          {this.state.paragraphList.map((p, i) => (
            <Paragraph
              value={this.state.paragraphList[i].value}
              edit={this.state.paragraphList[i].edit}
              key={i}
              paragraphId={i}
              chapterId={this.props.chapterId}
              onRemoveParagraph={this.onRemoveParagraph}
              handleClick={this.handleClick}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          ))}
        </div>
        <p>
          <a href="#" onClick={this.onAddParagraph}>
            Add Paragraph
          </a>
        </p>
      </div>
    );
  }
}

class Paragraph extends Component {
  render() {
    return (
      <div className={"Paragraph"}>
        <button
          onClick={e => this.props.handleClick(this.props.paragraphId, e)}
          className={"Paragraph-btn" + " " + (this.props.edit ? "hidden" : "")}
        >
          §{this.props.chapterId + 2}
          {`.`}
          {this.props.paragraphId + 1 + " "}
          {this.props.value}
        </button>
        {this.props.edit && (
          <ParagraphContent
            shouldEdit={this.props.edit}
            value={this.props.value}
            handleChange={this.props.handleChange}
            handleSubmit={this.props.handleSubmit}
            onRemoveParagraph={this.props.onRemoveParagraph}
            paragraphId={this.props.paragraphId}
          />
        )}
      </div>
    );
  }
}

class ParagraphContent extends React.Component {
  render() {
    return (
      <div className={this.props.shouldEdit ? "hidden" : ""}>
        <form
          onSubmit={event =>
            this.props.handleSubmit(this.props.paragraphId, event)
          }
        >
          <label>
            <textarea
              value={this.props.value}
              onChange={event =>
                this.props.handleChange(this.props.paragraphId, event)
              }
              rows="7"
              style={{ width: "95%" }}
            />
          </label>
          <input type="submit" value="Save" />

          <button
            onClick={event =>
              this.props.onRemoveParagraph(this.props.paragraphId, event)
            }
          >
            Remove
          </button>
        </form>
        <Toggle />
        <Toggle />
      </div>
    );
  }
}

class Toggle extends React.Component {
  render() {
    //behöver denna state? finns en i https://reactjs.org/docs/handling-events.html
    return (
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" />
      </label>
    );
  }
}

export default App;
