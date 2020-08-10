import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';
import { connect } from "react-redux";
import { deleteProduct } from "../actions/productActions";
// included react router
import { withRouter } from 'react-router-dom';
// popup add with button
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export const RemoveProducts = (props) => {
	const { containerClass, products, loading, error } = props;
	let [dataAction, setDataAction] = useState({ popOpen: false, setId: null });
	const removeClick = (e, data) => {
		setDataAction((prevState) => ({
			...prevState,
			setId: data.id,
			popOpen: true
		}));
	}
	let productsList = (
		<TableRow>
			<TableRowColumn>Loading ..</TableRowColumn>
		</TableRow>
	);
	const handleRemove = () => {
		// let filteredData = products.filter(product => { return product.id !== dataAction.setId; });
		let setId = dataAction.setId;
		setDataAction((prevState) => ({
			...prevState,
			setId: null,
			popOpen: false
		}));
		props.deleteProduct(setId);
	}
	const handleClose = () => {
		setDataAction((prevState) => ({
			...prevState,
			popOpen: false
		}));
	}
	if(!loading && products.length > 0)
		productsList = products.map((product, index) => {
			return(
				<TableRow id={product.id} key={index}>
					<TableRowColumn>{product.name}</TableRowColumn>
					<TableRowColumn>{product.info}</TableRowColumn>
					<TableRowColumn>{product.price}</TableRowColumn>
					<TableRowColumn>
						   <div>
							<RaisedButton 
								label="Remove" 
								primary={true} 
								onClick={(e) => removeClick(e, product)}
								className="admin_removeButtonClass"
							/>
						</div>
					</TableRowColumn>
				</TableRow>
			);
		});
	else if(!loading)
		productsList = (
			<TableRow>
				<TableRowColumn>Product list is Empty!</TableRowColumn>
			</TableRow>
		);

	if(error && error !== null && error !== "")
		productsList = (
			<TableRow>
				<TableRowColumn>Network Issue: Failed to fetch!</TableRowColumn>
			</TableRow>
		);
	const actions = [
      <FlatButton
        label="Yes"
        primary={true}
        onClick={handleRemove}
        className="admin_dialogbuttonClass"
      />,
      <FlatButton
        label="No"
        primary={true}
        onClick={handleClose}
        className="admin_dialogbuttonClass"
      />,
    ];
    let popOpen = false;
    if(dataAction && dataAction.popOpen)
    	popOpen = dataAction.popOpen;
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
			<Dialog
	          actions={actions}
	          modal={true}
	          open={popOpen}
	          onRequestClose={handleClose}
	        >
	          Are you sure, you want to remove the product?
	        </Dialog>
		</div>
	);
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProduct: (setId) => {
      dispatch(deleteProduct(setId))
    }
  };
}

export const RemoveProductsWithRedux = withRouter(connect(null, mapDispatchToProps)(RemoveProducts));