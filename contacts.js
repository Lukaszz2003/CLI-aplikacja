// import modułu fs (fs/promise)

const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

// funkcja powtarzalna - dotyczy odczytu danych z pliku
async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

// zapis danych do pliku
async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Tablica kontaktów
async function listContacts() {
  const contacts = await readContacts();

  return contacts;
}

// Zwraca obiekt kontaktu (identyfikator). Jeśli nie znajdzie zwraca null
async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

// Dodaje do kontaktu
async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function updateContactById(id, name, email, phone) {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await writeContacts(contacts);
  return contacts[index];
}

// usuwa kontakt
async function removeContact(contactId) {
  const contacts = await readContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [res] = contacts.splice(index, 1);

  await writeContacts(contacts);

  return res;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
