const baseUrl = "https://assets.breatheco.de/apis/fake/contact/";
const agenda = "ivanotello";
const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			id: 0,
			editContact: {}
			// contacts: [
			// 	{
			// 		name: "Ivan Da Ruos",
			// 		email: "iodaruosgg@gmail.com",
			// 		phone: "04241471200",
			// 		address: "Caracas",
			// 		id: 1
			// 	},
			// 	{
			// 		name: "Mariana Da Ruos",
			// 		email: "mcdaruos@gmail.com",
			// 		phone: "nose",
			// 		address: "Caracas(?)",
			// 		id: 2
			// 	},
			// 	{
			// 		name: "osfh",
			// 		email: "jhondragon@gmail.com",
			// 		phone: "no me inporta",
			// 		address: "Luna(?)",
			// 		id: 3
			// 	}
			// ]
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			fetchAddContact: async (name, email, phone, adress) => {
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							full_name: name,
							email: email,
							agenda_slug: agenda,
							address: adress,
							phone: phone
						})
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error with add: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed with add");
					console.log(error);
				}
			},
			// addContact: (name, email, phone, address) => {
			// 	const store = getStore();
			// 	const newContact = {
			// 		name: name,
			// 		email: email,
			// 		phone: phone,
			// 		address: address,
			// 		id: store.contacts.length > 0 ? store.contacts[store.contacts.length - 1].id + 1 : 1
			// 	};
			// 	setStore({
			// 		contacts: [...store.contacts, newContact]
			// 	});
			// },
			fetchContacts: async () => {
				let contacts = [];
				try {
					let response = await fetch(`${baseUrl}agenda/${agenda}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						contacts = await response.json();
					} else {
						console.log(`error with contacts: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed with contacts");
					console.log(error);
				}
				setStore({
					contacts: contacts
				});
			},
			fetchDeleteContact: async id => {
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}/${id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/JSON"
						}
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error with delete: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed with delete");
					console.log(error);
				}
			},
			getId: contactId => {
				setStore({
					id: contactId
				});
			},
			// deleteContact: id => {
			// 	const store = getStore();
			// 	const filteredContacts = store.contacts.filter((contact, index) => {
			// 		return contact.id != id;
			// 	});
			// 	setStore({
			// 		contacts: filteredContacts
			// 	});
			// },

			fetchEditContact: async (name, email, phone, adress) => {
				let store = getStore();
				let actions = getActions();
				try {
					let response = await fetch(`${baseUrl}/${store.editContact.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/JSON"
						},
						body: JSON.stringify({
							full_name: name,
							email,
							agenda_slug: agenda,
							address: adress,
							phone
						})
					});
					if (response.ok) {
						await actions.fetchContacts();
					} else {
						console.log(`error: ${response.status} ${response.statusText}`);
					}
				} catch (error) {
					console.log("something failed");
					console.log(error);
				}
				setStore({
					editContact: {}
				});
			},
			setEditContact: contact => {
				setStore({
					editContact: contact
				});
			}
		}
	};
};

export default getState;
