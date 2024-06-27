import joblib, json
import sys
import pandas as pd

# Load the serialized logistic regression model
def load_model():
    model = joblib.load('logistic_regression_model.pkl')
    return model

# Function to make predictions using the loaded model
def logisticRegressionPredict(input_data):
    try:
        # Load the serialized logistic regression model
        print("Loading model...")
        model = load_model()
        print("Model loaded successfully.")

        input_df = pd.DataFrame([input_data])

        # Make predictions
        print("Making predictions...")
        predictions = model.predict(input_df)

        return {'prediction': predictions.tolist()}
    except Exception as e:
        print("Prediction failed:", e)
        return None

if __name__ == "__main__":
    try:
        # # Get input data from command-line arguments
        # input_json = sys.argv[1]
        # input_data = pd.read_json(input_json, typ='series')

        # # Make predictions
        # print("Starting prediction process...")
        # predictions = logisticRegressionPredict(input_data)

        # # Print predictions as JSON
        # print("Predictions:", predictions)

        # Read input data from command line arguments
        input_data = json.loads(sys.argv[1])
        
        # Perform prediction
        prediction_result = logisticRegressionPredict(input_data)
        
        # Print the prediction result to stdout
        print(json.dumps(prediction_result))
    except Exception as e:
        print("An error occurred:", e)
