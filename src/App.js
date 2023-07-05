import React, {Component} from "react";
import './style/index.css';
import 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";
import Clarifai from 'clarifai';

// const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'bd721852e03f4d62829f536d1f97d5c8'
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <ParticlesBg color="#444444" num={150} type="cobweb" config={this.config} bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <Navigation />
        <Logo />
        <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;