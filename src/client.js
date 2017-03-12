import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores/indexStore';
import Keyboard from './logic/keyboard';

import * as VideoActions from './actions/videoActions';
import DemoVideo from '../videos/demo.mp4';

const store = configureStore();

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('app')
);

// setup keyboard
const keyboard = new Keyboard(store);
keyboard.setupListening();

// load demo video
store.dispatch(VideoActions.load(DemoVideo));

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default; // eslint-disable-line global-require

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp />
                </Provider>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
