#  PersonalAI Agent

> **Your AI. Your Rules. Run anywhere.**  
> A personal, autonomous AI agent built with ElizaOS v2 and deployed on Nosana’s decentralized GPU network. Perform research, manage social media, automate tasks, monitor DeFi portfolios, and build custom tools — all under your control.

![ElizaOS](https://img.shields.io/badge/ElizaOS-v2-7C3AED?style=for-the-badge&logo=elizaos&logoColor=white)
![Nosana](https://img.shields.io/badge/Nosana-Decentralized-00C6A0?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Container-blue?style=for-the-badge&logo=docker&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=for-the-badge)

---

##  Table of Contents

- [The Problem](#-the-problem)  
- [The Solution](#-the-solution)  
- [How It Works](#-how-it-works)  
- [Architecture](#-architecture)  
- [Tech Stack](#-tech-stack)  
- [Project Structure](#-project-structure)  
- [Getting Started](#-getting-started)  
- [Deployment on Nosana](#-deployment-on-nosana)  
- [Agent Tasks](#-agent-tasks)  
- [Testing](#-testing)  
- [Roadmap](#-roadmap)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

##  The Problem

Most AI assistants today are:

- Cloud-bound and controlled by Big Tech  
- Limited to specific platforms or APIs  
- Non-autonomous, requiring manual input constantly  
- Difficult to customize for personal workflows  

This prevents users from reclaiming **control over their personal AI** and building tools specific to their needs.

---

##  The Solution

**PersonalAI Agent** is a **fully autonomous, decentralized AI agent**:

- Runs locally or on **Nosana GPU containers**  
- Built on **ElizaOS v2**, enabling modular tasks and plugins  
- Integrates with **Qwen3.5-27B-AWQ-4bit** for high-quality text generation and summarization  
- Performs **autonomous workflows** like social media management, research, DeFi monitoring, and personal productivity tasks  
- Fully configurable and open-source — your AI, your rules  

---

##  How It Works
USER PERSONALAI AGENT Nosana / LLM
│ │ │
│ Configure tasks & API keys │ │
│──────────────────────────────► │ │
│ │ Load tasks, plugins, configs │
│ │────────────────────────────► │
│ Trigger research / summarize │ │
│──────────────────────────────► │ │
│ │ Send LLM inference request │
│ │◄────────────────────────────│
│◄─ Receive summary / analysis ─ │ │
│ Dashboard updates & alerts │ │
│ │ │
│ Automate social media / DeFi │ │
│──────────────────────────────► │ │
│◄─ Status & logs updates ───────│ │


---

##  Architecture


┌─────────────────────────────┐
│ FRONTEND DASHBOARD │
│ Web or CLI for interaction │
│ Shows logs, summaries, UX │
└─────────────┬───────────────┘
│
┌─────────────▼───────────────┐
│ AGENT LOGIC │
│ ElizaOS v2 tasks, plugins │
│ Workflow management │
└─────────────┬───────────────┘
│
┌─────────────▼───────────────┐
│ LLM INTEGRATION │
│ Qwen3.5-27B via API │
│ Inference, summarization │
└─────────────┬───────────────┘
│
┌─────────────▼───────────────┐
│ NOSANA GPU / SOLANA │
│ Containerized deployment │
│ Decentralized compute │
└─────────────────────────────┘


---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Agent Framework | ElizaOS v2 |
| LLM | Qwen3.5-27B-AWQ-4bit |
| Compute | Nosana (Solana decentralized GPU) |
| Frontend | React / Next.js or CLI |
| Backend | Python 3.10+, Flask/FastAPI (optional) |
| Containerization | Docker |
| Deployment | Nosana GPU containers |
| Persistence | SQLite / PostgreSQL / Solana on-chain (optional) |
| Task Automation | ElizaOS plugins, Python scripts |
| Testing | Pytest + ElizaOS task simulations |

---

##  Project Structure


personalai-agent/
├── agent/
│ ├── tasks/
│ │ ├── research_task.py
│ │ ├── social_media_task.py
│ │ ├── defi_monitor.py
│ │ └── custom_tools.py
│ ├── plugins/
│ └── agent_config.yaml
├── frontend/
│ ├── app/
│ ├── components/
│ ├── lib/
│ └── styles/
├── backend/
│ ├── api/
│ └── database/
├── docker/
│ ├── Dockerfile
│ └── docker-compose.yml
├── tests/
│ ├── test_tasks.py
│ └── test_integration.py
├── .env.example
└── README.md


---

##  Getting Started

### Prerequisites

```bash
# Python
python3 --version  # 3.10+

# Node.js
node --version      # 18+

# Docker
docker --version
Clone the repo
git clone https://github.com/YOUR_USERNAME/personalai-agent.git
cd personalai-agent
Environment Variables
cp .env.example .env

Example .env:

NOSANA_API_KEY=your_nosana_key
QWEN_API_KEY=your_qwen_key
AGENT_NAME=PersonalAI
DATABASE_URL=sqlite:///agent.db
Install dependencies
# Backend / agent
pip install -r requirements.txt

# Frontend (if React/Next.js)
npm install
npm run dev
 Deployment on Nosana
# Build Docker image
docker build -t personalai-agent:latest .

# Push container and deploy on Nosana
nosana deploy --image personalai-agent:latest --gpu 1
 Agent Tasks
Research Task: Scrapes and summarizes articles, generates actionable insights
Social Media Task: Automates posting, replies, analytics for Twitter, Discord, Telegram
DeFi Monitor: Tracks portfolios, on-chain balances, yield opportunities
Custom Tools: User-defined Python scripts or ElizaOS plugins
 Testing
pytest tests/
Unit tests for each agent task
Integration tests for LLM calls and workflow orchestration
 Roadmap
 Core ElizaOS agent logic
 Qwen3.5 integration for inference
 Dashboard frontend (web / CLI)
 Dockerization and local testing
 Nosana deployment and monitoring
 Additional agent plugins (productivity, personal finance, research)
 Improved UX / interactive dashboards
 End-to-end testing on Nosana
 Contributing
git checkout -b feat/your-feature
git commit -m "feat(agent): add new task plugin"
git push origin feat/your-feature

Follow Conventional Commits, comment your code, and maintain modularity.

 License

MIT License — see LICENSE

 Acknowledgements
ElizaOS
 — AI agent framework
Nosana
 — decentralized GPU compute network
Qwen3.5
 — hosted large language model
Inspired by OpenClaw
 movement for personal AI autonomy
<div align="center"> **Your AI. Your Rules. Run anywhere.** ⭐ Star this repo if PersonalAI Agent matters to you </div> ```
