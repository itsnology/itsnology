/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ovnckvp08vrkzy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3hqihqtc",
    "name": "Price",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hwtmyubn",
    "name": "Folowers",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
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

  // remove
  collection.schema.removeField("3hqihqtc")

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
})
