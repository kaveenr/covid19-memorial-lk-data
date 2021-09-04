#!/bin/bash

mkdir -p dig_reports
mkdir -p dig_reports/img/
mkdir -p dig_reports/txt/

tail -n +2 dgi_reports_latest.tsv > /tmp/dgi_reports_latest_trim.tsv

IFS=$'\t'

echo "# DGI Data Explorer"  > "dig_reports/README.md"

while read -r fuzzyKey title scrapedDate scrapedType scrapedSubType image
do
    echo "$fuzzyKey -> $image"
    if [[ -e "dig_reports/img/$fuzzyKey.jpg" ]]; then
        echo "$fuzzyKey already downloaded"
    else
        curl "$image" >  "dig_reports/img/$fuzzyKey.jpg"
        if [ "$?" -ne "0" ]; then
            echo "Unable to process $fuzzyKey"
            continue;
	    fi
    fi
    

    if [[ -e "dig_reports/txt/$fuzzyKey.txt" ]]; then
        echo "$fuzzyKey already OCR'd"
    else
        tesseract "dig_reports/img/$fuzzyKey.jpg" "dig_reports/txt/$fuzzyKey"
    fi

    ocrRes=$(cat "dig_reports/txt/$fuzzyKey.txt")
    echo "# ${title} " > "dig_reports/$fuzzyKey.md"
    echo "Key: ${fuzzyKey} " >> "dig_reports/$fuzzyKey.md"
    echo "![img](img/$fuzzyKey.jpg)" >> "dig_reports/$fuzzyKey.md"
    echo "---" >> "dig_reports/$fuzzyKey.md"
    echo '```' >> "dig_reports/$fuzzyKey.md"
    echo "${ocrRes}" >> "dig_reports/$fuzzyKey.md"
    echo '```' >> "dig_reports/$fuzzyKey.md"

    echo "- [$scrapedDate -> $scrapedType - $scrapedSubType]($fuzzyKey.md)"  >> "dig_reports/README.md"

done < /tmp/dgi_reports_latest_trim.tsv
