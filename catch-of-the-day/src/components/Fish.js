import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  render() {
    //created these variables to prevent from having to type 'this.props....' many times, using ES6 destructuring

    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';


    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)
        }>
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
        {/* <button onClick={() => this.props.removeFromOrder(this.props.index)}>Remove From Order</button> */}
      </li>
    )
  }
}

export default Fish;