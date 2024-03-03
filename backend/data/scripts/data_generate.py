import random
import csv

def generate_main_library():
    # https://www.library.illinois.edu/sc/loanable-technology/ - seems like a lot of stuff is loanable
    # items here can be borrowed for up to 10 days (240 hours)
    # Room 306, loanable technologies collection
    items = ["Lightning Charger", 
             "USB-C Charger", 
             "MagSafe Charger",
             "TI-84 Calculator",
             "TI-89 Calculator",
             "HDMI Cable",
             "Camera and Accessories Kit",
             "GoPro",
             "USB-C to HDMI Adapter",
             "Dell Latitude 5310 laptop"
             ]
    
    data = []
    header = ['itemID', 'itemName', 'Availability', 'Condition', 'LocationID', 'Duration'] # duration in hours
    availability = [True, False]
    durations = [24, 48, 96, 120, 240]

    for i in range(1, 200):
        curr = [i, random.choice(items), random.choice(availability), 
                random.randint(0, 2), random.randint(1, 1000), random.choice(durations)]
        data.append(curr)

    with open('main_library_items.csv', mode='w', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        csv_writer.writerows(data)

def generate_BIF(): #TODO: update this function to fit with our design. make same as main library function above
    items = ["White paper",
             "Blue pen",
             "Black pen",
             "Pencil",
             "USB-C Charger",
             "Lightning Charger",
             "Magsafe Charger",
             "HDMI Cable"]

    data = []
    header = ['ItemId', 'ItemName', 'Facility', 'FacilitySection', 'BorrowDurationInHours']

    for i in range(1, 50):
        floor = random.randint(1, 3)
        curr = [i, random.choice(items), "Business Instructional Facility", "Floor " + str(floor), random.randint(1, 240)]
        data.append(curr)

    with open('BIF_items.csv', mode='w', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(header)
        csv_writer.writerows(data)
    

generate_main_library()
generate_BIF()