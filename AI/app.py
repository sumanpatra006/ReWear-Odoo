import tensorflow
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
import numpy as np
from numpy.linalg import norm
import os
from tqdm import tqdm
import pickle

# Load existing data if present
if os.path.exists("embeddings.pkl"):
    with open("embeddings.pkl", "rb") as f:
        feature_list = pickle.load(f)
else:
    feature_list = []

if os.path.exists("filenames.pkl"):
    with open("filenames.pkl", "rb") as f:
        filenames = pickle.load(f)
else:
    filenames = []

# Get all files and find new ones
all_files = [os.path.join("uploads/images", file) for file in os.listdir("uploads/images")]

new_files = [f for f in all_files if f not in filenames]

print(f"Total images in folder: {len(all_files)}")
print(f"Already processed images: {len(filenames)}")

if len(all_files) == len(filenames):
    print("All images have been processed. No need to run the script again.")
    exit()

# Set up model
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False
model = tensorflow.keras.Sequential([base_model, GlobalMaxPooling2D()])

# Parameters
batch_size = 16
chunk_size = 15000  # Number of new images to process in this run
batch = new_files[:chunk_size]

def extract_features_batch(img_paths, model):
    imgs = []
    for img_path in img_paths:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        imgs.append(img_array)
    imgs = np.array(imgs)
    preprocessed_imgs = preprocess_input(imgs)
    features = model.predict(preprocessed_imgs)
    normalized_features = features / np.linalg.norm(features, axis=1, keepdims=True)
    return normalized_features

# Process in mini-batches
for i in tqdm(range(0, len(batch), batch_size)):
    batch_files = batch[i:i+batch_size]
    batch_features = extract_features_batch(batch_files, model)
    feature_list.extend(batch_features)
    filenames.extend(batch_files)

# Save updated lists
with open("embeddings.pkl", "wb") as f:
    pickle.dump(feature_list, f)

with open("filenames.pkl", "wb") as f:
    pickle.dump(filenames, f)