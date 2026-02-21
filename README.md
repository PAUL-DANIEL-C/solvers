#  Shamir Secret Reconstruction (Polynomial Interpolation)

##  Overview

This project reconstructs a hidden secret from distributed shares using **polynomial interpolation**, inspired by **Shamir Secret Sharing**.

Each share represents a point on a polynomial.
Given **k shares**, the polynomial of degree **k−1** can be uniquely reconstructed, allowing recovery of the constant term **f(0)** — the hidden secret.

The input shares are provided in **JSON format**, where each share may use a different numerical base.

---

##  Key Features

* Arbitrary base decoding (binary, octal, hex, etc.)
* Handles extremely large values using **BigInt**
* Requires only **k shares** for reconstruction
*  Implements **Lagrange Interpolation**
*  Deterministic and precision-safe (no floating point usage)

---

## Approach

### 1. Share Extraction

Each JSON entry is interpreted as:

x → share index
y → decoded value (converted from given base)

---

### 2. Polynomial Reconstruction

Since:
k = m + 1

A polynomial of degree **m** is uniquely determined by **k points**.

We compute the secret using **Lagrange interpolation at x = 0**:

f(0) = Σ yi Π (-xj / (xi − xj))

---

### 3. Precision Handling

Because share values can be extremely large, the implementation uses **BigInt arithmetic** to avoid precision loss.

---

## 4. How to Run

```bash
node solver.js
```

Ensure the test case is stored as:

```
input.json
```

---

## 5. Output

```
TestCase 1: 3
TestCase 2: 2561871836135835
```

---

## 6. Complexity

Time Complexity: **O(k²)**
Space Complexity: **O(k)**

This is optimal for direct polynomial reconstruction.

---

## 7. Why This Implementation Stands Out

* Robust handling of mixed-base inputs
* Cryptography-aligned mathematical reconstruction
* Precision-safe large integer computation
* Clean and minimal dependency-free design

---
## 👨‍💻Author

Paul Daniel C
