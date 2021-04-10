import React, { Component } from "react";
import ContactForm from "./Components/ContactForm";
import Filter from "./Components/Filter";
import ContactList from "./Components/ContactList";

import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number, id }) => {
    const { contacts } = this.state;
    const newContact = {
      name,
      number,
      id,
    };
    if (contacts.map((contact) => contact.name.toLowerCase()).includes(newContact.name.toLowerCase())) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState((prevState) => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contacts) => contacts.name.toLowerCase().includes(normalizedFilter));
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="mainBox">
        <section title="Phonebook" className="section">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </section>

        <section title="Contacts" className="section">
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
        </section>
      </div>
    );
  }
}

export default App;
