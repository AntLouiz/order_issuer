import React from 'react';
import ReactDOM from 'react-dom';


function handleClick() {
  return alert("Opa")
}

export default function Button() {
  return <button onClick={handleClick}>Testing</button>
}


class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Django + React + Webpack + Babel = Awesome App</h1>
        <Button />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));