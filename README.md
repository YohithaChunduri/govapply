# GovApply - Smart Public Sector Application Platform

[![Testing](https://img.shields.io/badge/tests-passing-brightgreen.svg)]()
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1%20AA-blue.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

> **Bridging Aspirants Directly to Public Sector Careers**  
> An accessible, secure, and intelligent application operating system designed to eliminate missed deadlines, redundant form filling, and the recurring financial burden of cyber cafes for 30+ million government exam aspirants across India.

---

## 📌 Problem Statement Alignment

### The Real-World Challenge
Every year, millions of Indian youth prepare for public sector jobs (SSC, UPSC, Railways, Banking, APPSC, TGPSC, State Police). However, qualified candidates frequently face barriers before they even enter an examination hall:
1. **Missed Deadlines & Information Silos:** Critical notifications, 48-hour correction windows, and admit card releases are buried across fragmented, 80-page unstandardized PDF gazettes.
2. **The "Cyber Cafe Tax" & Repetitive Data Entry:** Aspirants apply to 15–25 exams annually. Because forms are complex and lack auto-fill capabilities, candidates travel to third-party internet cafes, paying ₹50–₹200 per application just to re-type identical 10th/12th marks and personal details.
3. **Disqualification from Human Typos:** Rushed cyber cafe operators frequently introduce spelling mistakes in names, category codes, or roll numbers, causing irreversible rejection during document verification.
4. **Document Formatting Barriers:** Every recruitment portal enforces strict, arbitrary image size constraints (e.g., 20–50 KB, exact aspect ratios, specific DPI) that are difficult to manage on mobile devices.

### The GovApply Solution
GovApply re-engineers the application workflow into a single, mobile-first digital experience:
- **Unified Master Profile & 1-Click Vault:** Store verified personal, academic, and category credentials once; instantly clipboard-copy or autofill across any official portal.
- **Smart Eligibility & Multi-Stage Alerts:** Dynamic age and relaxation calculation (General, OBC, SC, ST, EWS) with automated timeline tracking.
- **Client-Side Document Compliance:** Zero-server photo and signature resizing to match exact portal specifications without third-party exposure.
- **Native Bilingual Accessibility:** Full English and Telugu (తెలుగు) interface support to empower candidates across urban, semi-urban, and rural areas.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 19 + TypeScript (Strict Type Safety)
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS (Modern utility-first responsive layout)
- **Icons:** Lucide React
- **Testing Suite:** Vitest + React Testing Library + JSDOM
- **Linter & Code Quality:** Oxlint (Type-aware linting & strict hook safety)

---

## ♿ Accessibility (WCAG 2.1 AA Compliance)

GovApply is built from the ground up for inclusive community access:
- **Keyboard Navigation & Skip Links:** Features an integrated `#main-content` skip link for seamless keyboard navigation.
- **Screen Reader Announcements:** Includes dedicated `aria-live="polite"` regions to inform assistive tools of dynamic client-side route changes.
- **Semantic HTML Landmarks:** Proper structural division utilizing `<header role="banner">`, `<main role="main">`, and `<footer role="contentinfo">`.
- **High Contrast & Accessible Inputs:** Form controls, sliders, and icon buttons feature explicit `aria-label`, `htmlFor`, and visible focus rings.

---

## 🔒 Security & Privacy Measures

- **Zero-Persistence Document Handling:** Candidate photographs, signatures, and certificates processed for resizing remain strictly in local browser memory and are never uploaded to unsecured external servers.
- **Defensive External Link Security:** All outbound navigational links utilize strict `rel="noopener noreferrer"` attributes to prevent reverse tabnabbing and window leakage.
- **Input Sanitization:** Client-side safeguards protect against common injection vectors during profile creation.

---

## 🧪 Testing & Quality Assurance

The codebase includes automated unit and integration tests powered by Vitest and JSDOM.

### Running Tests Locally
```bash
# Execute the full test suite
npm run test

# Run tests in watch mode
npx vitest

# Run linter checks
npm run lint
