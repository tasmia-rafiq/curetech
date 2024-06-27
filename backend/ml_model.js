const { PythonShell } = require('python-shell');

// Function to make predictions using the loaded model
function logisticRegressionPredict(inputData) {
    return new Promise((resolve, reject) => {
        console.log('Executing Python script...'); 
        PythonShell.run('predict.py', { args: [JSON.stringify(inputData)] }, (err, results) => {
            if (err) {
                console.log('Prediction failed:', err);
                reject(err);
            } else {
                console.log('Prediction results received:', results);
                const predictions = JSON.parse(results[0]);
                resolve(predictions);
            }
        });
    });
}

module.exports = {
    logisticRegressionPredict
};
