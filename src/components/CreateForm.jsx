import React, { useState } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { createProducts } from "../actions/productActions";
import { connect } from "react-redux";
// react router included
import { withRouter } from 'react-router-dom';
// popup add with button
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// declared and defined field types
const Name = "name";
const Price = "price";
// declared and defined number regex
const numReg = new RegExp('^[0-9]*$');

export const CreateForm = (props) => {
	const { containerClass } = props;
	let obj = {
		errorNameText: 'Enter product name!',
		errorPrice: 'Enter price of the product!',
		errorProductInfo: 'Enter product info!',
		isDisabled: true,
		popOpen: false,
		data: {
			name: "",
			price: "",
			info: ""
		}
	};
	let [dataAction, setDataAction] = useState(obj);
	const setData = (hook, fieldType, val) => {
		if(fieldType === Name) {
			let data = {
				...dataAction.data,
				name: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorNameText: hook,
				data
			}));
		}
		else if(fieldType === Price) {
			let data = {
				...dataAction.data,
				price: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorPrice: hook,
				data
			}));
		}
		else {
			let data = {
				...dataAction.data,
				info: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorProductInfo: hook,
				data
			}));
		}
		handleButtonState();
	}
	const handleButtonState = () => {
		setDataAction(prevState => ({
			...prevState,
			isDisabled: true,
		}));
		if(dataAction.errorNameText === '' && dataAction.errorPrice === '' && dataAction.errorProductInfo === '') {
			setDataAction(prevState => ({
				...prevState,
				isDisabled: false,
			}));
		}
	}
	const handleNameChange = (event) => {
        const name = event.target.value;
        setData("Enter product name!", "name", name);
        if(name && name !== '')
        	setData("", "name", name);
    }
    const handlePriceChange = (event) => {
    	const price = event.target.value;
    	const type = "price";
    	let errText = "Enter price of the product";
    	if(!numReg.test(price))
			errText = "Only numbers allowed!";
		else if(price && price !== '')
			errText = "";
		setData(errText, type, price);
    }
    const handleInfoChange = (event) => {
    	const info = event.target.value;
    	setData("Enter product info", "info");
    	if(info && info !== '')
    		setData("", "info", info);
    }
    const handleSubmit = (event) => {
    	props.createProducts(dataAction);
    	setDataAction(prevState => ({
			...prevState,
			popOpen: true
		}));
    }
    const handleClose = (event) => {
    	setDataAction(() => ({
			...obj
		}));
    }
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={handleClose}
        className="admin_dialogbuttonClass"
      />
    ];
    let popOpen = false;
    if(dataAction && dataAction.popOpen)
    	popOpen = dataAction.popOpen;
	return(
		<div className={containerClass}>
			<div>
				<TextField
					className="product_nameField"
 					floatingLabelText="Product Name"
			    	errorText={dataAction.errorNameText}
			    	onChange={handleNameChange}
			    	onPaste={handleNameChange}
			    	value={dataAction.data.name}
			    	multiLine={true}
			    />
			</div>
			<br/>
			<div>
				<TextField
					className="product_priceField"
 					floatingLabelText="Product Price"
			    	errorText={dataAction.errorPrice}
			    	onChange={handlePriceChange}
			    	onPaste={handlePriceChange}
			    	value={dataAction.data.price}
			    	multiLine={true}
			    />
			</div>
			<br/>
			<div>
				<TextField
					className="product_infoField"
			    	floatingLabelText="Product Info"
			    	multiLine={true}
			    	errorText={dataAction.errorProductInfo}
			    	onChange={handleInfoChange}
			    	onPaste={handleInfoChange}
			    	value={dataAction.data.info}
			    />
			</div>
			<br/>
			<div className="admin_createForm">
				<RaisedButton 
					label="Submit" 
					primary={true} 
					onClick={handleSubmit}
					disabled={dataAction.isDisabled}
					className="admin_buttonColourClass"
				/>
			</div>
			<Dialog
	          actions={actions}
	          modal={true}
	          open={popOpen}
	          onRequestClose={handleClose}
	        >
	          Product added successfully!
	        </Dialog>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    createProducts: (dataAction) => {
      dispatch(createProducts(dataAction))
    }
  };
}

export const CreateFormWithRedux = withRouter(connect(null, mapDispatchToProps)(CreateForm));