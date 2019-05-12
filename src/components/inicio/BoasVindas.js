import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

export default props => (
    <Image style={{flex: 1}} source={ require('./../../imgs/bg.png')} >
        <View style={style.viewPrincipal}>
            <View style={{alignItems: 'center'}}>
                <Image style={{width: 125, height: 125}} source={require('./../../imgs/logo.png')} />
                <Text style={{ fontSize: 20, color: '#ffffff', marginTop: 20 }}>Seja Bem-Vindo</Text>
            </View>
            <View style={{width: 200}}>
                <Button title="Fazer login" color="#115E54" onPress={() => Actions.formLogin()} />
            </View>
        </View>
    </Image>
);

const style = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 110
    }
})

