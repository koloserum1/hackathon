#!/bin/bash

# Jednoduchý lokálny server pre statické HTML súbory
# Spustí server na http://localhost:8000

echo "🚀 Spúšťam lokálny server..."
echo "📍 URL: http://localhost:8000"
echo "⏹️  Stlač Ctrl+C pre ukončenie"
echo ""

# Skús Python 3
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Ak nie, skús Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Ak nie je Python, ukáž inštrukcie
else
    echo "❌ Python nie je nainštalovaný."
    echo ""
    echo "Alternatívy:"
    echo "1. Nainštaluj Python: https://www.python.org/downloads/"
    echo "2. Alebo použij Node.js: npx serve"
    echo "3. Alebo použij PHP: php -S localhost:8000"
fi

