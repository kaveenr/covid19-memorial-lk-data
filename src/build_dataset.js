require('dotenv').config();

const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const moment = require('moment');
const { saveDataSource } = require('./commons');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

function mapItem(row) {
    try {
        return ({
            indexKey: row.IndexKey, 
            deathDate: moment(row.DeathDate,"YYYY/MM/DD").utcOffset(330).toISOString(true),
            province: row.Province,
            district: row.District,
            city: row.City,
            ageType: row.AgeType,
            ageValue: row.AgeValue,
            gender: row.Gender,
            deathPlace: row.DeathPlace,
            incarcerated: row.incarcerated ? row.incarcerated === "Y" : false,
            sourceType: row.SourceType,
            sourceRef: row.SourceRef
        });
    } catch (e) {
        throw Error(`Unable to parse row ${row.IndexKey} reason ${e.toString()}`)
    }
}

async function main() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    console.log(`Sheet ${doc.title} Loaded`);

    const masterRecords = doc.sheetsByTitle["Master Records"];
    const masterRows = await masterRecords.getRows();
    console.log(`Loaded ${masterRows.length} rows`);

    const dataSet = [];
    masterRows.filter((row) => row.Province).forEach((row) => {
        dataSet.push(mapItem(row));
    });
    console.log(`Complied ${dataSet.length} items for saving`);
    
    saveDataSource("covid19_deaths", dataSet);
}

main();