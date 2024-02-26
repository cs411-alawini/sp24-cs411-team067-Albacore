import csv
f = open("Student Enrollment.txt", "r") # this code finds all majors from the student enrollment html data

lines = f.readlines()
s = "<td class=\"l data\" style=\" width: 15%;"

majors = set()

for line in lines:
    if s in line:
        major = line[40:-6]
        majors.add(major)

majors.remove("&nbsp;") # remove extraneous major in the data


for major in majors:
    currmajor = major
    fixedname = currmajor.replace("&amp;", "&") # fix ampersands in data
    majors.remove(major)
    majors.add(fixedname)

with open('majors.csv', 'w', newline='') as file:
    writer = csv.writer(file, delimiter='~')
    for major in majors:
        writer.writerow([major])
