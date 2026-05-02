# 🚀 CI/CD Deployment Assignment (Flask + Express + Jenkins)

---

# 📌 Overview

This project demonstrates:

* Deployment of **Flask (backend)** and **Express (frontend)** on a single EC2 instance
* Setup of **CI/CD pipeline using Jenkins**
* Automated deployment using **GitHub Webhooks + PM2**

---

# 🧩 Architecture

```
User → Browser → EC2 Instance
                     ├── Express App (Port 3000)
                     └── Flask API (Port 5000)

GitHub → Webhook → Jenkins → PM2 → Restart Apps
```

---

# 🖥️ Part 1 — Deployment on EC2

---

## 🔧 1. EC2 Setup

* Instance: t2/t3.micro (Free Tier)
* OS: Ubuntu
* Security Group Ports:

  * 22 (SSH)
  * 3000 (Express)
  * 5000 (Flask)
  * 8080 (Jenkins)

---

## ⚙️ 2. Install Dependencies

```bash
sudo apt update
sudo apt install -y python3-pip python3-venv git

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2
sudo npm install -g pm2
```

---

## 📥 3. Clone Repositories

```bash
git clone https://github.com/<your-username>/flask9.git
git clone https://github.com/<your-username>/express9.git
```

---

## 🐍 4. Setup Flask

```bash
cd flask9
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run Flask:

```bash
pm2 start "venv/bin/python app.py" --name flask9
```

---

## 🌐 5. Setup Express

```bash
cd ~/express9
npm install
```

Run Express:

```bash
pm2 start index.js --name express9
```

---

## 🔁 6. Save PM2

```bash
pm2 save
```

---

## 🌐 7. Access Applications

* Express → `http://<EC2-IP>:3000`
* Flask → `http://<EC2-IP>:5000`

---

# ⚙️ Part 2 — Jenkins CI/CD Setup

---

## ☕ 1. Install Java 21

```bash
sudo apt install -y openjdk-21-jdk
```

---

## 🚀 2. Run Jenkins

```bash
wget https://get.jenkins.io/war-stable/latest/jenkins.war
java -Xms256m -Xmx512m -jar jenkins.war --httpPort=8080
```

---

## 🌐 3. Access Jenkins

```
http://<EC2-IP>:8080
```

Unlock:

```bash
cat ~/.jenkins/secrets/initialAdminPassword
```

---

## 🔌 4. Install Plugins

Install Suggested Plugins OR ensure:

* Pipeline
* Git
* GitHub
* Credentials
* NodeJS

---

## ⚠️ 5. Configure Executors

Go to:

```
Manage Jenkins → Nodes → Built-in Node
```

Set:

```
Executors = 1 or 2
```

---

# 🔧 Jenkins Pipelines

---

## 🐍 Flask Pipeline

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/flask9.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd /home/ubuntu/flask9
                python3 -m venv venv
                . venv/bin/activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Restart Flask') {
            steps {
                sh '''
                pm2 restart flask9 || pm2 start "/home/ubuntu/flask9/venv/bin/python app.py" --name flask9 --cwd /home/ubuntu/flask9
                pm2 save
                '''
            }
        }
    }
}
```

---

## 🌐 Express Pipeline

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/express9.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd /home/ubuntu/express9
                npm install
                '''
            }
        }

        stage('Restart Express') {
            steps {
                sh '''
                pm2 restart express9 || pm2 start /home/ubuntu/express9/index.js --name express9 --cwd /home/ubuntu/express9
                pm2 save
                '''
            }
        }
    }
}
```

---

# 🔗 GitHub Webhook Setup

Go to:

```
GitHub → Repo → Settings → Webhooks → Add Webhook
```

### Configure:

```
Payload URL:
http://<EC2-IP>:8080/github-webhook/

Content type:
application/json

Events:
Just the push event
```

---

# 🔁 CI/CD Flow

1. Developer pushes code
2. GitHub triggers webhook
3. Jenkins pipeline starts
4. Code is pulled
5. Dependencies installed
6. PM2 restarts application
7. Updated app is live

---

# 📸 Screenshots (Submission)

Include:

* Jenkins dashboard
* Pipeline success logs
* Running application (browser)
* PM2 list output
* GitHub webhook success (200 OK)

---

# 🎯 Features

* Automated deployment
* Zero manual intervention
* Process management using PM2
* Separate pipelines for backend & frontend

---

# 🏁 Conclusion

Successfully implemented:

* EC2-based deployment
* Flask + Express integration
* Jenkins CI/CD pipeline
* GitHub webhook automation

---

# 🚀 Author

Kuldeep
Software Engineer
