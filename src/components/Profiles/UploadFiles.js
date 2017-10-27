import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import {DocumentPicker, ImagePicker} from 'expo';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
// import LoginForm from './LoginForm';
import colors from '../../utils/colors';
import { TextField } from 'react-native-material-textfield';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast from 'react-native-simple-toast';
import ImageSlider from 'react-native-image-slider';
import Drawer from 'react-native-drawer';
/*importing and using from const*/
const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle 
    } = customstyles;
const { login_welcome } = customtext;
const { username_label,
    password_label,
    login_label,
    update_profile,
    built_profile,
    view_profile,
    terms_profile,
    nearby_profile,
    create_account_text,
    create_account_link,
    myfamily_members
 } = customtext;
const { loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    homescreenalignmentMyaccount,
    homescreenalignmentMyappointment,
    homescreenalignmentNearbyhospital,
    homescreenLogo,
    headerStyle,
    loginscreenLoginContainer
 } = customstyles;
const { white,
    black,
    electricBlue
 } = colors;

export default class App extends React.Component {
    state = {
      image: null,
    };
    onHomeProfile(token){
        console.log('Home page');
         this.props.navigation.navigate('HomePage',{token:token});
    }
  _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
      console.log(result);
	}

   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    alert(result.uri);
    console.log(result)

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


 static navigationOptions = {
  title: 'MY PROFILE',
  headerStyle: { backgroundColor: 'powderblue' },
  headerTitleStyle: { color:'Black',alignSelf:'center' },
}

  render() {
       var {params} = this.props.navigation.state;
      var token = params.token
         let { image } = this.state;
    return (
         <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
              <View style={loginscreenLogoContainer}>
                    <Text style={loginTitle}>Please Upload Your Prescribed Document or Image</Text>
                </View>
      <View style={styles.container}>
           <View style={loginscreenInputContainer}>

                   
                         <View style={homescreenalignmentMyaccount}>
        <RaisedTextButton
          title="Select MY Document"
           color={electricBlue} 
           titleColor={white} 
          onPress={this._pickDocument}
        />

      <View style={{ 'marginTop': 20}}>
        <RaisedTextButton
          title="Select MY Image"
          color={electricBlue} 
          titleColor={white} 
          onPress={this._pickImage}
        />
        <View style={{ 'marginTop': 20}}>
        <RaisedTextButton
          title="Go To Home"
          onPress={()=>this.onHomeProfile(token)} 
           color={electricBlue} 
           titleColor={white} 
         
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      </View>
      </View>
      </View>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
