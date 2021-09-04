const fs = require('fs');
const { saveDataSource } = require('./commons');
const moment = require('moment');

const BASE_PATH = "./data/dig_reports/txt/";
const DATE_MATCH = /Covid death figures reported today (\d+.\d+.\d+)/g;
const MATCH_TABLE = /(.+) (\d+) (\d+) (\d+)\n/g;

async function main() {
    const dataSet = []
    const ocrFiles = fs.readdirSync(BASE_PATH);

    for (let fIdx = 0; fIdx < ocrFiles.length; fIdx++) {
        const fileName = ocrFiles[fIdx];
        if (!fileName.endsWith(".txt")) continue;
        const fileContent = fs.readFileSync(`${BASE_PATH}${fileName}`).toString();
        const dateMatch = [...fileContent.matchAll(DATE_MATCH)];
        if (dateMatch.length) {
            const matchDate = moment(dateMatch[0][1],"DD.MM.YYYY");
            const tableEntires = [...fileContent.matchAll(MATCH_TABLE)];
            let table = {}
            tableEntires.forEach((entry) => {
                table[entry[1]] = {
                    male: entry[2],
                    female: entry[3]
                }
            })

            let entry = {
                fuzzyKey: fileName.replace(".txt", "").trim(),
                date: matchDate.utcOffset(330).toISOString(true)
            };

            if (table["Below 30 years"]) {
                entry["ageBelow30Male"] = parseInt(table["Below 30 years"]["male"]);
                entry["ageBelow30Female"] = parseInt(table["Below 30 years"]["female"]);
            }

            if (table["Between 30-59 years"]) {
                entry["age30to59Male"] = parseInt(table["Between 30-59 years"]["male"]);
                entry["age30to59Female"] = parseInt(table["Between 30-59 years"]["female"]);
            }

            if (table["60 years and above"]) {
                entry["ageAbove60Male"] = parseInt(table["60 years and above"]["male"]);
                entry["ageAbove60Female"] = parseInt(table["60 years and above"]["female"]);
            }

            dataSet.push(entry);
        }
    }
    saveDataSource("dgi_reports_deaths", dataSet);
}

main();