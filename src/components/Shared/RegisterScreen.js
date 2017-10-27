/**
 * Created by Rahuld on 2017/08/26
 */import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView ,
         TouchableOpacity,
         ScrollView
        } from 'react-native';
import CheckBox from 'react-native-checkbox';
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
const { login_welcome } = customtext;
const { username_label,
        password_label,
        login_label,
        create_account_text,
        create_account_link,
        value_true
      } = customtext;
const { loginscreenregisterContainer,
        loginscreenregisterInput,
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
export default class RegisterScreen extends Component {
  constructor() {
    super();
    
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitRpassword = this.onSubmitRpassword.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
      
    
    
  //  this.usertypeRef = this.updateRef.bind(this, 'usertype');
    this.fnameRef = this.updateRef.bind(this, 'fname');
    this.lnameRef = this.updateRef.bind(this, 'lname');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.rpasswordRef = this.updateRef.bind(this, 'rpassword');
   // this.registerObj = this.updateRef.bond(this,'registerObj');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        rpassword: '',
        usertype:'',
        name: 'Cyan',
        code: 'A700',
        secureTextEntry: true,
    };
 
}
validateEmail(value) {
  let regex = /\w[-._\w]*@[-._\w]*\w\.\w{2,5}/;
  if (regex.test(value) === true) {
      return true;
  } else {
      return false;
  }
}
validateRpassword(value){
  console.log("value"+value);
  console.log("password"+this.state.password);
  if (value !== this.state.password) {
      return false;
  } else {
      return true;
  }
}
onAccessoryPress() {
  this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
}
onSubmitFirstName(){
  this.fname.focus();
}
onSubmitLastName(){
  this.lname.focus();
}
onSubmitPhone(){
  this.phone.focus();
}
onSubmitEmail() {
  this.email.focus();
}
onSubmitPassword() {
  this.password.focus();
}
onSubmitRpassword(){
  this.rpassword.focus();
}

onBlur() {
  let errors = {};
  
  ['fname', 'lname','phone', 'email','password','rpassword' ]
  .forEach((name) => {
      console.log("Name: " + name);
      let value = this[name].value();
      console.log("Value: " + value);
      
      if (!value) {
          errors[name] = 'Should not be empty';
                  } 
      else {
            if (name === 'fname' && value.length < 2) {
              errors[name] = 'Invalid fname';
            }
            if (name === 'lname' && value.length < 2) {
              errors[name] = 'Invalid lname';  
            }
            if (name === 'phone' && value.length < 10) {
              errors[name] = 'Incorrect Phone Number';
            }
            if (name === 'email' && !this.validateEmail(value)) {
              errors[name] = 'Invalid Email ID';
            }
            if (name === 'password' && value.length < 6) {
              errors[name] = 'Too short';
            }
            // if (name === 'rpassword' && value.length < 6) {
            //   errors[name] = 'Too short';
            // }
             if (name === 'rpassword' &&  !this.validateRpassword(value)) {
              errors[name] = 'Password Must Match';
            }
            if (name === 'usertype') {
              errors[name] = 'Usertype must be selected';
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
  ['fname','lname','phone', 'email','password','rpassword']
  .map((name) => ({ name, ref: this[name] }))
   .forEach(({ name, ref }) => {
       if (ref.isFocused()) {
           this.setState({ [name]: text });
         
       }
   });
}


onSubmitRegister() {
  
  let errors = new Object;
  let i =0;
  let test;
  
  this.setState({ errors });
  
  
  return fetch(base_url + '/registerUser', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
     registerObj : {
FirstName: this.state.fname,
LastName:  this.state.lname,
Phone:this.state.phone
    },
Email:this.state.email,
Password:this.state.password,
UserType: this.state.usertype


 })
})

.then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        console.log("message"+responseJson.message);
         
       if (message == 'Internal server Error!' || message == 'User Already Registered !') {
                 Toast.show(message); 
                  } else {
                Toast.show(message);
                console.log("Otp page");
               this.props.navigation.navigate('OtpPage',{Phone:this.state.phone});
            }
       
      })
      .catch((error) => {
        console.error(error);
      });
     // this.props.navigation.navigate('OtpPage');
  
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
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { fname = 'fname' } = data;
    let { lname = 'lname' } = data;
    let { phone = 'phone' } = data;
    let { email = 'email' } = data;
    let { password = 'password' } = data;
    let { rpassword = 'rpassword' } = data;
    let { usertype = 'usertype'  } = data;
  
    
    
    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
          <ScrollView>            
                <View style={loginscreenregisterInput}>
                    <TextField
                        ref={this.fnameRef}
                        value={data.fname}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitFirstName}
                        returnKeyType='next'
                        label="First Name"
                        error={errors.fname}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.lnameRef}
                        value={data.lname}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitLastName}
                        returnKeyType='next'
                        label="Last Name"
                        error={errors.lname}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.phoneRef}
                        value={data.phone}
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPhone}
                        returnKeyType='next'
                        label="Phone No."
                        error={errors.phone}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.emailRef}
                        value={data.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEmail}
                        returnKeyType='next'
                        label="Email"
                        error={errors.email}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.passwordRef}
                        value={data.password}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPassword}
                        returnKeyType='next'
                        label={password_label}
                        error={errors.password}
                        renderAccessory={this.renderPasswordAccessory}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    /> 
                    <TextField
                        ref={this.rpasswordRef}
                        value={data.rpassword}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitRpassword}
                        returnKeyType='next'
                        label="Retype Password"
                        error={errors.rpassword}
                        renderAccessory={this.renderPasswordAccessory}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    /> 
                   
                    
                  <CheckBox
                  label='I agree Terms and Condations'
                 // checked={false}
                  //onChange={(checked) => console.log('I am checked', checked)}
                    />
                  
                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton 
                            onPress={this.onSubmitRegister} 
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
const usertypeData = [
  { value: 'Patient' },
  { value: 'Diagnostic Center' },
  {value : 'Doctor'}, 
];