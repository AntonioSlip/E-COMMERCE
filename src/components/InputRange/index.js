import React from "react";
import InputRange from "react-input-range";

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: 0,
        max: 20
      },
      value2: 10,
      value3: 10,
      value4: {
        min: 5,
        max: 10
      },
      value5: {
        min: 3,
        max: 7
      }
    };
  }

  seeState(evt) {
    evt.preventDefault();
    console.log(this.state.value);
  }

  setMin(evt) {
    this.setState({
      value: { ...this.state.value, min: Number(evt.target.value) }
    });
  }

  setMax(evt) {
    this.setState({
      value: { ...this.state.value, max: Number(evt.target.value) }
    });
  }

  setRange(min, max) {
    this.setState({ value: { min, max } });
  }

  render() {
    return (
      <form className="form">
        <div>
          <button onClick={this.seeState.bind(this)}>console</button>
        </div>
        <div className="input-range-wrapper">
          <div>
            <input
              type="text"
              value={this.state.value.min}
              onChange={this.setMin.bind(this)}
            />
            <input
              type="text"
              value={this.state.value.min}
              onChange={evt =>
                this.setRange(Number(evt.target.value), this.state.value.max)
              }
            />
          </div>

          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onChangeComplete={value => console.log(value)}
          />

          <div>
            <input
              type="text"
              value={this.state.value.max}
              onChange={evt =>
                this.setRange(this.state.value.min, Number(evt.target.value))
              }
            />
            <input
              type="text"
              value={this.state.value.max}
              onChange={this.setMax.bind(this)}
            />
          </div>
        </div>
      </form>
    );
  }

  render_() {
    return (
      <form className="form">
        <div>
          <button onClick={this.seeState.bind(this)}>console</button>
        </div>
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          disabled
          value={this.state.value2}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.value3}
          onChange={value => this.setState({ value3: value })}
          onChangeComplete={value => console.log(value)}
        />

        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => `${value} kg`}
          value={this.state.value4}
          onChange={value => this.setState({ value4: value })}
          onChangeComplete={value => console.log(value)}
        />

        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ value5: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.value5}
        />
      </form>
    );
  }
}

export default ExampleApp;