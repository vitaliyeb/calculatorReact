import React from 'react';
import Input from './component/input';
import Wiev from './component/wiev';
import Eval from './component/Eval';
import './App.css';


class App extends React.Component{

  constructor() {
      super();
      this.state = {number : ""};
      this.Eval = new Eval();
  }


  bacspace = () => this.setState((state, props)=>({number : this.state.number.substring(0, this.state.number.length - 1)}));

  result = (str) => this.setState((state, props)=>({number : this.Eval.eval(str)}));

  restart = () => this.setState((state, props)=>({number : ""}));

  newState = (num) => {
        switch (num) {
          case "=":
              this.result(this.state.number);
            break;
            case "CE":
                this.bacspace();
              break;
              case "Res":
                  this.restart();
                break;
          default:
              this.setState((state, props)=>({number : state.number+=num}));
        }
  };

  render () {
            return (
              <div className="App">

                  <Wiev number = {this.state.number} />
                  <Input  newState={this.newState}/>
              </div>
            );
          }
}

export default App;
