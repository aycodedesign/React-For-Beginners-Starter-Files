import React from "react";
import PropTypes from "prop-types"
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	myInput = React.createRef();
	static propTypes = {
		history: PropTypes.object
	}

	myInput = React.createRef();

	goToStore = (event) => {
		// 1. stops default action of form submitting
		event.preventDefault();
		// 2. get text from that input without touching DOM
		const storeName = this.myInput.current.value;
		// 3. Change page to /store/whatever-they-entered
		this.props.history.push(`/store/${storeName}`);
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				{/* <button onClick={this.handleClick()}>Click Me!</button> */}
				{/* Event handlers (clicks and such) in React are used inline */}
				<input 
					type='text'
					ref={this.myInput}
					//this places the input text on the component, ready to be grabbed for another use
					required placeholder='Store Name' 
					defaultValue={getFunName()}
				/>
				<button type='submit'>Visit Store →</button>
			</form>
		);
	}
}

export default StorePicker;