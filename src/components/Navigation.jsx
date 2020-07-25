import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

import createIcon from "../icons/pen.png";
import whiteCreateIcon from "../icons/pen_white.png";
import updateIcon from "../icons/update.png";
import whiteUpdateIcon from "../icons/update_white.png";
import retrieveIcon from "../icons/gift.png";
import whiteRetrieveIcon from "../icons/gift_white.png";
import trashIcon from "../icons/trash.png";
import whiteTrashIcon from "../icons/trash_white.png";

export const Navigation = (props) => {
	let isCreateIcon = createIcon;
	let isRetrieveIcon = retrieveIcon;
	let isUpdateIcon = updateIcon;
	let isTrashIcon = trashIcon;
	const { selected, handleNavClick, isClicked, handleRequestChange } = props;
	let isOpen = true;
	let isDocked = true;
	if(window.innerWidth < 767) {
		isOpen = false;
		if(isClicked) {
			isOpen = isClicked;
			isDocked = !isClicked;
		}
	}
	return(
		<div>
			<Drawer docked={isDocked} open={isOpen} containerClassName="admin_drawer_class" onRequestChange={handleRequestChange}>
				<Link to="/" style={{ textDecoration: "none" }}>
		          	<MenuItem 
		         		className={props.selected === 1 ? "admin_menu_class add_background" : "admin_menu_class"} 
		         		onClick={() => handleNavClick(1)}
		         		primaryText="Retrieve"
		           	>
			          	<img 
			          		src={props.selected === 1 ? whiteCreateIcon : createIcon}
			          		className={"admin_img_icon_size"}
			          		alt="Retrieve"
			          	/>
	          		</MenuItem>
	          	</Link>
	          	<Link to="/create" style={{ textDecoration: "none" }}>
		          	<MenuItem 
		          		className={props.selected === 2 ? "admin_menu_class add_background" : "admin_menu_class"} 
		          		onClick={() => handleNavClick(2)}
		          		primaryText="Create"
		          	>
			          	<img 
			          		src={props.selected === 2 ? whiteRetrieveIcon : retrieveIcon}
			          		className="admin_img_icon_size"
			          		alt="Create"
			          	/>
		          	</MenuItem>
	          	</Link>
	          	<Link to="/update" style={{ textDecoration: "none" }}>
	          		<MenuItem 
	          			className={props.selected === 3 ? "admin_menu_class add_background" : "admin_menu_class"} 
	          			onClick={() => handleNavClick(3)}
	          			primaryText="Update"
	          		>
		          		<img 
		          			src={props.selected === 3 ? whiteUpdateIcon : updateIcon}
		          			className="admin_img_icon_size"
		          			alt="Update"
		          		/>
	          		</MenuItem>
	          	</Link>
	          	<Link to="/delete" style={{ textDecoration: "none" }}>
	          		<MenuItem 
	          			className={props.selected === 4 ? "admin_menu_class add_background" : "admin_menu_class"} 
	          			onClick={() => handleNavClick(4)}
	          			primaryText="Delete"
	          			disableUnderline={true}
	          		>
		          		<img 
		          			src={props.selected === 4 ? whiteTrashIcon : trashIcon}
		          			className="admin_img_icon_size"
		          			alt="Delete"
		          		/>
	          		</MenuItem>
	          	</Link>
	        </Drawer>
		</div>
	);
}