import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView ,
         TouchableOpacity,
         ScrollView
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import Toast from 'react-native-simple-toast';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';

import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import environment from '../../utils/environment';

const {
  loginscreenLogoContainer,
  loginscreenLogo,
  loginTitle ,
  container1
} = customstyles;

const {
  loginscreenregisterInput,
  loginscreenregisterContainer,
  loginscreenCreateAccountWrapper,
  loginscreenCreateAccountText,
  loginscreenCreateAccountLinkText,
  loginscreenLoginContainer
} = customstyles;

const {
  white,
  turquoise,
  black,
  electricBlue
} = colors;

const { base_url } = environment;

export default class UpdateProfile extends Component {
  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitBlood = this.onSubmitBlood.bind(this);
    this.onSubmitHeight = this.onSubmitHeight.bind(this);
    this.onSubmitWeight = this.onSubmitWeight.bind(this);
    this.onSubmitBloodPressure = this.onSubmitBloodPressure.bind(this);
    this.onSubmitPulseRate = this.onSubmitPulseRate.bind(this);
    this.onSubmitTempture = this.onSubmitTempture.bind(this);
    this.onSubmitRemarks = this.onSubmitRemarks.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    this.diseasetypeRef = this.updateRef.bind(this, 'diseasetype');
    this.bloodRef = this.updateRef.bind(this, 'blood');
    this.heightRef = this.updateRef.bind(this,'height');
    this.weightRef = this.updateRef.bind(this, 'weight');
    this.bloodpressureRef = this.updateRef.bind(this, 'bloodpressure');
    this.pulserateRef = this.updateRef.bind(this, 'pulserate');
    this.temptureRef = this.updateRef.bind(this, 'tempture');
    this.remarksRef = this.updateRef.bind(this, 'remarks');
    // this.registerObj = this.updateRef.bond(this,'registerObj');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
        blood: '',
        height: '',
        weight: '',
        bloodpressure: ''/'',
        pulserate:'',
        tempture:'',
        diseasetype:'',
        remarks:'',
        code: 'A700',
        secureTextEntry: true,
    }; 
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onSubmitBlood(){
    this.blood.focus();
  }

  onSubmitHeight(){
    this.height.focus();
  }

  onSubmitWeight(){
    this.weight.focus();
  }

  onSubmitBloodPressure() {
    this.bloodpressure.focus();
  }

  onSubmitPulseRate() {
    this.pulserate.focus();
  }

  onSubmitTempture(){
    this.tempture.focus();
  }

  onSubmitRemarks(){
    this.remarks.focus();
  }

  onBlur() {
    let errors = {};
    ['blood', 'height','weight', 'bloodpressure','pulserate','tempture','remarks']
      .forEach((name) => {
        console.log("Name: " + name);
        let value = this[name].value();
        console.log("Value: " + value);
        if (!value) {
          errors[name] = 'Should not be empty';
        } else {
            if (name === 'blood' && value.length > 2) {
              errors[name] = 'Invalid blood group';
            }            
            if (name === 'height' && value.length < 2.0) {
              errors[name] = 'please enter a valid height';  
            }
            if (name === 'weight' && value.length < 2) {
              errors[name] = 'please enter validnumber';
            }
            if (name === 'bloodpressure' && value.length < 2) {
              errors[name] = 'please enter a valid bloodpressure';
            }
            if (name === 'pulserate' && value.length < 2) {
              errors[name] = 'please enter a valid pulserate';
            }
            if (name === 'tempture' && value.length < 2) {
              errors[name] = 'please enter a valid tempture';
            }
            if (name === 'diseasetype') {
              errors[name] = 'diseasetype must be selected';
            }
          }
        });
    this.setState({ errors });
  }

  isEmptyObject(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  onFocus() {
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }

  onChangeText(text) {
    ['blood', 'height','weight', 'bloodpressure','pulserate','tempture','diseasetype','remarks']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitUpdate(token) {
    let errors = {};
    this.setState({ errors });
    return fetch(base_url + '/updateProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({ 
        growableObj : {
          Blood: this.state.blood,
          Height: this.state.height,
          Weight: this.state.weight,
          BloodPressure: this.state.bloodpressure,
          PulseRate: this.state.pulserate,
          BodyTempture: this.state.bodytempture,
          DiseaseType: this.state.diseasetype,
          Remarks: this.state.remarks
        }
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        console.log("message"+responseJson.message);
        console.log('token'+token);
         
        if (message === 'Internal Server Error !' || message === 'invalid token' || message === 'invalid request') {
          Toast.show(message); 
        } else {
            Toast.show(message);
            console.log("HomePage");
            this.props.navigation.navigate('HomePage',{token:token});
          }       
      }).catch((error) => {
        console.error(error);
      });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;
    let name = secureTextEntry? 'visibility': 'visibility-off';
    /* return (
          <MaterialIcon
              size={24}
              name={name}
              color={TextField.defaultProps.baseColor}
              onPress={this.onAccessoryPress}
              suppressHighlighting
          />
      );*/
  }

  static navigationOptions = {
    header: null,
  }
  
  render() {
    var {params} = this.props.navigation.state;
    var token = params.token
   console.log("token",token)
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { blood = 'blood' } = data;
    let { height = 'height' } = data;
    let { weight = 'weight' } = data;
    let { bloodpressure = 'bloodpressure' } = data;
    let { pulserate = 'pulserate' } = data;
    let { bodytempture = 'bodytempture'  } = data;
    let { diseasetype = 'diseasetype'  } = data;
    let { remarks = 'remarks'  } = data;
    
    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
        <ScrollView>            
          <View style={loginscreenregisterInput}>
            <TextField
              ref={this.bloodRef}
              value={data.blood}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitBlood}
              returnKeyType='next'
              label="Blood Type"
              error={errors.blood}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. O+, A-"
            />
            <TextField
              ref={this.heightRef}
              value={data.height}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitHeight}
              returnKeyType='next'
              label="Height (Feet)"
              error={errors.height}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. 6.2, 5.8"
            />
            <TextField
              ref={this.weightRef}
              value={data.weight}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitWeight}
              returnKeyType='next'
              label="Weight (Pounds)"
              error={errors.weight}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. 200, 150"
            />
            <TextField
              ref={this.bloodpressureRef}
              value={data.bloodpressure}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitBloodPressure}
              returnKeyType='next'
              label="Blood Pressure (mm/Hg)"
              error={errors.bloodpressure}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. 80/120"
            />
            <TextField
              ref={this.pulserateRef}
              value={data.pulserate}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPulseRate}
              returnKeyType='next'
              label="Pulse Rate (BPM)"
              error={errors.pulserate}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. 72"
            />
            <TextField
              ref={this.temptureRef}
              value={data.tempture}
              keyboardType='phone-pad'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitTempture}
              returnKeyType='next'
              label="Body Temperature (Fahrenheit)"
              error={errors.tempture}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Ex. 98.3"
            />
            <Dropdown 
              ref={this.diseasetypeRef}
              value={data.diseasetype}
              data={diseaseType}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              returnKeyType='next'
              label="Any recent medical issues?"
              tintColor={white}
              textColor={black}
              style={container1}
              onBlur={this.onBlur}
              placeholder="Select Yes/No"
            />
            
            <TextField
              ref={this.remarksRef}
              value={data.remarks}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitRemarks}
              returnKeyType='next'
              label="Remarks"
              error={errors.remarks}
              tintColor={black}
              textColor={black}
              onBlur={this.onBlur}
              placeholder="Comments none if no medical issues"
            />
            <View style={loginscreenLoginContainer}>
              <RaisedTextButton 
                onPress={()=>this.onSubmitUpdate(token)} 
                title="Update"
                color={electricBlue} 
                titleColor={white} 
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const diseaseType = [
  { value: 'Yes' },
  { value: 'No' }, 
];