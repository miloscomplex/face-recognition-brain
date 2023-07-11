import React, {Component} from "react";
import './style/index.css';
import 'tachyons';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";
// import { API_KEY, PAT_KEY, CLARIFAI_USER } from "./services/KEY";
// import FaceDetection from "./services/FaceDetection";
import FaceRecognition from "./components/FaceRecognition";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import Signin from "./components/Signin";
import Register from "./components/Register";

const initialState = {
  input: "",
  imageUrl: "", 
  box: {},
  route: 'signin', 
  isSignIn: false,
  user: {
    id: '',
    name: '', 
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name, 
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    const { input } = this.state
    if (input.length) {
      this.setState({imageUrl: input})
      this.faceDetection(input);  
    } else {
      console.log('error');
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }


  faceDetection = (imgUrl) => {
    // console.log("faceDetection was called");
    const IMAGE_URL = imgUrl;

    fetch('http://localhost:3000/image-detect', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          imgUrl: imgUrl
      })
    })
    .then( res => res.json())
    .then(data => {
      if (data) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      calculateFaceLocation(data.outputs[0].data.regions[0].region_info.bounding_box)
  })

  const calculateFaceLocation = (data) => {
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);

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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
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