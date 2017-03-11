import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers';

function reduxStore() {
    const logger = createLogger();

    const store = createStore(
        reducers,
        applyMiddleware(logger)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../reducers'); // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default reduxStore;
