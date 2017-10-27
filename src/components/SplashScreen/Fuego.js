/**
 * Created by Rahuld on 2017/08/26
 */
import React, { Component } from 'react';
/*import through path*/
import Flame from '../Shared/Flame';

import fuegoImage from './fuegologo.jpg';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import { NavigationActions } from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Animated
} from 'react-native';
const {splash_footer_line1, splash_footer_line2} = customtext;
const colors = {
    0: 'rgba(252, 159, 13, 1)',
    50: 'rgba(219, 32, 28, 1)',
    100: 'rgba(159, 5, 17, 1)'
}
const { 
    loginscreenContainer,
    subtitleWrapper,
    subtitle

} = customstyles;


module.exports = class Fuego extends Component {
     static navigationOptions = {
        header: null,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bg: new Animated.Value(0),
            fadeOut: new Animated.Value(1)
        }
    }

    componentDidMount() {
        this.animate()
    
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginPage'})
            ]
        })
    
    setTimeout(() => {
            this.props.navigation.dispatch(resetAction)
        }, 5000)
    }

    animate() {
        Animated.sequence([
            Animated.delay(2000),
            Animated.timing(
                this.state.bg,
                {
                    toValue: 1,
                    duration: 1000
                }),
        ]).start( () => {
            //this.animate();
            this.setState({loading: false})
        });
    }

    circleFactory(num) {
        let arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(i)
        }
        return arr.map((a, i) => {
            let rand = Math.random();
            let circle = {
                radius: (rand * 35) + 25,
                styles: {
                    //backgroundColor: "transparent",
                    left: 50 + Math.random() * 60,
                    top: 100 + Math.random() * 20
                },
                distance: (rand * 100) + 50,
                lifetime: 2000,
                wiggle: {
                    distance: 30,
                    count: (rand * 3) + 1
                },
                loop: false

            };

            return <Flame key={"flameFlame" + i} {...circle}/>
        })
    }

    render() {

        var color = this.state.bg.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(159, 5, 17, 1)', "white"]
        });

        let loadingStyles = [styles.loadingScreen, {
            backgroundColor: loginscreenContainer,
            opacity: this.state.fadeOut
        }];
        return (
            
            <Animated.View key="Fuego" style={loadingStyles}>
                <View style={styles.container}>
                    {this.state.loading ? null : this.circleFactory(80)}
                    <Image source={fuegoImage} style={styles.fuegoLogo}/>
                    {this.state.loading ? null : this.circleFactory(10)}

                </View>
            
             <View style={subtitleWrapper}>
                    <Text style={subtitle}>{splash_footer_line1}</Text>
                    <Text style={subtitle}>{splash_footer_line2}</Text>
                </View>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        position: "relative",
    },
    fuegoLogo: {
        backgroundColor: loginscreenContainer,
        position: "absolute",
        top: 50,
        left: 50,
        width: 100,
        height: 100
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    }
    
});

