import React from 'react';
import { createRoot } from 'react-dom/client';
import Mainview from './components/mainview/Mainview';
import './index.scss';

class MyFlixApplication extends React.Component {

  
  render() {
    return (
      <div className="my-flix">
        <Mainview />
      </div>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);

root.render(React.createElement(MyFlixApplication));