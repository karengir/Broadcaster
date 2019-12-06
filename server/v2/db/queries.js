const queries = [
  {
    insertUser: `INSERT INTO users (firstname, lastname, email, phoneNumber, username, password, role) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    findEmail: `SELECT * FROM users WHERE email=$1`
  },

  {
    createRecord: `INSERT INTO records (title,type,comment,location,status,createdOn,createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    findRecord: `SELECT * FROM records WHERE title=$1 and location=$2`,
    deleteRecord: `DELETE * FROM records WHERE id=$1`,
    getRecord: `SELECT * FROM records WHERE id=$1 `,
    getAllRecords: `SELECT * FROM records`,
    editRecordComment: `UPDATE records SET comment=$1 WHERE id=$2 RETURNING *`,
    editRecordLocation: `UPDATE records SET location=$1 WHERE id=$2 RETURNING *`,
    editRecordStatus: `UPDATE records SET status=$1 WHERE id=$2 RETURNING *`
  },

  {
    dropUser: `DROP TABLE IF EXISTS users CASCADE`,
    dropRecords: `DROP TABLE IF EXISTS records`
  }
];

export default queries;
