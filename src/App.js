import React, {Component} from "react";
import './style/index.css';
import 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";
//import Clarifai from "clarifai";
import { API_KEY, PAT_KEY, CLARIFAI_USER } from "./services/KEY";
import FaceDetection from "./services/FaceDetection";
import FaceRecognition from "./components/FaceRecognition";


class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "", 
      box: {}
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }



  onBtnSubmit = () => {
    console.log("click");
    this.setState({imageUrl: this.state.input})
    const faceDetection = FaceDetection(this.state.input);
  }

  render() {
    return (
      <div className="app">
        <ParticlesBg color="#444444" num={150} type="cobweb" config={this.config} bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}onBtnSubmit={this.onBtnSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />

        {/* <Navigation />
        <Logo />
        <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;