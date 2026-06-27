# Smart Resume Builder

<p align="center">
  <strong>Create professional, ATS-friendly resumes with real-time preview, drag & drop customization, and instant PDF export.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>

<p align="center">
  <a href="https://smatcv-resumebuilder12.vercel.app/">
    <img src="https://img.shields.io/badge/%20Live%20Demo-Open-success?style=for-the-badge" />
  </a>

  <a href="https://github.com/your-username/smart-resume-builder">
    <img src="https://img.shields.io/badge/%20Star%20Repository-yellow?style=for-the-badge" />
  </a>
</p>

---

##  Overview

Smart Resume Builder is a modern web application designed to simplify resume creation through a clean, customizable, and real-time editing experience.

The platform allows users to create professional resumes with dynamic sections, live preview, drag & drop customization, secure authentication, and one-click PDF export — all within a seamless interface.

---

##  Why This Project Stands Out

- Real-time resume preview while editing
- Fully customizable layout and theme system
- Drag & drop section reordering
- Secure Sign Up / Sign In authentication
- Dashboard to manage multiple resumes
- Instant PDF export functionality
- Cloud-deployed backend using Google Cloud Run

---

#  Architecture

<p align="center">
  <img src="README_assets/architecture.png" alt="Architecture Diagram" width="900" />
</p>

### Runtime Architecture

- Frontend Layer: React.js + Tailwind CSS
- State Management: Context API
- Backend Layer: Flask REST API
- Database Layer: SQLite
- Cloud Deployment: Google Cloud Run + Vercel

---

#  Features

##  Smart Resume Builder
Create structured and professional resumes with guided forms and dynamic sections.

##  Real-Time Preview
Resume updates instantly while editing, providing a seamless WYSIWYG experience.

##  Resume Customization
Users can personalize resumes using:
- Theme colors
- Flexible layouts
- Drag & drop section ordering

##  Authentication System
Secure Sign Up and Sign In flow for personalized dashboard access.

##  Resume Management
Users can save, edit, and manage multiple resumes from a centralized dashboard.

##  PDF Export
Generate and download professional ATS-friendly resumes instantly.

---

#  Website Preview

<table>
  <tr>
    <td align="center" width="50%">
      <strong>Landing Page</strong><br/>
      <img src="README_assets/landing.png" width="500"/>
    </td>

    <td align="center" width="50%">
      <strong>Authentication</strong><br/>
      <img src="README_assets/login.png" width="500"/>
    </td>
  </tr>

  <tr>
    <td align="center" width="50%">
      <strong>Dashboard</strong><br/>
      <img src="README_assets/dashboard.png" width="500"/>
    </td>

    <td align="center" width="50%">
      <strong>Resume Builder</strong><br/>
      <img src="README_assets/builder.png" width="500"/>
    </td>
  </tr>

  <tr>
    <td align="center" width="50%">
      <strong>Drag & Drop Feature</strong><br/>
      <img src="README_assets/dragdrop.png" width="500"/>
    </td>

    <td align="center" width="50%">
      <strong>PDF Export</strong><br/>
      <img src="README_assets/pdf.png" width="500"/>
    </td>
  </tr>
</table>

---

#  Demo Video

<p align="center">
  <a href="hhttps://www.youtube.com/watch?v=QAbAO_rNSDg">
    <img src="https://img.youtube.com/vi/QAbAO_rNSDg/maxresdefault.jpg" width="900"/>
  </a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=QAbAO_rNSDg">
    <img src="https://img.shields.io/badge/%E2%96%B6%20Play%20Demo%20On%20YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Play Demo on YouTube" />
  </a>
</p>

---

#  Project Structure

```text
Smart-Resume-Builder/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── assets/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── README_assets/
│
└── README.md
```

---

#  Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Flask, Gunicorn |
| Database | SQLite |
| State Management | Context API |
| Drag & Drop | dnd-kit |
| Deployment | Google Cloud Run, Vercel |

---

#  Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/smart-resume-builder.git

cd smart-resume-builder
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```bash
http://localhost:5000
```

---

#  Google Cloud Run Deployment

## Enable Services

```bash
gcloud services enable run.googleapis.com

gcloud services enable cloudbuild.googleapis.com

gcloud services enable artifactregistry.googleapis.com
```

---

>  Deployment is currently in progress.  
> The application is fully functional in the local development environment.

---

#  Project Impact

- Simplifies professional resume creation
- Eliminates manual formatting complexity
- Provides a responsive and user-friendly experience
- Helps users create ATS-friendly resumes efficiently

---

#  Future Improvements

- AI-generated resume suggestions
- Multiple premium templates
- Resume score analyzer
- LinkedIn integration
- Cloud database support

---

#  Author

## Payal Sulaniya

<p align="center">
  <a href="https://github.com/Payal12-max">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?style=for-the-badge&logo=github" />
  </a>

  <a href="https://www.linkedin.com/in/payal-sulaniya-a8a566328?">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin" />
  </a>
</p>

---

#  License

This project is developed for educational, portfolio, and hackathon purposes.

---

<p align="center">
  ⭐ If you like this project, consider giving it a star!
</p>
