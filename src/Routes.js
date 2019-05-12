import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/inicio/FormLogin';
import FormCadastro from './components/inicio/FormCadastro';
import BoasVindas from './components/inicio/BoasVindas';
import Principal from './components/principal/Principal';
import AdicionarContato from './components/principal/AdicionarContato';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff' }}>
            <Scene key='boasVindas' component={BoasVindas} hideNavBar/>
            <Scene key='formLogin' component={FormLogin} hideNavBar/>
            <Scene key='formCadastro' component={FormCadastro} title='Cadastro'/>
            <Scene key='principal' component={Principal} hideNavBar/>
            <Scene key='adicionarContato' component={AdicionarContato} title="Adicionar contato" hideNavBar={false}/>
    </Router>
);