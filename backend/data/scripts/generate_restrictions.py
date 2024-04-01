import pandas as pd
import random

# Define the path to your CSV file
csv_file_path = 'big.csv'

# Initialize a global variable for item_id
item_id_counter = 0
grainger_list = [8, 33, 36, 50, 59, 65, 73, 91, 92, 94, 95, 96, 97, 101, 102, 108, 136, 142, 168, 171, 187, 191, 199, 232, 233, 245]
chem_list = [32, 49, 63]
facilities = {
    1:grainger_list,
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:grainger_list,
    10:grainger_list,
    11:chem_list
}

# Function to generate a unique item ID
def generate_unique_item_id():
    global item_id_counter
    item_id_counter += 1
    return item_id_counter

# Read the input CSV using pandas
def read_items_csv(csv_path):
    return pd.read_csv(csv_path)

# Generate items based on the CSV data
def generate_items(df):
    global item_id_counter
    # Reset item_id_counter for each run
    item_id_counter = 0
    df['repeat_times'] = df['LocationID'].apply(lambda row: len(facilities.get(row, [])))
    df_expanded = df.loc[df.index.repeat(df['repeat_times'])].reset_index(drop=True)
    df_expanded["UniqueID"] = df_expanded.groupby(['ItemID']).cumcount()
    df_expanded['MajorID'] = df_expanded.apply(lambda row: facilities[row['LocationID']][row['UniqueID']], axis=1)
    df_expanded = df_expanded[['MajorID','ItemID', 'ItemName', 'LocationID', 'Availability', 'Condition', 'Duration']]
    
    return df_expanded

# Save the generated items to a new CSV file
def save_generated_items_to_csv(df, output_file_name='generated_restrictions.csv'):
    df.to_csv(output_file_name, index=False)

# Main function to control the flow
def main():
    items_df = read_items_csv(csv_file_path)
    generated_items_df = generate_items(items_df)
    save_generated_items_to_csv(generated_items_df)
    print(f"Generated {len(generated_items_df)} items")
if __name__ == "__main__":
    main()
