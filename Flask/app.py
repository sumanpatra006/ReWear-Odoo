from flask import Flask, request, jsonify
import cv2
import numpy as np
from PIL import Image

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024  # Max 8MB upload

# ---------------------
# Utility Function
# ---------------------
def get_blur_score(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def classify_condition(blur_score):
    if blur_score >= 500:
        return "Good"
    elif blur_score >= 200:
        return "Average"
    else:
        return "Poor"

# ---------------------
# API Route
# ---------------------
@app.route('/predict', methods=['POST'])
def predict_condition():
    if 'image' not in request.files:
        return jsonify({'error': 'Image file is required.'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'Image file is empty.'}), 400

    try:
        image_array = np.array(Image.open(image_file.stream).convert('RGB'))
        image_cv = cv2.cvtColor(image_array, cv2.COLOR_RGB2BGR)

        blur_score = get_blur_score(image_cv)
        condition = classify_condition(blur_score)

        return jsonify({
            "blur_score": round(blur_score, 2),
            "condition": condition
        })

    except Exception as e:
        return jsonify({'error': 'Failed to process image', 'details': str(e)}), 500

# ---------------------
# Entry Point
# ---------------------
if __name__ == '__main__':
    app.run(debug=False, port=6000, host='0.0.0.0')
