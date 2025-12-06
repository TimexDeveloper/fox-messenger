# 🚀 Quick Start Guide - Fox Messenger

## Installation (5 минут)

```bash
# 1. Перейти в проект
cd /home/timex/Documents/Kitsune-Messanger/fox-messenger

# 2. Установить зависимости
npm install

# 3. Запустить dev server
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) - приложение готово!

## 🎨 Что вы увидите

### Главный экран (/chats)
- **Левая панель**: Навигация и профиль
- **Средняя панель**: Список чатов с поиском
- **Правая панель**: Активный чат с историей сообщений

### Компоненты
1. **Sidebar** - Навигация по приложению
2. **ChatList** - Список активных чатов
3. **ChatWindow** - Основная область чата
4. **CallModal** - Модальное окно для звонков
5. **DeveloperPanel** - Панель отладки (нажмите иконку шестерёнки слева)

## 🛠️ Особенности

### Цветовая схема
- **Чёрный**: #000000, #121212 (основной фон)
- **Оранжевый**: #FF6700 (акценты, активные элементы)

### Функциональность
- ✅ Список чатов с поиском
- ✅ Отправка сообщений
- ✅ Голосовые сообщения (макет)
- ✅ Загрузка файлов (макет)
- ✅ Модальное окно видеозвонков
- ✅ Список друзей с индикаторами онлайна
- ✅ История звонков
- ✅ Настройки профиля
- ✅ Режим разработчика с логами

## 🔧 Режим разработчика

Нажмите на иконку ⚙️ "Dev Mode" в левой панели, чтобы активировать панель отладки:

```
📊 Debug Info
  • WS Connected: ✅
  • RTC Connections: 0
  • Messages Queued: 0
  • Timestamp: 00:00:00

📝 Logs (последние 20 записей)
  [INFO] Message sent
  [WARN] Connection warning
  [ERROR] Error details

💬 Chats (инспектор данных)
  Показывает структуру активных чатов
```

## 📱 Структура файлов

```
src/
├── app/
│   ├── api/              # API маршруты
│   ├── chats/            # Страница чатов
│   ├── friends/          # Страница друзей
│   ├── calls/            # История звонков
│   ├── settings/         # Настройки
│   └── page.tsx          # Главная (редирект на /chats)
├── components/           # React компоненты UI
├── store/                # Zustand глобальное состояние
├── lib/                  # Утилиты (WebRTC, debug)
└── hooks/                # Custom React hooks
```

## 🌐 Для разворачивания на Vercel

```bash
# 1. Инициализировать Git
git init
git add .
git commit -m "Initial commit: Fox Messenger"

# 2. Push на GitHub
git remote add origin https://github.com/yourusername/fox-messenger.git
git branch -M main
git push -u origin main

# 3. На сайте Vercel (vercel.com)
# Подключить репозиторий → Автоматическое развёртывание!
```

## 📚 Документация

- **ARCHITECTURE.md** - Полная архитектура системы
- **README.md** - Обзор проекта
- **package.json** - Зависимости и скрипты

## ⚡ Основные скрипты

```bash
npm run dev        # Запуск dev сервера (горячая перезагрузка)
npm run build      # Production build
npm start          # Запуск production версии
npm run lint       # Проверка кода (если настроен ESLint)
```

## 🎯 Макетные данные

Приложение использует mock data для демонстрации:

```javascript
// src/app/chats/page.tsx
const MOCK_USER = {
  id: 'user-123',
  username: 'Your Name',
  avatar: '...',
  isOnline: true,
};

const MOCK_CHATS = [
  // Три примера чатов с сообщениями
];
```

Замените на реальную логику подключения при интеграции с бэкендом.

## 🚀 Следующие шаги

### Интеграция с бэкендом
1. Подключить WebSocket для реал-тайма
2. Добавить базу данных (MongoDB/PostgreSQL)
3. Реализовать аутентификацию (JWT)

### Расширение функциональности
1. Группы чатов
2. Загрузка файлов
3. Реакции на сообщения
4. Поиск по сообщениям

### Оптимизация
1. PWA (offline mode)
2. Service Workers
3. Кэширование
4. Оптимизация изображений

## 🐛 Частые вопросы

**Q: Как изменить основной цвет?**
A: Отредактируйте `tailwind.config.ts`, переменные `fox.orange` и `fox.black`

**Q: Как добавить новую страницу?**
A: Создайте папку в `src/app/new-page/page.tsx`

**Q: Как обновить зависимости?**
A: `npm update` или измените версии в `package.json`

**Q: Почему не работают WebRTC звонки?**
A: Это макет UI - для реальных звонков нужен сервер сигнализации

## 💡 Советы

- Используйте React Developer Tools для отладки компонентов
- Инспектируйте Zustand store через DevTools
- Проверяйте консоль браузера на ошибки
- Dev Mode показывает логи приложения

---

**Готово! Fox Messenger запущен и готов к использованию!** 🦊
