import React, { Component } from 'react';
import Image from './Image';
import Description from './Description';
import Title from './Title';
import '../stylesheets/App.css';

/* Get an api key from NASA: https://api.nasa.gov/index.html#apply-for-an-api-key */
const api_key = 'xxx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "A Galaxy",
      url: "/default-image.jpg",
      description: "Blah blah, bladie blah blah."
    }
  }

  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=' + api_key)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.explanation,
          url: data.url
        })
      })
  }

  render() {
    return (
      <div>
        <Title text={this.state.title} />
        <Image url={this.state.url} />
        <Description text={this.state.description} />
      </div>
    );
  }
}

export default App;
