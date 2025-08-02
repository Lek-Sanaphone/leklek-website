---
id: 41891-Cloud-Computing-Infrastructure-42891-Infrastructure-for-Cloud-Computing
description: This course builds core skills in cloud concept
title: 41891 Cloud Computing Infrastructure and 42891 Infrastructure for Cloud Computing
---
# 41891 and 42891 - Summary
# 1.  Introduction to Cloud Computing
## 1.1 Lecture

### What is Cloud Computing?

* A **cloud** is a pool of **virtualized computing resources**.
* It can host **various workloads** and dynamically provision **hardware, software, and data**.
* Accessed over the internet and typically offered as **paid services**.


### Key Concepts Covered

1. **Cloud vs Traditional Computing**

   * **Traditional computing**: Buy, install, and maintain hardware/software for peak use. High upfront cost.
   * **Cloud computing**: Pay-as-you-go model. Save 80–95% cost by paying only for resources used (QoS-based).

2. **Cost Models**
   * **Traditional IT**: Large capital expenses + growing operational expenses as users increase.
   * **Cloud**: Only operational costs; no capital investment.
   * **Ideal for**: Small and large businesses needing scalable, flexible solutions.

3. **Cloud Service Models**

    | Model    | Description                                                        | Example                 |
    | -------- | ------------------------------------------------------------------ | ----------------------- |
    | **IaaS** | Infrastructure-as-a-Service: provides VMs, storage, and networking | AWS EC2                 |
    | **PaaS** | Platform-as-a-Service: offers development tools and environments   | AWS Elastic Beanstalk   |
    | **SaaS** | Software-as-a-Service: delivers full apps via the web              | Google Docs, Office 365 |


4. **Deployment Models**

   * **Public Cloud**: Open to general public (e.g., AWS, GCP)
   * **Private Cloud**: Dedicated to a single organization (on/off-premise)
   * **Community Cloud**: Shared between known organizations with common policies
   * **Hybrid Cloud**: Combines two or more models


### IaaS Cloud Architecture Components

Main Component: Cloud Operating System (Cloud OS)
Manages virtual and physical resources. Divided into 3 layers:

1. Drivers Layer: Interfaces with physical hardware (network, storage)

2. Core Layer: Includes:
    * VM Manager: Handles VM lifecycle (deploy, migrate, suspend, etc.)
    * Network Manager: Manages private/public IPs and connectivity
    * Storage Manager: Offers scalable, reliable virtual storage
    * Federation Manager: Connects to external/public clouds
    * Image Manager: Manages VM images
    * Auth Manager: Access control (authentication & authorization)
    * Accounting & Auditing: Tracks usage data
    * Information Manager: Monitors VMs and infrastructure state

3. Tools Layer:
    * Admin Tools: Add/remove users
    * Service Manager: Web interface for users to request services
    * Scheduler:
        * Hypervisor Scheduler: Allocates system resources to VMs (at physical host level)
        * Cloud Scheduler: Determines physical host allocation
        * Federated Scheduler: Chooses remote deployment if local is full
        * Cloud Interfaces (APIs)


### Cloud OS vs Traditional OS

| Computer OS                | Cloud OS                                |
| -------------------------- | --------------------------------------- |
| Manages local resources    | Manages distributed virtual resources   |
| Single-machine abstraction | Multi-tenant, multi-machine abstraction |
| User interacts via GUI/CLI | User interacts via API/web interface    |


## 1.2 Labs (no lab)
---
# 2. Cloud virtualisation technologies
## 2.1 Lecture
## 2.2 Labs
---
# 3. Cloud Architecture and Management Mechanisms
## 3.1 Lecture
## 3.2 Labs
---
# 4. : Cloud Virtualisation and NaaS
## 4.1 Lecture
## 4.2 Labs
---
# 5. Data centre Fundamentals: Virtualisation for Data Centres
## 5.1 Lecture
## 5.2 Labs
---
# 6. Management of Data Centre
## 6.1 Lecture
## 6.2 Labs
---
# 7. Quiz 1
## 7.1 Lecture
## 7.2 Labs
---
# 8. Security and Compliance in the Cloud
## 8.1 Lecture
## 8.2 Labs
---
# 9. No Lecture
## 9.1 Lecture
## 9.2 Labs
---
# 10. Public/Private Cloud Comparison and Review and Discussion
## 10.1 Lecture
## 10.2 Labs
---
# 11. Quiz 2
## 11.1 Lecture
## 11.2 Labs
---
# 12. No Lecturer
## 12.1 Lecture
## 12.2 Labs