#!/bin/bash

# Exit script on any command failure
set -e

# Step 1: Install dependencies
echo "Installing dependencies..."
npm ci

# Step 2: Start the application
echo "Starting the application..."
npm run start