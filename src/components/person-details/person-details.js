import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId != prevProps.personId){
      this.updatePerson(() => {
        this.setState({
          loading: true
        })
      });
    };
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    };

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({
          person: person,
          loading: false
        });
      });
  };

  render() {

    if (!this.state.person) {
      return (
        <div className="person-details card mt-0">
            <span>Please select a person!</span>
        </div>
      );
    }

    const { id, name, gender, birthYear, eyeColor } = this.state.person;
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="person-details card mt-0">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="person-details card mt-0">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name} {this.props.personId}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender:</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year:</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color:</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
