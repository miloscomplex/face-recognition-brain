import React, {Component} from "react";
import './style/index.css';
import 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from "./components/Rank";

class App extends Component {
  render() {
    return (
      <div className="app">
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