#!/bin/bash

echo "🐘 PostgreSQL Setup for Law Firm Blog"
echo "====================================="
echo ""
echo "This script will help you set up PostgreSQL for your project."
echo ""

# Check if PostgreSQL is already running locally
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL is installed on your system"
    
    # Try to connect to local PostgreSQL
    if psql -h localhost -U postgres -c '\q' 2>/dev/null; then
        echo "✅ PostgreSQL is running locally"
        read -p "Do you want to use local PostgreSQL? (y/n): " use_local
        
        if [ "$use_local" = "y" ]; then
            echo "Setting up local database..."
            createdb law_firm_db 2>/dev/null || echo "Database might already exist"
            
            # Update .env file
            sed -i.bak 's|DATABASE_URL="postgresql://username:password@host:port/database"|DATABASE_URL="postgresql://postgres:password@localhost:5432/law_firm_db"|' .env
            echo "✅ Updated .env with local PostgreSQL connection"
            echo "Please update the password in .env if needed"
            exit 0
        fi
    fi
fi

echo "Please choose a PostgreSQL provider:"
echo "1. Supabase (Recommended - Free, Easy setup)"
echo "2. Neon (Alternative - Free, Modern)"
echo "3. Railway (Free, Simple)"
echo "4. Manual setup"

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Setting up Supabase:"
        echo "1. Go to https://supabase.com"
        echo "2. Click 'Start your project'"
        echo "3. Sign up/login with GitHub/Google"
        echo "4. Create new project (choose a region close to you)"
        echo "5. Wait for project to be ready (2-3 minutes)"
        echo "6. Go to Settings > Database"
        echo "7. Copy the 'Connection string'"
        echo "8. Replace the DATABASE_URL in your .env file"
        echo ""
        echo "Your connection string will look like:"
        echo "postgresql://postgres.abc123:password@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
        ;;
    2)
        echo ""
        echo "🚀 Setting up Neon:"
        echo "1. Go to https://neon.tech"
        echo "2. Click 'Sign up' (free)"
        echo "3. Create new project"
        echo "4. Copy the connection string"
        echo "5. Replace the DATABASE_URL in your .env file"
        echo ""
        echo "Your connection string will look like:"
        echo "postgresql://user:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require"
        ;;
    3)
        echo ""
        echo "🚀 Setting up Railway:"
        echo "1. Go to https://railway.app"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project' > 'Provision PostgreSQL'"
        echo "4. Copy the connection string"
        echo "5. Replace the DATABASE_URL in your .env file"
        ;;
    4)
        echo ""
        echo "📝 Manual Setup:"
        echo "1. Install PostgreSQL on your system"
        echo "2. Create a database: createdb law_firm_db"
        echo "3. Update DATABASE_URL in .env with your connection details"
        echo ""
        echo "Example format:"
        echo "postgresql://username:password@localhost:5432/law_firm_db"
        ;;
esac

echo ""
echo "⚠️  IMPORTANT: After setting up your database:"
echo "1. Update the DATABASE_URL in your .env file"
echo "2. Run: npm run db:push"
echo "3. Run: npm run db:generate"
echo ""
echo "🎉 Your PostgreSQL database will be ready!"