import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers/indexReducer';
import * as videoActions from '../actions/videoActions';

const actionsIgnoredToLog = [
    videoActions.CONSTANTS.VIDEO_TICK
];

function reduxStore() {
    const logger = createLogger({
        predicate: (getState, action) => !actionsIgnoredToLog.includes(action.type)
    });

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, composeEnhancers(
        applyMiddleware(logger),
    ));
    /* eslint-enable */

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
