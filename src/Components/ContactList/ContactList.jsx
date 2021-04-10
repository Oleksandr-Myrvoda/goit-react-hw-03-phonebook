import React from "react";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ name, number, id }) => (
      <li key={id} className={styles.item}>
        <p>
          {name}: {number}
        </p>
        <button type="button" className={styles.button} onClick={() => deleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
