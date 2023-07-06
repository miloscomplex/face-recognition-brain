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
// import FaceDetection from "./services/FaceDetection";
import FaceRecognition from "./components/FaceRecognition";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import Signin from "./components/Signin";
import Register from "./components/Register";

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "", 
      box: {},
      route: 'signin', 
      isSignIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input})
    this.faceDetection(this.state.input);

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignIn: false})
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }


  faceDetection = (imgUrl) => {
    // console.log("faceDetection was called");
    const IMAGE_URL = imgUrl;

    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT_KEY
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => response.json())
        .then(result => calculateFaceLocation(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));

    const calculateFaceLocation = (data) => {
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);

        return this.setState({box: {
            leftCol: data.left_col * width,
            topRow: data.top_row * height,
            rightCol: width - (data.right_col * width),
            bottomRow: height - (data.bottom_row * height)
        }});
    }

}

  render() {
    const { isSignIn, imageUrl, route, box } = this.state;

    return (
      <div className="app">
        <ParticlesBg color="#444444" num={150} type="cobweb" config={this.config} bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignIn}/>
        <Logo />

        { this.state.route === 'home'
          ?
          <div>
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange}onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }

        {/* <Navigation />
        <Logo />
        <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;