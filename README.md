# 📘 k6 Performance Testing Framework

A modular and scalable **performance testing framework** built using [k6](https://k6.io).
It simulates **real-world user flows** like registration, login, and book management with **detailed metrics, error tracking, and CI/CD integration readiness**.

---

## 📖 Overview

This framework was designed to:

* Validate **critical user journeys** under load
* Simulate both **independent traffic** (parallel scenarios) and **end-to-end flows** (sequential execution)
* Track **per-endpoint performance metrics** (latency, request counts, errors, checks)
* Enforce **thresholds (SLAs)** such as response time & error budgets
* Abort early if the application is unhealthy (health check stage)

It’s modular, reusable, and production-grade, making it easy to extend with new services and flows.

---

## 🏗️ Folder Structure

```
tests-k6/
│── flows/                 # Business workflows (register, login, books, etc.)
│   ├── registerUserFlow.js
│   ├── loginUserFlow.js
│   ├── createBookFlow.js
│   └── getBooksFlow.js
│
│── services/              # Direct HTTP service layer
│   ├── authService.js
│   ├── bookService.js
│   └── healthService.js
│
│── utils/                 # Utilities & helpers
│   ├── randomString.js
│   ├── metrics.js         # Custom error counters & metrics
│   └── config.js
│
│── test.js                # Main entry point with scenarios & setup
|── config.js     
```

---

## ⚡ Key Features

✔ **Modular design** – Flows, services, and utilities separated
✔ **Health check before load** – Prevents wasted execution if app is down
✔ **Multiple scenarios** – Run register, login, create, and get flows in parallel
✔ **Thresholds per endpoint** – Enforces SLAs automatically
✔ **Error tracking with counters** – Records errors per endpoint
✔ **Custom tagging** – Attribute metrics by endpoint/service
✔ **Extensible** – Add new flows & services without breaking existing ones
✔ **CI/CD ready** – Designed for automation in GitHub Actions/Jenkins

---

## 📊 Metrics & Thresholds

### Built-in metrics (from k6)

* `http_req_duration` → Response time (latency)
* `checks` → Functional validations
* `iterations` → Number of VU iterations

### Custom metrics

* `http_errors` → Counts failed requests, tagged per endpoint

### Example thresholds

```js
export const options = {
  thresholds: {
    "http_req_duration{endpoint:registerUser}": ["p(95)<1000"], // 95% < 1s
    "http_errors{endpoint:registerUser}": ["count==0"],         // No errors
    "checks{endpoint:loginUser}": ["rate>=0.99"],               // At least 99% success
  },
};
```

---

## 🚀 How to Run

1. Install k6

   ```sh
   brew install k6   # macOS
   choco install k6  # Windows
   ```

2. Run the test

   ```sh
   k6 run tests-k6/test.js
   ```

3. View results in console or integrate with **Prometheus + Grafana** for dashboards.

---

## 🖥️ Example Output

```
checks{endpoint:registerUser}
✓ 'Register - 201' 100.00% ✓ 200 / ✗ 0

http_req_duration{endpoint:registerUser}
✓ 'p(95)<1000' p(95)=312.12ms

http_errors{endpoint:registerUser}
✓ 'count==0' count=0

http_req_duration{endpoint:loginUser}
✓ 'p(95)<1000' p(95)=284.55ms
```

---

## 🔑 Key Takeaways

* **Scalable:** Each flow is isolated and reusable.
* **Observable:** Endpoints tracked with tags, errors, and thresholds.
* **Robust:** Health check prevents false test runs.
* **CI/CD Ready:** Thresholds make it easy to enforce SLAs in pipelines.
* **Practical:** Simulates real-world usage (user registration → login → book actions).

This framework provides both **functional validation** (via checks) and **performance validation** (via thresholds & metrics), making it suitable for both **shift-left testing** and **production load tests**.
