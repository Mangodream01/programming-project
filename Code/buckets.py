#!/usr/bin/env python
# Name: Thirza Dado
# Student number: 10492682
'''
This script converts csv to json format.
'''

import csv, io

# open files
happyfile = open('happy_data.csv', 'r')
countryfile = open('countries.csv', 'r')

# read countries
reader = csv.reader(countryfile)
country_list = list(reader)

# fieldnames
fieldnames = happyfile.readline().decode("utf-8-sig").encode("utf-8")
fieldnames = fieldnames.replace('\"',' ').replace('\n', '').split(',')
for i in range(len(fieldnames)):
    fieldnames[i] = fieldnames[i].strip()

# read countries
happydata = []
reader_2 = csv.DictReader(happyfile, fieldnames)
for row in reader_2:
    happydata.append(row)

# EU countries only
happydata_EU = []
for i in range(len(happydata)):
    for j in range(len(country_list)):
        # it is an EU country
        if happydata[i]["country"] == country_list[j][0]:
            happydata_EU.append(happydata[i])

# scores
LifeL = []
logGDP = []
Soc_sup = []
Expec = []
LifeCh = []
Gener = []
Percep = []
PosAf = []
NegAf = []
ConfGov = []
DemoQ = []

var = [LifeL, logGDP, Soc_sup, Expec, LifeCh, Gener, Percep, PosAf, NegAf, ConfGov, DemoQ]

for item in happydata_EU:
    try:
        LifeL.append(float(item[fieldnames[2]]))
        logGDP.append(float(item[fieldnames[3]]))
        Soc_sup.append(float(item[fieldnames[4]]))
        Expec.append(float(item[fieldnames[5]]))
        LifeCh.append(float(item[fieldnames[6]]))
        Gener.append(float(item[fieldnames[7]]))
        Percep.append(float(item[fieldnames[8]]))
        PosAf.append(float(item[fieldnames[9]]))
        NegAf.append(float(item[fieldnames[10]]))
        ConfGov.append(float(item[fieldnames[11]]))
        DemoQ.append(float(item[fieldnames[12]]))
    except ValueError:
        pass

for i in range(len(var)):
    minimum = min(var[i])
    maximum = max(var[i])

    print "VAR", i, ":",  round(minimum), "(", minimum, ")", round(maximum), "(", maximum, ")",\
        "steps:", round((maximum - minimum)) / 8

# 4

# VAR 0 : 3.8 ( 3.843797922 ) 8.0 ( 8.01893425 ) steps: 0.5
# VAR 1 : 8.9 ( 8.8953619 ) 11.4 ( 11.42996979 ) steps: 0.3
# VAR 2 : 0.6 ( 0.625586927 ) 1.0 ( 0.982521713 ) steps: 0.0
# VAR 3 : 60.4 ( 60.40684891 ) 73.4 ( 73.42340851 ) steps: 1.6
# VAR 4 : 0.3 ( 0.257533818 ) 1.0 ( 0.97113502 ) steps: 0.1
# VAR 5 : -0.3 ( -0.325171143 ) 0.5 ( 0.453441232 ) steps: 0.1
# VAR 6 : 0.1 ( 0.132430181 ) 1.0 ( 0.98327601 ) steps: 0.1
# VAR 7 : 0.5 ( 0.473149508 ) 0.9 ( 0.899718463 ) steps: 0.1
# VAR 8 : 0.1 ( 0.134403035 ) 0.5 ( 0.482183158 ) steps: 0.0
# VAR 9 : 0.1 ( 0.078787297 ) 0.8 ( 0.824018121 ) steps: 0.1
# VAR 10 : -1.0 ( -1.004197598 ) 1.5 ( 1.532393098 ) steps: 0.3




