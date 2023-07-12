import { API } from '../constants/index';

exports.faceDetection = (imgUrl) => {
    // console.log("faceDetection was called");
    const IMAGE_URL = imgUrl;
    

    fetch(`${API}/image-detect`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          imgUrl: imgUrl
      })
    })
    .then( res => res.json())
    .then(data => {
      if (data) {
        fetch(`${API}/image`, {
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
    console.log(width, height);

    return this.setState({box: {
        leftCol: data.left_col * width,
        topRow: data.top_row * height,
        rightCol: width - (data.right_col * width),
        bottomRow: height - (data.bottom_row * height)
    }});
  }
}