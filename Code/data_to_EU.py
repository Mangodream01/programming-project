#!/usr/bin/env python
# Name: Thirza Dado
# Student number: 10492682
'''
This script chooses EU countries from world list.
'''

import csv

# open files
happyfile = open('happy_data.csv', 'r')
countryfile = open('countries.csv', 'r')
happyfile_EU = csv.writer(open('file.csv', 'wb'))

# read countries
reader = csv.reader(countryfile)
country_list = list(reader)

# read happy data
reader_1 = csv.reader(happyfile)
headers = reader_1.next()
print headers
happyfile_EU.writerow(headers)
for row in reader_1:
    for i in range(len(country_list)):
        if row[0] == country_list[i][0]:
            # write to new csv
            happyfile_EU.writerow(row)

