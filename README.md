# **To-Do App with Next.js & Supabase**  


## **Features**  
✅ Add, edit, and delete tasks  
📅 Set due dates and priority levels  
🔔 Real-time updates with Supabase  
🎨 Beautiful UI with **shadcn/ui** and Tailwind CSS  

---

## **Prerequisites**  
- Node.js (v18 or later)  
- npm or yarn  
- Supabase account (free)  

---

## **Quick Start**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### **2. Set Up Supabase**  
1. Create a new project at [Supabase](https://supabase.com/).  
2. Create a `todos` table with:  
   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     task TEXT NOT NULL,
     due_date DATE,
     priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
     is_complete BOOLEAN DEFAULT FALSE,
     user_id UUID REFERENCES auth.users
   );
   ```
3. Enable Row-Level Security (RLS) for security.  

### **3. Set Up Environment Variables**  
Create a `.env.local` file in the root directory:  
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### **4. Install Dependencies**  
```bash
npm install
# or
yarn install
```

### **5. Run the App Locally**  
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## **Project Structure**  
```
todo-app/
├── components/       # Reusable UI components (shadcn/ui)
├── lib/              # Supabase client setup
├── pages/            # Next.js pages & API routes
├── styles/           # Global CSS
├── .env.local        # Environment variables
├── package.json      # Dependencies
└── README.md         # You're here!
```

---

## **Available Scripts**  
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds for production |
| `npm start` | Runs the production build |
| `npm lint` | Checks for code errors |



## Demo

![todo-demo](https://github.com/user-attachments/assets/e01284c0-5b21-4cf6-a997-1525ef4997d0)
