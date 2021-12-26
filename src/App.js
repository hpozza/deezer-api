import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player'
import { Grid } from '@mui/material';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      search: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })

    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.state.search, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "a6ad9600d5msh386d31b86df0870p1ae65fjsn63f0b5f9b412"
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data
        })
      }
      )
  }

  componentDidMount() {

  }

  render() {
    const data = this.state.data
    let songCard = []

    if (data) {
      for (let i = 0; i < 12; i++) {
        songCard.push(data[i])
      }
    }

    console.log("------", songCard?.map(data => data))
      return (
        <div className="App">
          <header className="App-header">
            Deezer Top Songs
            <input
              type="text"
              placeholder="Search"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button onClick={this.handleChange} >Search</button>
          </header>
          {songCard.map((data, i) => {
            return (
              <g>
                <h1
                  y={i * 15}
                >
                  {data?.duration}
                </h1>
                <ReactAudioPlayer
                  src={data?.preview}
                  autoPlay={false}
                  controls
                />
              </g>
            )
          })}
        </div>
      );
    }
}

export default App;
