import React, { Component } from "react";
import { Loading } from '../Loading';

const SECURITY_CODE = 'paradigma';


class ClassState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
      loading: false
    }
  }

  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount')
  // }

  // componetWillUnmount() {
  //   console.log('componetWillUnmount')
  // }

  componentDidUpdate() {
    console.log('actualizador')
    if (this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion ")
        if(this.state.value === SECURITY_CODE){
          this.setState({error: false, loading : false})
        }else{
          this.setState({error: true, loading: false})
        }
        console.log("Terminando validacion")
      }, 3000)
    }
  }


  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>Por favor, escribe el codigo de seguridad.</p>
        {
          this.state.error && (
            <p>Error: El codigo es incorrecto</p>
          )
        }
        {
          this.state.loading && (
            <Loading />
          )
        }
        <input
          placeholder="Codigo de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({value: event.target.value})
          }}
        />
        <button
          type="submit"
          onClick={() => this.setState({ loading: true })}
        >
          Comprobar
        </button>
      </div>
    )
  }
}

export { ClassState };