# COVID-19 Memorial Sri Lanka Data Source

This repository contains software for compiling and aiding documentation of victims of COVID-19 in Sri Lanka.

## Datasets

| Name | Type | Latest URL |
| --- | --- | --- |
| COVID-19 Deaths Dataset | Manually Processed | [TSV](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/covid19_deaths_latest.tsv), [JSON](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/covid19_deaths_latest.json)
| DGI Press Releases | Automated | [TSV](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dgi_reports_latest.tsv), [JSON](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dgi_reports_latest.json) |
| Individual Death Ids | Automated | [TSV](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/user_keys_latest.tsv), [JSON](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/user_keys_latest.json), [MD](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dig_reports/README.md) |

## Local Setup
Pre-requisites
- NodeJS
- Yarn Package Manager.
- Git

After cloning repository, 
```
yarn install
yarn scrape
```
### Configuration
These environment variables should be set for full functionality.
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=<saccount>
GOOGLE_PRIVATE_KEY=<pkey>
GOOGLE_SHEET_ID=<sheedId>
```
## Licence

```
 The MIT License (MIT)
 Copyright (c) 2021 Kaveen Rodrigo
```
full terms available in `LICENCE` file in repository.
