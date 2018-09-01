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
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import { TextField } from 'react-native-material-textfield';
import Toast from 'react-native-simple-toast';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';
import environment from '../../utils/environment';
const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle ,
        container1
      } = customstyles;


const { loginscreenregisterInput,
        loginscreenregisterContainer,
        loginscreenCreateAccountWrapper,
        loginscreenCreateAccountText,
        loginscreenCreateAccountLinkText,
        loginscreenLoginContainer
      } = customstyles;
const { white,
        turquoise,
        black,
        electricBlue
      } = colors;
const { base_url } = environment;
export default class BuildProfile extends Component {
  constructor() {
    super();
    
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitFamilyPhysicianName = this.onSubmitFamilyPhysicianName.bind(this);
    this.onSubmitDOB = this.onSubmitDOB.bind(this);
    this.onSubmitMedicalHistory = this.onSubmitMedicalHistory.bind(this);
    this.onSubmitAddress = this.onSubmitAddress.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitBuild = this.onSubmitBuild.bind(this);
      
    
    
    this.gendertypeRef = this.updateRef.bind(this, 'gendertype');
    this.nameRef = this.updateRef.bind(this, 'name');
    this.pnameRef = this.updateRef.bind(this,'pname');
    this.dobRef = this.updateRef.bind(this, 'dob');
    this.medicalhistoryRef = this.updateRef.bind(this, 'medicalhistory');
    this.addressRef = this.updateRef.bind(this, 'address');
    // this.registerObj = this.updateRef.bond(this,'registerObj');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
        name: '',
        pname: '',
        dob: '',
        medicalhistory: '',
        address:'',
        gendertype:'',
        code: 'A700',
        secureTextEntry: true,
    };
 
}

onAccessoryPress() {
  this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
}
onSubmitName(){
  this.name.focus();
}
onSubmitFamilyPhysicianName(){
  this.pname.focus();
}
onSubmitDOB(){
  this.dob.focus();
}
onSubmitMedicalHistory () {
  this.medicalhistory.focus();
}
onSubmitAddress() {
  this.address.focus();
}


onBlur() {
  let errors = {};
  
  ['name', 'pname','dob', 'medicalhistory','address' ]
  .forEach((name) => {
      console.log("name: ",name);
      let value = this[name].value();
      console.log("Value: " + value);
      
      if (!value) {
          errors[name] = 'Should not be empty';
                  } 
      else {
            if (name === 'name' && value.length < 2) {
              errors[name] = 'Invalid name';
            }
            if (name === 'pname' && value.length < 2) {
              errors[name] = 'Invalid familyphysicianname';  
            }
            if (name === 'dob' && value.length < 10) {
              errors[name] = 'Incorrect dob';
            }
             if (name === 'medicalhistory' && value.length < 2) {
              errors[name] = 'Invalid data';
            }
             if (name === 'address' && value.length < 2) {
              errors[name] = 'Invalid address';
            }
            
            if (name === 'gendertype') {
              errors[name] = 'gendertype must be selected';
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
  ['name', 'pname','dob', 'medicalhistory','address','gendertype']
  .map((name) => ({ name, ref: this[name] }))
  .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
          this.setState({ [name]: text });
         
      }
  });
}


onSubmitBuild(token) {
  
  let errors = {};
  
  this.setState({ errors });
  return fetch(base_url + '/buildProfile', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token
  },
  body: JSON.stringify({ 
    profileObj : {
Name: this.state.name,
FamilyPhysicianName:  this.state.pname,
DOB:this.state.dob,
MedicalHistory: this.state.medicalhistory,
Address: this.state.address,
GenderType: this.state.gendertype
    }
 })
})

.then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        console.log("message"+responseJson.message);
        var Name= responseJson.report.name;
        console.log("Name",+Name);
        console.log('token'+token);
       if (message === 'Internal server Error!' || message === 'invalid request' || message === 'invalid token') {
                 Toast.show(message);
                  } else {
                Toast.show(message);
                console.log("HomePage");
                console.log(Name,"sri");
               this.props.navigation.push('HomePage',{token:token,Name:Name});
            }
       
      })
      .catch((error) => {
        console.error(error);
      });
     // this.props.navigation.navigate('HomePage');
  
}
updateRef(name, ref) {
  this[name] = ref;
}
renderPasswordAccessory() {
  let { secureTextEntry } = this.state;
  let name = secureTextEntry?
      'visibility':
      'visibility-off';
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
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { name = 'name' } = data;
    let { pname = 'pname' } = data;
    let { dob= 'dob' } = data;
    let { medicalhistory = 'medicalhistory' } = data;
    let { address = 'address' } = data;
    let { gendertype = 'gendertype'  } = data;
    
    
    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
          <ScrollView>            
                <View style={loginscreenregisterInput}>
                    <TextField
                        ref={this.nameRef}
                        value={data.name}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitName}
                        returnKeyType='next'
                        label="Patient Name"
                        error={errors.name}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.pnameRef}
                        value={data.pname}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitFamilyPhysicianName}
                        returnKeyType='next'
                        label="Family Physician Name"
                        error={errors.pname}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.dobRef}
                        value={data.dob}
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitDOB}
                        returnKeyType='next'
                        label="DOB(mm/dd/yyyy)"
                        error={errors.dob}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.medicalhistoryRef}
                        value={data.medicalhistory}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitMedicalHistory}
                        returnKeyType='next'
                        label="Medical History"
                        error={errors.medicalhistory}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.addressRef}
                        value={data.address}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitAddress}
                        returnKeyType='next'
                        label="Home Address"
                        error={errors.address}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                   
                    <Dropdown 
                        ref={this.gendertypeRef}
                        value={data.gendertype}
                        data={genderType}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='next'
                        label="Select Gender"
                        tintColor={white}
                        textColor={black}
                        style={container1}
                        onBlur={this.onBlur}
                                              
                     />
                  
                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton 
                            onPress={()=>this.onSubmitBuild(token)} 
                            title="Submit"
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
const genderType = [
  { value: 'Male' },
  { value: 'Female' }, 
];




