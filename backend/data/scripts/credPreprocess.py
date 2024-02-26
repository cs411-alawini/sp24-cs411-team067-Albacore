import pandas as pd
import glob
import os

def getAllCSV(path):
    pattern = os.path.join(path, "*.csv")
    return glob.glob(pattern)

def mergeCSV(all_paths):
    all_df = [pd.read_csv(p) for p in all_paths]
    merged = pd.concat(all_df, ignore_index=True)
    print("Originally:", len(merged))
    merged.drop_duplicates()
    print("Filtered:", len(merged))
    return merged

def main():
    curDir  = os.getcwd()
    dataPath = os.path.join(os.path.dirname(curDir), 'data')
    csv_paths = getAllCSV(dataPath)
    merge = mergeCSV(csv_paths)
    merge.to_csv(os.path.join(dataPath, 'credentials.csv'))


if __name__ == "__main__":
    main()
