#!/bin/bash

# Fox Messenger Firebase Setup Script
# Автоматически инициализирует Firebase проект

set -e

echo "🦊 Fox Messenger - Firebase Setup"
echo "=================================="
echo ""

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Check if user is logged in
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "🔑 Please login to Firebase:"
    firebase login
fi

# Create or select project
echo ""
echo "📋 Available Firebase projects:"
firebase projects:list

echo ""
read -p "Enter your Firebase Project ID (or press Enter to create new): " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    read -p "Enter new project name: " PROJECT_NAME
    PROJECT_ID=$(echo $PROJECT_NAME | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
    echo "Creating new Firebase project: $PROJECT_ID"
    firebase projects:create $PROJECT_ID --display-name "$PROJECT_NAME"
fi

# Set project
firebase use $PROJECT_ID

# Enable services
echo ""
echo "🔧 Enabling Firebase services..."
firebase services:enable firebaseauth.googleapis.com --project=$PROJECT_ID
firebase services:enable firestore.googleapis.com --project=$PROJECT_ID
firebase services:enable firebasedatabase.googleapis.com --project=$PROJECT_ID

# Get Firebase config
echo ""
echo "📝 Fetching Firebase configuration..."
FIREBASE_CONFIG=$(firebase setup:web 2>/dev/null || echo "")

# Create .env.local with Firebase config
echo ""
echo "💾 Creating .env.local with Firebase credentials..."

cat > .env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# Firebase Configuration (Auto-generated)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$PROJECT_ID
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$(firebase --project=$PROJECT_ID setup:web 2>/dev/null | grep messagingSenderId | cut -d"'" -f2)
NEXT_PUBLIC_FIREBASE_API_KEY=$(firebase --project=$PROJECT_ID setup:web 2>/dev/null | grep apiKey | cut -d"'" -f2)
NEXT_PUBLIC_FIREBASE_APP_ID=$(firebase --project=$PROJECT_ID setup:web 2>/dev/null | grep appId | cut -d"'" -f2)
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://$PROJECT_ID.firebaseio.com

# Environment
NODE_ENV=development

# Feature Flags
NEXT_PUBLIC_ENABLE_DEV_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Firebase project configured: $PROJECT_ID"
echo "📁 Environment variables saved to .env.local"
echo ""
echo "🚀 Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "🌐 For Vercel deployment:"
echo "1. Go to Vercel dashboard"
echo "2. Project Settings → Environment Variables"
echo "3. Copy variables from .env.local"
echo ""
