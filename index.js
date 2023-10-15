const { program } = require("commander");

const contacts = require("./contacts");

// funkcja wywołuje metody z pliku contacts.js i przekazuje argumenty
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      return;
    case "get":
      const contactById = await contacts.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id ${id} is not found!`);
      }
      console.table(contactById);

      break;
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;
    case "update":
      const updateContact = await contacts.updateContactById(
        id,
        name,
        email,
        phone
      );
      console.table(updateContact);
      break;
    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.table(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option(
    "-a, --action <type>",
    "choose action: list, get -i, add -n -e -p, remove -i"
  )
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// parsowanie danych wyjściowych

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
