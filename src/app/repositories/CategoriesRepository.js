const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *`, [name]);
    return row;
  }
}
module.exports = new CategoriesRepository();
