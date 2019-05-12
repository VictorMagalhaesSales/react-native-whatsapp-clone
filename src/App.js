import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from '@firebase/app';
import '@firebase/auth';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './redux/reducers';

class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAZ6i7r0KP3z5clkcbIJ4nTAEKvDDknsSM",
            authDomain: "whatsappclone-react.firebaseapp.com",
            databaseURL: "https://whatsappclone-react.firebaseio.com",
            projectId: "whatsappclone-react",
            storageBucket: "whatsappclone-react.appspot.com",
            messagingSenderId: "394733018142",
            appId: "1:394733018142:web:aaf674376378f7f1"
        });
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes/>
            </Provider>
        );
    }
}

export default App;
