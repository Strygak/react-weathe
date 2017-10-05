import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Loader, Header } from 'semantic-ui-react';
import './App.css';

import {  
  getCity,
  getWeatherCurrentUserPosition,
} from './redux';

class App extends Component {

  componentDidMount() {
    this.props.getWeatherCurrentUserPosition(this, true);
  }

  render() {

    let weather = this.props.weatherApp.weather ? (this.props.weatherApp.weather ? this.props.weatherApp.weather : <Loader active />) : 
                (window.sessionStorage.getItem("weather") ? "" : <Loader active />);
    return (
      <div className="App">
        <Header size="huge">Get the weather!</Header>
         <form>
            <Input type="text" id="city-enter" placeholder="enter city" name="city"
                   onChange={(e) => this.props.getCity(e)} />

            <Button type="button" primary 
                   onClick={() => {this.props.getWeatherCurrentUserPosition(this)}}>Search</Button>
        </form>
        <Header size="medium" id="weather-text">
          The weather in {weather}
        </Header>
      </div>
    );
  }
}

const mapStateToProps = state => ({  
  weatherApp: state.weatherApp
});

const mapDispatchToProps = { 
  getCity,
  getWeatherCurrentUserPosition,
};

const AppContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;