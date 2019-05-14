import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { listContatosSubscribe } from './../../redux/actions/PerfilActions';

class Contatos extends Component {

    componentWillMount() {
        this.props.listContatosSubscribe();
        this.criaFonteDeDados( this.props.contatos )
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.contatos )
    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(contatos)
    }

    renderRow(contato) {
        return (
            <TouchableHighlight
                onPress={ () => Actions.conversa({ title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email }) }
            >
                <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 25 }}>{contato.nome}</Text>
                    <Text style={{ fontSize: 18 }}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={this.renderRow}
            />
        )
    }
}

mapStateToProps = state => ({
    contatos: state.ListaContatosReducer
})

export default connect(mapStateToProps, { listContatosSubscribe })(Contatos);
