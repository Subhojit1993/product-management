import React, { Component, useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';
import { connect } from "react-redux";
import { updateProducts } from "../actions/productActions";
// included react router
import { withRouter } from 'react-router-dom';

// declared and defined field types
const Name = "name";
const Price = "price";
const Info = "info";

// declared and defined number regex
const numReg = new RegExp('^[0-9]*$');

export const UpdateForm = (props) => {
	const { containerClass } = props;
	let products = props.products;
	let obj = {
		setId: null,
		errorNameText: null,
		errorPrice: null,
		errorProductInfo: null,
		isDisabled: true,
		isClicked: false,
		product: {}
	};
	let [dataAction, setDataAction] = useState(obj);
	const updateClick = (e, product) => {
		let isDisabled = true;
		if(product.name !== '' || product.price !== '' || product.info !== '')
			isDisabled = false;
		let errorNameText = '';
		let errorPrice = '';
		let errorProductInfo = '';
		if(!product.name || (product.name && product.name === ''))
			errorNameText = "Enter product name!";
		if(!product.price || (product.price && product.price === ''))
			errorPrice = "Enter price of the product";
		if(!product.info || (product.info && product.info === ''))
			errorProductInfo = "Enter product info";
		setDataAction((prevState) => ({
			...prevState,
			setId: product.id,
			isClicked: true,
			errorNameText,
			errorPrice,
			errorProductInfo,
			product,
			isDisabled
		}));
	}
	const setProductVal = (selected, type) => {
		products = products.map((product, index) => {
			if(product.id === dataAction.setId){
				if(type === Name)
					product.name = selected.name;
				else if(type === Price)
					product.price = selected.price;
				else if(type === Info)
					product.info = selected.info;
			}
			return product;
		});
	}
	const setData = (hook, fieldType, val) => {
		let selected = Object.assign({}, dataAction.product);
		if(fieldType === Name) {
			selected.name = val;
			let product = {
				...selected,
				name: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorNameText: hook,
				product
			}));
			setProductVal(selected, fieldType);
		}
		else if(fieldType === Price) {
			selected.price = val;
			let product = {
				...selected,
				price: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorPrice: hook,
				product
			}));
			setProductVal(selected, fieldType);
		}
		else if(fieldType === Info) {
			selected.info = val;
			let product = {
				...selected,
				info: val
			};
			setDataAction(prevState => ({
				...prevState,
				errorProductInfo: hook,
				product
			}));
			setProductVal(selected, fieldType);
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
    const handleSave = (event) => {
    	// console.log("data save", dataAction);
    	setDataAction(() => ({
			...obj
		}));
    	props.updateProducts(dataAction);
    }
    let productsList = "";
    if(products.length > 0) {
    	productsList = products.map((product, index) => {
			if(product.id === dataAction.setId) {
				return(
					<TableRow id={product.id} key={index}>
					    <TableRowColumn>
					    	<div>
								<TextField
									className="product_nameField"
							    	floatingLabelText="Product Name"
							    	errorText={dataAction.errorNameText}
							    	onChange={handleNameChange}
							    	onPaste={handleNameChange}
							    	value={product.name}
							    	multiLine={true}
							    />
							</div>
					    </TableRowColumn>
					    <TableRowColumn>
					    	<div>
								<TextField
									className="product_infoField"
							    	floatingLabelText="Product Info"
							    	errorText={dataAction.errorProductInfo}
							    	onChange={handleInfoChange}
							    	onPaste={handleInfoChange}
							    	value={product.info}
							    	multiLine={true}
							    />
							</div>
					    </TableRowColumn>
					    <TableRowColumn>
					    	<div>
								<TextField
									className="product_priceField"
							    	floatingLabelText="Product Price"
							    	errorText={dataAction.errorPrice}
							    	onChange={handlePriceChange}
							    	onPaste={handlePriceChange}
							    	value={product.price}
							    	multiLine={true}
							    />
							</div>
					    </TableRowColumn>
					    <TableRowColumn>
					    	<div>
								<RaisedButton 
									label="Save" 
									primary={true} 
									onClick={handleSave}
									disabled={dataAction.isDisabled}
									className="admin_updateButtonClass"
								/>
							</div>
					    </TableRowColumn>
					</TableRow>
				);
			}
			else {
				return(
					<TableRow id={product.id} key={index}>
					    <TableRowColumn>{product.name}</TableRowColumn>
					    <TableRowColumn>{product.info}</TableRowColumn>
					    <TableRowColumn>{product.price}</TableRowColumn>
					    <TableRowColumn>
					    	<div>
								<RaisedButton 
									label="Edit" 
									primary={true} 
									onClick={(e) => updateClick(e, product)}
									disabled={dataAction.isClicked}
									className="admin_updateButtonClass"
								/>
							</div>
					    </TableRowColumn>
					</TableRow>
				);
			}
		});
    }
    else {
    	productsList = "Products List is Empty!"
    }
	return(
		<div className={containerClass}>
			<Table>
				   <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
				     <TableRow>
				       <TableHeaderColumn>Products</TableHeaderColumn>
				     </TableRow>
				   </TableHeader>
				   <TableBody displayRowCheckbox={false}>
				     {productsList}
				   </TableBody>
			</Table>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    updateProducts: (dataAction) => {
      dispatch(updateProducts(dataAction))
    }
  };
}

export const UpdateFormWithRedux = withRouter(connect(null, mapDispatchToProps)(UpdateForm));