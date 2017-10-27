import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import customstyles from '../../../assets/styles/customstyles';
import { NavigationActions } from 'react-navigation';
import { RaisedTextButton } from 'react-native-material-buttons';
import colors from '../../utils/colors';
import customtext from '../../utils/customtext';

const {
  HomeScreenWelcome,  
   scrollBox,
    myscreenLoginContainer,
    loginscreenInputContainer,
    loginTitle
  } = customstyles;
  
 const { white,
    black,
    electricBlue
  } = colors;
  const {
    login_Requestdetails
  } = customtext;
  
 
 export default class MyAppoinment extends Component {
    static navigationOptions = {
      header: null
    }
  
   render() {
      return (
        <View style={{flex: 1}}>
        <View style={HomeScreenWelcome}>
          <Text style={loginTitle}>
           My Requests     
         </Text>
          </View>
  
     
          <View style={loginscreenInputContainer}>
                     
                           <View style={myscreenLoginContainer}>
                    
                           <RaisedTextButton 
                              onPress={this.onMyRequests} 
                              title={login_Requestdetails} 
                              color={electricBlue} 
                              titleColor={white} 
                          />
                      </View>
                      </View>
                      
  
                  </View>
                
            
     );
    }
  }