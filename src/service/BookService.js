import { database } from "./firebase";

const db = database.ref("/Books");

class BookDataService {
  async getAll() {
    let books = await db.once("value");
    return Object.assign({}, books.val());
  }

  create(book) {
    return db.push(book);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new BookDataService();