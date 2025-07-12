# Fashion Recommender System

A deep learning-powered visual similarity engine for fashion products. Upload an image and instantly discover visually similar items using convolutional neural networks.

## Overview

This system uses a pre-trained ResNet50 model to extract deep visual features from fashion images and recommends similar-looking products based on cosine similarity. Designed with scalability and modularity in mind, the system supports incremental updates and is built for future deployment.

## Features

* **Visual Feature Extraction** – ResNet50 (without top layers) for high-quality embeddings
* **Similarity Search** – Cosine similarity with brute-force KNN (to be upgraded)
* **Incremental Updates** – Add new images in batches without recomputing all embeddings
* **Simple UI** – Streamlit-based interface for quick testing
* **Scalable Design** – Ready for approximate search via Annoy and cloud storage via AWS S3

## Quick Start

```bash
# Clone and install dependencies
git clone <your-repo-url>
cd fashion-recommender
pip install -r requirements.txt

# Launch the app
streamlit run app.py
```

## Architecture

```
Input Image → ResNet50 Feature Extractor → Cosine Similarity Engine → Recommendations
```

* **Feature Extraction**: Pre-trained ResNet50 (ImageNet) with global pooling
* **Similarity Matching**: Brute-force KNN (currently) → Annoy (planned)
* **Storage**: Embeddings and metadata stored using pickle for fast I/O

## Project Structure

```
├── app.py               # Streamlit frontend
├── embeddings.pkl       # Stored image feature vectors
├── filenames.pkl        # Corresponding image filenames
├── main.py              # Feature extraction and update logic
└── uploads/, images/    # Image folders
```

## Current Status

* ✅ Core engine working on \~44K image dataset
* 🔄 Migrating to Annoy for faster search
* 🚀 AWS integration and frontend enhancements planned

## Scaling Plans

As the dataset grows:

* **Annoy** for faster, memory-efficient approximate nearest neighbors
* **Faiss** for GPU-accelerated large-scale search
* **Vector DBs** like Pinecone or Weaviate for production-level search infrastructure
