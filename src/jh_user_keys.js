const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
const { saveDataSource } = require('./commons');

const zeroPad = (num, places) => String(num).padStart(places, '0')
const DATA_SRC_URL = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json";

async function main() {
    const response = await axios.get(DATA_SRC_URL).catch((e) => {
        throw Error("Unable to get dataset");
    });
    const lkaDataset = response.data["LKA"];
    if (!lkaDataset) {
        throw Error("Unable to get LKA sub-set");
    }
    let cum_no = 1;
    const lkaKeys = lkaDataset.data
        .filter((i) => (i.new_deaths))
        .flatMap((i) => {
            let keys = [];
            const date = moment(i.date, "YYYY-MM-DD");
            if (!date.isValid()) {
                throw new Error("Date Parsing Failed");
            }
            for (let idx = 1; idx <= i.new_deaths; idx++) {
                keys.push({
                    key: date.unix() + idx,
                    IndexKey: `${date.format("YYYY-MM-DD")}-${zeroPad(idx,4)}`,
                    deathDate: date.format("YYYY/MM/DD"),
                    cumDeaths: cum_no++
                })
            }
            return keys;
        }).sort((a,b) => (a.key - b.key));
        
        saveDataSource("user_keys", lkaKeys);
}

main();