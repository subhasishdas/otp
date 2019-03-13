import React, { Component, PropTypes  } from 'react';
import './app.css';
import ReactImage from './react.png';
import Timer from 'react-timer';
import axios from 'axios';

export default class App extends Component {
  state = { username: null   };

  constructor (props) {
    super(props);
    this.onLaunchClicked = this.onLaunchClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOTP = this.handleChangeOTP.bind(this);
    this.onVerfClicked = this.onVerfClicked.bind(this);
    this.state = {
        isButtonDisabled: false,
        text: 'Not Verified',
        phone:'',
        otp:''
    }
  }

  componentDidMount() {
   // fetch('/isverified')
      //.then(res => res.json())
      //.then(user => this.setState({ username: user.username }));
      
  }
  onLaunchClicked () {
   // event.preventDefault();
    this.setState({
        isButtonDisabled: true
    });
    console.log(this.state.phone);
    alert("hello");
    axios.post('/otp', {
        phone: this.state.phone
      }).then(msg => {
        console.log(msg);
      });
    //setTimeout(() => this.setState({ isButtonDisabled: false }), 5000);

   // return this.props.onLaunchClicked();

}
  onVerfClicked(){
    alert("Hello");
    console.log(this.state.otp);
    console.log(this.state.phone);
    //event.preventDefault();
     axios.post('/verify',{
        num: this.state.otp
     }).then(res => {
          console.log("hello");
          console.log(res);
          this.setState({ text: res.data.verifiedtext })
   });
      
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      phone: e.target.value
    });
  }

  handleChangeOTP(e) {
    console.log(e.target.value);
    this.setState({
      otp: e.target.value
    });
  }
  render() {
    const { username } = this.state;
    const validTime=false;
    return (
      <div>
      <div>
      <form id="one">
        <label>
          Phone Number:
          <input type="text" onChange={this.handleChange}  name="phone" />
        </label>
        <input type="button" value="Submit" onClick={this.onLaunchClicked} />
      </form >
        </div>
        <div>
      <form id="two" onSubmit={this.onVerfClicked}>
        <label>
          Enter the OTP:
          <input type="text" onChange={this.handleChangeOTP} name="num" />
        </label>
        <input type="button" value="Submit" onClick={this.onVerfClicked} />
      </form>
      </div>
      <h1>{this.state.text}</h1>
      </div>
    );
  }
}
