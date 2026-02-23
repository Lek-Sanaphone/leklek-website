---
id: 32548-48730-Cybersecurity
description: This course builds core skills in defending systems, integrating technology, policy, and governance.
title: 32548 and 48730 - Cybersecurity
---

# 32548 and 48730 - Summary

# 1. Introduction & Subject Overview

## 1.1 Security Fundamentals

### The CIA Triad

The core goals of any security professional are defined by three pillars:

* **Confidentiality**: Restricting data access to authorized individuals.
* **Integrity**: Guaranteeing that data has not been altered or corrupted.
* **Availability**: Ensuring systems and data remain accessible to users.

### Attack Landscape and Foundations

Modern security requires a proactive stance against diverse threats. Human error remains the most significant vulnerability, contributing to 68% of all breaches.

* **Common Attacks**: Includes Malware, Phishing, Cloud Misconfigurations, Unpatched Systems, and Credential Theft.
* **Zero Trust Architecture**: A fundamental principle where no entity inside or outside the network is trusted by default; every access request must be verified.

#### The 3-Phase Strategy:

1. **Detection**: Utilizing SIEM and EDR to spot threats early.
2. **Prevention**: Implementing MFA, regular patching, and encryption.
3. **Response & Recovery**: Containing active attacks and restoring system integrity.

---

# 2. SOC (Security Operations Center)

## 2.1 Structure and Operations

### The Tiered Defense Model

A SOC serves as a 24/7 command center for monitoring and incident response, organized into specialized roles:

* **Tier 1**: First responders who perform initial triage and event classification.
* **Tier 2 & 3**: Subject matter experts who handle complex and critical escalations.
* **SOC Engineers**: Technical staff who build detections and automate workflows using SOAR.

### Incident Response (IR) Lifecycle

The standard process for managing a security event follows six critical stages:

1. **Prepare**
2. **Detect**
3. **Analyze**
4. **Contain**
5. **Eradicate**
6. **Recover**

### Event Classification

* **True Positive**: A confirmed security incident requiring action.
* **False Positive**: An alert triggered by non-malicious activity.
* **Benign Positive**: A valid detection of activity that is authorized (e.g., a scheduled vulnerability scan).

## 2.2 Security Tools and Metrics

### Core Technology Stack

* **SIEM (Microsoft Sentinel)**: Aggregates logs to provide a centralized view of security alerts.
* **SOAR**: Automates repetitive tasks, such as disabling accounts or blocking IPs.
* **EDR (CrowdStrike/Defender)**: Provides deep visibility and protection for endpoints (laptops, servers).
* **Threat Intel**: Utilizing tools like Shodan (device discovery), VirusTotal (malware analysis), and URLScan.io.

### Vulnerability Management

* **CVE (Common Vulnerabilities and Exposures)**: A public dictionary of known security flaws.
* **CVSS (Common Vulnerability Scoring System)**: A numerical score (0–10) indicating severity.
* **Dwell Time**: The duration an attacker stays in a system before detection; currently averaging 11 days (5 days for ransomware).

---

# 3. Web Security Threats

## 3.1 Exploitation Methods

### DNS and Injection Attacks

* **DNS Attacks**: Includes Cache Poisoning (redirecting traffic to malicious IPs) and DNS Rebinding (bypassing browser security to hit internal networks).
* **SQL Injection (SQLi)**: Exploits unsanitized inputs to execute commands on the database.
* **Prevention**: Use Parameterized Queries and Prepared Statements.

### Client-Side Attacks

* **XSS (Cross-Site Scripting)**: Injecting malicious scripts into trusted websites. Categories include Reflected, Stored, and DOM-based XSS.
* **CSRF (Cross-Site Request Forgery)**: Tricking a user's browser into performing unwanted actions on a site where they are authenticated.
* **Prevention**: Implementation of CSRF Tokens and SameSite cookie attributes.

## 3.2 Session and API Security

### Authentication Risks

Weaknesses in session handling can lead to account takeovers. Key defenses include:

* **Secure Cookies**: Using HttpOnly and Secure flags.
* **MFA**: Multi-factor authentication to mitigate credential theft.

### API Vulnerabilities

* **BOLA (Broken Object Level Authorization)**: Occurs when an API does not properly check if a user should have access to a specific resource.
* **Mass Assignment**: When an application takes user input and blindly updates sensitive internal object properties.

---

# 4. Cryptography

## 4.1 Cryptographic Principles

### Core Security Objectives

Cryptography transforms data to ensure:

* **Confidentiality**: Keeping data secret via encryption.
* **Integrity**: Using Hashes (like SHA-256) to prove data hasn't changed.
* **Authenticity**: Proving the identity of the sender via digital signatures.

### Encryption Methodology

* **Symmetric Encryption (AES)**: Uses a single key for both encryption and decryption. Highly efficient for bulk data.
* **Asymmetric Encryption (RSA/ECC)**: Uses a public/private key pair. Solves the key distribution problem but is computationally slower.
* **Hybrid Encryption**: The foundation of SSL/TLS. It uses Asymmetric encryption to share a secret key, then switches to Symmetric encryption for the communication session.

## 4.2 PKI and Trust Models

### Digital Certificates and X.509

A Digital Certificate binds a public key to an entity's identity. The Certificate Authority (CA) acts as the trusted third party that verifies and signs these certificates.

### Validation Levels

* **DV (Domain Validation)**: Basic check of domain ownership; lowest trust level.
* **OV (Organization Validation)**: Verifies the existence of the legal organization.
* **EV (Extended Validation)**: The highest trust level; requires rigorous background checks (common in banking).

### Defensive Measures

* **MITM Protection**: Ensuring certificates are signed by trusted CAs.
* **Side-Channel Defense**: Implementing hardware shielding and constant-time algorithms to prevent info leakage through physical observations.
* **Brute Force Mitigation**: Utilizing strong key lengths (e.g., RSA 2048-bit+ or AES 256-bit).

---

# 5. TLS/HTTPS & TCP-Security Attacks

## 5.1 Protocol Fundamentals and History

### The Necessity of TLS

Standard TCP is inherently insecure and vulnerable to hijacking and flooding. TLS adds a security layer over TCP to provide:

* **Confidentiality**: Encryption of data.
* **Integrity**: Ensuring data is not modified.
* **Authentication**: Verifying the identity of the communicating parties.

### Version Evolution

* **SSL 2.0/3.0**: Deprecated and insecure (vulnerable to attacks like POODLE).
* **TLS 1.2**: Long-lived and widely used, but slower than 1.3.
* **TLS 1.3 (Current)**: Released in 2018. It features a faster 1-RTT handshake, removes legacy ciphers, and mandates **Perfect Forward Secrecy (PFS)** by default.
* **TLS 1.4**: Currently in the research stage, focusing on post-quantum readiness.

## 5.2 Handshake and Record Phases

### 5.2.1 The Handshake Phase

Before data is sent, the client and server must agree on keys:

1. **TCP 3-Way Handshake**: Connection established.
2. **ClientHello/ServerHello**: Negotiation of version, random numbers, and cipher suites (e.g., AES-GCM, ChaCha20).
3. **Key Exchange**: Certificate validation and secret derivation using randoms + master secret.
4. **Finished**: Verification that the handshake was successful.

### 5.2.2 The Record Phase

Once the handshake is complete, application data is processed:

* **Fragmentation/Compression**: (Compression is often disabled to prevent CRIME/BREACH attacks).
* **MAC/AEAD**: Verification tag is added.
* **Encryption**: Data is encrypted and transmitted.

## 5.3 Vulnerabilities and Network Attacks

### Cryptographic and Protocol Attacks

* **Downgrade Attacks**: Forcing a connection to use a weaker, legacy protocol (e.g., SSL 3.0).
* **POODLE/BEAST**: Exploiting weaknesses in CBC padding or IVs.
* **SSLStrip**: Rewriting HTTPS links to HTTP to intercept traffic.

### Network Layer Threats

* **ARP Spoofing**: Poisoning the ARP cache to sit as a Man-in-the-Middle (MITM) on a LAN.
* **TCP SYN Flood**: Exhausting server resources by spamming "half-open" connection requests. **Defense**: Use SYN Cookies.
* **Session Hijacking**: Forging sequence numbers to take over an active TCP session.

---

# 6. System Security (OS Focus)

## 6.1 Operating System Landscape

### TCB and Defense-in-Depth

* **Trusted Computing Base (TCB)**: The total combination of hardware, software, and firmware that enforces security policy. If the TCB is compromised, the entire system is at risk.
* **Defense-in-Depth**: Layering security from the hardware level up to the application level.

### OS Platforms

* **Windows**: Largest install base and attack surface.
* **Linux/Kali**: Preferred for security professionals (forensics, pentesting) due to open-source transparency.
* **macOS**: Beneficiary of a tightly controlled ecosystem and MDM.

## 6.2 Memory Safety and Buffer Overflows

### The Stack and Heap

* **Stack**: Stores local variables and function return addresses.
* **Heap**: Used for dynamic memory allocation.

### 6.2.1 Buffer Overflow Mechanism

A buffer overflow occurs when data exceeds its allocated space, spilling into adjacent memory.

* **The Goal**: Overwrite the saved return address on the stack.
* **The Exploit**: Redirect the program to execute **Shellcode** (often preceded by a **NOP Sled** to ensure the jump lands correctly).

### 6.2.2 Modern Mitigations

* **Stack Canaries**: A value placed before the return address; if it changes, the program aborts.
* **ASLR (Address Space Layout Randomization)**: Randomizes memory addresses for the stack, heap, and libraries.
* **DEP / NX Bit**: Marks the stack as non-executable so injected data cannot run.

## 6.3 Race Conditions (TOCTTOU)

A **Time-of-Check to Time-of-Use (TOCTTOU)** attack occurs when a program checks a condition (like a file permission) and the state changes before the program performs the action.

* **Example**: Dirty COW (Copy-On-Write) exploit in Linux.
* **Defense**: Use atomic operations and re-validate post-conditions.

---

# 7. IDS / IPS and Intrusion Concepts

## 7.1 Detection vs. Prevention

* **Firewall**: Acts as a gatekeeper based on pre-defined policies (Ports/IPs).
* **IDS (Intrusion Detection System)**: Analyzes behavior/content and alerts on suspicious activity.
* **IPS (Intrusion Prevention System)**: An IDS that actively blocks malicious traffic in real-time.

## 7.2 Detection Methodologies

### Signature-based Detection

Matches traffic against a database of known attack patterns (e.g., Snort rules).

* **Pros**: Fast and precise for known threats.
* **Cons**: Fails against Zero-day attacks.

### Anomaly-based Detection

Builds a model of "normal" behavior and flags deviations.

* **Pros**: Can catch novel/unknown attacks.
* **Cons**: High risk of **False Positives** (crying wolf).

## 7.3 Placement and IoT Risks

* **NIDS**: Network-based; placed at chokepoints/gateways.
* **HIDS**: Host-based; installed on individual agents to monitor system calls and logs.
* **IoT/OT Risks**: These systems often have weak defaults and flat networks. They require strict segmentation (VLANs) and identity management.

---

# 8. Email Security & Social Engineering

## 8.1 Social Engineering Tactics

Attackers exploit psychological levers such as **Authority, Urgency, Fear, and Curiosity**.

* **Phishing**: Mass generic lures.
* **Spear-Phishing**: Personalized attacks targeting specific individuals (e.g., CEO to CFO).
* **Quishing**: Phishing via QR codes.
* **Vishing/Smishing**: Voice and SMS-based phishing.

## 8.2 Technical Email Standards

* **SPF (Sender Policy Framework)**: A DNS record listing authorized sending IPs.
* **DKIM (DomainKeys Identified Mail)**: Adds a digital signature to emails to verify the domain.
* **DMARC**: A policy layer that tells the receiver what to do if SPF/DKIM fails (None, Quarantine, or Reject).

## 8.3 Message-Level Security

* **PGP (Pretty Good Privacy)**: Uses a "Web of Trust" model.
* **S/MIME**: Uses a standard CA-based (X.509) hierarchy, commonly used in enterprise environments.
* **Golden Rule**: Always **Sign** the message first, then **Encrypt**.