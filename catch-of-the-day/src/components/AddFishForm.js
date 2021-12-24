import React from "react";
import PropTypes from "prop-types"
import { formatPrice } from "../helpers";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();  

  static propTypes = {
    addFish: PropTypes.func
  }

  createFish = (event) => {
    // 1. stop form from submitting
      event.preventDefault();

      const fish = {
        name: this.nameRef.current.value,
        price: parseFloat(this.priceRef.current.value),
        status: this.statusRef.current.value,
        desc: this.descRef.current.value,
        image: this.imageRef.current.value
      }
      this.props.addFish(fish);
    // refresh from after submitting (reset() is built-in)
      event.currentTarget.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input name="price" ref={formatPrice(this.priceRef)} type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;