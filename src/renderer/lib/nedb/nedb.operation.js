import NeDB from 'nedb';

export default {
  createdb: (dbname) => {
    const db = new NeDB({
      filename: `db/${dbname}`,
      autoload: true,
    });
    return db;
  },
  contdb: (db) => {
    db.count({}, (err, count) => count);
  },
  getdbdata: (db) => {
    db.find({}, (err, docs) => (docs));
  },
  removealldata: (db) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
      alert(`${numRemoved}件削除完了しました`);
    });
  },
  insertdata: (db, data) => {
    db.insert(data);
    alert('登録完了しました');
  },
  removeallinsertdata: (db, data) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
      alert(`${numRemoved}件削除完了しました`);
      db.insert(data);
      alert('登録完了しました');
    });
  },
};

