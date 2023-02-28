import React, { useEffect, reducer } from "react";

const SECURITY_CODE = 'paradigma';


function UseReducer({name}) {
  const [state, setState] = useReducer(reducer, initialState);

  const onComfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    })
  }

  const onInput = (newValue) => {
    setState({
      ...state,
      value: newValue
    })
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    })
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    })
  }

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onComfirm()
        } else {
          onError()
        }
      }, 3000)
    }
  }, [state])

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {
          (state.error && !state.loading) && (
            <p>Error: El codigo es incorrecto.</p>
          )
        }

        {
          state.loading && (
            <p>Loading ...</p>
          )

        }
        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            onInput(event.target.value)
          }}
        />
        <button
          type="submit"
          onClick={() => {
            onCheck()
          }}
        >
          Comprobar
        </button>
      </div>
    )
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Estas seguro de Eliminar?</p>
        <button
          onClick={() => {
            onDelete()
          }}
        >
          Si, Eliminar
        </button>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Nooo
        </button>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminacion exitosa</p>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Regresar al menu
        </button>
      </>
    )
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

//Reducer with if
const reducerIf = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    }
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    }
  } else {
    return {
      ...state
    }
  }
}

//Reducer with switch The most used 
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      }
    case 'CHECK':
      return {
        ...state,
        loading: true,
      }
    default:
      return {
        ...state
      }
  }
}

//Reducer Obj 

const reducerObj = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'CHECK': {
    ...state,
    loading: true,
  }

})

const reducer = (state, action) => {
  if (reducerObj(state)[action.type]) {
    return reducerObj(state)[action.type]
  } else {
    return state
  }
}
export { UseReducer };
