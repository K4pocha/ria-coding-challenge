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

## 🔮 Future Improvements

If I had more time, I would focus on bridging the gap between this technical demo and a production-ready product:

1.  **Global Currency Coverage (API Migration):**
    Currently, the app relies on the Frankfurter API (ECB data), which lacks support for many Latin American and Asian currencies (e.g., CLP, ARS, COP). I would migrate to a comprehensive provider like **OER (Open Exchange Rates)** or **Xe** to ensure 100% global coverage, allowing users to send money or compare to any country in the world.

2.  **Real Commercial Cost Integration:**
    To make this tool truly useful for Ria customers, I would integrate **Ria's proprietary API** to fetch actual commercial exchange rates and calculate precise transfer fees based on the destination country and payment method, rather than just showing mid-market reference rates.

3.  **Testing Strategy:**
    I would implement **Unit Tests** (using Jest/React Testing Library) for critical components like the `CurrencyConverter` and **End-to-End (E2E) tests** (using Cypress or Playwright) to ensure the user flow works perfectly across different devices.

4.  **Internationalization (i18n):**
    Since money transfer is a global business, I would add support for multiple languages (Spanish, French, etc.) using `next-intl`, automatically detecting the user's browser language.

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