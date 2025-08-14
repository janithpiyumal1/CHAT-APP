```markdown
# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for instant messaging.  
Deployed on **Vercel**, this application allows users to send and receive messages instantly without page reloads.

---

## 🚀 Features
- **Real-Time Messaging** – Instant bi-directional communication with Socket.IO
- **MERN Stack** – MongoDB, Express.js, React.js, Node.js
- **User Authentication** – Secure login and registration
- **Responsive UI** – Optimized for desktop and mobile devices
- **Persistent Storage** – Messages stored in MongoDB
- **Free Deployment** – Hosted on Vercel for easy access

---

## 🛠 Tech Stack
**Frontend:** React.js, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Real-Time Engine:** Socket.IO  
**Deployment:** Vercel

---

## 📂 Project Structure
```

/client       → React frontend
/server       → Node.js + Express backend
/server/db    → MongoDB connection & models
/server/socket → Socket.IO setup

````

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
````

### 2️⃣ Install dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

### 3️⃣ Set environment variables

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the application

**Backend:**

```bash
cd server
npm run dev
```

**Frontend:**

```bash
cd client
npm start
```

---

## 📡 Deployment

* **Frontend:** Deployed on [Vercel](https://vercel.com/)
* **Backend:** Can be deployed on Render, Railway, or Heroku
* **Database:** MongoDB Atlas


### 👨‍💻 Author

[Janith Piyumal](https://github.com/janithpiyumal1)

```
```
