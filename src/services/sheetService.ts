import { google } from 'googleapis';
import { OAuth2Client, JWT } from 'google-auth-library';

const sheets = google.sheets('v4');

export async function createNewSpreadsheet(auth: OAuth2Client | JWT, spreadsheetTitle: string) {
  const request = {
    auth,
    resource: {
      properties: {
        title: spreadsheetTitle,
      },
    },
  };

  try {
    const response = await sheets.spreadsheets.create(request);
    console.log('Spreadsheet created:', response.data.spreadsheetId);
    return response.data.spreadsheetId;
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    throw error;
  }
}

export async function getSpreadsheetById(auth: OAuth2Client | JWT, spreadsheetId: string) {
  try {
    const response = await sheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving spreadsheet:', error);
    throw error;
  }
}

export async function updateStocksCoefs(auth: OAuth2Client | JWT, spreadsheetId: string, data: any[]) {
  const range = `stocks_coefs!A1:${String.fromCharCode(64 + data[0].length)}${data.length}`;

  try {
    await sheets.spreadsheets.values.clear({
      auth,
      spreadsheetId,
      range: `stocks_coefs!A1:${String.fromCharCode(64 + data[0].length)}${data.length}`,
    });


    const response = await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: data,
      },
    });

    console.log('Data successfully updated in Google Sheets.');
    return response;
  } catch (error) {
    console.error('Error updating data in Google Sheets:', error);
    throw error;
  }
}
