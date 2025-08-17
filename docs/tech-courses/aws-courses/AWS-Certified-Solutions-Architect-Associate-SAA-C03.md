---
id: AWS-Certified-Solutions-Architect-Associate-SAA-C03
description: Reference from Adrian Cantrill (cantrill)
title: AWS Certified Solutions Architect Associate SAA-C03
---
Tips: [Create multiples AWS Account using 1 Email](https://youtu.be/hnien_pKs4g?si=-wxAnnH3NpHf9Hag)

## 0. Cloud, Networking and Technical Fundamental
<details>
<summary>OSI 7-Layer Networking Model</summary>
<details>
<summary>OSI Model</summary>

OSI 7-Layer Model

* **Lower (Media) Layers:** Physical, Data Link, Network – deal with how data physically moves between points (local or global).
* **Upper (Host) Layers:** Transport, Session, Presentation, Application – deal with how data is packaged, transmitted reliably, and interpreted by applications.

Data flows **down** the OSI stack on the sender’s side and **up** the stack on the receiver’s side. For example, a web browser on one end communicates with a web server on the other through these layers.

---

## Diagram – OSI 7 Layers

```mermaid
graph TD
    A[Application Layer] --> B[Presentation Layer]
    B --> C[Session Layer]
    C --> D[Transport Layer]
    D --> E[Network Layer]
    E --> F[Data Link Layer]
    F --> G[Physical Layer]

    classDef host fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px;
    classDef media fill:#f1f8e9,stroke:#43a047,stroke-width:2px;

    class A,B,C,D host
    class E,F,G media

```

* **Host Layers (Top):** Handle data formatting, reliability, and application logic.
* **Media Layers (Bottom):** Handle transmission and routing of data across networks.

</details>

<details>
<summary>Layer 1 - Physical</summary>


**Layer 1 (Physical Layer)** is the foundation of networking. It defines how raw bits (0s and 1s) are transmitted over a **shared physical medium** (copper, fiber optic, or wireless).

* Key Concepts:
    * **Point-to-Point Links:**
        * Two devices (e.g., laptops) can communicate using a direct cable connection or by joining the same wireless network.
    * **Physical Mediums:**
        * **Copper cable** → electrical signals
        * **Fiber optic** → light pulses
        * **Wireless (Wi-Fi)** → radio frequencies
    * **Standards/Specifications:**
        * Define **voltage levels, timings, data rates, distances, modulation methods, and connector types** so that devices can interpret signals consistently.

* How Communication Works
    * Network Interface Cards (NICs) transmit bits as signals (e.g., 1 volt = binary 1, 0 volts = binary 0).
    * Both devices must use the **same physical standard** to interpret signals correctly.

```mermaid
graph TD

    subgraph Point-to-Point Connection
        A[Laptop 1<br/>NIC] ---|Copper Cable| B[Laptop 2<br/>NIC]
    end

    subgraph Shared Medium with Hub
        C[Laptop 1<br/>NIC] --- H(Hub)
        D[Laptop 2<br/>NIC] --- H
        E[Laptop 3<br/>NIC] --- H
        F[Laptop 4<br/>NIC] --- H
    end

    classDef device fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px;
    classDef hub fill:#f1f8e9,stroke:#43a047,stroke-width:2px;

    class A,B,C,D,E,F device
    class H hub
```

* Expanding to Multiple Devices
    * **Hub (Layer 1 Device):**
        * A hub retransmits incoming signals to all other ports.
        * Creates a **shared medium** for multiple devices.
        * Forms one **broadcast domain** and one **collision domain**.

* Limitations of Layer 1
    * **No addressing:** All transmissions are broadcast to everyone.
    * **Collisions:** If two devices transmit at once, signals overlap and corrupt data.
    * **No Media Access Control (MAC):** No rules to decide who transmits and when.
    * **No error detection or correction:** Layer 1 cannot identify or recover from collisions.
    * **Poor scalability:** More devices → higher chance of collisions.

* Importance
    * Layer 1 is **fundamental**: it enables the physical transmission of data.
    * However, it lacks intelligence for reliable, directed communication.
    * **Layer 2 (Data Link Layer)** builds on top of Layer 1 to provide **addressing, access control, and error handling**, making practical communication possible.

---

- Key Concept:
    - Layer 1 defines the **physical transmission environment** for networking, but by itself only supports raw broadcasting without reliability or control. 
    - For effective networking, we need the intelligence of higher layers starting with **Layer 2**.


</details>

<details>
<summary>Layer 2 - DataLink</summary>

</details>

<details>
<summary>Layer 3 - Network</summary>

</details>

<details>
<summary>Layer 4 & 5</summary>

</details>

</details>

## 1. Cloud, Networking and Technical Fundamentals
### Cloud Computing

## 2. AWS Fundamentals

## 3. IAM, ACCOUNTS AND AWS ORGANISATIONS

## 4. SIMPLE STORAGE SERVICE (S3)

## 5. VIRTUAL PRIVATE CLOUD (VPC) BASICS

## 6. ELASTIC COMPUTE CLOUD (EC2) BASICS

## 7. CONTAINERS & ECS

## 8. ADVANCED EC2

## 9. Route 53 - Global DNS

## 10. Relational Database Service (RDS)

## 11. NETWORK STORAGE & DATA LIFECYCLE

## 12. HA & SCALING

## 13. SERVERLESS AND APPLICATION SERVICES

## 14. GLOBAL CONTENT DELIVERY AND OPTIMIZATION

## 15. ADVANCED VPC Networking

## 16. HYBRID ENVIRONMENTS AND MIGRATION

## 17. SECURITY, DEPLOYMENT & OPERATIONS

## 18. Infrastructure as Code (CloudFormation)

## 19. NOSQL Databases & DynamoDB

## 20. Machine Learning 101

## 21. Other Services & Features