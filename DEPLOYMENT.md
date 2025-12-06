# 🚀 Deployment Guide - Vercel

##准备步骤 (Pre-Deployment)

### 1. Локальная подготовка

```bash
# Убедитесь, что все работает локально
npm install --legacy-peer-deps
npm run build
npm start
```

### 2. Git инициализация

```bash
cd /home/timex/Documents/Kitsune-Messanger/fox-messenger

# Инициализировать Git (если еще не инициализирован)
git init

# Добавить все файлы
git add .

# Сделать первый коммит
git commit -m "chore: Initial Fox Messenger setup with Next.js, WebRTC, and Zustand"

# Переименовать ветку (если нужно)
git branch -M main
```

### 3. GitHub Repository

1. Перейти на [github.com](https://github.com)
2. Нажать **"New"** для создания нового репозитория
3. Назвать его `fox-messenger`
4. **НЕ** инициализировать с README (уже есть)
5. Нажать **"Create repository"**

### 4. Push на GitHub

```bash
# Добавить удаленный репозиторий
git remote add origin https://github.com/ВАШ_ЮЗЕР/fox-messenger.git

# Отправить на GitHub
git push -u origin main
```

---

## 🌐 Развертывание на Vercel

### Метод 1: Через веб-интерфейс (Рекомендуется)

1. Перейти на [vercel.com](https://vercel.com)
2. Нажать **"Sign up"** (если еще нет аккаунта)
3. Выбрать **"Continue with GitHub"**
4. Авторизоваться на GitHub
5. Нажать **"Import Project"**
6. Выбрать репозиторий `fox-messenger`
7. Vercel автоматически определит Next.js проект
8. Настроить переменные окружения (опционально):
   ```
   NEXT_PUBLIC_API_URL=https://[ваш-проект].vercel.app
   NEXT_PUBLIC_WS_URL=wss://[ваш-вебсокет-сервер].com
   ```
9. Нажать **"Deploy"**
10. Готово! Проект развернут 🎉

### Метод 2: Через CLI

```bash
# Установить Vercel CLI
npm install -g vercel

# Авторизоваться
vercel login

# Развернуть проект
vercel --prod

# Выполнить интерактивный конфиг и подтвердить развертывание
```

---

## ✅ После развертывания

### 1. Проверить развертывание

1. Перейти в дашбоард Vercel
2. Выбрать проект `fox-messenger`
3. Проверить статус: **"Ready"** ✅
4. Нажать на URL для открытия приложения
5. Проверить функциональность:
   - ✅ Загрузка страницы
   - ✅ Навигация по разделам
   - ✅ Developer Mode работает
   - ✅ API endpoints доступны

### 2. Настроить домен (опционально)

1. В дашбоарде Vercel нажать на **"Settings"**
2. Выбрать **"Domains"**
3. Добавить свой домен:
   - Добавить пользовательский домен
   - Или использовать `yourproject.vercel.app`

### 3. Настроить мониторинг

1. Перейти в **"Settings"** → **"Analytics"**
2. Включить **"Web Analytics"** (бесплатно)
3. Проверить метрики в реальном времени

### 4. Настроить уведомления об ошибках

1. Перейти в **"Settings"** → **"Alerts"**
2. Настроить email уведомления для ошибок
3. Подключить Slack (опционально)

---

## 🔄 CI/CD Pipeline

### Автоматическое развертывание

Vercel **автоматически** развернет проект при:
- Пушe на `main` ветку (production)
- Создании Pull Request (preview deployment)

Вы можете увидеть статус развертывания в:
- GitHub: Статусы коммитов
- Vercel: Дашбоард проекта
- Email: Уведомления о статусе

### Build Settings

Vercel автоматически обнаруживает:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Для изменения: Settings → Build & Development Settings

---

## 🗄️ Интеграция базы данных

### MongoDB Atlas (Рекомендуется)

```bash
# 1. Создать бесплатный кластер на mongodb.com/cloud
# 2. Получить connection string
# 3. Добавить в Vercel переменные окружения:

MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fox?retryWrites=true
```

### PostgreSQL

```bash
# Использовать Vercel Postgres (в бета):
# Settings → Storage → Connect PostgreSQL

POSTGRES_URL=postgresql://user:password@host/database
```

---

## 💾 Environment Variables на Vercel

1. Перейти в **Settings** → **Environment Variables**
2. Добавить переменные для production, preview, development:

```
# Production (.vercel/production-config.json)
NEXT_PUBLIC_API_URL=https://fox-messenger.vercel.app
NEXT_PUBLIC_WS_URL=wss://your-websocket-server.com
NODE_ENV=production

# Preview
NEXT_PUBLIC_API_URL=https://fox-messenger-preview.vercel.app

# Development (локально)
# Используется .env.local
```

---

## 🔒 Безопасность

### Рекомендации

1. **HTTPS**: Vercel автоматически использует HTTPS
2. **Security Headers**: Добавить в `next.config.ts`:
   ```typescript
   headers: async () => [
     {
       source: '/:path*',
       headers: [
         { key: 'X-Content-Type-Options', value: 'nosniff' },
         { key: 'X-Frame-Options', value: 'DENY' },
         { key: 'X-XSS-Protection', value: '1; mode=block' },
       ],
     },
   ]
   ```

3. **Rate Limiting**: Vercel Edge Function middleware
4. **DDoS Protection**: Включить Vercel Shield (платный)
5. **Secrets**: Никогда не коммитить `.env` файлы

---

## 📊 Мониторинг и логирование

### Vercel Analytics

- Перейти в **Analytics** tab
- Просматривать:
  - Web Vitals (загрузка, интерактивность, визуальная стабильность)
  - Запросы API
  - Функции Serverless

### Error Tracking

- Ошибки автоматически отслеживаются
- Просмотр в **"Logs"** или **"Error Tracking"** (платный)
- Интеграция с Sentry или Rollbar

### Logs

```bash
# Просмотр логов через Vercel CLI
vercel logs [project-name]

# Запросить логи для конкретной функции
vercel logs [project-name] --follow
```

---

## 🐛 Troubleshooting

### Ошибка: "Build failed"

```
Решение:
1. Проверить локально: npm run build
2. Проверить logs в Vercel дашбоарде
3. Убедиться в .env переменных
4. Перепроверить все imports и зависимости
```

### Ошибка: "Module not found"

```
Решение:
1. Убедиться что все зависимости в package.json
2. npm install --legacy-peer-deps (локально)
3. Перепроверить пути импортов
4. Redeploy проект
```

### Медленная загрузка

```
Решение:
1. Оптимизировать изображения
2. Включить кэширование
3. Использовать Edge Functions для API
4. Проверить Web Vitals в Analytics
```

### WebSocket не подключается

```
Решение:
1. Убедиться что NEXT_PUBLIC_WS_URL корректен
2. WebSocket сервер должен быть развернут отдельно
3. Проверить CORS и разрешения
4. Использовать WSS (secure WebSocket) для production
```

---

## 🎓 Дополнительные ресурсы

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel GitHub Integration](https://vercel.com/docs/git/vercel-for-github)
- [Edge Functions](https://vercel.com/docs/edge-functions/overview)
- [Analytics](https://vercel.com/docs/analytics)

---

## ✨ Best Practices

1. **Ветвление**: Используйте `develop` ветку для тестирования, `main` для production
2. **Preview Deployments**: Vercel создает preview для каждого PR
3. **Secrets**: Никогда не коммитить секреты в код
4. **Optimize**: Регулярно проверять Web Vitals и производительность
5. **Monitoring**: Настроить alerts для ошибок и performance issues

---

**Fox Messenger успешно развернут на Vercel!** 🦊🚀
