#!/bin/bash

# Production build script for Delivery Booster
# This script builds the application and ensures proper directory structure for deployment

echo "Building client application..."
npm run build

echo "Copying static files to expected location..."
# Copy built static files to the location where serveStatic function expects them
cp -r dist/public server/public

echo "Build complete! Static files are ready for production deployment."
echo "Use 'NODE_ENV=production node dist/index.js' to start the production server."