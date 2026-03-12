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


### Core Concept

Virtualisation allows multiple users to share one physical system while each user feels like they have their own dedicated machine. It is the foundation of cloud computing and enables multi-tenancy in SaaS systems.

<details>
<summary><strong>Virtualisation Basics & What is a VM?</strong></summary>

A Virtual Machine (VM) is a software-based slice of a physical computer.

| Feature          | Meaning                             |
| ---------------- | ----------------------------------- |
| Resource Sharing | Many VMs run on one physical server |
| Isolation        | Each VM is independent              |
| Efficiency       | Idle capacity becomes usable        |

</details>

### Types of Virtual Machines

| Type                        | OS Layer                      | Performance | Typical Use          | Examples                                   |
| --------------------------- | ----------------------------- | ----------- | -------------------- | ------------------------------------------ |
| Process VM (PVM)            | Shares host OS                | Lightweight | Run one application  | Java Virtual Machine, Google App Engine    |
| System VM – Host (Type 2)   | Guest OS on Host OS           | Moderate    | Development, testing | VirtualBox, VMware Workstation             |
| System VM – Native (Type 1) | Guest OS directly on hardware | High        | Cloud & data centres | VMware ESXi, Microsoft Hyper-V, Amazon EC2 |

### Hypervisor (VMM)

The Virtual Machine Monitor (Hypervisor):

* Creates and manages VMs
* Allocates CPU, RAM, storage
* Translates hardware requests
* Enables VM migration

**Types**:
* **Type 1** runs on hardware.
* **Type 2** runs on a host operating system.

### Virtualisation in the Cloud

Cloud providers create the illusion of infinite capacity using:

| Mechanism              | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| Automated Provisioning | Automatically place VMs on servers       |
| Elastic Operations     | Move VMs at runtime (live migration)     |
| Workload Consolidation | Pack VMs onto fewer servers to save cost |

**Result**:
* Server utilisation increases (from ~20% to ~70%)
* Energy and hardware costs decrease
* Resources appear unlimited to users

### Applications of Virtualisation

| Application            | Benefit                            |
| ---------------------- | ---------------------------------- |
| Server Consolidation   | Fewer physical servers needed      |
| Security via VMM       | Centralised monitoring and control |
| Desktop Virtualisation | Centralised desktop management     |

### Multi-tenancy

**Definition**: Multi-tenancy means multiple customers share the same application and infrastructure, but their data is isolated.

<details>
<summary><strong>Multi-tenant Data Approaches</strong></summary>

| Approach                    | Structure                           | Isolation | Scalability | Multi-tenant Level     |
| --------------------------- | ----------------------------------- | --------- | ----------- | ---------------------- |
| Separate DB                 | One database per tenant             | Full      | Poor        | Not truly multi-tenant |
| Shared DB + Separate Schema | One DB, multiple schemas            | Logical   | Moderate    | Partially multi-tenant |
| Shared DB + Shared Schema   | One DB, one schema, TenantID column | Row-level | High        | Fully multi-tenant     |

*Most modern SaaS platforms use Shared DB + Shared Schema.*

</details>

<details>
<summary><strong>Overall Story of This Topic</strong></summary>

* **Virtualisation**: Transforms physical hardware into flexible virtual machines.
* **Cloud Computing**: Uses automation and VM migration to create elastic, scalable infrastructure.
* **Multi-tenancy**: Extends sharing from hardware level to application and database level.

Together, they enable modern cloud platforms to be scalable, cost-efficient, and efficient.

</details>

## 3.2 Lab

<details>
  <summary>Register and Start Lab</summary>

Step 1: Register for AWS Academy (Check Outlook for this AWS Academy link)

Step 2: Start the Learner Lab (In Canvas -> Modules -> Learner Lab -> "Start Lab" -> wait 1-2 minute for the button the turn green -> click the green button to go to the AWS Console)

<img src="https://i.ytimg.com/vi/SRH5uEnr2SY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEIgUChlMA8=&rs=AOn4CLCxQFs8KuV7zjRfgBP5Fiv9ocxqSQ"/>
</details>

<details>
  <summary>Create EC2 Instance</summary>

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20221018100930/EC2.jpg" />

1. Navigate to EC2 Dashboard
2. Click on "Launch Instance"
3. Select an Amazon Machine Image (AMI)
4. Select an Instance Type
5. Configure Security Group (For now just allow 0.0.0.0 to access from anywhere)
6. Create a new key pair
7. Download the .pem file
8. Launch the instance

</details>

<details>
  <summary>Creating and Using a Custom AMI</summary>

<img src="https://media.licdn.com/dms/image/v2/D5622AQGoD26sQrLO7A/feedshare-shrink_800/B56ZcgyktcHUAk-/0/1748601819441?e=2147483647&v=beta&t=RyHZXazdmeXr8Rg1m5nS1CEjkncJqHKUlOT-nwIl66w"/>

Create a Custom AMI
1. Select your running instance (checkbox)
2. Click Actions → Image and templates → Create image
3. Image name: "MyCustomAMI"
4. Click "Create image"
5. Navigate to AMIs in the left menu. Wait for status: "Available"

---

Launch from Custom AMI
1. In the AMIs dashboard, select your custom AMI
2. Click "Launch instance from AMI"
3. Select 13 micro, use existing key pair "mynewkp", select existing security group
4. Click "Launch instance"
5. Return to Instances dashboard. You should see two running instances
</details>
---

# 4. AWS Elastic Beanstalk

## 4.1 Lecture

### AWS Elastic Beanstalk (EB)


AWS Elastic Beanstalk is a **Platform as a Service (PaaS)** offering that allows developers to deploy applications without the need to manually configure servers or infrastructure.

<details>
<summary><strong>Core Concepts and Lifecycle</strong></summary>

* **Application:** Represents the overall project folder.
* **Version:** A specific, labeled iteration of the application code.
* **Environment:** The actual provisioned AWS resources running a specific version.
* **Lifecycle:** The process follows four stages: 
  1. **Create Application** (select platform)
  2. **Upload Code** (zip or S3)
  3. **Launch Environment** (automatic provisioning)
  4. **Manage Environment** (monitor health and iterate)

</details>

<details>
<summary><strong>Web Server Tier Architecture</strong></summary>

<img src="https://static.d-libro.com/01-course-content-images/4010-10-AWS-Basics/010-main-figures/distributing-traffic-with-elastic-load-balancing-elb-id401010040510.webp" height="330"/>

The Web Server Tier is customer-facing and designed to handle **HTTP/HTTPS requests** with high responsiveness. It automatically provisions six architectural layers:

| Component | Responsibility |
| :--- | :--- |
| **EC2 Instances** | Virtual servers running the application code via a "Host Manager". |
| **Security Groups** | Software firewalls that default to allowing traffic on ports **80 (HTTP)** and **443 (HTTPS)**. |
| **Availability Zones (AZs)** | Independent data centers within a region providing local resilience. |
| **Auto Scaling Group (ASG)** | Dynamically adjusts instance counts based on demand spikes or lulls. |
| **Elastic Load Balancer (ELB)** | Distributes incoming traffic and signals the ASG to scale when capacity is reached. |
| **Amazon RDS** | Managed relational databases paired with the application environment. |

</details>

<details>
<summary><strong>Worker Tier and Decoupling</strong></summary>

The Worker Tier is used for **decoupling** resource-intensive background tasks from the front end to prevent the web server from becoming unresponsive.

* **Use Cases:** Handles time-intensive tasks like credit history checks, AI scoring, and report generation.
* **Amazon SQS (Simple Queue Service):** Acts as the central coordination mechanism. The web server places jobs into this managed queue.
* **Daemon Process:** A background process in the worker tier that continuously polls the SQS queue and assigns jobs to available worker instances.
* **Key Difference:** Unlike the Web Server Tier, the Worker Tier is not customer-facing and has **no public application URL**.

</details>

<details>
<summary><strong>Key Benefits</strong></summary>

* **Speed:** Transition from code to a running application in minutes.
* **Abstracted Management:** EB manages patching, scaling, and backups on the user's behalf.
* **Cost-Efficiency:** The Elastic Beanstalk service itself is free; users only pay for the underlying resources (EC2, S3, RDS) it provisions.

</details>


## 4.2 Lab

<details>
  <summary>Create AWS Elastic Beanstalk</summary>

1. Start the AWS Lab, Navigate to Elastic Beanstalk
2. Deploying Sample Application
  * 2.1 Click "Create Application"
  * 2.2 Environment tier -> Web server environment
  * 2.3 Create Application information + Environment information
  * 2.4 Platform: "PHP"
  * 2.5 Platform branch: "PHP 8.5 running on 64bit Amazon Linux 2023"
  * 2.6 Platform version: "4.10.0 (Recommended)"
  * 2.7 Application code: "Sample application"
  * 2.8 Presets: "Single instance (free tier eligible)"
  ---
  * 2.9 Configure service access: Service access
    * 2.9.1 Service role: LabRole
    * 2.9.2 EC2 key pair: LabinstanceProfile
    * 2.9.3 Security group: vockey
  * 2.10 Click: Skip to Review -> Create environment

---
3. Monitor Environment Health
  * 3.1 After deploying done, under the page, there is a Events, Health, Logs, ...
  * 3.2 To create a Cloud Watch Dashboard
    * 3.2.1 Click on "Monitoring" in the left menu
    * 3.2.2 Click on "Add to dashboard"
    * 3.2.3 Click on "Create new" -> "name it" -> click: create -> Add to dashboard
    * 3.2.4 If want to add more widget, click plus icon (on the right of save button) -> select metric -> EC2/By Auto Scaling Group/etc -> select 1 of the line from the list -> click: Create widget
    * 3.2.5 Click: Save
</details>

<details>
  <summary>What Elastic Beanstalk Provisioned For You</summary>

1. EC2 Instance
2. Security Group
3. Auto Scaling Group
4. CloudWatch Monitoring
5. Application Deployment

</details>

<details>
  <summary>Deploy Custom Application on AWS Elastic Beanstalk</summary>

1. Create a New Environment
2. Repear the same steps as [Create AWS Elastic Beanstalk](#create-aws-elastic-beanstalk) until Application code, instead of Sample application, select "Upload your code"
3. Version Label: v1.0.0 and Upload your code (upload zip file that download from canvas)
4. Then Deploy

</details>

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
