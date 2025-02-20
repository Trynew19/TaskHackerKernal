const Knex = require('knex');
const { Model } = require('objection');
const mysql = require('mysql2/promise');


async function initDB() {
  const connection = await mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.USER, password:process.env.PASSWORD });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  await connection.end();

  const knex = Knex({ client: process.env.CLIENT, connection: { host:process.env.MYSQL_HOST , user: process.env.USER, password: process.env.PASSWORD, database: process.env.DB_NAME } });
  Model.knex(knex);

  await knex.schema.hasTable('users').then((exists) => {
    if (!exists) return knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name').notNullable();
      t.string('email').unique().notNullable();
      t.string('mobile').notNullable();
    });
  });

  await knex.schema.hasTable('tasks').then((exists) => {
    if (!exists) return knex.schema.createTable('tasks', (t) => {
      t.increments('id').primary();
      t.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      t.string('task_name').notNullable();
      t.enum('status', ['Pending', 'Done']).defaultTo('Pending');
    });
  });

  return knex;
}

module.exports = initDB;
