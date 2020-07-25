import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export const Header = (props) => {
	const { handleBarClick } = props;
	let appBarClass = "admin_appBar_class";
	let clickable = false;
	let isShowable = false;
	if(window.innerWidth < 767) {
		appBarClass = "mobile_appbar";
		clickable = true;
		isShowable = true;
	}
	return(
		<AppBar
		   title={<span style={styles.title}>Products CRUD</span>}
		   iconElementRight={
		   	<Link to="/note" style={{ textDecoration: "none", color: "#FFFFFF" }}>
		   		<div>
		   			<FlatButton label="Subhojit" className="admin_noteButton" />
		   		</div>
		   	</Link>
		   }
		   iconStyleRight={{display: 'flex', alignItems: 'center'}}
		   className={appBarClass}
		   onLeftIconButtonClick={(e) => handleBarClick(e, clickable)}
		   showMenuIconButton={isShowable}
		/>
	);
}