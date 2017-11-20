import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from 'react-native-button';
import BlinkView from 'react-native-blink-view';
import environment from '../../utils/environment';
import Toast from 'react-native-simple-toast';
import ImageSlider from 'react-native-image-slider';
import customstyles from '../../../assets/styles/customstyles';
const { base_url } = environment;
const {homescreenLogo} = customstyles;

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
   _handlePress(token) {
    console.log('Pressed!');
    return fetch(base_url + '/sos', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token
  },
  body: JSON.stringify({ 
Latitude: this.state.latitude,
Longitude:  this.state.longitude
 })
})
.then((response) => response.json())
      .then((responseJson) => {
        token = responseJson.token;
        var message = responseJson.message;
       
        console.log("message"+responseJson.message);
        Toast.show(message);
         this.props.navigation.navigate('HomePage',{token:token});
       
        
      })
      .catch((error) => {
        console.error(error);
      });
        

    }
   static navigationOptions = {
  title: 'EmergencyLink',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color:'Black',alignSelf:'center' },
}

  render() {
     var {params} = this.props.navigation.state;

        var token = params.token

    return (
         <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'aqua' }}>
              {/* <View style={homescreenLogo}>
                           <ImageSlider
                    images={[
                        `http://www.landmarkhospitals.net/media/1287/emergency-care.jpg`,     
                    ]}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}/>
                    </View> */}
        <Text>Your current Location would immediately</Text>
        <Text>informed to your Nominees</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <View style={{ backgroundColor: 'powderblue'}}>
     <BlinkView binking={this.state.isBlinking?true:false} delay={2000}>
      <Button
        style={{fontSize: 20, color: 'red'}}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress(token)}>
        Press here in case of any EMERGENCY....!
      </Button>
       </BlinkView>
       </View>
       </View>
    );
  }
}

export default GeolocationExample;