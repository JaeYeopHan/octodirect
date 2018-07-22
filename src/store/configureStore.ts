import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import saga from '../saga';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

export default function() {
  const middlewares = [];
  const sagaMiddleware = createSagaMiddleware();

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  middlewares.push(sagaMiddleware);

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(saga);

  return store;
}
