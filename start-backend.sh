#!/bin/bash

# Start Backend Server
echo "Starting backend server..."
cd "$(dirname "$0")/backend"
npm start
