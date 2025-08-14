
# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for instant messaging. Deployed on **Vercel**, this application allows users to send and receive messages instantly without requiring a page reload.

-----

## 🚀 Features

  - **Real-Time Messaging**: Instant bi-directional communication with Socket.IO.
  - **MERN Stack**: MongoDB, Express.js, React.js, Node.js.
  - **User Authentication**: Secure login and registration with JWT.
  - **Responsive UI**: Optimized for both desktop and mobile devices.
  - **Persistent Storage**: Messages are stored in a MongoDB database.
  - **Free Deployment**: Hosted on Vercel for easy access.

-----

## 🛠️ Tech Stack

  - **Frontend**: React.js, CSS
  - **Backend**: Node.js, Express.js
  - **Database**: MongoDB
  - **Real-Time Engine**: Socket.IO
  - **Deployment**: Vercel

-----

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app
```

### 2️⃣ Install Dependencies

In separate terminals, run the following commands from the project's root directory:

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### 3️⃣ Set Environment Variables

Create a `.env` file inside the `/server` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4️⃣ Start the Application

You will need two separate terminals to run the backend and frontend servers concurrently.

**Start the Backend Server (from `/server` directory):**

```bash
npm run dev
```

**Start the Frontend Development Server (from `/client` directory):**

```bash
npm start
```

-----

## 📡 Deployment

  - **Frontend**: Deployed on [Vercel](https://vercel.com/)
  - **Backend**: Can be deployed on services like Render, Railway, or Heroku
  - **Database**: MongoDB Atlas is recommended for database hosting

-----

### 👨‍💻 Author

  - [Janith Piyumal](https://github.com/janithpiyumal1)
