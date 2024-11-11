import { getAndSaveTariffs } from './services/tariffsService.js';
import { getAuthClient } from './googleAuth.js';
import { updateStocksCoefs } from './services/sheetService.js';
import db from './db.js';
import cron from 'node-cron';

const updateDataInGoogleSheets = async () => {
  try {

    const auth = await getAuthClient();
    console.log('Google API client authorized.');

    const spreadsheetId = '1AQdJQDF40EdNsMEqHQcZ_Wc66zPkghLLsWiDY-LBiVQ';

    const tariffs = await db.queryBuilder().from('tariffs').select('*');
    if (!tariffs.length) {
      console.log('No tariffs found in the database to upload.');
      return;
    }

    const processedData = tariffs.map(tariff => [
      tariff.warehouse_name,
      tariff.box_delivery_and_storage_expr,
      tariff.box_delivery_base,
      tariff.box_delivery_liter,
      tariff.box_storage_base,
      tariff.box_storage_liter,
      tariff.dt_next_box,
      tariff.dt_till_max,
    ]);

    processedData.sort((a, b) => a[1] - b[1]);

    await updateStocksCoefs(auth, spreadsheetId, processedData);
    console.log('Data has been successfully uploaded to Google Sheets.');

  } catch (error) {
    console.error('Error updating data in Google Sheets:', error);
  }
};

const runApp = async () => {
  try {
    console.log('Fetching and saving tariffs from Wildberries API...');

    await getAndSaveTariffs();
    console.log('Tariffs have been saved to the database.');

    await updateDataInGoogleSheets();
  } catch (error) {
    console.error('Error in application:', error);
  }
};

cron.schedule('0 * * * *', async () => {
  console.log('Fetching and saving tariffs...');
  try {
    await getAndSaveTariffs();
    console.log('Tariffs fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching and saving tariffs:', error);
  }
});

cron.schedule('59 23 * * *', async () => {
  console.log('Updating data in Google Sheets...');
  await updateDataInGoogleSheets();
});

runApp();
