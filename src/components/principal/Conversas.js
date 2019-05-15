import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Conversas extends Component {

    componentWillMount() {
        /*this.props.conversasUsuarioFetch()
        this.criaFonteDeDados(this.props.conversas)*/
    }

    componentWillReceiveProps(nextProps) {
        /*this.criaFonteDeDados(nextProps.conversas)*/
    }

    criaFonteDeDados( conversas ) {
      /*  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows( conversas )*/
    }

    renderRow(conversa) {
        return (
            <TouchableHighlight onPress={
                () => Actions.conversa({ title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email })
            }>
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}>
                    <Text style={{ fontSize: 25 }}>{conversa.nome}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <Text>ads</Text>
        )
    }
}

mapStateToProps = state => {
    return null
}

export default connect(null, null)(Conversas)