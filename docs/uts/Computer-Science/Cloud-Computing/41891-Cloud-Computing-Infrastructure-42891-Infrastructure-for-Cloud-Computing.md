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

#### Cloud vs Traditional Computing

   * **Traditional computing**: Buy, install, and maintain hardware/software for peak use. High upfront cost.
   * **Cloud computing**: Pay-as-you-go model. Save 80–95% cost by paying only for resources used (QoS-based).

#### Cost Models
   * **Traditional IT**: Large capital expenses + growing operational expenses as users increase.
   * **Cloud**: Only operational costs; no capital investment.
   * **Ideal for**: Small and large businesses needing scalable, flexible solutions.

#### Cloud Service Models & Example

| Model    | Description                                                        | Example                 |
| -------- | ------------------------------------------------------------------ | ----------------------- |
| **IaaS** | Infrastructure-as-a-Service: provides VMs, storage, and networking | AWS EC2                 |
| **PaaS** | Platform-as-a-Service: offers development tools and environments   | AWS Elastic Beanstalk   |
| **SaaS** | Software-as-a-Service: delivers full apps via the web              | Google Docs, Office 365 |


#### Deployment Models

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
### Cloud service models - Definitions
- **National Institute of Standards and Technology (NIST)**: On-demand network access to a shared pool of configurable computing, releasing/provisioning with mininal effort.
- **Thomas Erl**: Specialized distributed computing model enabling scalable and measurable resource provisioning.

### Roles and Terminology
- Cloud Service: IT resources with remote access.
- Cloud Provider: Offers cloud services.
- Cloud Consumer: Uses services under a formal agreement.
- Cloud Carrier: Provides network connectivity.
- Cloud Service Owner: Legally owns cloud service.
- Cloud Resources Administrator: Manage the resources/services.

### [Cloud Service Models](#cloud-service-models--example)
- IaaS: Consumer manages OS and applications on virtual servers.
- PaaS: Platform provided without exposing underlying infrastructure.
- SaaS: Full application access without resource management.

### Virtualization
- Purpose: Abstraction and efficient resource utilization.
- Types:
    - **Processor Virtualization**: Shares CPU among multiple vm/application.
    - **Memory Virtualization**: Combines physical memory into a shared pool and allocates it dynamically to virtual machines as needed.
    - **Storage Virtualization**: Provides a layer of abstraction for the physical storage of data
    - **Network Virtualization**: Creates virtual networks over shared hardware

#### Virtual Machines (VMs)
- Encapsulate virtual hardware and guest OS.
- Operate like physical machines with full isolation.

#### Hypervisors (Virtual Machine Monitors - VMMs)
- Functions: Manage VMs, allocate virtual hardware, support VM migration.
- Types:
    - **Type 1 (Bare-metal)**: Runs directly on hardware.
    - **Type 2 (Hosted)**: Runs on top of an OS.

### Typical Cloud Architecture
- Components:
    - Virtual Machines
    - Hypervisors
    - Physical Servers
    - Networks
    - Storage (SAN, NAS, DAS)

### Virtual Infrastructure Manager (VIM) – Hypervisor
- <img src="https://patterns.arcitura.com/wp-content/uploads/2018/08/fig2-112.png" height="200"/>
- Virtual servers are created by hypervisors on individual physical servers.
- Multiple hypervisors are jointly controlled by a VIM.
- The VIM handles centralized management of all hypervisors, enabling consistent control over virtual infrastructure.
- Could Live VM Migration:
    - Moving a running virtual machine from one physical server to another without downtime.
    - For Hardware maintenance, Load balancing, or Fault tolerance
- Managed by The Virtual Infrastructure Manager

### Storage Hardware
#### Direct Attached Storage (DAS)
- Storage system directly connected to a computing IT resource (physical server) using a host bus adapter (HBA)
#### Network-Attached Storage (NAS)
-  File-level storage shared over a network to multiple clients.
#### Storage Area Network (SAN)
- High-speed network providing block-level storage to multiple servers.

### Storage Virtualization
- <img src="https://www.interviewbit.com/blog/wp-content/uploads/2022/05/Storage-Virtualization-877x1024.png" height="220"/>
- Abstracts/Hide the complexity of physical storage devices and treating all storage media as a **single pool of storage**.
- 2 Main Storage Virtualization Technologies: 
    - **Block-Level Virtualization**
    - **File-level Virtualization**
- Three Methods:
    - Network-Based
        - Virtualization is handled in the network, between the server and storage (e.g., through an appliance).
        - Centralized and scalable.
    - Host-Based
        - Implemented on the server (host) using software.
        - Each server handles its own virtualization.
    - Array-Based
        - Virtualization is done within the storage array itself.
        - Vendor-specific but efficient for that hardware.

### Storage and Network Architecture

<details>
    <summary>Storage Architecture</summary>
<img src="https://www.cisco.com/c/dam/en/us/td/i/200001-300000/220001-230000/224001-225000/224084.eps/_jcr_content/renditions/224084.jpg" height="220" />

- Top Layer: Hosts and VMs (Virtual Layer)
    - Each VM has associated virtual disk files (e.g., file1.vmdk) that act like their hard drives.
    - These disk files are stored inside datastores.
- Middle Layer: Datastores (Virtual Layer)
    - Bridge between Virtual and Physical
    - Logical containers used to store virtual disk files (.vmdk) and configuration files (.vmx) for VMs.
    - Can have different file system (ex: database1 used VMFS, while database2 used NFS)
- Bottom Layer: Physical Storage (Physical Layer)
    - Actual storage devices that hold the data.
    - Type of storage device:
        - DAS SCSI (Direct Attached Storage)
        - FC SAN (Fibre Channel Storage Area Network)
        - iSCSI (Internet SCSI)
        - NAS (Network Attached Storage)
</details>

<details>
    <summary>Network Architecture</summary>
<img src="https://cdn.mindmajix.com/blog/images/vmware-04_1224.png" height="220" />

- Top Layer: Virtual Machines (Virtual Layer)
    - Has its own virtual network interface card (vNIC).
    - Connects to a vSphere Standard Switch inside the same host.
    - vNIC roles: act as physical network interface cards and cables
- Middle Layer: vSphere Standard Switch (Virtual Layer)
    - This is the virtual switch — it works just like a physical switch but in software.
    - Located inside each host (Host1 and Host2).
    - Connects VMs to each other and to the physical network.
    - Contains Port Groups (A to E):
- Bottom Layer: Physical Network Adapters and Physical Network (Physical Layer)
    - Each host has physical NICs (network interface cards).
    - These connect the host to the external physical network (e.g., internet, other servers).
    - The vSphere Standard Switch uses these physical NICs to bridge virtual traffic to the real world.
</details>

## 2.2 Labs
<details>
    <summary>Main purpose of Lab</summary>
    ```
    PC
    └── VMware Fusion/WorkStation (Type 2 hypervisor)
        └── ESXi (hypervisor, a VM acting like a physical server)
            └── TinyCore, Ubuntu, etc. (nested VMs)
    ```
* You simulate a physical ESXi server using VMware Fusion on your Mac.
* Learn to manage a real hypervisor, not just create VMs.
* Practice remote management via browser, as done in real IT environments.
* Understand how cloud platforms (AWS, Azure) work, since they use hypervisors like ESXi, KVM, or Xen.

 </details>

<details>
    <summary>VMware ESXi, Build VMs</summary>
    <details>
        <summary>Step 1 - Verify Access and setup</summary>
        <img src="https://cdn.blueally.com/virtualizationworks/images/personal-desktop/workstation/vmw-scrnsht-wrkstn-op-sys-lg.jpg" />
        1. Folder [ESXi01 and ESXi02](https://drive.google.com/drive/folders/1ljiPLqRPCpnKLaoPqsuESWfIPXV6mkxr) contain ESXi01.vmx and ESXi02.vmx respectively.
        2. Open VMware and select "Open a Virtual Machine"
        3. Select ESXi01.vmx then create, repeat for ESXi02.vmx
        4. Power on both VMs
    </details>

    <details>
        <summary>Step 2 - Verify VMs and Config networking</summary>
        1. Login to each ESXi VM, Press F2 to access the console, Login with: Username: root and Password: VMware1!
        2. Press F2, Check and configure management network
            - <img src="https://vcloud-lab.com/files/images/1c2c9f3e-edb7-4298-9b14-9aaa91cc31ea.jpg" />
            - IP Configue, Select the ipv4 option
            - Set static IP addresses:
            - ESXi01: 172.20.20.51, Gateway: 172.20.20.2
            - ESXi02: 172.20.20.52, Gateway: 172.20.20.1
        3. Set the network adapter
            - Right-click the VM > Settings
            - Go to Network Adapter
            - Set to: `Custom: vmnet6` (for internal lab network)
    </details>

    <details>
        <summary>Step 3 (Skip) - Create a new ESXi host (as a VM)</summary>
        - Why did skipping Task 3 not cause problems?
        - Purpose: It's there to give you experience installing a fresh ESXi host from scratch, like adding a new server in a data center.
        - ESXi03 is not used in later steps. Task 4 and 5 only require ESXi01 and ESXi02
    </details>

    <details>
        <summary>Step 4 - Manage ESXi Hosts via Web Interface</summary>
        - <img src="https://us1.discourse-cdn.com/spiceworks/optimized/4X/d/6/1/d614135e55fbf8311206531723c1a8c4f6b69b3d_2_651x500.png" />
        - Open a web browser (preferably Firefox).
        - In the address bar, enter the IP address of your ESXi host:
            - For ESXi01: https://172.20.20.51/
            - For ESXi02: https://172.20.20.52/
        - Click “Accept the risk and continue” (bypass SSL warning).
        - Login with: Username: root, Password: VMware1!
        ---
        - <img src="https://www.virten.net/wp-content/uploads/2016/11/esxi-host-client-add-license.png" />
        - Assign a license key: (need key to start vm when create)
            - Navigate to Manage > Licensing > Assign License
            - Use key: JH09A-2YL84-M7EC8-FL0K2-3N2J2
    </details>

    <details>
        <summary>Step 5 - Create New Virtual Machines</summary>
        1. Login to ESXi01 via browser (https://172.20.20.51).
        2. Go to Virtual Machines > Create/Register VM.
        3. Set:
            - Name: YourName-vm1
            - Guest OS: Linux → Ubuntu (64-bit)
            - Memory: 384 MB
            - Disk: 1 GB (thin provisioned)
        4. Power on the VM.
        5. Open the browser console to view the VM.
        6. You’ll likely see an error (because no OS is mounted).
        7. Power off the VM.
        8. Edit Settings:
            - Attach the TinyCore-current.iso from the local datastore (ISO folder).
            - Check the “Connect” box for the CD/DVD drive and Save.
        9. Power on the VM again — it should boot from the ISO and launch TinyCore Linux.
        10. Repeat steps 1–9 for ESXi02:
            - Name the second VM YourName-vm2.
    </details>

    <details>
        <summary>Step 6 - Tidy Up</summary>
        - Shut down any running VMs (on Web)
        - Shut down the ESXi01 and ESXi02 hosts (on VMware (Red button))
    </details>
</details>

---
# 3. Cloud Architecture and Management Mechanisms
## 3.1 Lecture
### Infrastructure of Cloud Service Provider
#### 1. Broadband Networks & Internet Architecture
- Broadband Networks & Internet Architecture: 
    - Internet Service Providers (ISP): Use the ISPs backbone as Cloud Service Provider base
    - Connectionless Packet Switching (Datagram Networks): Divided data into packages (limited size)
    - Router-Based Interconnectivity: Direct packages to correct address
- Data Center Technology:
- Virtualization Technology:
- Web & Service Technology:
#### 2. Data Center Technology
- Facilities: (racks, power, cooling, etc)
- Computing Hardware: (Server, blade servers, etc)
- Storage Hardware: (Hard Disk Arrays, SAN, NAS)
- Network Hardware: (load balancers and accelerator, LAN Fabric, etc)
#### 3. Virtualization Technology
- Server: Physical Server -> Virtual Server
- Storage: Physical Storage -> Virtual Storage
- Network: Physical Router and Switch -> VLANS
- Power: Physical (Uninterruptible Power Supply) UPS -> Virtual UPS
#### 4. Web & Service Technology
- **Web Technology**: Web technologies for implementation and management
- **Service Technology**: Service technologies (SOAP, REST, WSDL) form the foundation of cloud computing.

### Cloud Infrastructure Mechanisms
- **Logical Network Perimeter**: Network isolation for security.
- **Virtual Server**: Software-based emulation of a physical server.
- **Cloud Storage Device**: Storage designed for cloud provisioning.
- **Cloud Usage Monitor**: Software that collects usage data.
- **Resource Replication**: Creation of multiple identical resource instances.
- **Ready-made Environment**: Preconfigured development or runtime environments.

### Cloud Management Mechanisms
- **Remote Administration System**: Central control panel that lets you manage your cloud resources remotely.
- **Resource Management System**: Tools for internal and external resource administration, ensuring your computing power, storage, and network are used efficiently.
- **Service Level Agreement (SLA) Management System**: Monitors uptime/downtime (eg. avaliability and reliability) against service agreements.
- **Billing Management System**: Tracks usage, calculates fees, and issues invoices.

### Cloud Security Mechanisms
- Encryption
- Hashing
- Digital Signatures
- Public Key Infrastructure (PKI)
- Identity and Access Management (IAM)
- Single Sign-On (SSO)
- Cloud-Based Security Groups
- Hardened Virtual Server Images

### Fundamental Cloud Architectures
- **Workload Distribution Architecture**: Balancing load across redundant instances.
- **Resource Pooling Architecture**: Shared resources for multiple consumers.
- **Dynamic Scalability Architecture**: Automatic horizontal scaling of resources.
- **Service Load Balancing Architecture**: Distributes service requests among instances.

### Hosts, Clusters and Resource Pools
- Hosts, Clusters, Resource Pools: Grouping and managing computing resources.
### VCenter Management Server Architecture
- VCenter Management Server: Centralized management with access control, core and distributed services, plug-ins, interfaces.
### VMotion
- Migrates running VMs between physical hosts without downtime by transferring state data and resuming execution.
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