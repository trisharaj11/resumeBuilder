# 🚀 Resume Builder

A full-stack AI-powered Resume Builder that allows users to create, customize, and enhance resumes with ease.

🔗 **Live Demo:** https://resume-builder-c487.vercel.app/
🔗 **Backend Live:** https://resumebuilder-backend-hfgs.onrender.com

---

## 📌 Features

* ✨ Create and edit professional resumes
* 🤖 AI-powered job description enhancement
* 🎨 Multiple resume templates
* 📅 Add experience, education, skills, and projects
* 🔐 User authentication (login/signup)
* 🌐 Public resume preview via shareable link
* ⚡ Fast and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### AI Integration

* Gemini API (for enhancing job descriptions)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
resumeBuilder/
│
├── client/          # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/          # Backend (Node + Express)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/trisharaj11/resumeBuilder.git
cd resumeBuilder
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
```

Run backend:

```
npm start
```

---

### 3️⃣ Setup Frontend

```
cd client
npm install
```

Create `.env` file:

```
VITE_BASE_URL=http://localhost:3000
```

Run frontend:

```
npm run dev
```

---

## 🌐 Deployment

* Backend deployed on **Render**
* Frontend deployed on **Vercel**

Make sure to set environment variables properly in both platforms.

---

## 🧠 How AI Feature Works

* User enters job description
* Request sent to backend
* AI enhances the content
* Updated description is returned and displayed

---

## 📸 Screenshots 
<img width="1886" height="1026" alt="image" src="https://github.com/user-attachments/assets/8ba4ac7c-a6ba-438a-b273-9532b6238d57" />
<img width="1893" height="1082" alt="image" src="https://github.com/user-attachments/assets/87b7bb0c-a9f4-47b1-9b3b-eab59166aa29" />
<img width="1894" height="1038" alt="image" src="https://github.com/user-attachments/assets/839b8397-8687-4142-8fc4-1a34ecc0488e" />



---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

