import React, { useState, useEffect } from "react";


const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  useEffect(() => {
    console.log("UseState inicio");

    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          })
        } else {
          setState({
            ...state,
            error: true,
            loading: false
          })
        }
        console.log("Terminando validacion")
      }, 3000)
      console.log("UseState termino")
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
            setState({
              ...state,
              value: event.target.value
            })
          }}
        />
        <button
          type="submit"
          onClick={() => {
            setState({
              ...state,
              loading: true
            })
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
            setState({
              ...state,
              deleted: true,
            })
          }}
        >
          Si, Eliminar
        </button>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: ''
            })
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
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: '',
            })
          }}
        >
          Regresar al menu
        </button>
      </>
    )
  }
}


export { UseState };


// function UseState({ name }) {
//   const [state, setState] = React.useState({
//     value: '',
//     error: false,
//     loading: false,
//     deleted: false,
//     confirmed: false,
//   })

//   console.log(state);

//   const handleChange = (event) => {
//     setState({
//       ...state,
//       value: event.target.value,
//     });
//     console.log(event.target.value);
//   }

//   React.useEffect(() => {
//     console.log('Empezando el efecto');
//     if (state.loading) {
//       // setError(false);
//       setTimeout(() => {
//         console.log("Haciendo la validación xd");
//         if (state.value === SECURITY_CODE) {
//           setState({
//             ...state,
//             error: false,
//             loading: false,
//             confirmed: true,
//           });
//         } else {
//           setState({
//             ...state,
//             error: true,
//             loading: false
//           });
//         }
//         console.log("Terminando la validación");
//       }, 1500);
//     }
//     console.log('Terminando el efecto');
//   }, [state.loading]);

//   if (!state.deleted && !state.confirmed) {
//     return (
//       <div>
//         <h2>Eliminar {name}</h2>
//         <p>Por favor, escriba el código de seguridad.</p>

//         {(state.error && !state.loading) && (
//           <p>El código es es incorrecto</p>
//         )}

//         {state.loading && (
//           <p>Cargando ...</p>
//         )}

//         <input
//           type='text'
//           placeholder='código de seguridad'
//           value={state.value}
//           onChange={handleChange}
//         />
//         <button
//           // onClick={()=>setError(!error)}
//           onClick={() => {
//             // setError(false);
//             setState({
//               ...state,
//               loading: true
//             });
//           }}
//         >Comprobar</button>
//       </div>
//     );
//   } else if (state.confirmed && !state.deleted) {
//     return (
//       <React.Fragment>
//         <p>¿Seguro que quieres eliminar UseState?</p>
//         <button
//           onClick={() => {
//             setState({
//               ...state,
//               deleted: true,
//             })
//           }}
//         >Si, eliminar</button>
//         <button
//           onClick={() => {
//             setState({
//               ...state,
//               confirmed: false,
//               value: '',
//             })
//           }}
//         >No, volver</button>
//       </React.Fragment>
//     )
//   } else {
//     return (
//       <React.Fragment>
//         <p>Eliminado con exito</p>
//         <button
//           onClick={() => {
//             setState({
//               ...state,
//               confirmed: false,
//               deleted: false,
//               value: '',
//             })
//           }}
//         >Recuperar UseState</button>
//       </React.Fragment>
//     )
//   }
// }