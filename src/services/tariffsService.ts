import db from '../db.js';
import { Tariff } from '../models/tariffs.js';
import {fetchTariffs } from './wildberriesApi.js'

export const saveTariffsToDb = async (tariffs: Tariff[]): Promise<void> => {
  try {
    const updatePromises = tariffs.map(async (tariff) => {
      const dtNextBox = tariff.dt_next_box || '';
      const dtTillMax = tariff.dt_till_max || '';

  
      if (!Date.parse(dtNextBox) || !Date.parse(dtTillMax)) {
        console.error(`Invalid dates for tariff at warehouse ${tariff.warehouse_name}`);
        return;
      }

      const existingTariff = await db('tariffs')
        .where('warehouse_name', tariff.warehouse_name)
        .andWhere('dt_next_box', dtNextBox)
        .first();

      if (existingTariff) {
        console.log(`Updating tariff for warehouse ${tariff.warehouse_name}`);
        return db('tariffs')
          .where('id', existingTariff.id)
          .update({
            warehouse_name: tariff.warehouse_name,
            box_delivery_and_storage_expr: tariff.box_delivery_and_storage_expr,
            box_delivery_base: tariff.box_delivery_base,
            box_delivery_liter: tariff.box_delivery_liter,
            box_storage_base: tariff.box_storage_base,
            box_storage_liter: tariff.box_storage_liter,
            dt_next_box: dtNextBox,
            dt_till_max: dtTillMax,
          });
      } else {
        console.log(`Inserting tariff for warehouse ${tariff.warehouse_name}`);
        return db('tariffs').insert({
          warehouse_name: tariff.warehouse_name,
          box_delivery_and_storage_expr: tariff.box_delivery_and_storage_expr,
          box_delivery_base: tariff.box_delivery_base,
          box_delivery_liter: tariff.box_delivery_liter,
          box_storage_base: tariff.box_storage_base,
          box_storage_liter: tariff.box_storage_liter,
          dt_next_box: dtNextBox,
          dt_till_max: dtTillMax,
        });
      }
    });

    await Promise.all(updatePromises);
    console.log('Tariffs successfully saved to DB');
  } catch (error) {
    console.error('Error saving tariffs to DB:', error);
  }
};



export const getAndSaveTariffs = async (): Promise<void> => {
    try {
      const tariffs = await fetchTariffs();
      await saveTariffsToDb(tariffs);
    } catch (error) {
      console.error('Error in getAndSaveTariffs:', error);
    }
  };