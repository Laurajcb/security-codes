import React, { useEffect } from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  }
  const onError = () => {
    dispatch({ type: actionTypes.error });
  }
  const onWrite = (eventValue) => {
    dispatch({ type: actionTypes.write, payload: eventValue });
  }
  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  }
  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  }
  const onReset = () => {
    dispatch({ type: actionTypes.reset });
  }
  useEffect(() => {

    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }

      }, 3000);
    }
  }, [state]);

  if (!state.deleted && !state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar{name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {(!state.loading && state.error) && (
          <p>El Código es incorrecto</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
        <input
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value)
          }}

          placeholder="Código de Seguridad"
        />
        <button
          onClick={onCheck}
        >Comprobar
        </button>
      </React.Fragment>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar{name}</h2>
        <p>¿Seguro que quieres eliminar{name}?</p>
        <button type="button" onClick={onDelete}>Si, eliminar
        </button>
        <button type="button" onClick={onReset}>No, cancelar
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>¡{name}eliminado!</h2>
        <button type="button" onClick={onReset}>Recuperar{name}</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};
const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET',
}
const reducerObject = (state, payload = false) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  },
});
const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state;
  }
}

export { UseReducer };