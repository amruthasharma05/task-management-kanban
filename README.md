# Task Management Kanban

Production-style full-stack Kanban task management app with React, TypeScript, Express, Prisma, and PostgreSQL.

## Features
- Exactly three status columns: To-Do, In Progress, Done
- @dnd-kit drag and drop with optimistic updates and rollback
- Create, edit, assign, prioritize, schedule, and delete tasks
- Projects, project membership, users, and workload balancing
- Priority filtering and live column counters
- Centralized API errors, validation, loading/empty states

## Tech stack and architecture
The Vite React client lives in `client`; the Express API lives in `server`; Prisma schema and migrations live in `server/prisma`. The frontend uses `TaskProvider` as its single task source of truth and `client/src/services/api.ts` for all HTTP calls.

## Database schema
`Project` has many `Task` records and many `ProjectMember` records. `User` has many assigned tasks and many memberships. Tasks have indexed `status`, `projectId`, and `assignedTo` fields. Project deletion cascades members and tasks; user deletion sets task assignment to null.

## API
Projects: `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`  
Tasks: `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/:id`, `PATCH /api/tasks/:id/status`  
Users: `GET /api/users`, `GET /api/users/:id`  
Members: `POST /api/projects/:id/users`, `DELETE /api/projects/:id/users/:userId`

## Installation
Requirements: Node 18+, PostgreSQL 14+.

```bash
cp .env.example .env
npm install
npm run install:all
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

The client runs at http://localhost:5173 and the API at http://localhost:5000. Set `DATABASE_URL`, `PORT`, and `CLIENT_URL` in `.env`; never commit `.env`.

For a production build:
```bash
npm run build
npm run start
```

## Workload balancing
For each project member, `getUserInProgressTaskCount` counts assigned tasks whose status is `IN_PROGRESS`. `isUserOverloaded` returns true above five. Team avatars pulse red and show an overload warning, but tasks are never automatically changed.

## Project structure
```text
client/src/{components,hooks,services,types,utils}
server/src/{controllers,middleware,prisma,routes}
server/prisma/schema.prisma
```

## Future improvements
Authentication and authorization, real-time updates via WebSockets, pagination, audit history, notifications, and automated integration tests.
