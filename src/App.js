import { UseState } from './components/UseState';
import { UseReducer } from './components/UseReducer';

import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name='UseState' />
      <UseReducer name='Use Reducer'/>
      {/* <ClassState  name='ClassState'/> */}
    </div>
  );
}

export default App;
