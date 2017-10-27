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
export default class FamilyMember extends Component {
  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmitMember = this.onSubmitMember.bind(this);
    

    this.usertypeRef = this.updateRef.bind(this, 'usertype');
    this.phoneRef = this.updateRef.bind(this, 'phone');

    this.state = {
        phone: '',
     //   usertype:'',

    };
 
  }
  onSubmitMember(token){
    {
       
        let errors = {};
        this.setState({loading_blur: true});
        ['otp']
        // .forEach((name) => {
        //     let value = this[name].value();

        //      (!value) 
        //         errors[name] = 'Should not be empty';
             
        // });

        this.setState({ errors });
        return fetch(base_url + '/addFamilyMember', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': token
  },
  body: JSON.stringify({ 
rapidID: this.state.phone,
//Phone:phone
 })
})
.then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        console.log('token'+ token);
        console.log("message" + message);
         if (message === 'Register Please!' || message === 'Wrong RapidID') {
                  Toast.show(message); 
                   }
                        else {
                   Toast.show(message); 
                  console.log("HomePage");
                  this.props.navigation.navigate('HomePage',{token:token}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   );
             }
       
     })
     .catch((error) => {
     console.error(error);
      });
      //  this.props.navigation.navigate('LoginPage');

    }

    
  }
  
  onSubmitPhone(){
    this.phone.focus();
  }
  onBlur() {
    let errors = {};
    
    ['phone' ]
    .forEach((name) => {
        console.log("Name: " + name);
        let value = this[name].value();
        console.log("Value: " + value);
        
        if (!value) {
            errors[name] = 'Should not be empty';
                    } 
        else {
              
              if (name === 'phone' && value.length < 3) {
                errors[name] = 'Incorrect RapidId';
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
['phone',  'usertype']
.map((name) => ({ name, ref: this[name] }))
.forEach(({ name, ref }) => {
  if (ref.isFocused()) {
      this.setState({ [name]: text });
     
  }
});
}
updateRef(name, ref) {
    this[name] = ref;
  }
static navigationOptions = {
  title: 'Please add Family Members',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color: 'Black',alignSelf:'center' },
  }
    render() {
    var {params} = this.props.navigation.state;
    var token = params.token
      let { errors = {}, secureTextEntry, ...data } = this.state;

      let { phone = 'phone' } = data;
      let { usertype = 'usertype'  } = data;
       

      return (
        <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
            <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
         <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
         <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
            <ScrollView>            
                  <View style={loginscreenregisterInput}>

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
                        label="Rapid Id"
                        error={errors.phone}
                        tintColor={black}
                        textColor={black}
                        onBlur={this.onBlur}
                    />
                    <Dropdown 
                        ref={this.usertypeRef}
                        value={data.usertype}
                        data={usertypeData}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='next'
                        label="Relationship with me"
                        tintColor={white}
                        textColor={black}
                        style={container1}
                        onBlur={this.onBlur}
                                              
                     />

                                 
                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton 
                           onPress={()=>this.onSubmitMember(token)} 
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
  { value: 'Brother' },
  { value: 'Sister' },
  {value:'Father'},
  {value:'Mother'},
 
];

