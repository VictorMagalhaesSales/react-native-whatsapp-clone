import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../../redux/actions/PerfilActions';

class adicionarContato extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        placeholder='E-mail'
                        style={{ fontSize: 20, height: 45 }}
                        onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)}
                        value={this.props.adicionaContatoEmail}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Button 
                        title="Adicionar" 
                        color="#115E54" 
                        onPress={() => this.props.adicionaContato(this.props.adicionaContatoEmail) } 
                    />
                    <Text style={{ color: '#ff0000', fontSize: 20 }}>
                        {this.props.cadastro_resultado_txt_erro}
                    </Text>
                </View>
            
            </View>
        )
    }
}
const mapStateToProps = state => ({
    adicionaContatoEmail: state.PerfilReducer.adicionaContatoEmail,
    cadastro_resultado_txt_erro: state.PerfilReducer.cadastro_resultado_txt_erro
})

export default connect(mapStateToProps, { modificaAdicionaContatoEmail, adicionaContato })(adicionarContato);
