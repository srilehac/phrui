import React from 'react';
import { Component} from 'react-native';
import { View } from 'react-native';
import { Navigator } from './src/utils/navigator';

/*rendering towards navigator from where it will be routed to different pages */
export default class App extends React.Component {
  render() {
    return <Navigator />
  }
}