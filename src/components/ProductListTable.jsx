import React, { Component, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import '../App.css';


export const ProductListTable = (props) => {
	const { products, containerClass } = props;
	let productsList = "";
	if(products.length > 0) {
		productsList = products.map((product, index) => {
			return(
				<TableRow id={product.id} key={index}>
				    <TableRowColumn>{product.name}</TableRowColumn>
				    <TableRowColumn>{product.info}</TableRowColumn>
				    <TableRowColumn>{product.price}</TableRowColumn>
				</TableRow>
			);
		});
	}
	else {
		productsList = "Product list is Empty!";
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