import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, loginUsuario } from './../../redux/actions/AutenticacaoActions'

class formLogin extends Component {
    loginUsuario(){
        let email = this.props.email;
        let senha = this.props.senha;
        this.props.loginUsuario(email, senha);
    }
    renderBtnCadastro() {
        if(this.props.loading_login) {
            return (<ActivityIndicator size="large"/>)
        }
        return (<Button title="Login" color="#115E54" onPress={() => this.loginUsuario()}/>)
    }

    render() {
        return (
            <Image style={style.image} source={ require('../../imgs/bg.png')} >
                <View style={{ alignItems: 'center', marginTop: 30}}>
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>WhatsApp</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', padding: 20}}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <TextInput placeholder="E-mail" style={ style.input } placeholderTextColor="#FFF"
                            value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput  placeholder="Senha" style={ style.input } secureTextEntry placeholderTextColor="#FFF"
                            value={this.props.senha}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <TouchableHighlight onPress={() => Actions.formCadastro()}>
                            <Text style={{color: 'white', marginBottom: 20}}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                        <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.erroLogin}</Text>
                        {this.renderBtnCadastro()}
                    </View>
                </View>
            </Image>
        )
    }
}


const style = StyleSheet.create({
    image: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    input: {
        fontSize: 15, height: 45, borderBottomColor: 'white', borderBottomWidth: .7, color: 'white'
    }
});

const mapStageToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
);

export default connect(mapStageToProps, {modificaEmail, modificaSenha, loginUsuario})(formLogin);