const defaultValue = 0;
module.exports = {
  async up(db, client) {
    /**Populate sensors collection with new field : temprature: number */
    return db
      .collection('sensors')
      .update({}, { $set: { temprature: defaultValue } });
  },

  async down(db, client) {
    /**remove sensors collection with new field : temprature: number */
    return db.collection('sensors').update({}, { $unset: { temprature: 1 } });
  },
};
