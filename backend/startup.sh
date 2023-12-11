#!/bin/bash

# Stop script if any command fails
set -e

# Navigate to the project directory
cd /home/site/wwwroot

# Start the NestJS app in production mode
node dist/main