import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableHighlight, Linking } from 'react-native';

export default props => (
    <Image style={style.image} source={ require('./../../imgs/bg.png')} >
        <View style={style.viewPrincipal}>
            <StatusBar backgroundColor="#114D44"/>
            <View style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 20, color: '#ffffff', marginBottom: 20 }}>Bem-vindo ao WhatsApp</Text>
                <Image style={{width: 125, height: 125}} source={require('./../../imgs/logo.png')} />
                <Text style={{ fontSize: 17, color: '#ffffff', marginTop: 20, paddingLeft: 50, paddingRight: 50, textAlign: 'center' }}>Troque mensagens móveis em várias plataformas com amigos de todo o mundo</Text>
            </View>
            <View style={{width: 200}}>
                <Button title="Fazer login" color="#115E54" onPress={() => Actions.formLogin()} />
            </View>
            <View>
                <TouchableHighlight onPress={() => Linking.openURL('https://www.linkedin.com/in/victormagalhaessales/')}>
                    <Text style={{ fontSize: 15, color: '#dbdbdb', marginTop: 20, textDecoration: 'underline'}}>Desenvolvido por Victor Magalhães</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Image>
);

const style = StyleSheet.create({
    image: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    viewPrincipal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 110
    }
})

