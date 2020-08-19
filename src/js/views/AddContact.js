import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const AddContact = () => {
	const { param } = useParams();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const { store, actions } = useContext(Context);

	const [nameEdit, setNameEdit] = useState(store.editContact.full_name);
	const [emailEdit, setEmailEdit] = useState(store.editContact.email);
	const [phoneEdit, setPhoneEdit] = useState(store.editContact.phone);
	const [addressEdit, setAddressEdit] = useState(store.editContact.address);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							id="name"
							className="form-control"
							placeholder="Full Name"
							onChange={e => {
								param == "add" ? setName(e.target.value) : setNameEdit(e.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							id="email"
							className="form-control"
							placeholder="Enter email"
							onChange={e => {
								param == "add" ? setEmail(e.target.value) : setEmailEdit(e.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							id="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={e => {
								param == "add" ? setPhone(e.target.value) : setPhoneEdit(e.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							id="address"
							className="form-control"
							placeholder="Enter address"
							onChange={e => {
								param == "add" ? setAddress(e.target.value) : setAddressEdit(e.target.value);
							}}
						/>
					</div>
					<Link
						to="/"
						type="button"
						className="btn btn-primary form-control"
						onClick={e => {
							param == "add"
								? actions.fetchAddContact(name, email, phone, address)
								: actions.fetchEditContact(nameEdit, emailEdit, phoneEdit, addressEdit);
						}}>
						save
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
