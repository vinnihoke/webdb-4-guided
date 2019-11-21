
exports.up = function(knex) {
  return (
	  knex.schema.createTable('zoos', table => {
		  table.increments();
		  table.string('zoo_name', 255).notNullable();
		  table.string('address', 255).notNullable().unique();
	  })
	  .createTable('species', table => {
		  table.increments();
		  table.string('species_name', 255).notNullable().unique()
	  })
	  .createTable('animals', table => {
		  table.increments();
		  table.string('animal_name', 255).notNullable();
		  table.integer('species_id')
			.unsigned()
			.notNullable()
			.references('species.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
			 // References the ID in the Species table
	  })
	  .createTable('zoo_animals', table => {
		table.integer('zoo_id')
			.unsigned()
			.notNullable()
			.references('zoos.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		table.integer('animal_id')
			.unsigned()
			.notNullable()
			.references('animals.id')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		table.primary(["zoo_id", "animal_id"])
	  })
  )
};

exports.down = function(knex) {
  return (
	  knex.schema
	  	.dropTableIfExists('zoo_animals')
	  	.dropTableIfExists('animals')
	  	.dropTableIfExists('species')
	  	.dropTableIfExists('zoos')
  )
};
