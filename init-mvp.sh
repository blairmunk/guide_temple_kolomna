#!/bin/bash

echo "🚀 Инициализация MVP Kolomna Guide..."

# 1. Останавливаем старые контейнеры
echo "🛑 Останавливаем старые контейнеры..."
docker-compose -f docker-compose.dev.yml down

# 2. Поднимаем инфраструктуру
echo "📦 Запускаем Docker окружение..."
docker-compose -f docker-compose.dev.yml up -d

# 3. Ждем пока БД будет готова
echo "⏳ Ждем готовности PostgreSQL..."
for i in {1..30}; do
  if docker exec guide_temple_kolomna-db-1 pg_isready -U admin -d kolomna_guide 2>/dev/null; then
    echo "✅ PostgreSQL готов!"
    break
  fi
  echo "⌛ Попытка $i/30..."
  sleep 2
done

# 4. Устанавливаем зависимости
echo "📚 Устанавливаем зависимости..."
npm install

echo "✅ MVP готов к запуску!"
echo ""
echo "Теперь запустите: npm run dev"
echo ""
echo "🌐 Web: http://localhost:3000"
echo "🔗 API: http://localhost:3001/api/v1/poi"  
echo "⚙️ CMS: http://localhost:8055 (admin@example.com / admin123)"
echo "🔍 Search: http://localhost:7700"
