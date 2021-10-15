'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = {
  "type": "service_account",
  "project_id": "doctor-appointment-254007",
  "private_key_id": "796c44f66bb40d9ba3ecb5f0b8724e8aba3890cc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQAHvSX9BlyAzG\nC9e90z0KVsdz79gYk738S840/oQ0n+KwKTXmgmNe/dWnzE7jjL0jLA7UWjvW9amy\nP4oBxhctsOgzP5PaLVGoMLnYK5Z+hq0msXWSjvbjZAzzvUyueMDvSepRdoc87c8J\n00gKI8QfVrKcU5z8+MLliE/sTBXwO57pLIsbGs5LkpnTJCs3jJvIiAn2bJ2u/625\nf1AheUeQxc6pSM3TNIHYsyemAd7b4d52UptRaWGFPh4S5NXL7iDx+kFMb47jCnaA\nDVhzgiWSbr0LJW/JgSBVS1v+g6hptTXVEzSD6BW1VVaxp9nCQNxIxVtvrRz30FvB\nTPXxThv7AgMBAAECggEAQb1mycjiG8UzR6qaaFeqUzEAx0XkknvITQjSb9ENy/R+\nCcwWhlBaS0B4rK0SCsHyir8PWhSDowPt36kwONUVOc+8gcDxn7X2xGDSRwTHJKYZ\nIEP9l9Xakj7XxuJRwojwE43cAiqpXMB4N1UUW0SuwVvUGJf3YGm0mBMd4ZNupIfz\n6Kv5O2igiOEwPcUA8Hh3cBinDRjtJoZaUxYXniOQuLO6zDui6uUNQvSY0fD9r7Pn\n9lK7cg1ul8N6YEA4QwucqzFl3lpOwEVBfdAgENeNVEmA2U62tT6QmnO+22I/bB7s\nK/T6PH1cSlFM/lkcMqwufbCGrdN98GL1Z6wyZ2XBgQKBgQDJP73nGKQ/zGHmrkb5\n93fh8B8be/buSrM46Lu9Gr/dN4//1m2wnN8YanMZqk6Z7FZaX3UJuhCsg5JI8AaI\nLClcd4xAheMvIMXPNSsMWzDEM+XNxsMktyH8AMdYITn5G/vZg4J7yfl9TQA+wUOM\nG/PwR5FYI+35PbvlSav6soqQQQKBgQC3LbClVSUo5LTGoJrofaqto5lKkJqc0goI\ns39Uqjx3jHwr+CZS6pwEqVVnpDiMKYBPVkESz/T57Uw4xQiM7k8pZy+KX65tgz3N\nQ/B+UCBQ98yZB0cTOWmOcDfriY/tHLW4vNpqoLGohaZ2aeRuZ89AixtrJG/ZXSqd\n/h0eFyedOwKBgQC0j6wim8lCNG3iOpsTyySUYoyGbEKwqfUDKkzG7ikWobNhJ1Jj\nE1xW26tJa7P6BkGz89FeWMJ9Bc9KAZDavESf4eLEQVwD/LN9pYZqH6cxYh7c8WhE\nmMq0/z3bpHQPPTxJe+SmjCB8e4msxFmGa84B1zRgkFwDM5BRuDfFRktsAQKBgEzn\nzuErJUXM96To6wCvOghaxlIK8g7jFDlg+xWVv3tFrSBct+JaA5TlbyjrRp56Ehe9\nE+cNDkIcAcNX3eYla3DrlIcY8sehsUHLw12U0GyODQU2i/2jPhECRkgKYjXftt/P\n0jewLcaeDixq+u/rf5UOkj1id98fgXQBq0Hl4MjfAoGAZNuLAGwI0r1amm+OHhSY\n5gDXhUVaa3gxJ7+xaKZTyckOB2GJK65/9tvNqByvw5qEVhHPMLsX9ES6Ox7ldQju\nAGfpITXpljgvV9HLH/cI/JayU/wa68N7JRD/ACLl5LgvUUv2aecPfRZ3aVStOz/O\nWsBeBa1MxKOyc+NslvWthYg=\n-----END PRIVATE KEY-----\n",
  "client_email": "sheets@doctor-appointment-254007.iam.gserviceaccount.com",
  "client_id": "112283506027329977887",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sheets%40doctor-appointment-254007.iam.gserviceaccount.com"
};
const SPREADSHEET_ID = '1TUS-OXcjW-9Q2X5WN0j5yoK3m5qJgzM61ToV8L3YVbs'


/**
 * ---------------------------------
 * Get all doctors
 * ---------------------------------
 */
module.exports.getAllDoctors = async event => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const doctors = info.worksheets.map((sheet, i) => ({ name: sheet.title, doctorWorksheetId: i }))
  return {
    statusCode: 200,
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify(
      {
        doctors
      },
      null,
      2
    ),
  };
};


const APPOINTMENT_START_TIMINGS = [
  "9:00:00",
  "9:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00"
]


/**
 * ---------------------------------
 * Get Doctor Availability
 * ---------------------------------
 */

module.exports.getDoctorAvailabilityForDay = async (event, context, callback) => {
  const { doctorWorksheetId, date } = event.pathParameters || {}

  if (doctorWorksheetId == null || date == null) {
    return {
      headers: { "content-type": "application/json;charset=utf-8" },
      statusCode: 400,
      body: JSON.stringify({
        error: 'URL is incomplete. Please provide second and third arguments'
      })
    }
  }
  // TODO: assert that doctorWorksheetId and date are in correct format.

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  if (doctorWorksheetId >= info.worksheets.length) {
    return {
      headers: { "content-type": "application/json;charset=utf-8" },
      statusCode: 400,
      body: JSON.stringify({ error: 'Incorrect doctor worksheet id' })
    }
  }
  const sheet = info.worksheets[doctorWorksheetId];
  let rows = await promisify(sheet.getRows)({
    query: `date = ${date}`,
    sort: 'starttime'
  });

  if (rows == null) {
    rows = [];
  }

  // mapping all start times to a simple array for searching on later
  const appointmentStartTimes = rows.map(rowData => rowData.starttime);

  // only keeping the times that don't already exist in appointmnet start times array
  const availableTimes = APPOINTMENT_START_TIMINGS.filter(time => !appointmentStartTimes.includes(time))

  return {
    headers: { "content-type": "application/json;charset=utf-8" },
    statusCode: 200,
    body: JSON.stringify(
      { availableTimes },
      null,
      2
    ),
  };
};


/**
 * ---------------------------------
 * Create a new appointment
 * ---------------------------------
 */
module.exports.bookAppointment = async event => {
  // get this object from post request body
  const data = JSON.parse(event.body);
  const { doctorWorksheetId, startTime, patientName, phone, reason, date } = data || {};
  if (doctorWorksheetId == null || startTime == null || patientName == null || phone == null || reason == null || date == null) {
    return {
      headers: { "content-type": "application/json;charset=utf-8" },
      statusCode: 400,
      body: JSON.stringify({
        error: 'Insufficient data was provided to create the appointment'
      })
    }
  }

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  if (doctorWorksheetId >= info.worksheets.length) {
    return {
      headers: { "content-type": "application/json;charset=utf-8" },
      statusCode: 400,
      body: JSON.stringify({ error: 'Incorrect doctor worksheet id' })
    }
  }
  const sheet = info.worksheets[doctorWorksheetId];
  const row = { patientname: patientName, phone, starttime: startTime, reason, date };
  const result = await promisify(sheet.addRow)(row);
  // TODO: what if result is null
  if (result.id == null) {
    return {
      headers: { "content-type": "application/json;charset=utf-8" },
      statusCode: 500,
      body: JSON.stringify({ error: 'Encountered an error while booking your appointment. Please try later.' })
    }
  }
  return {
    statusCode: 200,
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify(
      {
        success: true
      },
      null,
      2
    ),

  };
};

// sample post request
/**
 * {
  "doctorWorksheetId":1,
  "startTime":"11:00:00",
  "patientName": "Akshat Giri",
  "phone": "6666666666",
  "reason": "poopy butthole",
  "date": "2019-09-26"
}
 */