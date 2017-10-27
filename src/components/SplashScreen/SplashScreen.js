import React, { Component } from 'react';
import { Text, 
         View, 
         StyleSheet, 
         ActivityIndicator, 
         Image 
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import customcolors from '../../utils/colors';

const { wrapper, 
        titleWrapper, 
        title, 
        subtitleWrapper, 
        subtitle, 
        splashscreenLoading, 
        splashscreenLoadingWrapper,
        loginscreenLogoContainer,
        loginscreenLogo 
    } = customstyles;
const { app_name,
        splash_footer_line1,
        splash_footer_line2 
    } = customtext;
const { white } = customcolors;

export default class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    componentDidMount() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginPage'})
            ]
        })

        setTimeout(() => {
            this.props.navigation.dispatch(resetAction)
        }, 10000)
    }
    
    componentWillUnmount() {
        // clear the interval
        clearInterval(this.autoRefreshHandler);
    }
    
    render() {
        return (
            <View style={wrapper}>
                <View style={titleWrapper}>
                    <View style={loginscreenLogoContainer}>
                        <Image
                            style={loginscreenLogo}
                            source={require('../../../assets/images/logo.png')}
                        />
                    </View>
                    <Text style={title}>{app_name}</Text>
                </View>

                <View style={splashscreenLoadingWrapper}>
                    <ActivityIndicator color={white}
                        size="large"
                        style={splashscreenLoading} />
                </View>

                <View style={subtitleWrapper}>
                    <Text style={subtitle}>{splash_footer_line1}</Text>
                    <Text style={subtitle}>{splash_footer_line2}</Text>
                </View>
            </View>
        );
    }
}