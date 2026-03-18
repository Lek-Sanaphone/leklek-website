---
id: 31257-Information-System-Development-Methodologies
description: ""
title: 31257 Information System Development Methodologies
---
# 31282 and 32571 - Summary
# 1. Introduction to Information System Development (ISD)
## 1.1 Lecture

### Purpose of Information Systems (IS)
The primary goal of an Information System is to facilitate business decision-making by providing accurate and timely information. It typically supports organizational activities such as forecasting, planning, control, and coordination.

* **Core Services**: Includes data collection, storage, and retrieval (e.g., sales transactions).
* **Data Transformation**: Application programs transform raw data into useful information.
* **Management**: Uses intelligence tools and policies for data management, such as stock taking.

### Drivers for IS Development Projects

Information System projects arise because the world and business requirements are constantly changing.

* **Performance Gaps**: Existing systems may fail to perform as required due to changes in government policies or external environments.
* **Competitive Advantage**: Organizations pursue new opportunities, such as leveraging AI techniques, to gain a lead.
* **Operational Excellence**: Projects often aim to reduce costs, such as inventory control systems that manage stock levels.
* **Technological Adaptation**: Systems must be migrated to new environments like the cloud or re-architected for mobile platforms.

### The Importance of Methodologies

Methodologies provide a systematic framework to ensure a system meets user needs and to avoid costly failures.

* **Risk Mitigation**: Large IT projects frequently suffer from budget overruns (avg. 45%) and schedule delays.
* **Value Delivery**: Without a structured method, projects often align poorly with business objectives; only 34% of projects are reported to deliver value consistently.
* **Critical Failures**: Approximately 17% of large projects go so poorly they threaten the company's existence, and over 30% are never finished.

### ISDM and Types of Development Methodologies (Heavyweight vs Lightweight)

Methodologies are generally categorized based on the level of control and flexibility they provide.

#### What is ISDM?
* An Information System Development Methodology (ISDM) is a systematic process used to develop information systems that meet specific organizational and user needs.
* It acts as a framework to manage the complex interaction between business drivers, technology drivers, and various project stakeholders.

#### Key Components of ISDM
* **Phases**: A series of structured steps:
    * **Initiation**: Defining the project scope and objectives.
    * **Analysis**: Understanding user requirements.
    * **Design**: Creating the system architecture and design.
    * **Implementation**: Building and testing the system.
* **Techniques**: Specific methods used within phases (e.g., interviews, prototyping, testing).
* **Tools**: Software or templates that support the process (e.g., CASE tools, project management software).



#### Methodologies
<details>
<summary>Heavyweight Methodologies</summary>

These methodologies impose greater control and are process-oriented.

* **Best Use Cases**: Ideal for larger teams (**20+ members**), multiple teams working in different locations, or high-stake projects with significant risk.
* **Examples**: PRINCE2 and RUP.

</details>

<details>
<summary>Lightweight Methodologies</summary>

These focus on people over processes and accommodate change well.

* **Characteristics**: They utilize smaller teams, dynamic checklists, and foster knowledge sharing.
* **Improvement Cycles**: These methods rely on iterations, allowing teams to learn from each build and correct issues throughout the project.
* **Examples**: SCRUM (the most popular at 43%), XP, and KANBAN.

</details>

### Selecting a Methodology

The selection of a specific methodology depends on several key factors:

* **Project Constraints**: Budget, team size, and the criticality of the project.
* **Technical Environment**: The technology used and the software requirements.
* **Organizational Assets**: Existing processes, documentation standards, and lessons learned from previous projects.



---

# 2. Method Engineering

## 2.1 Lecture

### What is Method Engineering?

Method Engineering (ME) is the discipline of designing and tailoring development methodologies to suit the specific context of a project. The key principle is that **no single development method fits all projects** — each project has unique characteristics, and the methodology must be engineered accordingly.

### Why Method Engineering Is Needed

Different projects vary in size, complexity, risk level, requirement stability, team experience, governance needs, and stakeholder involvement. Method Engineering allows combining strengths from multiple methodologies to create a context-appropriate hybrid method.

<details>
<summary>Examples of Methodological Emphasis</summary>

* **SCRUM**: Focuses on agility and stakeholder engagement.
* **PRINCE2**: Emphasizes governance, accountability, and risk management.
* **RUP**: Provides strong structure in defining work products and documentation.
* **Nexus Framework**: Scales Scrum for larger teams.

</details>

### Components of a Methodology

A methodology consists of two main knowledge areas: **Process Knowledge** and **Work Product Knowledge**.

<details>
<summary>Process Knowledge</summary>

Describes *how* development work is organized, including:

* Phases
* Activities
* Tasks
* Techniques

This is represented using a **process metamodel**.

</details>

<details>
<summary>Work Product Knowledge</summary>

Describes *what* is produced during development, such as:

* Requirements documents
* Use cases
* Class diagrams
* Design models
* Code

This is represented using a **work product metamodel** (e.g., UML defines modeling constructs).

</details>

### Process Framework

All projects include core framework activities such as:

* Communication
* Planning
* Modeling
* Design
* Implementation
* Testing
* Deployment

These activities are always present, but the **tasks within each activity** and the **level of detail and rigor** will vary depending on project context.

### Umbrella Activities

Umbrella activities run throughout the project lifecycle and support all framework activities. They ensure control, quality, and coordination across the project.

<details>
<summary>Examples of Umbrella Activities</summary>

* Project management
* Risk management
* Quality assurance
* Configuration management
* Reusability management
* Technical reviews

</details>

### Process Model

A process model defines:

* The workflow between activities
* Input and output relationships
* Dependencies between tasks
* Required work products
* Quality assurance mechanisms

Different models apply different levels of structure and control (e.g., agile vs. governance-heavy approaches).

### Role of the Method Engineer

The method engineer (often the project manager) is responsible for selecting appropriate method fragments, combining process and product components, adapting the framework to project needs, and ensuring alignment with project constraints. The goal is to create a **"production method"** tailored to the project.

<details>
<summary>Key Responsibilities</summary>

* Selecting appropriate method fragments
* Combining process and product components
* Adapting the framework to project needs
* Ensuring alignment with project constraints and objectives

</details>

### Key Takeaways

1. No methodology is universally suitable.
2. Development methods are composed of modular elements.
3. Project context determines method selection and rigor.
4. Process and work products must be aligned.
5. Effective project management requires deliberate method design.

---

# 3. PRINCE2 in ISD

## 3.1 Lecture

### Project Management Frameworks in ISD

#### Overview of PRINCE2

PRINCE2 (Projects IN Controlled Environments) is a structured project management methodology widely used in large organisations and government environments.

A project in PRINCE2 is defined as:
> A temporary organisation created to deliver one or more business products according to an agreed business case.

PRINCE2 is considered a **heavyweight methodology** because it emphasises governance, documentation, hierarchy, and control.


### Core Components of PRINCE2

PRINCE2 consists of four integrated elements:
1. Principles
2. Themes
3. Processes
4. Tailoring

#### 1. Principles (Guiding Obligations)
PRINCE2 has **7 principles** that must always be followed.

<details>
    <summary>The 7 Principles</summary>

1. **Continued Business Justification (Most Important)**
   * A project must remain valuable throughout its lifecycle.
   * The business case is continuously monitored and updated.
   * If the project is no longer viable, it should be changed or stopped.
   * *This ensures resources are not wasted on unjustified projects.*
2. **Learn from Experience**
   * Lessons from previous projects must be documented and reused.
   * Mistakes should not be repeated.
   * Exception reports help improve future decisions.
3. **Defined Roles and Responsibilities**
   * Roles are clearly defined at the beginning.
   * Responsibilities remain stable throughout the project.
   * Unlike agile methods (e.g., Scrum), roles do not change dynamically.
4. **Manage by Stages**
   * Large projects are divided into manageable stages.
   * Each stage is planned and approved separately.
   * At the end of each stage, progress is reviewed before proceeding.
5. **Manage by Exception**
   * Each management level operates within defined tolerances: Cost, Time, Scope, Risk, Quality.
   * If tolerances are exceeded, the issue is escalated to the next level.
   * *This prevents micromanagement and ensures efficient governance.*
6. **Focus on Products**
   * The final product must be clearly defined.
   * Quality expectations and acceptance criteria must be specified.
   * Work is always aligned with delivering agreed outputs.
7. **Tailor to Suit the Project Environment**
   * PRINCE2 can be adapted depending on project size, complexity, risk level, and organisational culture.
   * Documentation and processes can be simplified where appropriate.

</details>

#### 2. Themes (Ongoing Management Areas)

PRINCE2 includes **7 themes** that must be addressed continuously. They represent areas that require constant monitoring and management throughout the project lifecycle:
1. Business Case
2. Organisation
3. Quality
4. Plans
5. Risk
6. Change
7. Progress

#### 3. Governance Structure and Exception Management

**Governance Structure (Hierarchy)**

* **Corporate / Program Board:** Provides project mandate and funding approval.
* **Project Board:** Oversees project alignment with business strategy.
* **Project Manager:** Manages day-to-day coordination across stages.
* **Team Leaders:** Manage work packages within stages.
* **Project Teams**

**Management by Exception**

This is a core control mechanism ensuring efficient reporting, reduced unnecessary oversight, and clear accountability.
* Tolerances are set for time, cost, scope, risk, and quality.
* If performance remains within tolerances, no escalation is required.
* If performance exceeds tolerances, an exception report is submitted upward.

### The Planning Phase in PRINCE2

In this subject, focus is placed mainly on the **planning phase**, particularly:
* Starting a Project
* Initiating a Project
* Developing the Project Brief
* Developing the Business Case

*The project does not begin execution until the business case is approved.*

#### Project Brief
The **Project Brief** is the first major document created after the project mandate.

<details>
    <summary>Project Brief Contents</summary>

1. **Project Definition**: Background, objectives, scope and exclusions, assumptions, constraints, and stakeholders.
2. **Outline Business Case**: Reasons for the project and initial justification.
3. **Project Product Description**: Customer quality expectations and acceptance criteria.
4. **Project Approach**: High-level delivery strategy.
5. **Project Management Team Structure**
6. **Role Descriptions**

*Important: The Project Brief contains only an outline of the business case. The full Business Case is developed later.*

</details>

#### Business Case (Central Concept)

The Business Case is the most critical document in PRINCE2. It acts as a guiding reference (“lighthouse”) for all stages and answers:
* Why is the project needed?
* What are the expected benefits, costs, and risks?
* Is the investment justified?

At the end of each stage, deliverables are checked against the Business Case. If benefits are not achievable or costs exceed tolerances, adjustments are made (or the project may be stopped if no longer viable).

#### Planning and Control Documents

<details>
    <summary>Key Structured Documents</summary>

* **Project Plan:** Overall timeline, budget, and major milestones.
* **Stage Plan:** Detailed plan for a specific stage.
* **Work Packages:** Assigned tasks for teams.
* **Checkpoint Reports:** Team → Project Manager.
* **Highlight Reports:** Project Manager → Project Board.
* **Exception Reports:** Used when tolerances are exceeded.
* **Project Initiation Document (PID):** Authorises the project plan and stage plans.

</details>

#### Project Lifecycle Summary
1. Corporate issues a project mandate.
2. Project Board and Project Manager are appointed.
3. Project Brief is developed.
4. Business Case is fully developed and approved.
5. Project is divided into stages.
6. Each stage is planned, executed, and reviewed.
7. Exceptions are escalated when necessary.
8. Project is formally closed and lessons learned are documented.

### Key Takeaway
PRINCE2 teaches that:
* A project must always remain justified.
* Authority and responsibilities must be clearly defined.
* Projects must be controlled through structured stages.
* Escalation should occur only when tolerances are breached.
* Planning and documentation are essential before execution.


---

# 4. Drivers of Information Systems Development (ISD) & Business Cases Development

## 4.1 Lecture

### 1. Purpose of the Lecture
* This lecture explains:
    * Why organizations develop information systems
    * The role of digital transformation in ISD projects
    * How a **Business Case** is used to justify starting a project

* A Business Case provides justification for a project by explaining its value, costs, risks, and expected benefits.

* **Core Concept**: A Business Case is used to evaluate whether an Information Systems Development project is worthwhile by analysing its strategic value, expected benefits, costs, risks, and investment return.


### 2. Drivers of Information Systems Development
<details>
<summary>Business Drivers</summary>

Information Systems Development projects are primarily driven by business needs.

**Operational Capability (75%)**

Most ISD projects aim to **improve existing operations**, such as:
* Improving products for specific customer segments
* Enhancing marketing (product, promotion, price, place)
* Increasing efficiency in processes

Operational capability involves improving:
* People
* Processes
* Information
* Technology

**Business Transformation (25%)**

Some ISD projects focus on **transforming the business strategy**, for example:
* Introducing new digital platforms
* Changing business models
* Implementing advanced technologies such as AI

Operational improvements and strategic transformation must be aligned.

</details>

### 3. Digital Transformation Trends
<details>
<summary>Key Technological Trends</summary>

Modern ISD projects are influenced by several technological trends:

* **Increased Collaboration Platforms**: Significant increase in digital collaboration tools after COVID-19.
* **Data Integration**: Requirement for seamless data integration across different applications.
* **Rise of Non-Technical Developers**: Technology products built using:
    * Low-code platforms
    * Automation tools
    * AI systems
* **Emergence of Business Technologists**: Individuals who bridge the gap between business strategy and technological implementation.
* **Technology Focus Areas**:
    * Artificial Intelligence
    * Cybersecurity
    * Multi-cloud environments
    * Digital transformation technologies

</details>

### 4. Business Case (BC)
<details>
<summary>Definition and Purpose</summary>

A **Business Case (BC)** is a document that justifies undertaking a project. It explains:

* Why the project should be undertaken
* The value the project will deliver
* Estimated costs and timelines
* Expected benefits
* Risks involved

The Business Case is used by executives and stakeholders to determine whether the project is worth pursuing.

</details>

### 5. Characteristics of a Business Case
<details>
<summary>BC Characteristics</summary>

* Is derived from the **Project Brief**
* Provides justification for investment
* Includes financial and non-financial evaluation
* Is considered a **dynamic document** that can be updated throughout the project lifecycle

In project management frameworks such as PRINCE2, the Business Case is reviewed and updated during different project stages.

</details>


### 6. Elements of a Business Case
<details>
<summary>Components of a BC</summary>

<details>
<summary>Executive Summary</summary>

A concise explanation of:
* The problem being solved
* The importance of the project
* Key expected benefits
* Potential return on investment

</details>

<details>
<summary>Reasons (Business Objectives)</summary>

Describes:
* The objectives of the project
* How success will be measured
* Alignment with organizational strategy and vision

</details>

<details>
<summary>Business Options</summary>

Different possible approaches are evaluated, typically:
* **Do nothing**
* **Do the minimal change**
* **Implement the proposed project**

A recommended option is then selected based on analysis.

</details>

<details>
<summary>Expected Benefits</summary>

Benefits describe measurable improvements resulting from the project.
* **Quantitative**: Financial gains, cost reduction.
* **Qualitative**: Improved service quality, better collaboration.

Benefits should align with organizational goals.

</details>

<details>
<summary>Expected Dis-benefits</summary>

Dis-benefits are negative outcomes that are expected to occur as a result of the project (e.g., temporary productivity loss, organizational disruption).

*Dis-benefits differ from risks because they are expected outcomes rather than uncertain events.*

</details>

<details>
<summary>Timescale and Costs</summary>

* **Timescale**: Project duration and the period when benefits will be realized.
* **Costs**: Technology, infrastructure, development resources, and maintenance.

</details>

<details>
<summary>Investment Appraisal</summary>

Compares costs against benefits:
* Return on Investment (ROI)
* Net Present Value (NPV)
* Payback period
* Cash flow analysis

</details>

<details>
<summary>Major Risks</summary>

Major risks associated with the project are identified along with possible mitigation strategies.

</details>

</details>

### 7. Business Case Alignment
<details>
<summary>Approval Criteria</summary>

For a project to be approved, the Business Case must demonstrate:
* Clear alignment between the **project plan and expected benefits**
* Justification for the chosen business option
* Clear identification of costs, benefits, and risks
* Compliance with organizational financial standards
* A defined strategy for achieving the expected outcomes

</details>

---

# 5. Design Perspective on ISD and Agility

## 5.1 Lecture

### 1. Nature of ISD as a Design Process
<details>
<summary><strong>Nature of ISD as a Design Process</strong></summary>

* ISD is not linear or predictable; it does not follow a fixed sequence of steps like traditional models (e.g., waterfall). Instead, development progresses through **iteration and revision**.
* Requirements are not fully known at the start; they are gradually **discovered, refined, and sometimes redefined** as the project evolves.
* The process involves **trial-and-error**, where multiple solution ideas are explored, tested, and improved over time.
* ISD is **human-centered and collaborative**, meaning different stakeholders (developers, users, managers) contribute different perspectives, often leading to competing ideas.
* Because of uncertainty, **risks and constraints emerge during development**, not just at the beginning.
</details>

### 2. Design Thinking (DT): User-Centred Problem Solving
<details>
<summary><strong>Design Thinking (DT): User-Centred Problem Solving</strong></summary>

* **Design Thinking** is a systematic approach that focuses on understanding real user needs rather than assumed requirements.
* It begins with **empathy**, requiring developers to observe, engage, and understand users in their real context.
* The approach emphasizes continuously asking **“Why?”** to uncover deeper problems instead of addressing surface-level issues.
* Solutions must balance three key factors:
    * **Desirability**: what users actually need or want
    * **Feasibility**: what technology can realistically deliver
    * **Viability**: what makes sense from a business perspective
* The process typically moves through stages:
    * **What is** (understand the problem)
    * **What if** (generate ideas)
    * **What works** (test solutions)
    * **What wows** (deliver value)
</details>

### 3. Integrated Development Approach (PRINCE2 + DT + Scrum)
<details>
<summary><strong>Integrated Development Approach (PRINCE2 + DT + Scrum)</strong></summary>

* Real-world ISD does not rely on a single methodology; instead, it uses a **hybrid approach** combining different methods for different purposes.
* **PRINCE2** provides structure at the project level, including **planning, governance, and business case development**, ensuring the project is justified and organized.
* **Design Thinking** is used in early phases to **understand users and define the problem**, as well as during ideation and prototyping.
* **Scrum (Agile)** is used during development to **build the system iteratively**, allowing teams to adapt to feedback and changing requirements.
* These methods are organised in layers:
    * High-level planning (PRINCE2)
    * Problem-solving and development (DT + Scrum)
    * Detailed activities and outputs across phases
* This integration allows teams to remain **structured but flexible**, which is essential in complex projects.
</details>

### 4. Agile and Scrum: Iterative and Adaptive Development
<details>
<summary><strong>Agile and Scrum: Iterative and Adaptive Development</strong></summary>

* Agile is based on the idea that **change is inevitable**, and development must be able to adapt quickly rather than follow rigid plans.
* Work is divided into **short iterations (timeboxes)**, each producing a small but functional part of the system.
* Frequent delivery allows for **continuous user feedback**, which helps refine both requirements and solutions.
* Scrum is a specific Agile framework that applies these principles in practice:
    * Uses **sprints** (short development cycles) to structure work
    * Uses **user stories** to express requirements from the user’s perspective
* Scrum teams are:
    * **Self-organising**: they decide how to complete tasks without external control
    * **Cross-functional**: they possess all necessary skills within the team
* Scrum emphasizes:
    * **Transparency** (clear visibility of progress)
    * **Inspection** (regular evaluation of work)
    * **Adaptation** (adjusting based on feedback)
* Overall, Agile and Scrum enable teams to manage uncertainty, improve collaboration, and deliver value incrementally.
</details>

### 5. Overall Key Insight
<details>
<summary><strong>Overall Key Insight</strong></summary>

* ISD is a dynamic, iterative, and user-focused design activity. Effective development requires:
    * Understanding users deeply (Design Thinking)
    * Building and refining solutions continuously (Agile/Scrum)
    * Maintaining structure and direction (Project management)
</details>

---

# 6. Design Thinking Process, Scrum, XP

## 6.1 Lecture

### Agile Frameworks: Scrum and Extreme Programming (XP)

## 6.2 Tasks

* **Due:** Project Part A
* **Notes:** Class and Tutorials

---

# 7. DT Process and ISD Staging, Empathy

## 7.1 Lecture

### Design Thinking: Staging and the Empathy Phase

## 7.2 Tasks

* **Notes:** Class and Tutorials

---

# 8. DT Process (cont’d): Problem Definition and Ideation

## 8.1 Lecture

### Design Thinking: Defining the Problem and Generating Ideas

## 8.2 Tasks

* **Notes:** Class and Tutorials
* **Review:** Quiz 2

---

# 9. DT Prototyping and Testing with OO and Agents

## 9.1 Lecture

### Prototyping Strategies, Object-Oriented (OO) Analysis, and Agents

## 9.2 Tasks

* **Notes:** Class and Tutorials

---

# 10. Agent Oriented Systems Analysis, DevOps

## 10.1 Lecture

### Advanced Systems Analysis and DevOps Integration

## 10.2 Tasks

* **Due:** Project Report
* **Notes:** Class and Tutorials (Presentations)

---

# 11. XP, Scaling Scrum with Nexus

## 11.1 Lecture

### Scaling Agile: Nexus Framework and XP Practices

---

# 12. Method Engineering Revisited, Revision and Exam Review

## 12.1 Lecture

### Final Summary and Examination Preparation


