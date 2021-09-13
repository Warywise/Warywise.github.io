import React, { Component } from 'react';
import './App.css';
import Cronometer from './cronometer';

class App extends Component {
  changeTimer = (owner, { target: { name } }, increase) => {
    if (increase) {
      owner.setState((prevSt) => (
        prevSt[name] < 59
        ? {
      [name]: prevSt[name] + 1,
        }
        : {
          [name]: 0,
        }
    ));

      owner.mouseTimeoutId = setTimeout(() => {
        owner.mouseIntervalId = setInterval(() => {
          owner.setState((prevSt) => (
            prevSt[name] < 59
            ? {
          [name]: prevSt[name] + 1,
            }
            : {
              [name]: 0,
            }
        ));
        }, 100);
      }, 800);
      return;
    }

    owner.setState((prevSt) => (
      prevSt[name] > 0
        ? {
      [name]: prevSt[name] - 1,
        }
        : {
          [name]: 59,
        }
    ));

    owner.mouseTimeoutId = setTimeout(() => {
      owner.mouseIntervalId = setInterval(() => {
        owner.setState((prevSt) => (
          prevSt[name] > 0
            ? {
          [name]: prevSt[name] - 1,
            }
            : {
              [name]: 59,
            }
        ));
      }, 100);
    }, 800);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Nyan Catrometer</p>
        </header>
        <Cronometer changeTimer={ this.changeTimer } />
        <div className="nyan-cat" />
        <audio id="nyan-audio" src="https://www.albinoblacksheep.com/audio/mp3/Nyanyanyanyanyanyanya.mp3" preload="auto" />
      </div>
    );
  }
}

export default App;
