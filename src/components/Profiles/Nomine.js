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
import ImageSlider from 'react-native-image-slider';
import { TextField } from 'react-native-material-textfield';
import Toast from 'react-native-simple-toast';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';
import environment from '../../utils/environment';
import Button from 'react-native-button';
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
        loginscreenLoginContainer,
        subtitle,
        homescreenLogo
      } = customstyles;
const { white,
        turquoise,
        black,
        electricBlue
      } = colors;
      const { base_url } = environment;
      var fname
      var lname
      var phone
      var email
      var password
      var value
      var Eemail
      let data
export default class Nomine extends Component {
  constructor() {
    super();
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitEmail1 = this.onSubmitEmail1.bind(this);
    this.onBlur = this.onBlur.bind(this);
   // this.onSubmitMember = this.onSubmitMember.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    

    this.usertypeRef = this.updateRef.bind(this, 'usertype');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.emailRef = this.updateRef.bind(this,'email');
    this.email1Ref = this.updateRef.bind(this,'email1');
    
     this.state = {
         email: '',
         email1:'',
        // data:[],
     
       secureTextEntry: true,

     };
    //    _add = () => {
    //    data = [{email: this.state.email, email1: this.state.email1}]
    //    this.setState({data})
    //    console.log("data",data)
    //  }
      
  //  Eemail= [];
  //  Eemail.push(this.state.email,this.state.email1);
  //  console.log("Eemail",Eemail);
   //console.log("this sate emails",this.state.email1,this.state.email)

    
  }
    
  onSubmitRegister() {
  {
       data = [{email: this.state.email,
              email1: this.state.email1}]
       this.setState({data})
       console.log("data",data)
     
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
     registerObj :{
FirstName: fname,
LastName:  lname,
Eemail: data,
Phone: phone
    },
Email:email,
Password:password
//UserType: this.state.usertype,



 })
})

.then((response) => response.json())
      .then((responseJson) => {
        var message = responseJson.message;
        var status = responseJson.status;
        console.log("message"+message);
         
       if (message == 'Please Register !' || message == 'User Already Registered !') {
                 Toast.show(message); 
                  } else  {
                  
                Toast.show(message);
                console.log("Otp page");
               this.props.navigation.navigate('OtpPage',{Phone:phone});
            }
       
      })
      .catch((error) => {
        console.error(error);
      });
  //    this.props.navigation.navigate('OtpPage');
  }
}
//     onSubmitemail() {
//   this.email.focus();
// }
//  onSubmitemail1() {
//   this.email.focus();
// }
  onSubmitEmail() {
  this.email.focus();
}
  onSubmitEmail1() {
  this.email.focus();
}
  
  onSubmitPhone(){
    this.phone.focus();
  }
  onBlur() {
    let errors = {};
    
    // ['phone' ]
    // .forEach((name) => {
    //     console.log("Name: " + name);
    //    // let value = this[name].value();
    //    // console.log("Value: " + value);
        
    //     if (!value) {
    //         errors[name] = 'Should not be empty';
    //                 } 
    //     else {
              
    //           if (name === 'phone' && value.length < 3) {
    //             errors[name] = 'Incorrect RapidId';
    //           }
            
    //           if (name === 'usertype') {
    //             errors[name] = 'Usertype must be selected';
    //           }
    //         }
    // });
    
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
['email',  'email1']
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
  title: 'Nominations',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color: 'Black',alignSelf:'center' },
  }
    render() {
    var {params} = this.props.navigation.state;
     fname = params.fname
     lname = params.lname
     phone = params.phone
     email = params.email
     password = params.password
   // var token = params.token
   console.log("phone"+phone)
      let { errors = {}, secureTextEntry, ...data } = this.state;
    
       
      //  let { email = 'email' } = data;
      //  let { email1 = 'email1'  } = data;
       

      return (
        <KeyboardAvoidingView behavior="padding" style={loginscreenregisterContainer}>
          
                         <View style={homescreenLogo}>
                <ImageSlider
                    images={[
                        `https://www.visitzululand.co.za/images/directory_select/emergency.png`,     
                    ]}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}/>
            </View>
            <ScrollView>            
                  <View style={loginscreenregisterInput}>

                    <TextField
                        ref={this.emailRef}
                        value={this.state.email}
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
                      
                                 
                 
                     
                </View>
                 <View style={loginscreenregisterInput}>

                    <TextField
                        ref={this.email1Ref}
                        value={this.state.email1}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEmail1}
                        returnKeyType='next'
                        label="Email address"
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
                      
                                
                 
                     
                </View>
                   <View style={loginscreenLoginContainer}>
                       
                         <Button style={{ fontSize: 20, color: white }} 
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: electricBlue}}
             onPress={()=>this.onSubmitRegister()} >
            Submit
          </Button>
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

