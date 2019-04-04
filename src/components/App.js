import React, { Component } from 'react';
import Image from './Image';
import Description from './Description';
import Title from './Title';
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../stylesheets/App.scss';

const api_key = 'BuoeNuxjaHyk5cAELtedF6e3WVuffEV4PnpKUggZ'

class App extends Component {

  // Component initialization
  // part of creating the object when <App/> is called.
  // constructor() is part of React.Component.
  // Overwrite it if you want to set some default values.
  constructor(props) {
    super(props);
    this.state = {
      title: "A Galaxy",
      url: "/default-image.jpg",
      description: "Blah blah, bladie blah blah.",
      date: dateFormat(new Date(), "yyyy-mm-dd")
    }
  }

  // called after <App/> is first 'mounted' and rendered
  componentDidMount() {
    this.getData(this.state.date);
  }

  getData(date) {
    let url = 'https://api.nasa.gov/planetary/apod?api_key='
    let dateParam = "&date=" + date;
    fetch(url + api_key + dateParam)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.explanation,
          url: data.url,
          date: date
        })
      })
  }

  handleDatePickerChange(selectedDate) {
    let date = dateFormat(selectedDate, 'yyyy-mm-dd');
    this.getData(date);
  }

  render() {
    return (
      <div className="picture-frame">
        <DatePicker 
          selected={this.state.date}
          onChange={this.handleDatePickerChange.bind(this)}
        />
        <Title text={this.state.title} />
        <Image url={this.state.url} />
        <Description text={this.state.description} />
      </div>
    );
  }
}

export default App;
