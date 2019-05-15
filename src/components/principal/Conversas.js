import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { listarConversasUsuarioObserver } from '../../redux/actions/ConversasActions';

class Conversas extends Component {

    componentWillMount() {
        this.props.listarConversasUsuarioObserver()
        this.criaFonteDeDados(this.props.conversas)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas)
    }

    criaFonteDeDados( conversas ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversas || [] );
    }

    renderRow(conversa) {
        let conversaObj = { title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email };
        return (
            <TouchableHighlight onPress={ () => Actions.conversa(conversaObj)}>
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}>
                    <Text style={{ fontSize: 25 }}>{conversa.nome}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    }
}

mapStateToProps = state => {
    return {
        conversas: state.ListaConversaListaUsuario
    }
}

export default connect(mapStateToProps, {listarConversasUsuarioObserver})(Conversas)