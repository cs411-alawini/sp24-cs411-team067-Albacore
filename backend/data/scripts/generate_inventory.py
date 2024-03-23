import pandas as pd
import random

# Define the path to your CSV file
csv_file_path = 'items.csv'

# Initialize a global variable for item_id
item_id_counter = 0

# Function to generate a unique item ID
def generate_unique_item_id():
    global item_id_counter
    item_id_counter += 1
    return item_id_counter

# Read the input CSV using pandas
def read_items_csv(csv_path):
    return pd.read_csv(csv_path, dtype={'availability': 'bool'})

# Generate items based on the CSV data
def generate_items(df):
    global item_id_counter
    # Reset item_id_counter for each run
    item_id_counter = 0

    # Expand the dataframe based on item_quantity and keep the availability column as boolean
    df_expanded = df.loc[df.index.repeat(df['item_quantity'])].reset_index(drop=True)
    df_expanded.drop(columns=['item_quantity'], inplace=True)

    # Apply generate_unique_item_id to create unique IDs for each row/item
    df_expanded['item_id'] = df_expanded.apply(lambda _: generate_unique_item_id(), axis=1)
    
    # Apply a lambda function to add a condition value for each item
    conditions = [0, 1, 2]
    df_expanded['condition'] = df_expanded.apply(lambda _: random.choice(conditions), axis=1)
    
    # Specify the order of columns, now including the availability as a boolean and the condition
    df_expanded = df_expanded[['item_id', 'item_name', 'facility_id', 'availability', 'condition', 'duration']]
    
    return df_expanded

# Save the generated items to a new CSV file
def save_generated_items_to_csv(df, output_file_name='generated_items.csv'):
    df.to_csv(output_file_name, index=False)

# Main function to control the flow
def main():
    items_df = read_items_csv(csv_file_path)
    generated_items_df = generate_items(items_df)
    save_generated_items_to_csv(generated_items_df)
    print(f"Generated {len(generated_items_df)} items")
if __name__ == "__main__":
    main()
