---
id: AWS-Certified-Cloud-Practitioner-CLF-CO2
description: Reference from Stephane Maarek (udemy course)
title: AWS Certified Cloud Practitioner CLF-CO2
---

## 1. What is Cloud Computing?
### Cloud Computing
- Cloud Computing is the on-demand delivery of IT resources—such as servers, storage, and databases—via the internet, with pay-as-you-go pricing. It replaces traditional data centers by allowing users to instantly provision and scale resources without upfront costs.
- **The Deployment Models of the Cloud:**
    - Public Cloud: Provided by third parties (e.g., AWS, Azure, GCP)
    - Private Cloud: Dedicated to a single organization
    - Hybrid Cloud: Mix of public and private
- **Five Characteristics of Cloud Computing:**
    - On-demand access, broad network availability, shared resources (multi-tenancy), rapid scalability, and pay-per-use.
- **Six Advantages of Cloud Computing:**
    - Trade capital expense for variable expense
    - Benefit from massive economies of scale
    - Stop guessing capacity
    - Increase speed and agility
    - Stop spending money running and maintaining data centers 
    - Go global in minutes

### Types of Cloud Computing
- Cloud computing is categorized into three main service models:
    - IaaS (Infrastructure as a Service):
        - Provides raw resources like storage, networking, and virtual machines. You manage everything above the infrastructure.
        - Example: AWS EC2, Azure, DigitalOcean

    - PaaS (Platform as a Service):
        - Providers manage infrastructure and runtime; you manage only your apps and data.
        - Example: AWS Elastic Beanstalk, Heroku, Google App Engine

    - SaaS (Software as a Service):
        - Fully managed products; users only use the software without managing infrastructure.
        - Example: Gmail, Dropbox, Zoom
- AWS has 3 pricing fundamentals (pay-as-you-go model):
    - Compute: Pay per usage time
    - Storage: Pay per GB stored
    - Networking: Pay only for outbound data, free for inbound data
### Global Infrastructure
- [AWS Global Infrastructure Visual](https://aws.amazon.com/about-aws/global-infrastructure/)
    - Regions: Clusters of data centers. Three or more Availability Zones. (e.g., us-east-1)
    - Availability Zones: Isolated zones with low-latency, redundant setups
    - Edge Locations: 400+ global points for fast content delivery

### Security in Cloud: The Shared Responsibility Model & AWS Acceptable Use
- **Shared Responsibility Model**:
    - Customer: Security in the cloud (data, OS, network, firewall)
    - AWS: Security of the cloud (infra, hardware, software)
- **Acceptable Use Policy**:
    - **Prohibits** illegal, harmful, offensive, or abusive activities on AWS.

---
## 2. IAM - Identity and Access Management
### Users, Groups, and (Permissions) Policies
- IAM is a global AWS service used to manage users, groups, and permissions.
    <img src="https://cdn-web.sysbee.net/wp-content/uploads/2024/06/BLOG-AWS-IAM-Users-and-Groups.jpg?x95424" width="500"/>
    - Users represent individuals; groups are collections of users (groups cannot contain other groups).
    - Users can belong to multiple groups or none (though grouping is best practice).
- The root user is created by default for account setup only and should not be used afterward.
- Permissions are granted through IAM policies (JSON documents) assigned to users/groups.

### IAM User & Groups Hands On
<details>
  <summary>Creating IAM User and Group</summary>

  - IAM is a global service (no region selection).
  - Avoid using the root user for daily tasks; create IAM users instead.
  - Create users via the IAM console, set passwords, and assign to groups for easier permission management.
  - Use IAM policies (e.g., AdministratorAccess) by attaching them to groups (e.g., "admin").
  - Tags are optional metadata for organization (e.g., department = engineering).
  - Sign in using account ID or alias – Each AWS account has a unique ID. To simplify the IAM user login URL, you can create a custom account alias (e.g., aws-stephane-v3) to replace the account ID in the sign-in link.
  - Use separate browser windows (normal + incognito) to manage root and IAM users simultaneously.
  - Best practice: Secure all credentials and use IAM users for daily operations.

</details>

### IAM Policies & Hands On
- IAM policies are **JSON documents** that define permissions in AWS.

- Policies can be attached to:
    - <img src="https://miro.medium.com/v2/resize:fit:1400/1*3vJan5-ixsmwVqKRfdda-Q.png" width="500" height="250" />
    - Groups (shared by all members)
    - Users directly (inline policies)
    - Multiple groups (users inherit combined permissions)

#### Policy Structure
<details>
    <summary>Example of Json Structure</summary>
    ```
    {
    "Version": "2012-10-17",
    "Id": "S3-Account-Permissions",
    "Statement": [
        {
        "Sid": "1",
        "Effect": "Allow",
        "Principal": {
            "AWS": ["arn:aws:iam::123456789012:root"]
        },
        "Action": [
            "s3:GetObject",
            "s3:PutObject"
        ],
        "Resource": ["arn:aws:s3:::mybucket/*"]
        }
    ]
    }
    ```
</details>

- Policy Structure Key Parts:
    - **Version**: Policy format (usually "2012-10-17")
    - **Id**: An optional identifier for the policy.
    - **Statement**: Contains one or more permission rules
    - **Sid**: (optional) Statement ID
    - **Effect**: "Allow" or "Deny"
    - **Principal**: Who the policy applies to
    - **Action**: What actions are allowed/denied (e.g., s3:GetObject)
    - **Resource**: What resources the actions apply to (e.g., an S3 bucket)
    - **Condition**: (optional) When the policy applies

#### IAM Policies Hands On

<details>
    <summary>Hands On</summary>
* **User Permissions:**
  IAM users gain permissions from:

  * **Group memberships** (e.g., `admin`, `developers`)
  * **Directly attached policies** (e.g., `IAMReadOnlyAccess`)

* **Group Removal**: Removing a user from a group instantly removes its permissions.

* **Direct Policy**: Attach policies like IAMReadOnlyAccess to give limited access directly to a user.


* **Multiple Policy Sources:**
  Users can have multiple policies from different groups and direct attachments — permissions are cumulative.

* **Custom Policies:**
  Create using a visual editor or JSON to define specific permissions (e.g., `ListUsers`, `GetUser`).

</details>

### IAM MFA (Multi-Factor Authentication)
- Adds a second layer of security by requiring both a password (something you know) and an MFA device (something you own).
- AWS Console -> Account settings -> Edits

### Type of MFA
- Soft Token Multi-Factor Authentication (MFA) device: This is a made-up option and has been added as a distractor. 🙂‍↕️
- Hardware Multi-Factor Authentication (MFA) device: A hardware device that generates a six-digit numeric code
- U2F security key: USB
- Virtual Multi-Factor Authentication (MFA) device: Software app (ex: Google Authentication)

### AWS Access Keys, CLI, and SDK & Hands On
- Access Methods: Management Console, CLI, and SDK.
- Access Keys: Consists of an Access Key ID and Secret Access Key.
    - Used for CLI and SDK access.
    - Must be kept private — each user should generate their own.
- AWS CLI: command in terminal, ideal for automation and scripting. [See more](https://github.com/aws/aws-cli).
    - Download package from official web to setup aws.
- SDK: Integrates AWS calls into app code. Manage your AWS services using a programming language.

#### Access Keys and CLI - Hands On
<details>
    <summary>Hands on</summary>
    1. AWS Console -> IAM -> Users -> your user -> Security credentials -> **Create access key**
    2. Use case: CLI -> Tick Confirmation -> Download .csv file
    3. Login to aws account in CLI:
```
aws configure
```
    4. Run aws iam list-users to view IAM users
</details>
- Alternative to this option is to use **aws cloudshell** (CLI in cloud). [Cloudshell Supported Regions](https://docs.aws.amazon.com/cloudshell/latest/userguide/supported-aws-regions.html).
- Logging into your **AWS account** via terminal. Lets you create, modify, or delete AWS resources (like EC2 instances, S3 buckets, IAM users, etc.).

### IAM Roles for Services
* IAM Roles grant **AWS services** permissions to act on your behalf. Used by services, not users (e.g., EC2, Lambda).
    * Example: An **EC2 instance** uses an IAM Role to access AWS resources (e.g., S3) based on the role’s permissions.
* Common roles: [EC2 Instance Role](#ec2-instance-role), Lambda Role, CloudFormation Role.
* **Key Purpose:** Securely manage service permissions without using long-term credentials.


### IAM Security Tools/Audit - Credentials Report & Access Advisor

* **Credentials Report:**
  Checks if users have secure credentials (e.g., strong passwords, MFA, rotated access keys). → Use it to **audit user security**.
  * AWS Console -> IAM -> Credentials Report

* **Access Advisor:**
  Shows which AWS services a user has actually used and when. → Use it to **remove unused permissions** and enforce least privilege.
  * AWS Consloe -> IAM -> User -> your user -> Access Advisor

---
## 3. EC2 - Elastic Compute Cloud

### What is EC2?
* **EC2:**
  AWS service for renting virtual machines (instances) — part of **Infrastructure as a Service (IaaS)**.
    * **Customize**: OS, CPU, RAM, storage, network, and security groups.
    * **User Data (Bootstrapping):**
  run setup scripts at first launch (with root access)

    * **Instance Types:**
  Wide range of options (e.g.: `t2.micro`) for different workloads.

* [Hands-On: Launching EC2 with User Data Script (Based on Similar Setup)](https://youtu.be/WXxVr01ezgM?si=Jgx0MTikIWRQdZBi)

### EC2 Instance Types

* **Instance Naming:**
  Format: `Class + Generation + Size` (e.g., `m5.2xlarge`)

  * `m` = represent Instance Class as "general purpose"
  * `5` = 5th generation
  * `2xlarge` = size (more CPU/RAM)

* **Main EC2 Categories:**

  * **General Purpose (T, M)** – Balanced (e.g., `t2.micro`, free tier)
  * **Compute Optimized (C)** – CPU-heavy workloads (e.g., ML, video encoding)
  * **Memory Optimized (R, X, Z)** – RAM-intensive tasks (e.g., DBs, analytics)
  * **Storage Optimized (I, G, H)** – High-speed local storage (e.g., OLTP, data warehouses)

* [More Instance-types](https://aws.amazon.com/ec2/instance-types/)

### Security Groups & Classic Ports
* Security Groups:
Act as virtual firewalls for EC2 instances, controlling **inbound and outbound** traffic using $\color{tomato}\text{allow-only}$ rules.

* <img src="https://i.ytimg.com/vi/6SJn30JjmBQ/maxresdefault.jpg" width="500" height="300" />

* Security Groups Rules Include:
    * Type (e.g. SSH, HTTP)
    * Protocol (e.g. TCP)
    * Port number
    * Source (IP range or another security group)

* Key Features:
    * One security group can be attached to multiple instances
    * Instances can have multiple security groups
    * Security groups are region + VPC specific
    * Can reference other security groups for secure internal communication
        * <img src="https://miro.medium.com/v2/resize:fit:1400/1*USnlyvt1pohoVspnmFj7LA.png" width="500" height="300" />

- [Hands-On: Creating Security Groups (Based on Similar Setup)](https://youtu.be/uYDT2SsHImQ?si=7OV-vzumi3Mw83U8)

### SSH to EC2
<details>
    <summary>SSH to EC2 with Linux or Mac</summary>
    - Requirement: Key pair (.pem) when launching EC2
    ```
    ssh -i my-key.pem ec2-user@<public-ip>
    ```
</details>

<details>
    <summary>SSH to EC2 with Window</summary>
    - [Window](https://youtu.be/jv-dgOfFN4o?si=hZnc0xQPSSOytmi-)
    - [Window 10](https://youtu.be/kzLRxVgos2M?si=ceF2f8vbHu44qAWr)
</details>

### SSH vs Access Key
| Feature     | AWS Access Key & CLI                        | SSH into EC2                                |
| ----------- | ------------------------------------------- | ------------------------------------------- |
| Purpose     | Interact with AWS services programmatically | Remote login to a specific EC2 Linux server |
| Credentials | IAM access key + secret key                 | SSH key pair (.pem file)                    |
| Tool used   | AWS CLI                                     | SSH client (e.g., Terminal, PuTTY)          |
| Accessing   | AWS APIs (create, list, delete resources)   | The actual EC2 virtual machine              |


### EC2 Instance Role
-  The Amazon Linux AMI comes with the AWS CLI pre-installed.
    - Never use aws configure or store access keys on EC2 instances — it's a security risk.
- Instead, use [IAM Roles](#iam-roles-for-services) to securely grant EC2 instances permissions. Link to IAM roles.
- [See Demo: IAM Roles on EC2 Instances Tutorial](https://youtu.be/TlCuOjviOhk?si=h5OH9K0M82xcRmPd)

### EC2 Instance Purchasing Options 
* **On-Demand:**
  * Pay per use, no commitment
  * Ideal for short, unpredictable workloads
  * Highest cost

* **Reserved Instances (RI):**
  * 1- or 3-year commitment
  * Up to **72% discount**
  * Best for steady, long-term workloads (e.g., databases)
  * **Convertible RIs** allow instance changes (lower discount)

* **Savings Plans:**
  * Commit to **spend (\$/hr)**, not instance type
  * 1- or 3-year term
  * Up to **70% discount**
  * More flexible than RIs (across OS, size, tenancy)

* **Spot Instances:**
  * Up to **90% off**, but can be **interrupted anytime**
  * Purchase unused AWS EC2 capacity
  * Great for **fault-tolerant** tasks like batch jobs, ML, image processing
  * Not suited for critical or persistent workloads

* **Dedicated Hosts:**
  * Entire physical server for your use
  * Needed for **compliance/licensing**
  * Most expensive option
  * Better visibility & placement control

* **Dedicated Instances:**
  * Run on hardware dedicated to you
  * No control over placement
  * Less isolation than Dedicated Hosts

* **Capacity Reservations:**
  * Reserve capacity in a specific AZ
  * No discounts; pay **on-demand pricing**
  * Ensures availability for **short-term or burst workloads**

---

## 4. EC2 Instance Storage
### EBS - Elastic Block Store & Hands On
#### EBS Volume
- Persistent storage, meaning data remains intact even if the instance is terminated.

#### EBS Volume Attachment and Availability Zones
- One EBS Volume → One EC2 instance (at Cloud Practitioner level). Multi-Attach is available only for io1/io2 volumes at Associate level and above.
- AZ-bound: Volumes are tied to a specific Availability Zone (AZ).
- To move across AZs, create a snapshot, then restore it in the target AZ.
- Attachment Behavior:
    - <img src="https://miro.medium.com/v2/resize:fit:1400/1*OhcL2XQFZSgwiXE2N2fXsg.png" width="450" height="200" />
    - One EC2 instance can have multiple EBS volumes.
    - Volumes can be created unattached and attached later.

#### Delete on Termination Attribute
- Controls whether a volume is deleted when the instance is terminated.
    - Root volume: deleted by default.
    - Other volumes: retained by default.
- You can customize this setting via the AWS Console/AWS CLI.

#### EBS Hands On
<details>
    <summary>Creating, Detaching, Default, and Terminate</summary>

- Exploring EBS Volumes on **EC2**
    - Each EC2 instance has a root EBS volume (e.g., 8 GB by default).
    - You can view attached volumes via the Storage tab or the Volumes section in the AWS Console.

- Creating and Attaching a New Volume
    - Create additional EBS volumes (e.g., 2 GB, GP2).
    - Must be created in the same Availability Zone (AZ) as the EC2 instance.
    - Attach the new volume via Actions → Attach Volume.
    - The instance can now have multiple volumes attached (e.g., root + additional).

- AZ Restriction Demonstrated
    - EBS volumes are tied to their AZ.
    - A volume in eu-west-1a cannot be attached to an instance in eu-west-1b.

- Delete on Termination Behavior
    - Root volume has "Delete on Termination" = Yes by default.
    - Additional volumes are not deleted on instance termination unless configured.
    - You can change this setting during launch or via volume settings.

- Deleting Volumes
    - Volumes can be deleted anytime via Actions → Delete Volume.
    - Detached volumes remain available and manageable independently.

- Key Takeaways
    - EBS volumes are AZ-specific and attachable/detachable dynamically.
    - Root volumes are deleted by default upon instance termination.
    - Additional volumes persist unless explicitly set to delete.
    - To use the new volume that is attached. [Need Formatting](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-using-volumes.html). Out of Scope
</details>

### EBS Snapshots & Hands On
- Point-in-time backups of EBS volumes that can be used to restore data even after volume deletion. No need to detach the volume, but it's recommended for data consistency.
- Use Cases
    - Backup and restore EBS volumes.
    - Move data across Availability Zones or Regions by restoring snapshots elsewhere.
    - Useful for migration, replication, and disaster recovery.
- **Recycle Bin**: Retains deleted snapshots for 1–365 days. Protects against accidental deletion.

#### EBS Snapshots Hands On
<details>
    <summary>Creating, Viewing, Copying, and Recycle Bin</summary>
- Creating a Snapshot
    - Select a EC2 → Elastic Block Store → Volume → Actions → Create Snapshot.

- Viewing Snapshots
    - Select a EC2 → Elastic Block Store → Snapshots

- Copying Snapshots Across Regions
    - Select snapshot → Copy Snapshot → choose target region.
    - Useful for disaster recovery and cross-region backup.


- Creating a Volume from a Snapshot
    - Select snapshot → Create Volume from Snapshot.
    - Choose size, AZ, encryption, and tags.
    - Enables cross-AZ volume creation.

- Recycle Bin Feature
    - Protects against accidental deletion of snapshots and AMIs.
    - Create a $\color{tomato}\text{Retention Rule}$ with a name, resource type, and duration (e.g., 1 day).
    - Deleted snapshots go to Recycle Bin, not lost permanently.
</details>


### AMI - Amazon Machine Image & Hands On
- An Amazon Machine Image (AMI) is a preconfigured template used to launch EC2 instances.
- You need to add: OS, software license, configurations, and monitoring tools.
- Types of AMIs
    - AWS-provided AMIs (e.g., Amazon Linux 2).
    - Custom AMIs created by users for tailored environments.
    - Marketplace AMIs from third-party vendors, available for purchase/use.
- AMI Creation Process
    - Launch and customize an EC2 instance.
    - Stop the instance to ensure integrity.
    - Create an AMI from an EC2 instance, AWS creates **EBS snapshots** of the instance’s volumes behind the scenes. 
    - Use the AMI to launch new EC2 instances, even in other AZs.
- Requirement:
    - The Amazon Machine Image (AMI) must be in the same region as that of the Amazon EC2 instance to be launched. 
    - If the Amazon Machine Image (AMI) exists in a different region, you can copy that Amazon Machine Image (AMI) to the region where you want to launch the EC2 instance.
#### AMI Hands On
- [See Demo: Creating and Launching](https://youtu.be/RR9b0g_Ghrw?si=cYVdJVlMUpcSJ9Pz)

### EC2 Image Builder
- A service that **automates** the creation, maintenance, testing, and distribution of **AMIs** for EC2 instances.
- How It Works
    - <img src="https://miro.medium.com/v2/resize:fit:1400/1*7CuEHqTvk5wK5_-jip9-og.png" height="180" width="700"/>
    - Builder EC2 instance is launched to customize software (e.g., install Java, update CLI, OS patches).
    - After setup, an **AMI** is created automatically.
    - Optionally, after AMI creation, Image Builder can automatically test the AMI by launching test EC2 instances.
- Created AMIs can be copied across regions to support global deployments.


### EC2 Instance Store 
- Hardware-attached storage directly connected to the EC2 host, offering higher I/O performance than EBS but without data persistence.
- Key Characteristics
    - Ephemeral storage: data is lost when the instance is stopped or terminated.
    - Not suitable for persistent or long-term storage.
- Ideal for temporary data, such as: Buffers, Caches, Scratch space


### EFS (Elastic File System)
- A managed network file system (NFS) that can be mounted to multiple Linux EC2 instances simultaneously.
- Shared file system accessible across multiple Availability Zones.
- Key Features
    - <img src="https://miro.medium.com/v2/resize:fit:1400/1*Vz9BS4uksguiE9OGvr8EYg.png" height="180" width="400"/>
    - Highly available, scalable, and fully managed.
    - Can be mounted by hundreds of EC2 instances at once.
    - Works only with Linux-based EC2 instances.
    - AZ-independent: instances in different AZs can access the same EFS volume.

#### EFS vs. EBS
| Feature      | EBS            | EFS                 |
| ------------ | -------------- | ------------------- |
| AZ scope     | Single AZ only | Multi-AZ (shared)   |
| Mountable by | 1 instance     | Multiple instances  |
| Type         | Block storage  | Network file system |
| Data sharing | Not shared     | Shared              |

#### EFS Storage Classes
- **EFS Standard**: default, for frequently accessed files.
- **EFS Infrequent Access (EFS-IA)**:
    - Up to 92% cheaper for rarely accessed files.
    - Files are moved automatically based on lifecycle policies.
    - File access is seamless; applications don't need to know the file’s storage class.

### Shared Responsibility Model for EC2 Storage
* **AWS manages the physical infrastructure**, replication, and secure isolation.
* **Customers are responsible for protecting their data**, through encryption, backup and snapshot procedures, and awareness of storage type limitations.

### Amazon FSx
- A fully managed service that provides third-party high-performance file systems on AWS. It complements services like EFS and S3 when specialized file system capabilities are needed.
- Two main FSx flavors for the exam: FSx for Windows File Server and FSx for Lustre:
    1. **FSx for Windows File Server**
        - Built on Windows File Server technology.
        - Supports SMB, NTFS, and integrates with Active Directory.
        - Ideal for Windows-based workloads.
        - Deployed across multiple Availability Zones for high availability.
    2. **FSx for Lustre** ("Lustre" -> "Linux" and "cluster")
        - High-Performance Computing Linux file system.
        - Supports machine learning, analytics, video rendering, and more.
        - Provides millions of IOPS, sub-millisecond latency, and S3 integration.

#### Visual Diagram of FSx:
<details>
    <summary>FSx for Windows File Server</summary>
    <img src="https://o.quizlet.com/N2MXAZ4UW67qv5UGKw-xcw.png" />
</details>

<details>
    <summary>FSx for for Lustre</summary>
    <img src="https://o.quizlet.com/pvYh9IvwTfzOexBSVD9hUA.png" />
</details>


---
## 5. ELB & ASG - Elastic Load Balancing & Auto Scaling Groups
### High Availability, Scalability, and Elasticity
- High Availability:
    - Running applications across multiple Availability Zones (AZs) to ensure service continuity during failures.
    - Load Balancers and Auto Scaling Groups support multi-AZ deployments.
- Scalability:
    - Vertical: Increasing instance size (e.g., t2.micro → t2.large). Common in databases.
    - Horizontal: Adding more instances (e.g., 1 EC2 → 6 EC2s). Requires distributed systems.
- Elasticity:
    - A cloud-native feature where resource scaling happens automatically based on demand, helping optimize cost.


### Elastic Load Balancing (ELB)
- A managed AWS service that distributes incoming traffic across multiple EC2 instances to improve scalability, availability, and resilience.
- ELB Types:
    - **Application Load Balancer (ALB)**: Layer 7 (HTTP/HTTPS, gRPC)
    - **Network Load Balancer (NLB)**: Layer 4 (TCP/UDP)
    - **Gateway Load Balancer (GWLB)**: Layer 3 (IP layer)
    - **Classic Load Balancer (Old version)**
- ELB Type Definition and Purpose:
    - <img src="https://velog.velcdn.com/images/sunwupark/post/540e0211-ed49-4799-a9e8-5dd169b3f77e/image.png" height="250" width="500"/>

### Application Load Balancer (ALB) Hands On
<details>
    <summary>Demo + Summary</summary>
    - [Demo](https://youtu.be/ZGGpEwThhrM?si=tThFCM94QnBiaiNk)
---
#### **Application Load Balancer (ALB) – Hands-On Summary**

#### EC2 Setup

* Launched **two EC2 instances** using Amazon Linux 2 (t2.micro).
* Added **user data scripts** to return "hello world" on HTTP.
* Verified both instances respond via their public IPs.

#### Creating the ALB

* Created an **Application Load Balancer**.
* Set it as **internet-facing** with **IPv4** in multiple Availability Zones.
* Assigned a new **security group** allowing HTTP (port 80).

#### Configuring Listeners and Target Group

* Created a **target group** (HTTP, port 80).
* **Registered both EC2 instances** as targets.
* Linked target group to ALB listener on port 80.
* Waited for the ALB to become active.

#### Verifying Load Balancing

* Accessed ALB **DNS name** → confirmed it routes to EC2 instances.
* **Refreshed page**: traffic alternated between instances (load balancing working).
* Stopped one instance → ALB automatically routed all traffic to the healthy instance.
* Restarted the instance → once healthy, traffic resumed distributing to both.

#### Key Takeaways

* ALB **distributes HTTP traffic** across healthy EC2 targets.
* **Health checks** ensure traffic goes only to working instances.
* Demonstrated **resilience and automatic failover** using ALB.

</details>

### Auto Scaling Groups (ASG) & Hands On
- A service that automatically adjusts the number of EC2 instances based on demand.
- Key Features:
    - Scale out/in: Adds or removes instances based on load.
    - Health checks: Replaces unhealthy instances automatically.
    - **Min/Desired/Max** size settings define capacity boundaries.
    - Works with Load Balancer to route traffic to healthy instances.

#### ASG Hands On
<details>
    <summary>Demo + Summary</summary>
    - [Demo](https://youtu.be/KNr3Kq7cah8?si=lnLx-csZHQiK3CzX)
    ---
    - AWS Console -> EC2 -> Auto Scaling Groups
    #### Setup
    - Created DemoASG with a Launch Template (Amazon Linux 2, t2.micro, user data, security group).
    - Selected 3 AZs, capacity: min 1, desired 2, max 4.
    #### Configuration
    - Attached to ALB via target group.
    - Enabled EC2 + ELB health checks.
    #### Behavior
    - ASG launched 2 instances, registered with target group.
    - Manually terminated 1 → ASG auto-replaced it.
    - Verified load distribution via ALB DNS.
</details>

### ASG Strategies
- Auto Scaling Groups can be optionally configured to adjust capacity automatically based on defined rules.
- Stategies:
    1. Manual Scaling
    2. Dynamic Scaling (reactive, metric-based)
        - Simple/Step Scaling: Triggered by CloudWatch alarms (e.g., scale out if CPU > 70%).
        - Target Tracking:Maintains a target metric (e.g., keep CPU at 40%) automatically.
        - Scheduled Scaling: Scaling at specific times.
    3. Predictive Scaling: Uses Machine Learning to forecast based on Historical patterns.
---
## 6. Amazon S3 - Simple Storage Service
### S3
* **Core AWS storage**, known for **infinite scalability** (e.g., backup, disaster recovery, analytics, static websites).
* **Data is stored in buckets**, which are **region-specific** and must have **globally unique names**.
* **Objects** are files in buckets, identified by **keys**—the full path to the file (S3 URL).
* Max object size: **5 TB**; use **multipart upload** for files > 5 GB.
* **Public URL** (returns Access Denied unless made public)
* [Demo](https://youtu.be/mDRoyPFJvlU?si=y981aLsS7g9-6Qmh)

### Amazon S3 Security
- S3 security is managed using two types of access control:
    - User-Based: [IAM Policies](#iam-policies)
    - Resourced-Based:
        - Bucket Policies: Policies that get attached to S3 Buckets
        - Object Access Control List (ACL)
        - Bucket Access Control List (ACL)
### Amazon S3 Security - Bucket Policies
- Bucket Policies:
    - JSON Base Policies
- Bucket Settings - Block Public Access:
    - Remove the risk of (company) data leak
### Amazon S3 Security - Accessing Bucket
- Access Methods:
    - Public Access - Use Bucket Policy
    - User Access - Use IAM permission/policy: An IAM principal can access an object **if allowed by IAM or bucket policy** and **no explicit deny exists**.
    - EC2 instance access - Use IAM Roles
    - Cross-Account Access - Use Bucket Policy

### S3 Website Hosting
* Hosts static sites like HTML, CSS, JS from an S3 bucket. Set **index.html** as homepage.
* Turn on **Static Website Hosting** in settings. No support for dynamic code (PHP, DB)
* Make bucket **public** to allow access
* Access via a public S3 website URL (e.g., `http://bucket-name.s3-website-region.amazonaws.com`)


### S3 Versioning
* **Enable Versioning:** Keeps all versions of an object when overwritten.
* **Upload New Versions:** Uploading a file with the same name adds a new version, not a replacement.
* **View Versions:** "Show versions" reveals version IDs, including older and current versions.
* **Rollback**: Permanently deleting the latest version to revert to a previous one.
* **Delete Marker:** Deleting an object will adds a delete marker, which hides the object; deleting the marker restores the previous version.

### S3 Replication & Hands On
* **Two types**: Cross-Region Replication (CRR) and Same-Region Replication (SRR).
* **Versioning** must be enabled on both source and destination buckets.
* **IAM permissions** are required for S3 to replicate data asynchronously.
* **CRR use cases**: compliance, cross-account access, and lower-latency access in another region.
* **SRR use cases**: log aggregation and syncing between production and test environments.


#### S3 Replication Hands On
<details>
    <summary>Demo + Summary</summary>
    - [Demo](https://youtu.be/RV5AXsLR6p4?si=gyRGfH7Wr1FwevV9)
    ---
    #### S3 Replication Hands-On Summary

* **Created origin and target buckets** with versioning enabled in same or different regions.
* **Uploaded a file to the origin** bucket before replication—no replication occurred yet.
* **Configured a replication rule** on the origin bucket with IAM role and full-bucket scope.
* **Only new uploads after rule activation** (e.g., `coffee.jpeg`) are replicated automatically.
* **Replicated versioned updates** (e.g., new version of `beach.jpeg`) are copied with preserved version IDs.

</details>

### [S3 Storage Classes](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5f2vK5Aixq40JYLFrcdh_A.png)

* **S3 Standard**: Default class for frequent access; **99.99% availability**, **low latency**, **multi-AZ**.
* **S3 Standard-IA**: For infrequent access; **lower cost**, **99.9% availability**, **retrieval fees**.
* **S3 One Zone-IA**: Like Standard-IA but **stored in one AZ only**; **99.5% availability**, risk of data loss if AZ fails.
* **S3 Glacier Classes**:
  * **Glacier Instant Retrieval**: Millisecond access, 90-day minimum.
  * **Glacier Flexible Retrieval**: 1 min to 12 hrs access, 90-day minimum.
  * **Glacier Deep Archive**: 12–48 hrs access, 180-day minimum, **lowest cost**. Retain data sets for 7-10 years or longer.
  > Minimum storage duration: you’re billed for the full 90 or 180 days even if you delete the object early.
* **S3 Intelligent-Tiering**: Auto-moves data across tiers (frequent, infrequent, archive) **based on access patterns**; small monitoring fee, no retrieval fee.

### Comparison: S3 Standard, S3 Standard-IA, S3 One Zone-IA
| Feature                  | **S3 Standard**        | **S3 Standard-IA**                  | **S3 One Zone-IA**                                                    |
| ------------------------ | ---------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| **Availability Zones**   | 3+ AZs                 | 3+ AZs                              | **1 AZ only**                                                         |
| **Durability**           | 99.999999999% (11 9’s) | 99.999999999%                       | 99.999999999%                                                         |
| **Availability**         | 99.99%                 | 99.9%                               | **99.5%**                                                             |
| **Access Frequency**     | Frequent               | Infrequent                          | Infrequent                                                            |
| **Retrieval Time**       | Instant                | Instant                             | Instant                                                               |
| **Cost**                 | Highest                | Lower                               | **Lowest (20% cheaper than Standard-IA)**                             |
| **Use Case Suitability** | Active data            | Infrequent access but critical data | Infrequent access and **non-critical data** that can be **recreated** |

#### Main Difference:
- S3 One Zone-IA stores your data in just one AZ, so it costs less but is less resilient to AZ failure.
- Other classes (like Standard and Standard-IA) replicate data across at least 3 AZs, giving you higher availability and fault tolerance.

### S3 Lifecycle Rules
- Click in your S3 -> Management.
- Manually defined policies to transition objects between storage classes. You choose the timing and storage class transitions.
#### S3 Intelligent-Tiering vs Lifecycle Rules
- S3 Intelligent-Tiering: Automatically moves objects between tiers based on access; best for unpredictable usage with a small monitoring fee.
- Lifecycle Rules: Manually set transitions based on time; best for predictable patterns with no monitoring cost.


### S3 Encryption
* **Server-side encryption** (default): S3 automatically encrypts objects on upload.
* **Client-side encryption**: Users encrypt data before uploading.
* Both models exist, but **server-side is enabled by default**.

Here’s a concise summary of the four topics:


### IAM Access Analyzer for S3

* Monitors S3 bucket access by analyzing bucket policies, ACLs, and access points.
* Identifies public or cross-account access so you can review and secure unintended exposure.


### Shared Responsibility Model (S3)

* **AWS:** Manages infrastructure, availability, and internal security.
* **You:** Responsible for setting up versioning, encryption, policies, logging, and storage class selection.


### AWS Snowball & Snowball Edge
- Purpose: Physical devices for moving large data or running compute in remote/offline locations.
- Types:
    - Storage Optimized – 210 TB for bulk data transfer.
    - Compute Optimized – 28 TB + supports EC2/Lambda at the edge.
- Pricing: Free to upload into S3; pay for device use & data leaving AWS.

### AWS Storage Gateway

* Bridges on-premises storage with AWS cloud in **hybrid cloud** setups.
* Enables backup, disaster recovery, and cloud tiering using services like **S3, Glacier, and EBS**. 
    * (AWS Storage Gateway works with these aws services behind the scene)
* Types include **File, Volume, and Tape Gateways**. (No need to remember)

### Summary of storage services in AWS
| **Service**            | **Type**                | **Description**                                                                 |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| **Amazon EBS**         | Block Storage           | Like a virtual hard drive for EC2 instances. Used for operating systems, apps.  |
| **Amazon EFS**         | File Storage            | Shared file system (like a network drive). Multiple EC2s can access it.         |
| **EC2 Instance Store** | Temporary/Ephemeral Block Storage | Fast, local storage tied to the EC2 instance — **data lost on stop/terminate**. |
| **Amazon S3**          | Object Storage          | Stores files (objects) like images, videos, backups. Not a database.            |

---
## 7. Databases & Analytics

### Database
- Databases store structured data with indexes for fast search and querying.
- Unlike EBS, S3, or EFS, databases support relationships, queries, and data integrity.
- Managed (RDS, DynamoDB): AWS handles patching, backups, scaling, availability.
#### Types of Databases
1. Relational Databases (SQL): Structured like Excel, Use SQL for querying
2. NoSQL Databases: Flexible schema (e.g., JSON format).

### Relational Database Services (RDS) <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS--XGoyWXydfrCdqSxzgNoAdPApX0FsM7fiQ&s" width="35" height="35"/> & Aurora <img src="https://dbdb.io/media/logos/amazon-aurora_IGQMXko.png" width="35" height="35"/>
- Amazon RDS:
    - Managed relational database service.
    - Supports MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.
    - Includes backup, scaling, multi-AZ, read replicas.
    - No SSH access.
- Amazon Aurora: -> (~20% more expensive but efficient)
    - AWS-built relational DB (MySQL/PostgreSQL compatible).
    - 3–5x faster than RDS, auto storage scaling (up to 128 TB).
- Aurora Serverless: (no need to manage)
    - Auto-starts/stops DB as needed.
    - Pay per second — great for variable workloads.

### RDS Deployment Options
<details>
    <summary>Read Replicas</summary> 
- <img src="https://blog.kakaocdn.net/dn/6CbTE/btsFt3jiJlk/OWNFQ5olLsIufgD3gymKm1/img.png" width="400" height="200"/>

- **Improves database scalability**
- Scale read-heavy apps by adding up to 15 replicas; writes go to the main DB only.
</details>

<details>
    <summary>Multi-AZ</summary>
- <img src="https://miro.medium.com/v2/resize:fit:1400/1*LShRzZE-hC8CdcoE0l_FrA.png" width="400" height="200"/>
- **Adds high availability** by syncing to a standby in a different AZ with automatic failover.
- The failure DB is a passive, won't be accessible unless issue occur with main DB
- Can only have | other AZ as failover
</details>

<details>
    <summary>Multi-Region Replicas</summary>
- <img src="https://miro.medium.com/v2/resize:fit:1400/1*QkeudpFL4iXU-NNuO68U5A.png" width="650" height="200"/>
- Improve global read latency and enable disaster recovery across AWS regions (writes still go to main region DB). 
</details>


### Amazon ElastiCache (Redis / Memcached) <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Database/64/Arch_Amazon-ElastiCache_64@5x.png" width="35" height="35"/>
* <img src="https://miro.medium.com/v2/resize:fit:1400/1*7_uENzl5A5zlL9C78Utaaw.png" width="400" height="200"/>
* **Managed in-memory database** used to cache frequently accessed data for low-latency performance.
* **Reduces load on RDS or other DBs** by handling repetitive read-heavy operations.
* Supports **Redis and Memcached**; AWS manages patching, recovery, and scaling.
* Use when you need **sub-millisecond latency** for frequent queries.
* Integrated into typical architectures alongside EC2 and RDS.

### Amazon DynamoDB <img src="https://svgmix.com/uploads/133ab8-aws-dynamodb.svg" width="35" height="35"/> & DynamoDB Accelerator (DAX)
* **Fully managed, serverless NoSQL key-value database** with **single-digit millisecond latency**.
* Scales automatically to **millions of requests/second** and stores **trillions of rows**.
* Schemaless: Each item can have different attributes. Not every item has to have all attributes (Null).
* No joins or foreign keys — all data lives in a single table format.
* **DynamoDB Accelerator - DAX**: Optional in-memory cache for DynamoDB (microsecond read latency).

### DynamoDB Global Tables
* <img src="https://o.quizlet.com/7Ko48zUIKL2jovxDUUc-kA.png" width="600" height="200"/>
* Enable **multi-region, low-latency** access by replicating tables across regions.
* Allow **active-active writes** — write in any region, replicate to others.
* Useful for **global apps** needing fast local access and **disaster recovery**.
* Supports **up to 10 regions** in sync at once.



### Amazon Redshift & Serverless <img src="https://d4.alternativeto.net/7VLzCxPwDeph6hQ1L3u09_Ff3hd1QMlf4LkAembpUOQ/rs:fit:280:280:0/g:ce:0:0/exar:1/YWJzOi8vZGlzdC9pY29ucy9hbWF6b24tcmVkc2hpZnRfMjIxMjc5LnBuZw.png" width="35" height="35" />

* **Type**: OLAP (Online Analytical Processing) database based on PostgreSQL.
* **Purpose**: **Data warehousing and analytics** — used for complex queries on large volumes of structured data.
* **Key Features**:
  * **Columnar storage** for fast performance.
  * **MPP (Massively Parallel Processing)** for high-speed computations.
  * **Integrates with BI tools** like QuickSight & Tableau.
* **Redshift Serverless**:
  * No need to manage infrastructure.
  * **Auto-scales compute based on query load.**
  * Pay-per-use pricing for analytics workloads.
* **Use Cases**:
  * Analytics dashboards, reporting, business intelligence (BI).


### Amazon EMR (Elastic MapReduce) <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSsHvNGzEeI3WXeutD738NrTA3dlRcSscF5TsugNKNkn_gXpKd5" width="35" height="35" />

* **Type**: Not a database — **Big Data processing framework**.
* **Purpose**: Run **Hadoop/Spark clusters** to process large datasets across multiple EC2 instances.
* **Key Features**:
  * **Supports Apache tools** like Spark, Hive, HBase, Presto, Flink.
  * **Auto-scaling** and **Spot instance** integration for cost-efficiency.
  * You manage the logic and jobs, **EMR provisions and configures the infrastructure.**
* **Use Cases**:
  * Machine learning pipelines, web indexing, log processing, batch jobs.
* **Exam Tip**: Any question mentioning Hadoop = **EMR**.


### Amazon Athena <img src="https://miro.medium.com/v2/resize:fit:396/1*1mwBsL4aHXssiS2IecYn6w.png" width="35" height="35"/>

* **Type**: **Serverless SQL query engine** for data in Amazon S3.
* **Purpose**: **Query S3 data directly** using SQL, no data loading required.
* **Key Features**:
  * No infrastructure to manage, only pay for queries you run
  * **Pay-per-scan**: \~\$5 per TB of data scanned.
* **Exam Tip**: If you see `SQL on S3` or `serverless analytics`, the answer is **Athena**.


### Amazon QuickSight <img src="https://svgmix.com/uploads/c3f803-aws-quicksight.svg" width="35" height="35"/>

* **Serverless BI tool** to build dashboards, charts, and data visualizations.
* **Integrates** with RDS, Athena, Redshift, Aurora, and S3.


### Amazon DocumentDB <img src="https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/core-aws-services/manage-databases-on-aws/images/f88cd56ac98152f9855668e81eb9a5a1_i.39.jpg" width="35" height="35"/>

* **Fully managed NoSQL** database, **MongoDB-compatible**.
* Stores and queries **JSON** data, auto-scales storage, and replicates across 3 AZs.
* Exam Tip: `MongoDB -> DocumentDB`, `NoSQL -> DocumentDB/DynamoDB`


### Amazon Neptune <img src="https://dbdb.io/media/logos/amazon-neptune.png" width="35" height="35"/>

* **Graph database** for highly connected data (e.g., social networks, knowledge graphs).
* Supports **billions of relationships** with millisecond latency; **fully managed** and replicated.
* Exam Tip: Anything related to graph databases, think no more than Neptune.

### Amazon Timestream <img src="https://cdn.sanity.io/images/z7wg6mcy/production-2025/b7e02b821517d368b5884003377de702c5f8b623-474x474.png" width="35" height="35"/>

* **Time series database**, optimized for data that changes over time (e.g., sensor metrics).
* **Serverless**, auto-scaling, and fast — ideal for real-time analytics.
* Exam Tip: `Time series data -> Timestream`

### Amazon Quantum Ledger Database (QLDB) <img src="https://dbdb.io/media/logos/amazon-qldb.png" width="35" height="35"/>
- A ledger is a book recording financial transactions
- Amazon QLDB is a fully **managed ledger database** designed to provide a transparent, immutable, and cryptographically.
- Track applications' data change and maintains a complete and verifiable history of changes over time.


### Amazon Managed Blockchain <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGtCRdpUfBQjjbtP839733grF25hp2Ga1n0wP4l4JJx5QtvI-J" width="35" height="35"/>
* Blockchain = digital notebook + shared by everyone + can’t be changed + adds new pages only
* Lets you **create or join blockchain networks** using **Hyperledger Fabric** or **Ethereum**.
* Ideal when multiple parties need to **transact without a central authority**.
* Exam Tip: Anything related to `Blockchains, Hyperledger Fabric, or Ethereum -> Amazon Managed Blockchain`


### AWS Glue & Glue Data Catalog <img src="https://d3g9o9u8re44ak.cloudfront.net/logo/40c0988b-b7ec-4c51-9732-5fd3c7d52928/96ad06d5-cf24-4ffe-94fb-5d3085d7d3eb.png" width="35" height="35"/>
* <img src="https://velog.velcdn.com/images/jungmyeong96/post/7d8eb21b-d635-4a0f-a0b5-608de375f01c/image.png" width="550" height="110" />
* **Serverless ETL** (Extract, Transform, Load) service for `preparing data` for analytics.
* Pulls data from sources like S3/RDS → transforms it → loads into destinations like Redshift.
* **Glue Data Catalog** helps store metadata for use in Athena, EMR, and Redshift.
    * A central repository to store structural and operational metadata for data assets in AWS Glue


### AWS DMS (Database Migration Service) <img src="https://webfor.com.br/wp-content/uploads/2020/05/AWS-DMS-1.png" width="35" height="35"/>
* <img src="https://docs.aws.amazon.com/images/dms/latest/userguide/images/datarep-Welcome.png" width="400" height="120" />
* A tool that helps you move data from one database to another with minimal downtime
* Supports **homogeneous** (same DB type) and **heterogeneous** (e.g., SQL → Aurora) migrations.
* No downtime — source DB stays live during migration.
* **Exam Tip**: Migrating an on-premises database to run on Amazon EC2: Answer is [AWS MGN](#application-discovery--migration-services), not DMS. Move to EC2 not Database Service.

---

## 8. Other Compute Services: ECS, Lambda, Batch, Lightsail

### ECS <img src="https://avatars.githubusercontent.com/u/41175493?s=280&v=4" width="35" height="35"/>, Fargate <img src="https://miro.medium.com/v2/resize:fit:393/1*BCgeXMygZAH_xXzKG8vvQQ.png" width="35" height="35"/>, & ECR <img src="https://miro.medium.com/v2/resize:fit:908/1*w4N8NNxnCo-qhADUe5BsGQ.png" width="35" height="35"/>
* **ECS (Elastic Container Service):** Run Docker containers on EC2. You manage the infrastructure.
* **Fargate:** Serverless container service — runs containers **without managing servers**.
* **ECR (Elastic Container Registry):** Private Docker image storage for ECS and Fargate.

### Amazon EKS <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSeC4uqx4i2pyJ3poAOdJUrMSucsCE3s5o-luFB6p4KVjGMDGy4" width="35" height="35"/>
* **EKS (Elastic Kubernetes Service):** Run and manage **Kubernetes clusters** on AWS.
* Supports both EC2 and Fargate as compute backends.
* Best for **container orchestration** in a cloud-agnostic way.

### AWS Lambda <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Amazon_Lambda_architecture_logo.png" width="35" height="35"/>
* Run code **on demand** with **no servers to manage**.
* Event-driven: triggered by S3, API Gateway, DynamoDB, CRON jobs, etc.
* Supports many languages; scales automatically; **pay per request + compute time**.
* Limited to 15 minutes runtime.

### Serverless Model
* You focus on **code**, AWS manages the **servers**.
* Examples: **Lambda, S3, DynamoDB, Fargate, API Gateway**.
* Benefit: no provisioning, auto-scaling, and low cost for idle services.

### API Gateway <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQskLskbPfCMYvpR3AAGdk0RLcVLGte5cg60znxNEdPxfqQHphJ" width="35" height="35"/>
* Fully managed service for developers to create, publish, maintain, monitor, and secure APIs in the cloud.
* Exposes Lambda as public REST or WebSocket APIs (as HTTP API).
* Essential for **serverless backend APIs**.
* Exam tip: Serverless APIs → use API Gateway + Lambda.


### AWS Batch <img src="https://miro.medium.com/v2/resize:fit:512/1*6rXWSZPH35w1dIDGvZLqsg.png" width="35" height="35"/>
* **Managed service** for running **batch jobs** (start → end) at any scale.
* Uses **Docker + ECS** to define jobs.
* **Auto-launches EC2 or Spot Instances** based on job needs.
* Great for **image/video processing**, **data transformations**, etc.
* Managed Server, not a serverless (uses EC2 behind the scenes).
* No time limit, supports any language, more storage.

### Amazon Lightsail <img src="https://miro.medium.com/v2/resize:fit:502/1*nl8FoqCpX3vYZvRUyjf1lw.png" width="35" height="35"/>
* **All-in-one service**: VM + database + storage + networking.
* Very **simple setup** — great for **beginners**.
* Predictable pricing.
* Limited features — **no auto scaling**, **low AWS integration**. (Not ideal for advanced AWS users)

---
## 9. Deployments & Managing Infrastructure at Scale

### Provisioning - CloudFormation <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbIlimm%2FbtrG0CLPqUx%2FAAAAAAAAAAAAAAAAAAAAACe355p_RkyvzpMpVq6Tu07RAP_4NibR1iTObQmf3Tip%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1753973999%26allow_ip%3D%26allow_referer%3D%26signature%3DOZOvppUX%252BCnXrXY3UGxN6svKhV8%253D" width="35" height="35"/>

* **Infrastructure as Code (IaC)**: Define AWS resources in YAML/JSON.
* **Declarative**: You say *what* you want; CFN figures out *how* to create/update/delete it.
* **Best for**: Repeating architecture across accounts or regions.
* Similar tool: Terraform

### Provisioning - CDK (Cloud Development Kit) <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvUpo_hGOHq-qAZOqUY2NN7-CLCDoZlX8y2X2or9GkzpYDt8AasUN0ByYIrXITwgqDtI&usqp=CAU" width="35" height="35"/>
* <img src="https://miro.medium.com/v2/resize:fit:1400/1*wBGOirOjFXGjhIPOfd3v1g.png" width="600" height="150" />
* **Define infrastructure using code** (Python, JS, etc.).
* CDK → Compiles to CloudFormation template.
* **Best for**: Developers who prefer real code over YAML.

### Provisioning - Elastic Beanstalk <img src="https://www.cdnlogo.com/logos/a/70/aws-elastic-beanstalk.svg" width="35" height="35"/>

* **PaaS for web apps**: Deploy your code, AWS handles the infrastructure. Limited to programming language and docker
* Supports multiple platforms (Node.js, Python, Java, Docker).
* **Best for**: Quick deployments with minimal infrastructure management.

### Application deployment - CodeDeploy <img src="https://i0.wp.com/mistwire.com/wp-content/uploads/2021/09/Arch_AWS-CodeDeploy_64%405x.png?ssl=1" width="35" height="35"/>

* **Automated deployments** to EC2 & on-prem servers. (**Hybrid**)
* Requires CodeDeploy Agent installed.
* **Best for**: Rolling updates of application versions.

### Developer Services - CodeCommit <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1668006093966/aBvNnW-Sj.png?auto=compress,format&format=webp" width="35" height="35"/>

* **Git repository in AWS** (Discontinued for new users after July 2024).
* **Exam tip**: Treat references as "GitHub-like" Git repositories.

### Developer Services - CodeBuild <img src="https://www.asxconsulting.co.uk/img/blog/CodeBuild.png" width="35" height="35"/>
* <img src="https://miro.medium.com/v2/resize:fit:1400/1*GNpPJUF4gUK3phQUtx-W7g.png" height="80" width="650" />
* **Build service**: Compile code, run tests, create deployable packages.
* **Fully managed**, serverless, pay-as-you-go.

### Application deployment - CodePipeline <img src="https://d4.alternativeto.net/XUyleBBHdmrOqoZO9GnEOB_lvWrHbyVnpHvNo5P5G8A/rs:fit:280:280:0/g:ce:0:0/exar:1/YWJzOi8vZGlzdC9pY29ucy9hd3MtY29kZXBpcGVsaW5lXzIzNTIzNi5wbmc.png" width="35" height="35"/>
* <img src="https://miro.medium.com/v2/resize:fit:1400/1*6tcbMASoHXM6MSDPIk_J0Q.png" height="100" width="420" />
* **CI/CD orchestration**: Connect CodeCommit → CodeBuild → CodeDeploy.
* **Best for**: Automating code integration & delivery processes.

### Developer Services - CodeArtifact <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Developer-Tools/64/Arch_AWS-CodeArtifact_64@5x.png" width="35" height="35"/>

* **Secure artifact repo** (npm, pip, Maven, etc.).
* Store software packages/dependencies on AWS.

### Configuration management - AWS Systems Manager (SSM) <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Management-Governance/64/Arch_AWS-Systems-Manager_64@5x.png" width="35" height="35"/>
- A **hybrid operations** management tool for AWS and on-premises servers.
- Helps **automate** tasks like patching, running commands, and storing configurations.
- **Centralized** tool for monitoring, managing, and troubleshooting **AWS resources**. **Gives operational insights** to quickly detect and resolve issues affecting applications.
- Create logical groups of resources. Able to select a resource group and view its recent API activity.


#### Feature Systems Manager - Session Manager Highlights 
- Allows **secure shell** (SSH-like) or PowerShell access to EC2 instances/Linux/macOS/Windows — **without opening ports**, using bastion hosts, or requiring public IPs.
- Needs IAM role (AmazonSSMManagedInstanceCore) + SSM Agent.
- Sessions can be logged to S3 or CloudWatch.

#### Feature Systems Manager - Parameter Store Highlights
- Store config and secrets as string or encrypted string.
- Supports versioning and access control with IAM.
- Fully serverless and scalable.

### Configuration management - AWS OpsWorks
- Managed configuration management service that runs Chef and Puppet.
- Automates how servers are configured, deployed, and managed across EC2 instances or on-premises servers.
- Supports hybrid environments.
- Best for: teams already using Chef/Puppet and wanting AWS to manage the control servers.


---
## 10. Leveraging the AWS Global Infrastructure

### Why Global Applications & AWS Global Infrastructure

* **Global applications** run across multiple AWS regions to reduce latency, support disaster recovery, and improve resilience against attacks.
* AWS global infrastructure includes:
  * **Regions**: Independent geographies.
  * **Availability Zones (AZs)**: Isolated data centers within a region.
  * **Edge Locations**: For cache **copies** of the content (images, videos, files) via CloudFront.
* Benefits: Reduced latency, improved fault tolerance, and disaster recovery support.

### Amazon Route 53 (DNS + Routing Policies) <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Networking-Content-Delivery/64/Arch_Amazon-Route-53_64@5x.png" width="35" height="35"/>

* **Route 53** is AWS's managed DNS service that maps URLs to resources.
* **Record types**:
  * A / AAAA: Map to IPs.
  * CNAME: Map to another hostname.
  * Alias: Map to AWS resources (e.g., ELB, CloudFront).
* **Routing Policies**:
  * **Simple**: One IP, no health check.
  * **Weighted**: Traffic split by weights (with health checks).
  * **Latency**: Routes to lowest-latency region.
  * **Failover**: Switch to backup if the primary fails (with health checks).
* **Features**: Domain Registeration, DNS, Health Checks, Routing Policy

### Amazon CloudFront (CDN) <img src="https://miro.medium.com/v2/resize:fit:300/1*ewJ50Sr51nkSy2sqtYtnTg.png" width="35" height="35"/>

* **CloudFront** is AWS’s global CDN that caches static content (images, HTML) at 216+ Edge locations.
* Supports **S3, EC2, and custom HTTP origins**.
* Uses **Origin Access Control (OAC)** for secure access to private S3 buckets.
* Reduces latency, improves load speed, and provides DDoS protection.
* CDN use "Caching Content in Edge Location" to improve read performance.
* WAF & Shield can help protect from web attacks.

### S3 Transfer Acceleration

* Speeds up file uploads/downloads to **S3 buckets in distant regions** by routing data through nearby **Edge Locations** and AWS’s internal network.
* Useful for **global uploads/downloads**.
* Typically improves speed by \~13% or more depending on location and internet quality.

### AWS Global Accelerator <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Networking-Content-Delivery/64/Arch_AWS-Global-Accelerator_64@5x.png" width="35" height="35"/>

* <img src="https://pic1.zhimg.com/v2-1f1898d28d9db15cf66c520455946824_1440w.jpg" height="150" width="200" /> <img src="https://miro.medium.com/v2/resize:fit:1400/1*5tw5mqUNd9U-k8gHSH6IdA.png" height="150" width="450" />
* Optimizes global application performance by routing traffic through **AWS’s private global network**.
* Provides **static Anycast IPs** and low-latency routing for **TCP/UDP** traffic.
* **Does not cache content** (unlike CloudFront).
* Ideal for apps needing fast, reliable, region-aware access with failover.

### AWS Outposts <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-z4LQmqLNwrvb8Iz9Ch6iDek6l71I32KDZEtg4tBlcmfqPN862znz6syZVr3aeUI13Q&usqp=CAU" width="35" height="35"/>

* AWS installs and manages **physical servers in your on-premises data center**.
* Provides the **same AWS APIs/services locally** (e.g., EC2, S3, RDS).
* Supports **hybrid cloud** scenarios with **low latency**, **local data residency**, and **cloud integration**.

### AWS Wavelength <img src="https://miro.medium.com/v2/resize:fit:530/1*Ccgza3OWc4K2hEAQUARkXw.png" width="35" height="35"/>

* Deploy AWS services (e.g., EC2, VPC) **at the 5G edge** within telecom providers' infrastructure.
* Enables **ultra-low latency** for mobile/IoT that optimize with 5G. Use cases (e.g., smart cities, AR/VR, live video, gaming).
* Not the best choice if the game isn't primarily targeting mobile 5G users.
* Keeps user traffic **within the telecom network**, enhancing speed and privacy.

### AWS Local Zones <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_Compute/64/Arch_AWS-Local-Zones_64@5x.png" width="35" height="35"/>

* Extend your AWS region to **additional nearby cities**.
* Supports compute, storage, databases closer to end-users.
* Deployed as **extensions of AWS regions**, allowing you to run latency-sensitive workloads closer to users.

### Global Application Architecture Models

* **Single Region, Single AZ**: Low availability and high latency globally.
* **Single Region, Multi-AZ**: High availability, but no global latency benefits.
* **Multi-Region Active-Passive**: One write region, others read-only (improves read latency).
* **Multi-Region Active-Active**: All regions support reads/writes (best latency, highest complexity).

---
## 11. Cloud Integrations

### Cloud Integration Patterns

* **Synchronous Communication**: Services call each other directly (e.g., buying → shipping service).
* **Asynchronous Communication**: Uses intermediaries (queues) like SQS or SNS to **decouple** services.
* **Benefits of decoupling**: Independent scaling, fault isolation, better traffic handling.

### Decouple Serices - Amazon SQS (Simple Queue Service) <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/418713/thumbs_112/img6276454435533350628-2x.png" width="35" height="35"/>

* A **fully managed** message queue to decouple producers and consumers.
* Supports **Standard queues** (best-effort ordering) and **FIFO queues** (guaranteed order).
* **Scales automatically**, messages retained for up to 14 days.
* Use case: video processing layer that scales based on queue depth.
* Consumers must **poll** and **delete** messages after processing.

### Decouple Serices - Amazon SNS (Simple Notification Service) <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQeU9hi8Ldu8arQmAqh989o8ADsT3OY5TwaR_YqFpQ1-rUwdTXD" width="35" height="35"/>

* <img src="https://velog.velcdn.com/images/chan9708/post/161eea41-b165-4940-ae02-8ac4af820550/image.png" height="150" />
* **Pub/Sub** model: one publisher, many subscribers.
* Each subscriber (email, Lambda, SQS, HTTP, SMS, etc.) receives **all messages**.
* Ideal for **notifications and fan-out** scenarios.
* Supports millions of subscriptions per topic.

### Amazon Kinesis <img src="https://cdn.worldvectorlogo.com/logos/amazon-kinesis-1.svg" width="35" height="35"/>

* <img src="https://miro.medium.com/v2/resize:fit:1400/1*NlqVtbHeKuBGeqqfa5ZD9w.png" height="190" />
* Used for **real-time data streaming, persistence and analysis** at scale.
* Core services:
  * **Kinesis Data Streams** – Ingests real-time data.
  * **Kinesis Data Firehose** – Loads data to targets like S3, Redshift.
* Use case: streaming analytics and dashboards.


### Amazon MQ <img src="https://cloud-icons.onemodel.app/aws/Architecture-Service-Icons_01312023/Arch_App-Integration/Arch_64/Arch_Amazon-MQ_64@5x.png" width="35" height="35"/>

* Managed message broker supporting **RabbitMQ** and **ActiveMQ**.
* Designed for **legacy apps** using open protocols (MQTT, AMQP, STOMP, Openwire, WSS). Good for app that don't support SQS & SNS.
* When migrating to the cloud, instead of re-engineering the application to use SQS and SNS, we can use Amazon MC.
* **Not as scalable** as SQS/SNS; requires multi-AZ setup for high availability.
* Amazon MQ has both queue feature (~SQS) and topic features (~SNS)

---
## 12. Cloud Monitoring

### Amazon CloudWatch

#### CloudWatch Metrics

* Collects performance data (e.g., `CPUUtilization`, `NetworkIn`, `Billing`).
* Default: 5-minute intervals; 1-minute with **Detailed Monitoring** (extra cost).
* Used for EC2, EBS, S3, etc.
* **No native RAM metric for EC2**—must install custom agent.

#### CloudWatch Alarms

* Triggered when a **metric breaches a threshold**.
* Can take actions like:
  * Auto Scaling
  * EC2 stop/terminate/reboot/recover
  * Send notifications via SNS
* Alarm states: `OK`, `INSUFFICIENT_DATA`, `ALARM`


### CloudWatch Logs

* Centralized **log collection and retention** system.
* Sources' collect log from: Lambda, EC2 (via CloudWatch Agent), ECS, CloudTrail, etc.
* CloudWatch log agents: on EC2 machines or on-premises servers
    * EC2 needs **CloudWatch Agent** and proper IAM role to send logs.
* Supports **custom retention** (1 day to indefinite).


### Amazon EventBridge (formerly CloudWatch Events)

* **Event-driven architecture service** that reacts to AWS events or runs **scheduled tasks**.
* Use cases:
  * Cron jobs (e.g., run Lambda every hour)
  * Trigger actions on **IAM root logins**, **EC2 termination**, etc.
* Supports custom and partner event buses.
* Advanced features: **schema registry**, **event archiving**, **replay**


### AWS CloudTrail

* **Audit log** of all API calls & user activities (Console, CLI, SDK).
* Default retention: **90 days** for Event History.
* Send logs to **S3** or **CloudWatch Logs** for extended storage and alerting.
* Tracks **who did what, when, and from where** (e.g., EC2 termination, user login).


### AWS X-Ray

* <img src="https://miro.medium.com/v2/resize:fit:1400/1*vqJGTSA7sbVnxEu5tQRf-w.png" height="180"/>
* **Distributed tracing** for applications (especially microservices).
* Helps developers analyze and debug production as well as distributed applications
* Visualizes **service maps**, detects bottlenecks, and traces requests end-to-end.
* Useful for understanding and debugging complex **event-driven systems** using SQS, SNS, Lambda, etc.


### Amazon CodeGuru

* **ML-powered DevOps tool** for code quality and performance.
* Two components:
  * **CodeGuru Reviewer**: Static code reviews (supports Java/Python).
  * **CodeGuru Profiler**: Identifies expensive or inefficient runtime code in production.


### AWS Health Dashboard - Service Health

* **Service Health**: Shows global AWS service status by region.
* **Account Health**: Personalized view of events affecting **your account/resources**.
* Includes:
  * Real-time alerts
  * Scheduled maintenance notifications
  * Event logs for historical tracking
* Service health offers the possibility to subscribe to an RSS feed to be notified of interruptions to each service

---
## 13. VPC & Networking

### VPC Basics

* **VPC (Virtual Private Cloud)**: Isolated network in AWS within a region to deploy resources like EC2.
* **Subnets**: Divide VPC into smaller ranges; each tied to an Availability Zone.
  * **Public Subnet**: Has a route to an **Internet Gateway**.
  * **Private Subnet**: No direct internet access.
* **CIDR Block**: Defines the IP address range of the VPC.
* **Exam Tip**: VPC = your own private network in the cloud. Public subnet has a route to the internet.


### IP Addressing in AWS

* **Public IPv4**: Reachable over internet; changes on stop/start unless Elastic IP is used.
* **Private IPv4**: Internal to VPC; persists across reboots.
* **Elastic IP**: Static public IPv4 for EC2.
* **IPv6**: All IPv6 addresses are **public** and **free** in AWS.
* **Exam Tip**: IPv4 public IP changes unless Elastic IP is attached. IPv6 is public and free.


### Internet Gateway & NAT Gateway

* **Internet Gateway**: Enables internet access for public subnets.
* **NAT Gateway**: Allows instances in **private subnets** to access the internet **outbound only**.
* **Exam Tip**: Use NAT Gateway for private subnet internet access.


### Security Groups vs Network ACLs (NACLs)

| Feature    | Security Group | Network ACL (NACL) |
| ---------- | -------------- | ------------------ |
| Level      | Instance level | Subnet level       |
| Rule types | ALLOW only     | ALLOW and DENY     |
| Stateful?  | ✅ Yes          | ❌ No               |

* **Exam Tip**: Security Groups are **stateful**, NACLs are **stateless**.


### VPC Flow Logs

* Capture **IP traffic logs** at VPC, subnet, or ENI level.
* Useful for **troubleshooting** network connectivity.
* Logs can be sent to **S3**, **CloudWatch Logs**, or **Firehose**.


### VPC Peering

* Private connection between **two VPCs**.
* Must have **non overlapping IP ranges**.
* **Not transitive** – A↔B and B↔C ≠ A↔C.


### VPC Endpoints

* Private connection to AWS services **without internet**:
  * **Gateway Endpoint**: S3 and DynamoDB only.
  * **Interface Endpoint**: Other AWS services via private ENI.
* **Exam Tip**: S3 & DynamoDB support **gateway endpoints**; all other services use **interface endpoints**.


### PrivateLink

* <img src="https://raw.githubusercontent.com/Zhenye-Na/img-hosting-picgo/master/img/aws-privatelink.png" height="180"/>
* Private access to **third-party/vendor services** over AWS network.
* Uses **Network Load Balancer** on provider side, **ENI** on consumer side.
* **Scalable and secure**, no need for VPC peering.


### Site-to-Site VPN vs Direct Connect

| Feature    | Site-to-Site VPN          | AWS Direct Connect     |
| ---------- | ------------------------- | ---------------------- |
| Setup time | Fast (\~5 min)            | Long (≥1 month)        |
| Path       | Over internet (encrypted) | Private dedicated line |
| Components | CGW + VGW                 | DX location + router   |

* **Exam Tip**: 
    * VPN = fast setup, over internet. DX = private, secure, expensive.
    * **Customer Gateway (CGW)** and **Virtual Private Gateway (VGW)** are need to establish Site-to-Site VPN
    * <img src="https://miro.medium.com/v2/resize:fit:1400/0*318MnV-cZ8kJvF-U" height="90"/>


### AWS Client VPN

* Connect **your laptop** to AWS VPC using OpenVPN.
* Enables access to **private subnets** from your local device.
* Also allows access to **on-prem** via Site-to-Site VPN if configured.


### Transit Gateway

* Central hub to connect **thousands of VPCs**, VPNs, and Direct Connect.
* **Simplifies network topology** (no need for many peering connections).

> ✅ **Exam Tip**: Use Transit Gateway for **large-scale VPC connectivity**.

---
## 14. Security & Compliance

### Shared Responsibility Model

* AWS is responsible **for security of the cloud** (infrastructure, managed services).
* Customers are responsible **for security in the cloud** (data, access control, OS patching).
* **Shared responsibilities** include patch management, config management, and training.
* **Example:** For EC2, patching is your job. For RDS, AWS patches automatically.
* **Exam Tip:** Know which components are AWS’s vs. customer’s responsibility. This is frequently tested.


### DDoS Protection: Web Application Firewall (WAF) & Shield

* **Shield Standard:** Free, automatic DDoS protection.
* **Shield Advanced:** Paid service, 24/7 support, cost protection.
* **WAF:** Filters malicious incoming requests at Layer 7 base on rules.
* Use **CloudFront** and **Route 53** for edge protection.
* **Rate-based rules** in WAF mitigate request floods.
* **Exam Tip:** Know the difference between Shield Standard and Shield Advanced.


### AWS Network Firewall
* Protects entire VPC from **Layer 3 to Layer 7**.
* Inspects all traffic: inbound, outbound, and inter-VPC.
* More effective than subnet-level Network ACLs.
* **Exam Tip:** Choose Network Firewall when VPC-wide protection is needed.


### AWS Firewall Manager

* Centralized management of:
  * **Security Groups**
  * **WAF rules**
  * **Shield Advanced**
  * **Network Firewall**
* Enforces rules across all AWS Organization accounts.
* **Exam Tip:** Use Firewall Manager to manage security rules across multiple accounts.


### Penetration Testing

* Allowed without prior approval on 8 services (e.g., EC2, RDS, CloudFront, Lambda).
* **Not allowed**: DDoS, DNS zone walking, flooding.
* Request permission for unlisted services.
* **Exam Tip:** Remember the services where pentesting is pre-approved.


### Encryption with Key Management Service (KMS) & CloudHSM

* KMS: Encrytion keys managed by AWS
* **Encryption at rest:** Stored data (e.g., S3, EBS).
* **Encryption in transit:** Moving data (e.g., between services).
* **KMS Types**:
  * Customer-managed
  * AWS-managed
  * AWS-owned
  * CloudHSM-backed
* **CloudHSM:** Hardware encrytion, we manage encrytion keys.
* **Exam Tip:** Know KMS key types and the differences between KMS and CloudHSM.


### AWS Certificate Manager (ACM)

* Provisions and manages **TLS/SSL certificates**.
* Used with **Load Balancers**, **CloudFront**, and **API Gateway**.
* Public certificates are free with **auto-renewal**.
* **Exam Tip:** Use ACM to enable HTTPS on AWS services.


### Secrets Manager

* Stores secrets securely (e.g., database credentials).
* Supports **automatic rotation** using Lambda.
* Integrates with **RDS** and uses **KMS** for encryption.
* **Exam Tip:** Use Secrets Manager (not Systems Manager Parameter Store) when secret rotation is needed.


### AWS Artifact (Central Resource for Compliance and Agreement)

* Portal to download **compliance reports** (e.g., ISO, PCI).
* Manage **agreements** (e.g., BAA, HIPAA).
* **Exam Tip:** Use Artifact for audit/compliance documentation, not for operational security.


### Amazon GuardDuty

* Find malicious behavior with **VPC, DNS & CloudTrail Logs**
* Optional: S3, EKS, RDS, EBS, Lambda, runtime data.
* Integrates with **EventBridge** for alerts.



### Amazon Inspector

* Find software vulnerabilities in **EC2, ECR Images, and Lambda functions.**
* Uses **CVE database** for vulnerability checks.
* Findings integrate with **Security Hub** and **EventBridge**.
* Features:
    * Automate security assessments
    * Analyze against unintended network accessibility
    * Inspect running operating systems (OS) against known vulnerabilities
* **Exam Tip:** Inspector performs **continuous vulnerability assessment** for EC2, ECR, Lambda.


### AWS Config

* Tracks **configuration changes** and compliance.
* Stores data in **S3**; integrates with **CloudTrail**.
* Use **Config Rules** to detect misconfigurations (e.g., unrestricted SSH).
* Can **trigger SNS alerts**.
* **Exam Tip:** Use Config + Config Rules for compliance auditing and resource state tracking.

### Amazon Macie

* Uses **machine learning + pattern matching**.
* Scans **S3 buckets** for sensitive data (e.g., PII).
* Alerts via **EventBridge**.
* **Exam Tip:** Choose Macie when detecting/discovering or protecting sensitive data.


### AWS Security Hub

* Central **security dashboard** for multiple AWS accounts.
* Aggregates findings from:
  * Config
  * GuardDuty
  * Inspector
  * Macie
  * IAM Access Analyzer
* Requires **Config** to be enabled first.
* **Exam Tip:** Security Hub aggregates findings; use it for a unified security view.


### Amazon Detective

* Investigates security issues to find **root cause**.
* Uses **graph analytics + ML**.
* Visualizes data from **CloudTrail, VPC logs, GuardDuty**.
* **Exam Tip:** Use Detective to perform forensic analysis and root cause investigation.


### AWS Abuse

* Report AWS resources used for abusive or illegal purposes
* Report abuse (spam, port scanning, malware) via:
  * Email: **[abuse@amazonaws.com](mailto:abuse@amazonaws.com)**
* **Exam Tip:** Know that AWS does not allow DDoS simulations or port flooding even in your own account.


### Root User Privileges

* Root user can:
  * Change account settings
  * Close account
  * Manage (change or cancel) support plans
  * Enable MFA delete for S3
* **Do not use** root user daily; create admin IAM user.
* **Exam Tip:** Know which actions are **exclusive** to the root user.


### IAM Access Analyzer

* Identifies resources **shared externally** (S3, KMS, Secrets Manager, etc.).
* Defines a **zone of trust** (account/org).
* Can archive or auto-archive findings.
* **Exam Tip:** Use Access Analyzer to discover unintended resource sharing across accounts.

---
## 15. Machine Learning
### Rekognition

* **Analyzes** images and videos to detect objects, people, faces, text, and scenes. 
* Supports use cases like labeling, content moderation, facial analysis, celebrity recognition, and activity tracking.

### Transcribe

* Converts **speech to text** using Automatic Speech Recognition (ASR). 
* Features include PII redaction and multilingual support. 
* Commonly used for call transcription and captioning.

### Polly

* Converts **text into speech**. 
* Useful for applications that require voice output, offering different voice engines.

### Translate

* Provides accurate, natural language **translation** for content localization. 
* Supports multiple languages.

### Lex and Connect

* <img src="https://velog.velcdn.com/images/chan9708/post/c02f34f6-eff4-4d1f-8d18-43efc111e790/image.png" height="85"/>
* Lex enables speech recognition and natural language understanding to build chatbots. 
* Connect is a cloud-based contact center that integrates with Lex to manage calls and automate workflows.

### Comprehend

* Performs Natural Language Processing (**NLP**) tasks such as language detection, entity recognition, sentiment analysis, and topic modeling.

### SageMaker

* <img src="https://blog.kakaocdn.net/dn/55vIl/btsv7vJGOcx/MyrcrTpBexnLRVWpT5r2wk/img.png" height="130"/>
* A fully managed platform for developers and data scientists to build, train, and deploy custom machine learning models. 
* Supports the full ML workflow including data labeling and model tuning.
* Provides an integrated experience to use all your data and tools for analytics and AI

### Kendra

* <img src="https://velog.velcdn.com/images/gagaeun/post/f4b9c2e4-6184-4a23-b132-50f4e4cdeeca/image.png" height="110"/>
* A **machine learning-powered** document search service that allows natural language search across diverse **document** formats with incremental learning.

### Personalize

* Builds real-time personalized recommendations without requiring ML expertise. 
* Supports retail, media, and marketing use cases.

### Textract

* <img src="https://velog.velcdn.com/images/gagaeun/post/c029dff2-7bc1-45b3-80e4-2ed95e955346/image.png" height="100"/>
* Extracts printed text, handwriting, tables, and form data from scanned documents using AI. Useful in finance, healthcare, and public sector.

---
## 16. Account Management, Billing & Support

### AWS Organizations

* Manages multiple AWS accounts under a master account. 
* Offers consolidated billing, shared usage discounts, and centralized policy control using Service Control Policies (SCPs). 
* **Service Control Policies** (SCPs) centrally manage all users and roles permissions in your AWS Organization
* Accounts can be organized via Organizational Units (OUs). 
* Best Practices:
    * **SCPs restrict** account actions but don’t apply to the master account.
    * Create AWS **accounts per department**


### AWS Control Tower

* Automates setup of secure **multi-account environments** with best practices. 
* Uses OUs, guardrails, and audit/log archive accounts. Includes an interactive dashboard and integrates IAM Identity Center for SSO.

### AWS Resource Access Manager (RAM)

* Enables **resource sharing** (e.g., VPC subnets) across accounts **within or outside** an organization to reduce duplication and improve connectivity.

### AWS Service Catalog

* <img src="https://miro.medium.com/v2/resize:fit:1400/1*33CdkmSvXmK4mR_lk_AiFA.png" height="200" />
* Allows admins to **define** and control which **CloudFormation-based products** users can launch via a self-service portal, ensuring compliance and standardization.

### Pricing Models in AWS

* 4 pricing models:
    * **Pay-as-you-go**
    * **Save when you reserve**: minimize risks, predictably manage budgets, comply with long-terms requirements
    * **Pay less by using more**
    * **Pay less as AWS grows**
* EC2 pricing varies by instance type, usage, and region.
* Savings increase with upfront commitments or usage volume.

### Savings Plans

* Offer flexible discounts by committing to hourly spend for 1 or 3 years. 
* Two main types: 
    * EC2 Savings Plan: Up to 72% discount compared to On-Demand
    * Compute Saving Plan: Up to 66% discount compared to On-Demand
    * SageMaker has its own savings plan.

### Compute Optimizer

* Uses ML and CloudWatch metrics to delivers recommendations for better resource configurations. For (**EC2, EBS, Lambda, Auto Scaling**), cost savings and performance.

### Billing and Costing Tools

* **Pricing Calculator**: Estimates service costs.
* **Billing Dashboard**: Tracks total spend and free tier usage.
* **Cost Allocation Tags**: Tag resources for detailed reports.
* **Cost and Usage Reports**: Granular billing data.
* **Cost Explorer**: Visualizes usage and forecasts future spend (up to 12 months).
* **Budgets and Alarms**: Set usage/cost thresholds with alerts.

### Cost Anomaly Detection

* Uses ML to detect unusual cost spikes without manual thresholds. 
* Sends alerts via SNS with root cause analysis.

### Service Quotas

* **Monitors AWS resource limits**. Sends alerts via CloudWatch and allows quota increase requests through the console.

### Trusted Advisor

* Provide a real time guidance to help user provision their aws resources.
* Performs checks across 6 categories:
    * **Security** – detecting vulnerabilities
    * **Cost optimization** - finding idle/unused/unattached resources
    * **Performance** – improving speed and efficiency
    * **Fault tolerance** – improving reliability
    * **Service limits** – warning about usage nearing limits
    * **Operational excellence**
* Full features require Business or Enterprise support plans.


### AWS Support Plans

Four tiers:

* **Basic Support Plan**: Free, limited features.
    * Customer Service & Communities (24x7)
    * AWS Trusted Advisor
    * AWS Personal Health Dashboard
* **Developer**: Email support, business hours.
    * All Basic Support Plan +
    * Business hours email access to Cloud Support Associates
    * Unlimited cases / unlimited contacts
* **Business**: 24/7 support, full Trusted Advisor.
* **Enterprise On-Ramp**
* **Enterprise**: Dedicated TAM, fastest response times.

### Account Best Practices

* Use AWS Organizations with SCPs, Control Tower for setup, IAM best practices (MFA, least privilege), tagging, CloudTrail, and centralized logging. Use CloudFormation and Trusted Advisor for consistent deployments and recommendations.

---
## 17. Advanced Identity

### AWS STS (Security Token Service)

* **Provides temporary**, limited-privilege credentials for accessing AWS resources. 
* Commonly used for identity federation, IAM role assumption, and EC2 instance credential refresh.

### Amazon Cognito

* <img src="https://ant.ncc.asia/wp-content/uploads/2024/07/image-327-1024x459.png" height="150"/>
* Manages user sign-up, sign-in, and access control for web and mobile apps. Supports millions of users and integrates with social identity providers like Google and Facebook.

### AWS Directory Services

* Offers three options for integrating or running Active Directory in AWS:
    * **AWS Managed Microsoft AD**: Fully managed AD in AWS.
    * **AD Connector**: Proxies to on-premises AD.
    * **Simple AD**: Standalone, AD-compatible directory in AWS.
* **Exam Tip**: See "active directory" => "aws directiory services"

### AWS IAM Identity Center

* <img src="https://miro.medium.com/v2/resize:fit:1400/1*TzORJklaE-neeemD5NZ7BQ.png" height="230"/>
* Provides single sign-on across multiple AWS accounts and applications. Supports built-in and external identity providers. Formerly called AWS Single Sign-On (SSO).

### Advanced Identity Summary

* **IAM** manages access for trusted internal users.
* **AWS Organizations** manages multiple AWS accounts.
* **STS** issues temporary credentials.
* **Cognito** handles app user identities.
* **Directory Services** brings AD to AWS.
* **IAM Identity Center** simplifies access with single sign-on.

---
## 18. Other Services

* Covers less common AWS services that may appear on exams
* Goal is to memorize service definitions for exam readiness

### Amazon WorkSpaces

* Managed Desktop-as-a-Service (DaaS) for Windows/Linux desktops
* Replaces on-prem Virtual Desktop Infrastructure (VDI)
* Integrated with AWS KMS, operates pay-as-you-go
* Deploy desktops near users to reduce latency

### Amazon AppStream 2.0

* Streams desktop applications via web browser
* Unlike WorkSpaces, it does not provide full desktop environments
* Allows per-app configuration for resources (CPU, RAM, GPU)
* No need to provision or manage infrastructure

### AWS IoT Core

* Connects and manages IoT devices at scale
* Supports secure message exchange and pub-sub architecture
* Integrates with AWS services like Lambda, SageMaker, etc

### Amazon Elastic Transcoder

* Converts media files in S3 for playback on various devices
* Outputs multiple compatible formats to S3
* Fully managed, scalable, cost-effective, pay-per-use

### AWS AppSync

* Builds GraphQL backends for web/mobile apps
* Supports real-time data updates and offline sync
* Integrates with DynamoDB and Lambda

### AWS Amplify

* Full-stack development suite for web/mobile apps
* Manages auth, APIs, storage, CI/CD, and more
* Amplify Studio simplifies backend configuration
* Wraps AWS services like AppSync, Cognito, S3, Lambda

### AWS Infrastructure Composer

* Visual drag-and-drop tool for designing serverless apps
* Generates infrastructure as code (CloudFormation-compatible)
* Supports importing/editing templates
* Allows quick setup and configuration of AWS resources

### AWS Device Farm

* Tests apps on real browsers and devices (real devices, not emulators)
* Supports concurrent testing, configurable environments
* Provides logs, screenshots, and bug reports
* Ideal for testing across varied device types and settings

### AWS Backup

* Centralized, automated backup management service
* Supports scheduled and on-demand backups with PITR
* Enables cross-region and cross-account backups
* Manages lifecycle and retention policies
* **Exam Tip**: Backup focuses on centralized backups of application data across AWS services, while CloudEndure Disaster Recovery is specifically designed for fast recovery of servers, minimising downtime.

### Disaster Recovery Strategies

* **Backup and Restore**: Cheapest, only backups stored
* **Pilot Light**: Minimal cloud setup (e.g., DB only)
* **Warm Standby**: Full app in cloud at reduced scale
* **Multi-Site**: Fully deployed and running in multiple regions
* Multi-region DR can use Route 53 for failover
* **Exam Tip**: The exam may ask which strategy is the cheapest.

### AWS Elastic Disaster Recovery (DRS)

* <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2F70k5w%2FbtsDHoJmy5g%2FAAAAAAAAAAAAAAAAAAAAAEqSiMp4BK3bwrQJ6kF6_RaHNCvd1j6dRvpLCyoaB4xK%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1756652399%26allow_ip%3D%26allow_referer%3D%26signature%3DTIugIPHqpo1Zm6N09uLQfVH1YPw%253D" height="150"/>
* Formerly **CloudEndure Disaster Recovery**
* Enables fast failover and failback for on-prem/cloud servers
* Uses continuous block-level replication
* Helps protect against data loss and ransomware

### AWS DataSync

* Moves large datasets from on-prem to AWS
* Supports S3, EFS, FSx for Windows
* Supports scheduled and incremental sync after initial load
* On-prem agent sends data to AWS DataSync services

### Cloud Migration Strategies - 7Rs

* **Retire**: Turn off unnecessary services
* **Retain**: Keep on-prem due to complexity or compliance
* **Relocate**: Move with no architectural change
* **Rehost**: Lift-and-shift
* **Replatform**: Use managed services (e.g., RDS)
* **Repurchase**: Switch to SaaS products
* **Refactor**: Redesign using cloud-native architecture

### Application Discovery & Migration Services

* **Application Discovery Service**: Gathers server data, supports agentless and agent-based modes
* **Migration Hub**: Visualizes discovery data and migration plans
* **Application Migration Service (MGN)**: Lift-and-shift with continuous disk replication and minimal downtime. Move on-premises resources to server.
    * <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbHq5Ki%2FbtsDLMu98jw%2FAAAAAAAAAAAAAAAAAAAAABGrqeECXlifw8tLL49ybjr27TlsFWk2yjWiYfom-wmZ%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1756652399%26allow_ip%3D%26allow_referer%3D%26signature%3D9QeTRcuAKJsRRTsXwnNDIA%252F48%252Bo%253D" height="150"/>

### AWS Migration Evaluator

* <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FuyN9Q%2FbtsDHphdOBk%2FAAAAAAAAAAAAAAAAAAAAAKDyxSgl3PT89TvvDH-mn65SpU4q5qzCnmADT5xabH8N%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1756652399%26allow_ip%3D%26allow_referer%3D%26signature%3DEcK%252ByQ2CKgVCYzMOERFLP7C7vp0%253D" height="150"/>
* Requiere: Customer installs the Agentless Collector or uses the Import Template
* Builds business case for migration using infrastructure data
* Collects data via Agentless Collector or data import
* Provides cost estimates and expert guidance

### AWS Migration Hub

* Centralizes server/app inventory for planning/tracking migrations
* Orchestrates migrations using templates (e.g., SAP, SQL Server)
* Integrates with MGN and DMS for automation and modernization

### AWS Fault Injection Simulator (FIS)

* Simulates failures (CPU spikes, DB crashes, etc.) using Chaos Engineering
* Tests app resiliency and finds performance bottlenecks
* Supports services like EC2, ECS, EKS, RDS
* Uses CloudWatch/EventBridge/X-Ray for monitoring

### AWS Step Functions

* <img src="https://imgix.datadoghq.com/img/knowledge-center/aws-step-functions/etl-workflow-sample.png?auto=format&fit=max&w=847&dpr=2" height="240"/>
* Serverless visual workflow builder
* Supports sequencing, parallelism, error handling, conditions
* Integrates with AWS services like Lambda, EC2, API Gateway
* Can include manual approval steps in workflows

### AWS Ground Station

* Manages satellite data transmission and operations
* Transfers satellite data directly to AWS VPC
* Supports use cases like weather forecasting, imaging, broadcasting

### Amazon Pinpoint

* <img src="https://velog.velcdn.com/images/gagaeun/post/cccbbe14-322b-4c31-809e-e76b2dfd8f2a/image.png" height="150"/>
* Used for sending targeted messages to users (ex: Marketing campaigns, order confirmation, update)
* Inbound/outbound communication service
* Supports email, SMS, push, voice, and in-app messaging
* Integrates with SNS, Firehose, and CloudWatch for automation

---
## 19. AWS Architecting & Ecosystem


### AWS Well-Architected Framework – Overview

A set of best practices for designing and running workloads on AWS. It includes **6 pillars**:
<details>
    <summary>Operational Excellence</summary>
* **Operational Excellence** – Monitor, automate, improve continuously.
<img src="https://tridentsys.net/content/images/2020/07/image-59.png" />

</details>
<details>
    <summary>Security</summary>
* **Security** – Protect data/systems using least privilege, traceability, encryption, and automation.
<img src="https://tridentsys.net/content/images/2020/07/image-60.png" />

</details>

<details>
    <summary>Reliability</summary>
* **Reliability** – Recover from failures, auto-scale, automate changes, and plan for DR.
<img src="https://tridentsys.net/content/images/2020/07/image-61.png" />

</details>

<details>
    <summary>Performance Efficiency</summary>
* **Performance Efficiency** – Use resources efficiently, adopt serverless, and experiment with newer tech.
<img src="https://tridentsys.net/content/images/2020/07/image-62.png" />

</details>

<details>
    <summary>Cost Optimization</summary>
* **Cost Optimization** – Pay only for what you use, tag resources, use spot/reserved instances.
<img src="https://tridentsys.net/content/images/2020/07/image-63.png" />

</details>

<details>
    <summary>Sustainability</summary>
* **Sustainability** – Reduce environmental impact by using efficient services and storage tiers.
<img src="https://miro.medium.com/v2/resize:fit:1316/format:webp/1*hfNrlAoWA-yEvnl7Aas4og.png" />

</details>



**Exam Tip**: Know all 6 pillars and how AWS services map to them.


### AWS Well-Architected Tool

* Helps assess your workloads against the 6 pillars.
* You define a workload, answer questions, and get a **risk report** + **improvement plan**.
* Supports **custom lenses** (e.g., Serverless Lens).

**Exam Tip**: Understand how to use the tool to improve cloud architecture.


### AWS Customer Carbon Footprint Tool

* Tracks **carbon emissions** from your AWS usage.
* Helps monitor sustainability progress and plan for **100% renewable energy** targets.
* Available under **Billing and Cost Management**.

**Exam Tip**: Mentioned under the **Sustainability** pillar.


### AWS Cloud Adoption Framework (CAF)

* <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vTMH-Ey9kyd-xZU-XIGarQ.png" height="280"/>
* Helps organizations plan cloud transformation.
* Includes **6 perspectives**: Business, People, Governance, Platform, Security, Operations.
* Follows **4 phases**: Envision → Align → Launch → Scale.

**Exam Tip**: Know the 6 CAF perspectives and transformation phases.


### Right Sizing in AWS

* Match instance size to workload needs.
* **Start small**, monitor with CloudWatch, and adjust monthly.
* Tools: **Trusted Advisor**, **Cost Explorer**, **CloudWatch**.

**Exam Tip**: Know right sizing is critical **before and after migration**.


### AWS Ecosystem

Includes:

* **AWS Blogs, Forums, Whitepapers** – Learn best practices and service updates.
* **AWS Solutions Library** – Prebuilt, deployable architecture templates.
* **Support Tiers** – Developer, Business, Enterprise.
* **AWS Marketplace** – Find 3rd-party AMIs, SaaS, templates.
* **AWS Training & Partner Network (APN)** – Certs, consulting, and solutions.

**Exam Tip**: Understand support tiers and how AWS Marketplace simplifies procurement.


### AWS IQ & re\:Post

* **AWS IQ** – Hire certified AWS freelancers for project work (with billing tied to your account).
* **AWS re\:Post** – AWS-managed community Q\&A forum; free, not for urgent issues.

**Exam Tip**: re\:Post may **escalate to AWS support** for premium customers if unanswered.


### AWS re:Post - Knowledge Center

* Part of re\:Post.
* Provides answers to **common AWS questions and troubleshooting**.

**Exam Tip**: Use it for **frequently asked questions** and **exam prep clarifications**.


### AWS Managed Services (AMS)

* A **specialized AWS team** (not a console service) that manages your infrastructure.
* Offers 24/7 monitoring, patching, backups, and automation.
* Must contact AWS sales to use AMS.

**Exam Tip**: Know AMS is for organizations needing **outsourced infrastructure management**.
