# Ria Currency Exchange Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

A modern, responsive currency exchange application built for the **Ria Software Engineer Internship** coding challenge. The application adheres to Ria's brand identity and focuses on code quality, user experience, and performance.

## 🚀 Live Demo
**[https://ria-coding-challenge.vercel.app/](https://ria-coding-challenge.vercel.app/)**

## ✨ Features

### Core Functionality
* **Real-time Converter:** Instant currency conversion using the Frankfurter API.
* **Exchange Rates Dashboard:** A comprehensive table displaying live rates for major currencies against a customizable base.
* **Smart Search:** Real-time filtering in the dashboard allows users to find currencies by code (e.g., "MXN") or name (e.g., "Peso").
* **Ria Branding:** Custom UI designed with Ria's corporate identity (Orange/White theme) and professional assets.

### 🌟 Innovation Feature: Interactive Historical Trends
I implemented a **Dynamic Historical Chart** with adjustable time ranges.

* **The Problem:** Users sending money internationally need to know if the current rate is favorable compared to recent trends. A static number doesn't tell the full story.
* **The Solution:** An interactive area chart that allows users to analyze trends over **1 Month, 3 Months, 6 Months, or 1 Year**. This empowers users to make data-driven decisions on when to transfer funds.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Visualization:** Recharts
* **Data Source:** Frankfurter API (ECB Data)
* **Assets:** FlagCDN (SVG country flags)

## 📦 Local Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/K4pocha/ria-currency-dashboard.git
    cd ria-currency-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚠️ Assumptions & Trade-offs

* **API Limitation (CLP):** The challenge required using the **Frankfurter API**, which sources data from the European Central Bank. As a result, some Latin American currencies like the **Chilean Peso (CLP)** are not available in the dataset.
    * *Decision:* I strictly adhered to the technical requirements rather than switching to a non-specified API. In a production environment, I would integrate a paid provider (like Xe or OXR) to support global currencies including CLP.
* **Client-Side Fetching:** Data is fetched client-side for simplicity and interactivity in this demo. For a high-traffic production app, I would implement Server-Side Rendering (SSR) or React Query caching strategies to optimize API calls.

## 🤖 AI Usage Declaration

In transparency and accordance with the challenge guidelines, I utilized AI tools as a **Pair Programmer** to enhance productivity while maintaining full ownership of the logic and implementation.

**Tools used:**
* **Gemini:** Used for architectural decisions and troubleshooting CSS configurations (Tailwind).
* **GitHub Copilot:** Used for code autocompletion, generating boilerplate TypeScript interfaces, and speeding up syntax writing.

**How I used them:**
* **Scaffolding:** Setting up the initial Next.js + TypeScript structure.
* **Refinement:** Discussing UI/UX best practices.
* **Verification:** All AI-generated suggestions were manually reviewed, tested, and adapted to ensure they met the project's specific requirements and coding standards.

---

**Developed by Nicolás Oñate**