import React from 'react';

class Inputs extends React.Component{

  getMath = (e) => this.props.newState(e.target.innerHTML);

  render() {
    return (
      <div className="calc-Input">
        <div className="calc-But culc-but-TopBut" onClick = {this.getMath}>Res</div>
        <div className="calc-But culc-but-TopBut" onClick = {this.getMath}>CE</div>
        <div className="calc-But culc-but-TopBut" onClick = {this.getMath}>^</div>
        <div className="calc-But culc-but-Orange" onClick = {this.getMath}>/</div>
        <div className="calc-But" onClick = {this.getMath}>7</div>
        <div className="calc-But" onClick = {this.getMath}>8</div>
        <div className="calc-But" onClick = {this.getMath}>9</div>
        <div className="calc-But culc-but-Orange" onClick = {this.getMath}>*</div>
        <div className="calc-But" onClick = {this.getMath}>4</div>
        <div className="calc-But" onClick = {this.getMath}>5</div>
        <div className="calc-But" onClick = {this.getMath}>6</div>
        <div className="calc-But culc-but-Orange" onClick = {this.getMath}>-</div>
        <div className="calc-But" onClick = {this.getMath}>1</div>
        <div className="calc-But" onClick = {this.getMath}>2</div>
        <div className="calc-But" onClick = {this.getMath}>3</div>
        <div className="calc-But culc-but-Orange" onClick = {this.getMath}>+</div>
        <div className="calc-But" onClick = {this.getMath}>.</div>
        <div className="calc-But" onClick = {this.getMath}>0</div>
        <div className="calc-But culc-But-result" onClick = {this.getMath}>=</div>
        <div className="calc-But culc-But-scLeft" onClick = {this.getMath}>(</div>
        <div className="calc-But culc-But-scRight" onClick = {this.getMath}>)</div>
      </div>
    )
  }
}


export default Inputs;
