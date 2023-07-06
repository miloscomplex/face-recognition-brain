import React, {Component} from "react";
import './style/index.css';
import 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";
import { API_KEY } from "./services/KEY";


// const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: API_KEY;
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