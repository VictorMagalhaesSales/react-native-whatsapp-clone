import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from './../../redux/actions/AutenticacaoActions'

class formCadastro extends Component {

    cadastrarUsuario() {
        let nome = this.props.nome;
        let email = this.props.email;
        let senha = this.props.senha;
        this.props.cadastraUsuario(nome, email, senha);
    }

    renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (<ActivityIndicator size="large"/>)
        }
        return (<Button title="Cadastrar" color="#115E54" onPress={() => this.cadastrarUsuario()}/>)
    }

    render() {
        return (
            <Image style={style.image} source={ require('../../imgs/bg.png')} >
                <View style={{ flex: 1, padding: 10 }}>
                <StatusBar backgroundColor="#114D44" />
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput placeholder="Nome" style={ style.botao } placeholderTextColor="#FFF"
                            value={this.props.nome}
                            onChangeText={texto => this.props.modificaNome(texto)}
                        />
                        <TextInput placeholder="E-mail" style={ style.botao } placeholderTextColor="#FFF"
                            value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput placeholder="Senha" style={ style.botao } secureTextEntry placeholderTextColor="#FFF"
                            value={this.props.senha}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
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
    botao: {
        fontSize: 15, height: 45, borderBottomColor: 'white', borderBottomWidth: .7, color: 'white'
    }
});

const mapStateToProps = state => ({
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
})

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })(formCadastro);

