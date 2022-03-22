const { v4 } = require('uuid');

const { db } = require('../../database');

let contacts = [
  {
    id: v4(),
    email: 'gabriel@gmail.com',
    phone: '85999174742',
    category_id: v4(),
  },
  {
    id: v4(),
    email: 'jose@gmail.com',
    phone: '85999174742',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const row = await db.query(`INSERT INTO contacts(name,email,phone,category_id)
                        VALUES (${name}, ${email}, ${phone}, ${category_id},})`);
    return new Promise((resolve) => {
      resolve(row);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));
      contacts.push(updatedContact);
      resolve(updatedContact);
    });
  }
}
module.exports = new ContactRepository();
