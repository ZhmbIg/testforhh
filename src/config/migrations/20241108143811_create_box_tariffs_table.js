import knexConfig from '../knexfile.js';
import knex from 'knex'; 

const db = knex(knexConfig); 

// @ts-ignore
export function up(knex) {
  // @ts-ignore
  return knex.schema.createTable('tariffs', function (table) {
    table.increments('id').primary();
    table.string('warehouse_name').notNullable();
    table.string('box_delivery_and_storage_expr').notNullable();
    table.string('box_delivery_base').notNullable();
    table.string('box_delivery_liter').notNullable();
    table.string('box_storage_base').notNullable();
    table.string('box_storage_liter').notNullable();
    table.date('dt_next_box').notNullable();
    table.date('dt_till_max').notNullable();
    table.timestamps(true, true);
  });
};

// @ts-ignore
export function down(knex) {
  return knex.schema.dropTableIfExists('tariffs');
};
