const Xray = require('x-ray')
const md5 = require('md5');
const fs = require('fs');
const tsv = require('tsv');
const { saveDataSource } = require('./commons');

const today = new Date();
const dateString = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;

var x = Xray({
    filters: {
        trim: (val) => (val.trim()),
        date: (val) => {
            try {
                const dateRegex = /([0-9]+).([0-9]+).([0-9]+)/;
                const matches = val.match(dateRegex);
                return `${matches[1]}-${matches[2]}-${matches[3]}`;
            } catch (e) {
                return undefined;
            }
        },
        type: (val) => {
            try {
                return val.split("-")[0].trim()
            } catch (e) {
                return undefined;
            }
        },
        subType: (val) => {
            try {
                const items = val.split("-");
                if (items.length == 3) {
                    return items[2].trim();
                } else {
                    return items[0].trim();
                }
            } catch (e) {
                return undefined;
            }
        }
    }
})
 
x('https://www.dgi.gov.lk/news/press-releases-sri-lanka/covid-19-documents/', '.category > li', [
  {
    title: 'h3 > a | trim',
    scrapedDate: 'h3 > a | date',
    scrapedType: 'h3 > a | type',
    scrapedSubType: 'h3 > a | subType',
    image: 'img@src'
  }
])
.paginate('a[title="Next"]@href')
.then((res) => {
    const resultWithPK = res.map((item) => ({
        fuzzyKey: md5(`${item.image}|${item.title}`),
        ...item,
    }));
    saveDataSource("dgi_reports", resultWithPK)
})