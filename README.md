# 🏨 StayCation

A modern hotel booking platform built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Browse rooms, discover special deals, manage bookings, and enjoy a seamless booking experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Architecture](#️-architecture)
- [Performance](#-performance)
- [Accessibility](#-accessibility)
- [Design System](#-design-system)
- [Contributing](#-contributing)
- [Contact](#-contact)
- [License](#-license)

---

## ✨ Features

### 🌐 Public
- **Home Page** — Hero, featured hotels, exclusive deals, guest reviews
- **Explore Rooms** — Filter by dates, browse paginated room list
- **Room Details** — Gallery, amenities, booking card, reviews
- **Special Offers** — Browse promoted rooms with discounts

### 👤 User
- **Authentication** — Secure JWT-based login and registration
- **Bookings** — Create, view, and manage reservations
- **Favorites** — Save and manage favorite rooms
- **Profile** — Manage personal info and account preferences
- **Payment** — Secure checkout with Stripe integration

### 🛠️ Admin
- **Dashboard** — Real-time analytics with charts
- **Rooms Management** — Create, edit, delete rooms with images
- **Bookings Management** — Track and manage all reservations
- **Facilities Management** — Manage room amenities
- **Ads Management** — Create and promote special deals
- **Users Management** — Browse users, roles, and verification status

---

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn UI + Radix UI |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Animations** | Framer Motion |
| **Notifications** | Sonner |
| **Charts** | Chart.js / Recharts |
| **Auth** | JWT + HTTP-only Cookies |
| **API** | REST API with custom `apiFetch` wrapper |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+
- **npm** / **pnpm** / **yarn** / **bun**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/staycation.git

# Navigate to the project
cd staycation

# Install dependencies
npm install