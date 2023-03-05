#! /usr/bin/env python3

import pandas as pd     # pip package

def verify_categories(frame: pd.DataFrame) -> pd.DataFrame:

    '''Verifies category questions have prices in every area.

    Args:
        frame: The DataFrame to have its questions verified

    Returns:
        The DataFrame of questions that are present in all price ranges
    '''

    # Get the unique categories per price range to later verify
    categories_200 = frame[frame['Value'] == 200]['Category']
    categories_400 = frame[frame['Value'] == 400]['Category']
    categories_600 = frame[frame['Value'] == 600]['Category']
    categories_800 = frame[frame['Value'] == 800]['Category']
    categories_1000 = frame[frame['Value'] == 1000]['Category']

    categories_200 = pd.unique(categories_200)
    categories_400 = pd.unique(categories_400)
    categories_600 = pd.unique(categories_600)
    categories_800 = pd.unique(categories_800)
    categories_1000 = pd.unique(categories_1000)

    valid_categories = []

    for category in categories_200:

        # If the category is not in all price ranges, we can't use it
        if category in categories_400 and category in categories_600 and \
           category in categories_800 and category in categories_1000:

            valid_categories.append(category)

    frame = frame[frame['Category'].isin(valid_categories)]

    return frame


def main() -> None:

    '''Parses through the `jeopardy_original.csv` file, cleaning data for our needs.'''

    data = pd.read_csv('./jeopardy_original.csv')
    frame = pd.DataFrame(data)

    # Dropping columns we don't need (will drop "Round" later)
    frame = frame.drop('Show Number', axis=1)
    frame = frame.drop('Air Date', axis=1)

    # Remove dollar signs and commas from prices in "Value" column to make values `int`
    frame['Value'] = frame['Value'].replace('\$', '', regex=True)
    frame['Value'] = frame['Value'].replace('\,', '', regex=True)

    # Delete any questions with links (many are dead links)
    frame = frame[frame['Question'].str.contains('href=') == False]

    # Remove questions with a value of "None"
    frame = frame[frame['Value'] != 'None']
    frame['Value'] = pd.to_numeric(frame['Value'])

    # Half the prices of questions under the "Double Jeopardy!" round
    frame.loc[frame['Round'] == 'Double Jeopardy!', 'Value'] /= 2
    frame = frame.drop('Round', axis=1)

    # Filter out all prices other than the ones in "modern" Jeopardy!
    frame = frame[frame['Value'].isin([200, 400, 600, 800, 1000])]

    frame = verify_categories(frame)
    print(frame)

    # Creating a new JSON file for the clean dataset
    frame.to_json('./jeopardy_clean.json', orient='records')


if __name__ == '__main__':

    main()
