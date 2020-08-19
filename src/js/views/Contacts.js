import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [id, setId] = useState({
		showModal: false
	});

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map((contact, index) => {
							return (
								<ContactCard
									key={index}
									contact={contact}
									onDelete={() => setId({ showModal: true })}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal show={id.showModal} onClose={() => setId({ showModal: false })} />
		</div>
	);
};
