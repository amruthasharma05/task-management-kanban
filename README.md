# task-management-kanban
# 📋 Task Management Application

A full-stack **Kanban-style Task Management Application** designed for personal and team productivity.

The application allows users to create, organize, assign, prioritize, and track tasks using a simple three-stage Kanban workflow:

**To-Do → In Progress → Done**

The project also introduces a **Workload Balancing** feature that visually identifies team members with more than five active tasks.

---

## 🚀 Features

### 📌 Kanban Board

The application provides three workflow columns:

* **To-Do**
* **In Progress**
* **Done**

Tasks can be moved between columns using **drag-and-drop**.

When a task is moved, its status is updated both in the frontend state and in the backend database.

```text
┌──────────────┐
│    TO-DO     │
│      4       │
├──────────────┤
│ Task A       │
│ Task B       │
│ Task C       │
│ Task D       │
└──────────────┘

       ↓ Drag & Drop

┌──────────────┐
│ IN PROGRESS  │
│      3       │
├──────────────┤
│ Task E       │
│ Task F       │
│ Task G       │
└──────────────┘

       ↓ Drag & Drop

┌──────────────┐
│     DONE     │
│      5       │
├──────────────┤
│ Task H       │
│ Task I       │
└──────────────┘
```

---

## 📝 Task Management

Every task contains the following information:

| Field         | Description                          |
| ------------- | ------------------------------------ |
| Title         | Name of the task                     |
| Description   | Detailed task information            |
| Priority      | Low, Medium, or High                 |
| Due Date      | Task deadline                        |
| Status        | To-Do, In Progress, or Done          |
| Assigned User | Team member responsible for the task |
| Project       | Project to which the task belongs    |

### Priority Levels

* 🔴 **High**
* 🟡 **Medium**
* 🟢 **Low**

---

## 👥 Team Management

Users can be associated with projects and assigned individual tasks.

The team section displays:

* User avatar
* User name
* Number of active tasks
* Workload warning when necessary

Example:

```text
TEAM MEMBERS

🟢 Alex
   3 tasks in progress

🟢 Rahul
   5 tasks in progress

🔴 Priya
   7 tasks in progress
   ⚠ High workload

🟢 Arjun
   2 tasks in progress
```

---

# ⚖️ Workload Balancing

### Main Vibe Check Feature

The application includes a **Workload Balancing** mechanism to provide visibility into active team workloads.

For every team member, the application counts the number of tasks assigned to them whose status is:

```text
IN_PROGRESS
```

If the number exceeds **5**, the user's avatar receives a **pulsing red background/indicator**.

### Logic

```typescript
const inProgressTasks = tasks.filter(
  (task) =>
    task.assignedTo === user.id &&
    task.status === "IN_PROGRESS"
);

const isOverloaded = inProgressTasks.length > 5;
```

If:

```text
inProgressTasks.length > 5
```

then:

```text
Avatar → Red + Pulsing Animation
```

Otherwise:

```text
Avatar → Normal
```

### Workload Flow

```text
             TASK ASSIGNMENT
                    │
                    ▼
          ┌──────────────────┐
          │ Count user's     │
          │ In Progress      │
          │ tasks            │
          └────────┬─────────┘
                   │
                   ▼
             More than 5?
              /         \
            YES          NO
             │            │
             ▼            ▼
       🔴 Pulse Red    Normal Avatar
```

This feature provides a simple visual workload warning without changing the user's tasks automatically.

---

# 🎛️ User Controls

The frontend provides direct controls for:

### Create Task

Users can create tasks with:

```text
Title
Description
Priority
Due Date
Project
Assigned User
```

### Add Users

Project members can be added through the team management interface.

### Priority Filter

Users can filter tasks by:

```text
All
High
Medium
Low
```

The Kanban board updates to display only tasks matching the selected priority.

---

# 🔄 Task Lifecycle

A task follows this workflow:

```text
                 CREATE
                   │
                   ▼
              ┌─────────┐
              │  TO-DO  │
              └────┬────┘
                   │
              Drag & Drop
                   │
                   ▼
           ┌──────────────┐
           │ IN PROGRESS  │
           └──────┬───────┘
                  │
             Drag & Drop
                  │
                  ▼
             ┌─────────┐
             │  DONE   │
             └─────────┘
```

The task status is persisted in PostgreSQL after every status change.

---

# 🏗️ System Architecture

```text
                   FRONTEND
        ┌───────────────────────────┐
        │                           │
        │       React + TS          │
        │                           │
        │  ┌─────────────────────┐  │
        │  │    Kanban Board     │  │
        │  └─────────────────────┘  │
        │                           │
        │  Task Cards               │
        │  Team List                │
        │  Priority Filter          │
        │  Task Forms               │
        │                           │
        └─────────────┬─────────────┘
                      │
                 REST API
                      │
                      ▼
        ┌───────────────────────────┐
        │                           │
        │    Node.js + Express      │
        │                           │
        │     Controllers           │
        │     Routes                │
        │     Business Logic        │
        │                           │
        └─────────────┬─────────────┘
                      │
                  Prisma ORM
                      │
                      ▼
        ┌───────────────────────────┐
        │                           │
        │       PostgreSQL          │
        │                           │
        │  Users                    │
        │  Projects                 │
        │  Tasks                    │
        │  Project Memberships      │
        │                           │
        └───────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Vite
* `@dnd-kit` for drag-and-drop

## Backend

* Node.js
* Express.js
* TypeScript
* REST API

## Database

* PostgreSQL
* Prisma ORM

---

# 🗄️ Database Design

The application uses a relational PostgreSQL database.

### Entity Relationship

```text
┌──────────────┐
│     USER     │
├──────────────┤
│ id           │
│ name         │
│ email        │
│ avatar       │
└──────┬───────┘
       │
       │ assigned to
       ▼
┌──────────────┐
│     TASK     │
├──────────────┤
│ id           │
│ title        │
│ description  │
│ priority     │
│ status       │
│ dueDate      │
│ projectId    │
│ assignedTo   │
└──────┬───────┘
       │
       │ belongs to
       ▼
┌──────────────┐
│   PROJECT    │
├──────────────┤
│ id           │
│ name         │
│ description  │
└──────────────┘
```

### Relationships

```text
Project 1 ──────── N Task

User 1 ─────────── N Task

User N ─────────── N Project
```

The many-to-many relationship between users and projects can be represented using a project membership table.

---

# 🔌 REST API

The backend exposes a custom REST API for CRUD operations.

## Projects

```http
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## Tasks

```http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/status
```

## Users

```http
GET    /api/users
GET    /api/users/:id
POST   /api/projects/:id/users
DELETE /api/projects/:id/users/:userId
```

---

# 📡 Example API Request

### Create Task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Implement Authentication",
  "description": "Add user authentication to the application",
  "priority": "HIGH",
  "status": "TODO",
  "dueDate": "2026-09-25",
  "projectId": 1,
  "assignedTo": 2
}
```

### Update Task Status

```http
PATCH /api/tasks/12/status
Content-Type: application/json
```

```json
{
  "status": "IN_PROGRESS"
}
```

---

# 🧠 Frontend State Management

The frontend maintains task state and synchronizes it with the backend.

When a user drags a task:

```text
Drag Task
    │
    ▼
Determine Destination Column
    │
    ▼
Update Local State
    │
    ▼
PATCH /api/tasks/:id/status
    │
    ▼
Update PostgreSQL
```

This provides immediate UI feedback while persisting the change to the backend.

---

# 🧩 CRUD Operations

The application supports complete CRUD functionality.

### Create

Create new:

* Projects
* Tasks
* Project-user associations

### Read

Retrieve:

* Projects
* Tasks
* Users
* Project tasks
* User workload

### Update

Update:

* Task details
* Priority
* Due date
* Assigned user
* Task status

### Delete

Delete:

* Tasks
* Projects
* User-project associations

---

# 📂 Project Structure

```text
task-management-kanban/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── KanbanBoard.tsx
│       │   ├── KanbanColumn.tsx
│       │   ├── TaskCard.tsx
│       │   ├── TaskForm.tsx
│       │   ├── TaskModal.tsx
│       │   ├── TeamList.tsx
│       │   ├── AddUserModal.tsx
│       │   ├── PriorityFilter.tsx
│       │   └── Header.tsx
│       │
│       ├── hooks/
│       │   └── useTasks.ts
│       │
│       ├── services/
│       │   └── api.ts
│       │
│       ├── types/
│       │   └── index.ts
│       │
│       ├── utils/
│       │   └── workload.ts
│       │
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── controllers/
│       │   ├── taskController.ts
│       │   ├── projectController.ts
│       │   └── userController.ts
│       │
│       ├── routes/
│       │   ├── taskRoutes.ts
│       │   ├── projectRoutes.ts
│       │   └── userRoutes.ts
│       │
│       ├── middleware/
│       │   └── errorHandler.ts
│       │
│       ├── prisma/
│       │   └── schema.prisma
│       │
│       └── server.ts
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the server directory.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_management"
PORT=5000
CLIENT_URL="http://localhost:5173"
```

Do **not** commit the actual `.env` file.

Use `.env.example` instead:

```env
DATABASE_URL=
PORT=5000
CLIENT_URL=
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/<your-username>/task-management-kanban.git

cd task-management-kanban
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 4. Configure PostgreSQL

Create a PostgreSQL database:

```text
task_management
```

Then configure:

```env
DATABASE_URL="your-postgresql-connection-string"
```

## 5. Run Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

## 6. Start backend

```bash
npm run dev
```

## 7. Start frontend

Open another terminal:

```bash
cd client
npm run dev
```

---

# 🐳 Running with Docker

The project can also be configured to run PostgreSQL using Docker.

```bash
docker compose up -d
```

Then run the backend and frontend normally.

---

# 🧪 Testing

The application should be tested for:

* Task creation
* Task editing
* Task deletion
* Drag-and-drop status changes
* Priority filtering
* User assignment
* Project membership
* Column task counters
* Workload calculation
* Overload avatar animation
* API error handling
* Database persistence

---

# 🔐 Error Handling

The backend validates incoming requests before modifying database records.

Examples of validation include:

* Required task title
* Valid priority
* Valid task status
* Valid project ID
* Valid assigned user
* Existing project membership

API errors should return appropriate HTTP status codes.

Example:

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

# 🔮 Future Enhancements

Possible future improvements include:

* JWT authentication
* Role-based access control
* Real-time updates using WebSockets
* Notifications for approaching deadlines
* Calendar integration
* Task activity history
* Search functionality
* Team workload dashboard
* Analytics and productivity reports
* Dark mode
* Mobile-responsive Kanban board

---

# 🎯 Project Objective

The objective of this project is to build a practical task management system that combines:

**Kanban organization + Team collaboration + Workload visibility**

Instead of simply tracking task status, the application provides users with visibility into active workloads through the **Workload Balancing** feature.

---

# 👩‍💻 Author

**Amrutha Sharma**

Electronics & Instrumentation Engineering

---

## ⭐ Key Highlights

```text
✓ Full-stack application
✓ React + TypeScript frontend
✓ Node.js + Express backend
✓ PostgreSQL relational database
✓ Prisma ORM
✓ REST CRUD API
✓ Drag-and-drop Kanban board
✓ Task priority management
✓ Due-date tracking
✓ User/project associations
✓ Priority filtering
✓ Dynamic column counters
✓ Workload Balancing
✓ Overload detection
✓ Pulsing red avatar warning
```



