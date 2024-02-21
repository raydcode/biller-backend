// Update with your config settings.

const knex = require('knex');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = knex({
	client: 'postgresql',
	connection: {
		database: 'biller',
		host: 'localhost',
		port: 5432,
		user: 'postgres',
		password: 'postgres',
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
});
