
---

# 📝 Todo App (Server Actions Only)

A modern **full-stack Todo application** built with **Next.js App Router**, using **Server Actions as the only backend layer** — no REST or API routes.

The app focuses on **type safety, clean UI, and correct server/client separation**.

---

## 🚀 Features

* ✅ Create and delete todos using **Server Actions**
* 📌 Priority support (e.g. High)
* 📂 Filter todos by:

  * All
  * Active
  * Completed
* ⚡ Automatic UI updates via cache invalidation
* 🧠 Clear separation of:

  * Server logic (Server Actions)
  * Client UI state
* 🎨 Clean UI with Shadcn UI + Tailwind CSS
* 🔐 Runtime + compile-time validation with Zod

---

## 🛠 Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **UI Components**: Shadcn UI
* **Server Actions**: Next.js Server Actions (no API routes)
* **Server State**: TanStack Query
* **Client State**: Zustand
* **Validation**: Zod
* **Database**: MongoDB
* **ODM**: Mongoose

---

## 📸 Screenshot

![Todo App Screenshot](./public/screenshot.png)

---
---

## 🔄 Data Flow (Server Actions Only)

1. User interacts with UI (create / delete todo)
2. Client triggers a **Server Action**
3. Server Action:

   * Connects to MongoDB
   * Validates input using Zod
   * Updates database via Mongoose
4. TanStack Query mutation runs
5. `queryClient.invalidateQueries()` is called
6. Todos are automatically refetched
7. UI updates without manual state syncing 🎉

---

## 🧠 Why Server Actions (No API Routes)

* ❌ No REST endpoints
* ❌ No manual request handling
* ❌ No duplicated backend logic

✅ Type-safe server logic
✅ Less boilerplate
✅ Better App Router integration
✅ Cleaner mental model

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/anuj2731997/TodoApp.git
cd todoApp
```

---

### 2️⃣ Install dependencies

```bash
bun install
```

---

### 3️⃣ Environment Variables

Create `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

### 4️⃣ Run the development server

```bash
bun run dev
```

Open 👉 `http://localhost:3000`

---

## 🧪 Validation & Type Safety

* Zod handles runtime validation
* `z.infer` keeps TypeScript types in sync
* No duplicate interfaces or schemas

---

## 🧠 State Management Strategy

| Type         | Tool           | Responsibility                        |
| ------------ | -------------- | ------------------------------------- |
| Server State | TanStack Query | Data fetching, caching, revalidation  |
| Client State | Zustand        | Filters, UI state, local interactions |

---

## ✨ UI & Design

* Consistent theme tokens (`muted`, `muted-foreground`)
* Accessible components from Shadcn UI
* Responsive and minimal layout

---
## 👨‍💻 Author

Built with ❤️ by **Anuj**

> This project demonstrates **modern Next.js architecture using Server Actions instead of traditional APIs**.

---

