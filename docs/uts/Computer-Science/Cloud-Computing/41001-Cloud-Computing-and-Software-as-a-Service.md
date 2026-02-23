---
id: 41001-Cloud-Computing-and-Software-as-a-Service
description: This course builds core skills in cloud concept
title: 41001 Cloud Computing and Software as a Service
---
# 41001 - Summary
# 1. Introduction to the Subject & Cloud Computing
## 1.1 Lecture

### What is Cloud Computing?

#### Six Defining Parameters of Cloud Computing

A true cloud environment must meet these six criteria:

1. **Pooled Resources**: Providers maintain global resource pools (Compute, Storage, Network) accessible regardless of geography.
2. **Elastic Scaling**: Capacity follows demand curves precisely, eliminating wasted costs and preventing crashes during spikes.
3. **Virtualization**: Physical hardware is sliced into Virtual Machines (VMs) using a hypervisor layer.
4. **Metered Usage**: A "pay-as-you-go" model where usage is tracked at a granular level (per second or GB), converting capital risk into operating cost.
5. **Internet Delivery**: Resources are accessed via APIs and categorized as IaaS (raw infrastructure), PaaS (dev platforms), or SaaS (ready-made apps).
6. **Automated Lifecycle**: Provisioning and de-provisioning are fully automated through self-service portals, requiring no human intervention.

#### Business Benefits

* **Financial Shift**: Moves IT spending from large upfront Capital Expenditure (CapEx) to manageable Monthly Operational Expense (OpEx).
* **Operational Focus**: IT staff shift focus from maintaining hardware to core business innovation.
* **Global Agility**: Organizations can scale globally and achieve faster time-to-market without building their own data centers.


### Infrastructure as a Service (IaaS)

#### Definition and Control

IaaS provides on-demand access to fundamental computing resources over the internet. Users bypass physical hardware ownership, instead renting virtualized infrastructure.

* **User Control**: Consumers manage operating systems, storage, and deployed applications.
* **Provider Management**: The cloud provider maintains the underlying physical networks, servers, and storage.
* **Core Examples**: Includes AWS EC2, Azure VMs, and Google Compute Engine.

#### Technical and Economic Parameters

* **Virtualization**: Physical hardware is sliced into virtual machines delivered on the fly.
* **Elasticity**: Infrastructure scales instantly to follow demand, preventing wasted money or system crashes.
* **OpEx Model**: Metered usage (per second/GB) turns large upfront capital investments (CapEx) into monthly operational expenses (OpEx).
* **Automation**: The full resource lifecycle is automated via APIs, requiring no human intervention for provisioning.

#### The 4 Layers of IaaS

1. **Co-location Layer**: Power, cooling, connectivity, security
2. **Hardware Layer**: Physical servers, storage, networking
3. **Virtualisation Layer**: Slices physical into virtual resources
4. **Service Layer**: Web console / API - your front door

#### Business Advantages

* **Agility**: Deployment time is reduced from months of physical installation to instant availability.
* **Cost Reduction**: Eliminates expenses for server rooms, cooling, and hardware maintenance.
* **Focus**: IT staff focus on application innovation rather than infrastructure management.

---

# 2. Cloud Service Models

## 2.1 Lecture

### Platform as a Service (PaaS)

#### Definition and Shared Responsibility

* **NIST Standard**: The capability to deploy consumer-created applications onto cloud infrastructure using provider-supported languages, libraries, and tools.
* **Management Boundary**: Users control application settings and code; the provider manages all underlying infrastructure (network, servers, OS, storage).
* **Shared Responsibility**: Users manage **Applications** and **Data**; the Provider manages the **Platform** (Runtime, Middleware, OS) and **Infrastructure** (Hardware, Storage).

#### Key Technical Mechanisms

* **Multitenancy**: Multiple consumers share the same physical platform instance while remaining logically isolated.
* **Logical Isolation**: Software-defined segregation of compute, memory, and storage to ensure tenant privacy.
* **Resource Pooling**: Dynamic allocation of shared hardware to maximise efficiency and lower costs.

#### PaaS Architectures (Case Studies)

<details>
<summary><strong>Google App Engine (GAE) — Four Pillars Architecture</strong></summary>

* **Google File System (GFS)**: Distributed storage that replicates code in 64 MB chunks for high availability.
* **Datastore / Cloud SQL**: Managed NoSQL (schema-less entities) or Relational (fixed schema) storage.
* **Web Servers**: Auto-scaled HTTP request handlers with automatic load balancing.
* **MemoryStore**: SSD-based fast cache for sub-millisecond data access and session continuity.

</details>

<details>
<summary><strong>Force.com (Salesforce)</strong></summary>

* **Metadata-Driven**: Applications are not pre-stored as static views; they are assembled from metadata at runtime.
* **Polymorphic Abstraction**: Identifies the requesting tenant and routes them to their specific metadata and data.
* **Development Model**: Supports **Declarative** (No-Code drag-and-drop) and **Programmatic** (Apex / Visualforce) builds on the same platform.

</details>

#### Pricing and Implications

* **Pricing Models**:
  * **Subscription**: Fixed fee for defined resource tiers.
  * **Consumption**: Pay-as-you-go based on actual usage (CPU, RAM, bandwidth).
  * **Freemium**: Free basic tier with upgrades for advanced features.
* **Key Benefits**: No upfront capital expenditure (CapEx), no maintenance responsibility, and focus shifts entirely to application logic.

### Software as a Service (SaaS)

#### Definition and Characteristics

* **NIST Standard**: Software applications provided as a service over the internet, accessible via web browsers or thin client interfaces.
* **Utility Model**: Applications are provided on-demand, shifting software from a product "ownership" model to a service "consumption" model.
* **Provider Management**: The SaaS provider manages the entire stack below the application, including hardware, frameworks, and core code.
* **Shared Code Base**: All consumers share the same program code, enabling massive scale and centralised updates.

#### Traditional Procurement vs. SaaS

* **Traditional Pain Points**: High upfront capital (CapEx), long deployment times (months to years), and ongoing maintenance burdens for IT teams.
* **SaaS Advantage**: Eliminates upfront costs, provides immediate access ("utility" model), and removes responsibility for patches and upgrades from the enterprise.

#### Enterprise Integration Challenges

Most organisations operate in a **Hybrid Reality**, maintaining some legacy on-premise systems while adopting SaaS for specific functions.

<details>
<summary><strong>Three Implementation Flavours</strong></summary>

* **Pure SaaS**: Complete migration; no in-house applications remain.
* **SaaS Consuming On-Premise (Hybrid Front-End)**: Core logic is in the cloud but references local data (e.g., a cloud CRM pulling from local inventory).
* **On-Premise Consuming SaaS (Hybrid Back-End)**: Main interface remains in-house but outsources specific functions to the cloud (e.g., local payroll using cloud HR data).

</details>

<details>
<summary><strong>The Integration Broker Architecture</strong></summary>

A central intermediary responsible for managing data flow, security, and transformation between on-premise and cloud sinks.

**The Four Pipeline Modules:**

1. **Data Security**: Authenticates sources, decrypts data, and scans for threats.
2. **Validation & Transformation**: Matches data formats between source and sink.
3. **Data Synchronisation**: Ensures consistency using mechanisms like **Polling** (time-based), **Push** (event-based), or **Publish/Subscribe**.
4. **Routing**: Determines the correct destination based on metadata rules.

> **Key Insight**: The **Pipeline** is the workhorse (sequential processing), while the **Metadata Layer** is the brain (intelligence for all modules).

</details>

#### Data Synchronisation Mechanisms

| Mechanism | Type | Scaling | Pros / Cons |
|---|---|---|---|
| **Polling** | Time-based | Poor | Simple but wastes messages and isn't real-time |
| **Push** | Event-based | Limited | Real-time and efficient for pairs, but complex for many sinks |
| **Publish/Subscribe** | Decoupled | **Excellent** | Combines speed with multi-sink scaling via a message broker |

---

# 3. Virtualisation in Cloud Computing

## 3.1 Lecture

### Virtualisation Technologies and Methods

---

# 4. AWS Elastic Beanstalk

## 4.1 Lecture

### Introduction to AWS Elastic Beanstalk

---

# 5. Customising AWS Elastic Beanstalk

## 5.1 Lecture

### Environment Configuration and Customisation

---

# 6. AWS Storage Services

## 6.1 Lecture

### Cloud Storage Solutions and Implementations

---

# 7. Force.com PaaS: Data Objects

## 7.1 Lecture

### Cloud Data Objects, Validations, and Interface

---

# 8. StuVac

## 8.1 Study Break

### No lecture this week

---

# 9. Force.com PaaS: Security

## 9.1 Lecture

### Security of Force.com Objects

---

# 10. Force.com PaaS: Automation

## 10.1 Lecture

### Automating Workflows

---

# 11. Guest Lecture I

## 11.1 Lecture

### First guest lecture

---

# 12. Guest Lecture II

## 12.1 Lecture

### Second guest lecture

---

# 13. Assignment 2 Demonstrations

## 13.1 Lab/Lecture

### Project Presentations and Demonstrations
