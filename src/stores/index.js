import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers/indexReducer';

function reduxStore() {
    const logger = createLogger();

    const store = createStore(
        reducers,
        applyMiddleware(logger)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/indexReducer', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../reducers/indexReducer'); // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default reduxStore;
