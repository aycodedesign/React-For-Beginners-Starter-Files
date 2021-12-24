import React from "react";
import PropTypes from "prop-types"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  //sets default state of the App; items will be passed in and shown in screen
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object,
  }

  // connecting firebase to my webapp
  componentDidMount() {
    const { params } = this.props.match;
    // upon refresh with items in order, I first reinstate Local Storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
    this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  // keeps Order data in local storage to prevent erasing during page refresh
  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  // disconnecting firebase from my webapp in-between refreshes, to prevent memory leak
  componentWillUnmount() {
  base.removeBinding(this.ref);
}

  addFish = (fish) => {
    //while JS would update state using dot notation, React has a built-in state updater (set state API), as follows:

    // 1. Take copy of existing state (to not mutate the value)
    const fishes = {...this.state.fishes};
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set new fishes object to state (line 9)
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of current state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    // 1. take a copy of State
    const order = { ...this.state.order };
    // 2. either add to order, or update number in order
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update our state object
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // 1. take a copy of State
    const order = { ...this.state.order };
    // 2. delete from order
    delete order[key];
    // 3. call setState to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
              key={key}
              index={key}
              details={this.state.fishes[key]} 
              addToOrder={this.addToOrder}
              />
            ))} 

          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order} 
          removeFromOrder={this.removeFromOrder}
        />
        {/*passing props from App.js to Inventory */}
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes} 
          fishes={this.state.fishes}
          />
        
      </div>
    )
  }
}

export default App;