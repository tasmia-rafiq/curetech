# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import pickle
# # import pandas as pd

# # app = Flask(__name__)
# # CORS(app)

# # with open('./model_lg', 'rb') as model_file:
# #     model = pickle.load(model_file)

# # columns = ['sex', 'age', 'hypertension', 'heart_disease', 'ever_married', 
# #            'work_type', 'Residence_type', 'avg_glucose_level', 'bmi', 
# #            'smoking_status']

# # @app.route('/')
# # def home():
# #     return 'welcome'
# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     data = request.get_json()
    
# #     # Create a DataFrame with the expected column names
# #     input_data = pd.DataFrame(columns=columns)

# #     # Populate the DataFrame with the incoming data
# #     input_data.loc[0] = [data.get(col, '') for col in columns]

# #     # Make prediction
# #     prediction = model.predict(input_data)
    
# #     # Return the prediction as JSON
# #     return jsonify({'prediction': int(prediction[0])})

# # if __name__ == '__main__':
# #     app.run(debug=True, host='0.0.0.0')

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
best_model_rnf = None
scaler = None

def load_model_and_scaler():
    global best_model_rnf, scaler, original_training_data
    # Load the trained RandomForestClassifier model
    with open('best_model_rnf.pkl', 'rb') as model_file:
        best_model_rnf = joblib.load(model_file)
    
    # Load the MinMaxScaler (fit it with appropriate data)
    scaler = MinMaxScaler()
    
    # Load your original training data or fit with new data if necessary
    try:
        original_training_data = pd.read_csv('./cardio_vas_disease.csv', delimiter=';')
        X_train = original_training_data.drop(["cardio", "id"], axis=1).astype(float)
    except KeyError as e:
        # Handle the case where 'cardio' or 'id' columns are not found
        print(f"Error: {e}. Columns 'cardio' or 'id' not found.")
        X_train = original_training_data 
    except ValueError as e:
        print(f"ValueError: {e}")

    scaler.fit(X_train)  # Fit the scaler with your training data


# Function to preprocess input data
def preprocess_input_data(input_data):
    global scaler
    # Create a DataFrame with the expected column names
    columns = ['age', 'gender', 'height', 'weight', 'ap_hi', 
               'ap_lo', 'cholesterol', 'gluc', 'smoke', 
               'alco', 'active']
    input_data_df = pd.DataFrame([input_data], columns=columns)
    
    # Scale the input data using the fitted scaler
    input_data_scaled = scaler.transform(input_data_df)
    return input_data_scaled

@app.route('/')
def home():
    return 'Welcome'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    try:
        if best_model_rnf is None or scaler is None:
            load_model_and_scaler()
        
        # Preprocess the input data
        input_data_scaled = preprocess_input_data(data)
        
        # Make prediction
        prediction = best_model_rnf.predict(input_data_scaled)
        proba = best_model_rnf.predict_proba(input_data_scaled)[0][1]
        prediction_result = int(prediction[0])
        print(f'Prediction result:', prediction_result)
        
        # Return the prediction as JSON
        return jsonify({'prediction': prediction_result, 'probability': round(proba * 100, 2)})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    load_model_and_scaler()  # Load the model and scaler at the start
    app.run(debug=True, host='0.0.0.0')



