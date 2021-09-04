# COVID-19 Memorial Sri Lanka Data Source

This repository contains software for compiling and aiding documentation of victims of COVID-19 in Sri Lanka.

## Datasets

| Name | Type | Latest URL |
| --- | --- | --- |
| DGI Press Releases | Automated | [TSV](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dgi_reports_latest.tsv) [JSON](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dgi_reports_latest.json) |
| Individual Death Ids | Automated | [TSV](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/user_keys_latest.tsv) [JSON](https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/user_keys_latest.json) |

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

## Licence

```
 The MIT License (MIT)
 Copyright (c) 2021 Kaveen Rodrigo
```
full terms available in `LICENCE` file in repository.
