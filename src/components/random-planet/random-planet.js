import React, { Component } from 'react';

import PlanetView from './planet_view'
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state ={
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25)+3;
    this.swapiService.getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError);
  };

  render() {

    const {planet, loading, error } = this.state;

    const hasData = !(loading || error)

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    // planet-view.js
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { spinner }
        { content }
        { errorMessage }
      </div>

    );
  }
}