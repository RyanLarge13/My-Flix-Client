import React from 'react';
import ReactDOM from 'react-dom';
import Mainview from './components/mainview/Mainview';
import './index.scss';

class MyFlixApplication extends React.Component {

  
  render() {
    return (
      <>
        <div className="my-flix">
          <Mainview />
        </div>
      </>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);