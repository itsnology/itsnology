/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ovnckvp08vrkzy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwtmyubn",
    "name": "Price",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1k",
        "5k"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ovnckvp08vrkzy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwtmyubn",
    "name": "Price",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1k_5k_10k"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
