import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableHighlight, ListView, Dimensions } from 'react-native';
import { modificaMensagem, enviarMensagem, conversaUsuarioObserver } from '../../redux/actions/ConversasActions'

import b64 from 'base-64';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioObserver(this.props.contatoEmail)
        this.criaFonteDeDados( this.props.conversa );
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail) {
            this.props.conversaUsuarioObserver(nextProps.contatoEmail)
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados( conversa ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversa || []);
    }

    _enviarMensagem() {
        const { mensagem, contatoEmail } = this.props;
        this.props.enviarMensagem(mensagem, contatoEmail)
    }

    renderRow(texto) {
        if(texto.tipo === 'e') {
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1}}>{texto.mensagem}</Text>
                </View>
            )
        }
        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1}}>{texto.mensagem}</Text>
            </View>
        )
    }

    render() {
        return (
            <Image style={{flex: 1, width: Dimensions.get('screen').width}} source={ require('../../imgs/bgconversa.jpg')} >
                <View style={{ flex: 1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10 }}>
                    <View style={{ flex: 1, paddingBottom: 20 }}>
                        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow}/>
                    </View>
                    <View style={{ flexDirection: 'row', height: 60}}>
                        <TextInput 
                            value={this.props.mensagem}
                            onChangeText={texto => this.props.modificaMensagem(texto) }
                            style={{ flex: 4, backgroundColor: '#fff', fontSize: 18, borderRadius: 50, marginRight: 10, border: 'none'}}/>
                        <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor="#fff">
                            <Image style={{width: 50, height: 50}} source={require('../../imgs/enviar_mensagem.png')} />
                        </TouchableHighlight>
                    </View>
                </View> 
            </Image>
        )
    }
}

mapStateToProps = state => {
        return ({
        conversa: state.ListaConversaReducer,
        mensagem: state.ConversasReducer.mensagem
    })
}

export default connect(mapStateToProps, {modificaMensagem, enviarMensagem, conversaUsuarioObserver})(Conversa)