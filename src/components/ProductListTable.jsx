import React from 'react';
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
	const { products, containerClass, loading, error } = props;
	let productsList = (
		<TableRow>
			<TableRowColumn>Loading ..</TableRowColumn>
		</TableRow>
	);
	if(!loading) {
		if(products && products.length > 0) {
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
			productsList = (
				<TableRow>
					<TableRowColumn>Product list is Empty!</TableRowColumn>
				</TableRow>
			);
		}
	}
	if(error && error !== null && error !== "")
		productsList = (
			<TableRow>
				<TableRowColumn>Network Issue: Failed to fetch!</TableRowColumn>
			</TableRow>
		);
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