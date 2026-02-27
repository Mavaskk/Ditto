# Ditto: AI Coding Instructions

Ditto is a Next.js group travel planning app using AI to resolve scheduling/budget conflicts. This guide helps AI agents contribute effectively.

## Core Architecture

**Tech Stack:**
- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS v4, Emotion (MUI components)
- Backend: Supabase (PostgreSQL + Auth)
- Forms: React Hook Form
- UI Notifications: React Hot Toast

**Data Flow:**
1. Client components ("use client") handle UI/forms with React Hook Form
2. Server actions ("use server" in [actions.js](src/app/actions/actions.js)) execute database operations
3. Supabase clients created separately: `createClient()` (browser) vs `createSupabaseClient()` (server)
4. Auth managed via Supabase - session stored in cookies, handled by SSR middleware

**Database Tables:** `users_data`, `travels` (see Supabase console for schema)

## Key Patterns

### Server Actions (src/app/actions/actions.js)
Server actions handle all DB operations. Pattern:
```javascript
export async function actionName(data) {
  const supabase = await createSupabaseClient();
  const {data: result, error} = await supabase
    .from("table_name")
    .operation()
    .select("field_name")
    .single(); // For single records
  if (error) return {errorMessage: error};
  return {errorMessage: null, ...result};
}
```
**Key:** Always return `{errorMessage: null}` on success for consistent client-side handling.

### Form Components
All forms use React Hook Form with custom Input component:
```jsx
const {register, handleSubmit} = useForm();
<Input 
  type="text"
  name="field_name"
  register={register}
  label="Label"
  placeholder="..."
  required={true}
/>
```
Pattern: Client component → `handleSubmit(onSubmit)` → calls server action → handles response + router redirect.

### Styling
**Colors (from Button variants):**
- Primary green: `#375D06` (text) on `#ECFDB9` (background)
- Hover: `#284404` → `#CCDD9A`
- Gradients: lime green `#76CB08` (top-right effect in layout)

**Component Styles:** Custom inline classes in components, no separate CSS modules. Base button styles in [Button.jsx](src/app/components/Button/Button.jsx) are reusable.

## User Flows

**Auth Flow:**
1. Landing → Signup/Login form (AuthCard)
2. Signup: `signUp()` → `addUsername()` → redirect to `/dashboard/createTravel` (if from landing)
3. Login: `logIn()` → redirect based on `action` URL param

**Travel Creation Flow:**
1. CreateTravelCard → collects name + traveler count
2. `createTravel()` inserts record, returns UUID
3. Redirect to `/dashboard/createTravel/confirm/[uuid]`

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint (fix: eslint --fix)
```

## File Organization

- **[src/app/actions/](src/app/actions/)** - Server actions (all DB operations)
- **[src/app/auth/](src/app/auth/)** - Supabase client factories
- **[src/app/components/](src/app/components/)** - Reusable UI (Button, Input, Card, AuthCard, etc.)
- **[src/app/(routes)/](src/app/)** - Page components organized by route (signup, login, dashboard, etc.)

## Common Tasks

**Adding a new form page:**
1. Create page.jsx in route folder
2. Create client component with React Hook Form + Input fields
3. Call server action on submit
4. Use `useRouter()` for redirects; `router.refresh()` to reload server components

**Adding a database operation:**
1. Add function to [actions.js](src/app/actions/actions.js) with "use server"
2. Call `await createSupabaseClient()` and use standard Supabase query syntax
3. Return `{errorMessage: null, ...payload}` or `{errorMessage: error}`

**Styling new components:**
- Use Tailwind classes directly in JSX (no CSS files)
- Reference Button component for variant pattern: `variants` object maps variant names to Tailwind class combinations
- Green theme colors: `#375D06`, `#ECFDB9`, `#76CB08`

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Public Supabase key
- `SERVICE_ROLE_KEY` - Admin key (server-only operations)
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` - Push notifications (future)

## Critical Notes

- **Never hardcode UUIDs or user IDs** - Always retrieve from Supabase auth context or request
- **Always use server actions for DB writes** - Never expose DB directly to client
- **Router usage:** Use `next/navigation` not `next/router` (App Router requirement)
- **Session management:** Cookies handled automatically by Supabase SSR; refresh page/session as needed after auth changes
- **Error handling:** Functions return error codes (e.g., "user_already_exists") - map to user-friendly messages in components
