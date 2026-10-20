---
id: 48433-Software-Architecture
description: This course builds core skills in software architecture
title: 48433 Software Architecture
---
# 48433 - Summary
# 1. Introduction to Software Architecture
## 1.1 Introduction

### What Is Software Architecture?

**Definition:** the set of structures needed to reason about a system — its elements, their relations, and their properties (Bass, Clements & Kazman, 2022).

**In short:** it's the system's blueprint — not the code itself, but the map of what parts exist and how they connect, so you can understand the system without reading every line of code.

* **Not vague decisions**: it's *not* just "early decisions" or "major decisions" — those labels are too fuzzy to define.
* **An abstraction**: shows the public interface of each part, hides the private implementation.
* **Multiple views, one system**: like the human body — skeletal, muscular, nervous, and circulatory systems are different diagrams, but all describe the same body.

### Three Kinds of Architectural Structures

Every system needs three different diagram types, each answering a different question:

| Structure | Shows | Answers |
|---|---|---|
| **Component-and-Connector** | What's running, and how the pieces talk to each other | What talks to what? What's shared/replicated? |
| **Module** | How the code is split into classes/packages | Who owns what code? What depends on what? |
| **Allocation** | How software maps onto hardware/teams/files | Where does it run? Who builds it? |

#### Component-and-Connector
<img src="https://flylib.com/books/2/121/1/html/2/files/03fig01.gif" width="420" />

#### Module elements
<img src="https://velog.velcdn.com/images/3eung_h10n/post/979456b1-8643-4f07-87e0-6c5dec0c2e18/image.png" width="420" />

#### Deployment structure
<img src="https://image4.slideserve.com/1097118/deployment-view-using-uml-2-0-l.jpg" width="420" />

### Why Architecture Matters

Architecture is cheap to change on paper, and very expensive to change once built — so getting it right early matters more than almost anything else in a project.

* **Cheap to explore, expensive to change** — test ideas on the model before building the real thing.
* **Shared language** — lets business owners, architects, and developers discuss the same system.
* **Reusable abstraction** — a good architecture can guide future, similar systems.

<img src="https://www.conceptdraw.com/samples/resource/images/solutions//BUSINESS-DIAGRAMS-Block-Diagrams-3-D-Block-System-Diagram.png" width="420" />

#### Three Key Effects

1. **Lasts a long time** — hard to change once built.
2. **Determines what's possible** later — constraints lock in early.
3. **Determines quality** (performance, security, maintainability) — can't easily bolt these on afterward.

> **Trade-off:** systems built for speed are hard to maintain; systems built for easy maintenance are hard to speed up. You usually can't optimise for both.

### SOLID Principles

Five rules for designing classes so a codebase stays easy to change as it grows. Each one follows the same pattern: **Rule → Problem it prevents → Fix.**

<details>
<summary><strong>S — Single Responsibility</strong></summary>

* **Rule:** One class = one job.
* **Problem:** A class that both formats a report **and** saves it to disk has two reasons to change — a formatting update and a storage update both touch the same class.
* **Fix:** Split it into two classes — one for content, one for output — so each only changes for one reason.

</details>

<details>
<summary><strong>O — Open/Closed</strong></summary>

* **Rule:** Add new behaviour without editing existing, working code.
* **Problem:** A `LogOn` function is hard-coded per modem type (`DialHayes`, `DialCourrier`...), so it needs editing every time a new modem is released.
* **Fix:** Introduce an abstract `Modem` interface. New modems just implement it — `LogOn` itself never changes again.

</details>

<details>
<summary><strong>L — Liskov Substitution</strong></summary>

* **Rule:** If code expects a parent type, you must be able to swap in a child type and nothing breaks.
* **Plain English:** A child class is only allowed if it can do **everything the parent promised**, the same way.

> LSP does not "auto-fix" your code. It is a **design rule**. When inheritance breaks callers, LSP tells you: *stop inheriting that way — redesign so the child keeps the parent's promises.*

---

#### Easy example: Birds

Imagine a function written for any `Bird`:

```python
def make_it_fly(bird: Bird):
    bird.fly()       # promise: every Bird can fly
    print("Flying!")
```

**Bad design (breaks LSP):**

```python
class Bird:
    def fly(self):
        print("flap flap")

class Penguin(Bird):           # ❌ real life: penguin is a bird
    def fly(self):             # ❌ code life: cannot keep the fly() promise
        raise Exception("Can't fly!")

make_it_fly(Penguin())         # 💥 crashes
```

Real-world "is-a" lied. Callers expected `fly()` to work. Penguin broke that.

**How LSP tells you to fix it:**

Don't put `fly()` on a parent that not all children can honour. Split the types:

```python
class Bird:                    # shared stuff only (eat, sleep, ...)
    def eat(self):
        print("eating")

class FlyingBird(Bird):        # only birds that CAN fly
    def fly(self):
        print("flap flap")

class Sparrow(FlyingBird):
    pass

class Penguin(Bird):           # penguin is still a Bird — just not a FlyingBird
    def swim(self):
        print("swim swim")

def make_it_fly(bird: FlyingBird):   # now only flying birds are accepted
    bird.fly()
    print("Flying!")

make_it_fly(Sparrow())         # ✅ works
# make_it_fly(Penguin())       # ✅ type system / design stops this mistake
```

**What changed?**
* Before: parent promised something some children can't do → crash.
* After (LSP fix): parent only promises what **all** children can do. Flying is moved to `FlyingBird`.

---

#### Same idea: Circle / Ellipse (lecture example)

* **Problem:** `Circle extends Ellipse` looks right in maths, but Ellipse promises "set width and height separately." Circle can't keep that promise → wrong results.
* **LSP fix:** Don't make Circle inherit Ellipse. Give both a shared parent like `Shape` with only shared behaviour (e.g. `area()`).

---

**Remember:** LSP = *swap the child in, and old code still works.* If it doesn't, inheritance is wrong — redesign the hierarchy.

</details>

<details>
<summary><strong>I — Interface Segregation</strong></summary>

* **Rule:** Many small, client-specific interfaces beat one big one.
* **Problem:** One large `Service` interface serves every client — a change made for Client A risks breaking Clients B and C too, even though they never use that part.
* **Fix:** Split it into small, client-specific interfaces so each client only depends on what it actually uses.

<img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_379/https://yazilimperver.net/wp-content/uploads/2019/10/img_5da1b58f018ba.png" width="340" />

<img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_546/https://yazilimperver.net/wp-content/uploads/2019/10/img_5da1b5da39191.png" width="420" />

</details>

<details>
<summary><strong>D — Dependency Inversion</strong></summary>

* **Rule:** Depend on abstractions, never on concrete classes.
* **Problem:** In procedural code, high-level modules depend directly on low-level details — a change to a detail can ripple all the way up.
* **Fix:** Both high-level and low-level code depend on a shared abstract interface instead, so details can change freely without touching the high-level logic.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*4QqC0c1lBkekQbofuDtMCQ.png" width="500" />

</details>

#### Quick Reference

| | Principle | Core Idea |
|---|---|---|
| **S** | Single Responsibility | One class = one job. |
| **O** | Open/Closed | Extend without modifying. |
| **L** | Liskov Substitution | Subclass must be a drop-in replacement. |
| **I** | Interface Segregation | Small, focused interfaces. |
| **D** | Dependency Inversion | Depend on abstractions, not concretions. |

### Common Challenges Today

* **Systems outgrew simple diagrams** — boxes-and-arrows aren't precise enough anymore.
* **More legacy/packaged systems** need integrating, not building from scratch.
* **Loosely-coupled components** (e.g. microservices) are now the norm.
* **Modelling is essential** — too costly to experiment on real systems directly, so solutions are tested on models first.

> **TL;DR:** Architecture = structures for reasoning about a system, seen through C&C / module / allocation views. It matters because it's cheap to explore early but locks in quality and flexibility later. SOLID gives concrete rules for keeping class design flexible. Modern systems demand more rigorous modelling due to scale and complexity.

## 1.2 C4 model
<details>
    <summary><strong>C4 model</strong></summary>

<img src="https://software-architecture-guild.com/images/competencies/modeling/frameworks/c4.abstractions.png" />

The C4 model is a framework for visualizing software architecture. It acts like a set of maps that help software developers navigate large or complex codebases by zooming in from a high-level overview down to the specific code.

More Information: ![ProcessOn C4 model][https://www.processon.io/blog/c4-model-for-software-architecture]

---
It is structured into four levels of abstraction:
* **Level 1: System Context:** This provides the "overview first" by showing the entire software system, its users, and its dependencies on other systems.
* **Level 2: Containers:** This level zooms in to show the overall shape of the architecture and your technology choices. In the C4 model, a software system is made up of one or more "containers" (such as a client-side web app, server-side web app, mobile app, microservice, or database schema).
* **Level 3: Components:** Zooming in further, this level displays the logical components and their interactions within a single container.
* **Level 4: Code:** This is the most granular level, providing "details on demand" by showing the specific implementation details of the components, such as individual classes.

</details>

<details>
    <summary><strong>Example - Internal Banking System</strong></summary>

<detail>
    <summary><strong>Level 1: System Context</strong></summary>
<img src="https://software-architecture-guild.com/images/competencies/modeling/frameworks/c4.system_context.png"/>    
</detail>

<detail>
    <summary><strong>Level 2: Containers</strong></summary>
<img src="https://software-architecture-guild.com/images/competencies/modeling/frameworks/c4.containers.png"/>
</detail>

<detail>
    <summary><strong>Level 3: Components</strong></summary>
<img src="https://software-architecture-guild.com/images/competencies/modeling/frameworks/c4.components.png"/>
</detail>

<detail>
    <summary><strong>Level 4: Code</strong></summary>
<img src="https://software-architecture-guild.com/images/competencies/modeling/frameworks/c4.code.png"/>
</detail>

</details>

<details>
    <summary><strong>Example - Urban Marathon</strong></summary>

<details>
    <summary><strong>L1 & L2 Containers Architecture</strong></summary>

```mermaid
flowchart LR
    classDef userStyle fill:#1D4ED8,stroke:#1E40AF,stroke-width:2px,color:#FFFFFF;
    classDef contextStyle fill:#2563EB,stroke:#1D4ED8,stroke-width:2px,color:#FFFFFF;
    classDef containerStyle fill:#60A5FA,stroke:#2563EB,stroke-width:2px,color:#FFFFFF;
    classDef extStyle fill:#93C5FD,stroke:#3B82F6,stroke-width:2px,color:#1E3A8A;

    subgraph USERS ["System Users"]
        U_Runner["Runner / Participant"]
        U_Spec["Spectator"]
        U_Dir["Race Director"]
        U_Vol["Volunteer Coordinator"]
        U_Ven["Expo Vendor"]
    end

    subgraph CONTEXT ["System Context Boundary"]
        CTX_Portal["Participant and Spectator<br/>Portal Entry"]
        CTX_Admin["Event Operations and<br/>Admin Hub"]
    end

    subgraph CONTAINERS ["System Containers"]
        C_App["Mobile App<br/>(Live maps, tracking)"]
        C_Web["Web Portal<br/>(Registrations, Admin)"]
        C_GW["Shared API Gateway<br/>(Auth, Profiles)"]
        C_RegAPI["Registration API<br/>(Entries, Vendors)"]
        C_TrackAPI["Tracking API<br/>(Telemetry, Splits)"]
        C_MainDB[("Primary DB<br/>(PostgreSQL)")]
        C_BackDB[("Backup DB<br/>(Replication)")]
    end

    subgraph EXTERNAL ["External Systems"]
        EXT_Sensors["Timing Sensors<br/>(RFID)"]
        EXT_City["City Services<br/>(Road Permits)"]
        EXT_Notif["Notification Gateway<br/>(Push / SMS)"]
    end

    class U_Runner,U_Spec,U_Dir,U_Vol,U_Ven userStyle;
    class CTX_Portal,CTX_Admin contextStyle;
    class C_App,C_Web,C_GW,C_RegAPI,C_TrackAPI,C_MainDB,C_BackDB containerStyle;
    class EXT_Sensors,EXT_City,EXT_Notif extStyle;

    style USERS fill:#E5E7EB,stroke:#9CA3AF,stroke-width:2px
    style CONTEXT fill:#E5E7EB,stroke:#9CA3AF,stroke-width:2px
    style CONTAINERS fill:#E5E7EB,stroke:#9CA3AF,stroke-width:2px
    style EXTERNAL fill:#E5E7EB,stroke:#9CA3AF,stroke-width:2px

    linkStyle default stroke:#FF8C00,stroke-width:2px;

    U_Runner -->|"Track and view"| CTX_Portal
    U_Spec -->|"Track and view"| CTX_Portal
    U_Dir -->|"Manage event"| CTX_Admin
    U_Vol -->|"Manage event"| CTX_Admin
    U_Ven -->|"Manage event"| CTX_Admin

    CTX_Portal -->|"Launches"| C_App
    CTX_Admin -->|"Launches"| C_Web

    C_App -->|"Mobile HTTPS"| C_GW
    C_Web -->|"Web HTTPS"| C_GW
    C_Web -->|"SQL read"| C_MainDB

    C_GW -->|"Route reg tasks"| C_RegAPI
    C_GW -->|"Route tracking"| C_TrackAPI

    C_RegAPI -->|"SQL read/write"| C_MainDB
    C_TrackAPI -->|"Log split times"| C_MainDB
    C_MainDB -->|"Sync standby"| C_BackDB

    EXT_Sensors -->|"RFID splits"| C_TrackAPI
    C_RegAPI -->|"Road permits"| EXT_City
    C_GW -->|"Push / SMS"| EXT_Notif
```

</details>

<details>
    <summary><strong>L3 Components Architecture</strong></summary>

```mermaid
flowchart LR
    classDef compStyle fill:#BFDBFE,stroke:#3B82F6,stroke-width:1.5px,color:#1E3A8A;
    classDef darkSub fill:#374151,stroke:#4B5563,stroke-width:1px,color:#FFFFFF;

    subgraph APITRACK ["Tracking API"]
        TRK_Ingest["RFID Sensor Ingestor"]
        TRK_Splits["Split Time and Pace Calculator"]
        TRK_Board["Leaderboard Engine"]
    end

    subgraph MOBILEAPP ["Mobile App"]
        MA_UI["Map and Tracking UI"]
        MA_Sync["API Sync Client"]
        MA_Push["Push Receiver Module"]
    end

    subgraph WEBPORTAL ["Web Portal"]
        WP_Admin["Admin Operations UI"]
        WP_Reg["Registration Form Module"]
        WP_Auth["Session Manager"]
    end

    subgraph APIGATEWAY ["API Gateway"]
        GW_Notif["Notification Dispatcher"]
        GW_Router["Request Router and Limiter"]
        GW_Auth["Auth and JWT Service"]
    end

    subgraph APIREG ["Registration API"]
        REG_Core["Runner Entry Engine"]
        REG_Vendor["Vendor and Volunteer Module"]
        REG_Permit["City Service Sync"]
    end

    class TRK_Ingest,TRK_Splits,TRK_Board compStyle;
    class MA_UI,MA_Sync,MA_Push compStyle;
    class WP_Admin,WP_Reg,WP_Auth compStyle;
    class GW_Notif,GW_Router,GW_Auth compStyle;
    class REG_Core,REG_Vendor,REG_Permit compStyle;
    class APITRACK,MOBILEAPP,WEBPORTAL,APIGATEWAY,APIREG darkSub;

    linkStyle default stroke:#FF8C00,stroke-width:2px;

    MA_UI -->|"Uses"| MA_Sync
    WP_Admin -->|"Uses"| WP_Auth

    TRK_Ingest -->|"Raw split data"| TRK_Splits
    TRK_Splits -->|"Calculated pace"| TRK_Board
    TRK_Splits -->|"Triggers alerts"| GW_Notif

    MA_Sync -->|"Calls API"| GW_Router
    WP_Admin -->|"Calls API"| GW_Router
    WP_Reg -->|"Calls API"| GW_Router

    GW_Router -->|"Validates"| GW_Auth
    GW_Router -->|"Routes reg"| REG_Core
    GW_Router -->|"Routes tracking"| TRK_Ingest
```

</details>

<details>
    <summary><strong>L4 Class Architecture</strong></summary>

```mermaid
flowchart LR
    classDef classStyle fill:#BFDBFE,stroke:#3B82F6,stroke-width:1.5px,color:#1E3A8A;
    classDef darkSub fill:#374151,stroke:#4B5563,stroke-width:1px,color:#FFFFFF;

    subgraph APIGATEWAYCORE ["API Gateway"]
        RequestRouter["RequestRouter<br/>- routeMap: Map<br/>- rateLimitConfig: Config<br/>+ routeRequest()<br/>+ checkRateLimit()"]
        JWTAuthService["JWTAuthService<br/>- secretKey: String<br/>- tokenExpiry: Int<br/>+ validateToken()<br/>+ generateToken()"]
        UserSession["UserSession<br/>- sessionId: UUID<br/>- userId: UUID<br/>- role: String<br/>+ isExpired()<br/>+ invalidate()"]
    end

    subgraph APIREGISTRATIONCORE ["Registration API"]
        RegistrationController["RegistrationController<br/>- regService: RunnerService<br/>+ handleRegister()<br/>+ handleCancel()"]
        RunnerService["RunnerService<br/>- runnerRepo: Repository<br/>- bibAssigner: Assigner<br/>+ registerRunner()<br/>+ getRunnerDetails()"]
        Runner["Runner<br/>- runnerId: UUID<br/>- name: String<br/>- email: String<br/>- status: Enum<br/>+ updateProfile()<br/>+ getRegistrationStatus()"]
        EmergencyContact["EmergencyContact<br/>- contactId: UUID<br/>- name: String<br/>- phone: String<br/>- relation: String<br/>+ getContactInfo()<br/>+ updateContact()"]
        BibAssignment["BibAssignment<br/>- bibNumber: Int<br/>- waveGroup: String<br/>- assignedAt: DateTime<br/>+ assignBib()<br/>+ verifyBib()"]
    end

    subgraph APITRACKINGCORE ["Tracking API"]
        RFIDIngestController["RFIDIngestController<br/>- sensorStream: Stream<br/>- bufferSize: Int<br/>+ ingestRawTag()<br/>+ validateSensorData()"]
        PaceCalculatorService["PaceCalculatorService<br/>- courseDistance: Double<br/>- splitPoints: List<br/>+ calculatePace()<br/>+ projectFinishTime()"]
        SplitTimeRecord["SplitTimeRecord<br/>- splitId: UUID<br/>- bibNumber: Int<br/>- checkpointId: String<br/>- timestamp: DateTime<br/>+ recordSplit()<br/>+ getElapsedTime()"]
        RunnerPaceState["RunnerPaceState<br/>- runnerId: UUID<br/>- currentPace: Double<br/>- totalDistance: Double<br/>+ updatePace()<br/>+ getCurrentRank()"]
        LeaderboardService["LeaderboardService<br/>- topRunnersCache: Cache<br/>- categoryRanks: Map<br/>+ updateRankings()<br/>+ getLeaderboard()"]
    end

    class RequestRouter,JWTAuthService,UserSession classStyle;
    class RegistrationController,RunnerService,Runner,EmergencyContact,BibAssignment classStyle;
    class RFIDIngestController,PaceCalculatorService,SplitTimeRecord,RunnerPaceState,LeaderboardService classStyle;
    class APIGATEWAYCORE,APIREGISTRATIONCORE,APITRACKINGCORE darkSub;

    linkStyle default stroke:#FF8C00,stroke-width:2px;

    RequestRouter -->|"authenticates"| JWTAuthService
    JWTAuthService -->|"validates token"| UserSession
    RequestRouter -->|"dispatches route"| RegistrationController
    RegistrationController -->|"delegates reg"| RunnerService
    RunnerService -->|"creates entity"| Runner
    Runner -->|"has 1..*"| EmergencyContact
    Runner -->|"assigns 1..1"| BibAssignment

    RFIDIngestController -->|"passes raw tag"| PaceCalculatorService
    PaceCalculatorService -->|"persists split"| SplitTimeRecord
    PaceCalculatorService -->|"calculates pace"| RunnerPaceState
    RunnerPaceState -->|"recalculates rank"| LeaderboardService
```

</details>

</details>

---

# 2. Application Architecture

## 2.1 Architecture Context

Architecture must consider:

* **Functional requirements:** What the system must do.
* **Stakeholder goals:** What users, customers, developers, and regulators need.
* **Constraints:** Time, budget, skills, technology, and regulations.
* **Enablers:** Existing skills, systems, or technologies that can help delivery.
* **Risks:** Events that may prevent success.
* **Opportunities:** Potential benefits to pursue.

**Usage narrative:** A short story describing who uses the system, what they do, and their expected outcome.

## 2.2 Requirements, Quality Attributes, and Risk Management

### Functional Requirements

**Functional requirements (FRs)** describe **what the system must do**.

> Example: The system must allow customers to place online orders.

Functions are assigned to components such as modules, services, databases, and interfaces.

### Non-Functional Requirements

**Non-functional requirements (NFRs)** describe **how well the system should work**. Quality attributes are a major type of NFR.

* **FR:** Process an online order.
* **NFR:** Process it securely within two seconds.

NFRs should be specific, measurable, and prioritised. They often conflict: better security can reduce usability, higher availability can increase costs, and better performance can make modification harder.

### Quality Attributes

```mermaid
flowchart TB
    subgraph QualityAttributes["QUALITY ATTRIBUTES"]
        direction TB
        NFR["NON-FUNCTIONAL REQUIREMENTS"]

        subgraph QualityRowOne
            direction LR
            AV["Availability"] ~~~ DE["Deployability"] ~~~ EE["Energy Efficiency"] ~~~ MO["Modifiability"]
        end

        subgraph QualityRowTwo
            direction LR
            PE["Performance"] ~~~ SE["Security"] ~~~ TE["Testability"] ~~~ US["Usability"]
        end
    end

    style NFR fill:#DBEAFE,stroke:#2563EB,stroke-width:2px
    style QualityAttributes fill:#EAF3FF,stroke:#2563EB,stroke-width:4px
    style QualityRowOne fill:none,stroke:none,color:transparent
    style QualityRowTwo fill:none,stroke:none,color:transparent
    style AV fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style DE fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style EE fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style MO fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style PE fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style SE fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style TE fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style US fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

| Quality attribute | Meaning | Common approaches |
|---|---|---|
| **Availability** | The system is accessible and recovers from failure. | Redundancy, retry, circuit breaker |
| **Deployability** | The system can be released and rolled back safely. | CI/CD, blue-green, canary deployment |
| **Energy efficiency** | The system minimises energy consumption. | Power monitoring, disabling unused resources |
| **Modifiability** | The system is easy and inexpensive to change. | Low coupling, high cohesion, layers |
| **Performance** | The system meets speed and resource requirements. | Load balancing, throttling |
| **Security** | The system protects data and access. | Validation, intrusion prevention |
| **Testability** | Faults are easy to find and diagnose. | Dependency injection, strategy pattern |
| **Usability** | Users can complete tasks easily. | Feedback, undo, progress indicators, MVC |

#### Important Concepts

* **CIA security triad:** Confidentiality, Integrity, and Availability.
* **Deployment pipeline:** Development → Integration → Staging → Production.
* **Low coupling:** Modules have fewer dependencies.
* **High cohesion:** Each module has one focused responsibility.
* **Performance measures:** Latency, response time, throughput, and memory efficiency.

### NFRs and Risk Management

#### Agile Scrum and DevOps

* **Scrum:** Develops software through short sprints.
* **DevOps:** Supports continuous testing, deployment, and monitoring.
* Sprint planning covers requirements, design, NFRs, and risks.

#### Product Backlog

The product backlog tracks user stories, priorities, sprint allocation, progress, NFRs, and risks. It is continuously updated.

#### Common NFRs

| NFR | Meaning |
|---|---|
| **Performance** | System response speed |
| **Scalability** | Ability to handle more workload |
| **Security** | Protection of data and access |
| **Usability** | Ease of use |
| **Maintainability** | Ease of updating and supporting the system |

#### Risk Identification and Assessment

* **Identify:** Find and classify potential risks.
* **Assess:** Measure probability and impact.
* **Prioritise:** Handle the most serious risks first.
* **Record:** Add risks to the risk matrix.

#### Expected Monetary Value

Expected Monetary Value (EMV) estimates the financial effect of a risk:

$$
\text{EMV} = \text{Probability} \times \text{Impact}
$$

For multiple outcomes:

$$
\text{Total EMV} = \sum(\text{Probability} \times \text{Impact})
$$

Example:

$$
(0.98 \times \$25{,}000) - (0.02 \times \$5{,}000) = \$24{,}400
$$

A positive EMV means the expected financial outcome is favourable.

#### Risk Response and Monitoring

* **Avoid:** Remove the risk.
* **Mitigate:** Reduce the risk.
* **Accept:** Monitor the risk.
* **Transfer:** Move the risk to another party.

Assign an owner and response plan, then continuously update the risk matrix.

---

# 3. Data Architecture

## 3.1 Data Modelling

Data modelling designs how data and its relationships should be represented. There are three levels.

### Conceptual Data Model

This is the big-picture business view. It defines:

* Key entities
* Their relationships
* Business rules

For a university system, the entities may include `Student`, `Subject`, `Lecturer`, and `Enrolment`.

At this level, we may say that a student can enrol in many subjects, and a subject can have many students. We do not yet decide on tables, column names, or database technology.

### Logical Data Model

This is more detailed but still independent of a particular database system. It defines:

* Tables or entities
* Attributes
* Primary keys
* Foreign keys
* Mandatory fields
* Relationship rules

| Table | Important fields |
| --- | --- |
| Student | StudentID, Name, Email |
| Subject | SubjectCode, SubjectName |
| Enrolment | StudentID, SubjectCode, EnrolmentDate |

It explains what the data should look like logically, but not whether a field is `VARCHAR(100)` or which index will be created.

### Physical Data Model

This is the implementation-level database design. It includes:

* Exact data types, such as `VARCHAR`, `INT`, and `DATE`
* Tables and associative tables
* Primary and foreign keys
* Indexes
* Database-specific performance settings

## 3.2 Data Ingestion

Data ingestion means moving data from its original sources into a destination where it can be stored, processed, or analysed.


### ETL and ELT

#### ETL: Extract, Transform, Load

ETL is the traditional approach:

1. Extract data from source systems.
2. Transform it by cleaning, standardising, validating, and combining it.
3. Load the prepared data into a data warehouse.

For example, customer names and dates can be cleaned before being loaded into a reporting database.

The limitation is that data often needs a defined structure before it enters the warehouse. This makes ETL less flexible for real-time, image, video, log, or other unstructured data.

#### ELT: Extract, Load, Transform

ELT changes the order:

1. Extract data.
2. Load it in raw form into a central repository, usually a data lake.
3. Transform it later when a particular use case needs it.

The main advantage is that the original data is retained. This is useful because:

* Raw history and lineage are preserved.
* Structured, semi-structured, unstructured, and streaming data can all be kept.
* Teams can use data for new purposes later.
* Data can be accessed before it is fully transformed.

### ETL vs ELT

| ETL | ELT |
| --- | --- |
| Transform before storage in a warehouse | Store raw data first, then transform it |
| Less flexible | More flexible |
| Traditionally batch-based | Better suited to cloud and diverse data |
| Raw data may not be retained | Raw data and history are retained |

## 3.3 Data Management Systems

### Data Warehouse

A data warehouse is centralised storage designed for analytics, reporting, and business intelligence. It stores curated, structured, cleaned data.

For example, a retail company’s warehouse may combine sales, customer, product, and inventory data to create company-wide reports. It is optimised for large analytical queries, not daily transactional activity such as placing an order.

### Data Mart

A data mart is a smaller, focused part of a data warehouse for one business area. Examples include finance, marketing, and HR data marts.

Types of data mart:

* **Dependent:** Created from an existing data warehouse.
* **Independent:** Created directly from source systems without a warehouse.
* **Hybrid:** Combines warehouse data with other operational data.

### Data Lake

A data lake stores large quantities of raw data in its original format. It can contain:

* Tables
* JSON or XML
* PDFs
* Images and videos
* Logs
* Sensor data

A warehouse uses more structure before analysis. A lake accepts raw data first and applies structure later when needed.

### Warehouse vs Lake vs Mart

| Feature | Data warehouse | Data lake | Data mart |
| --- | --- | --- | --- |
| Data type | Mostly curated and structured | Any type, including raw files and media | Focused subset, usually structured |
| Main purpose | BI, reports, dashboards | Exploration, ML, large-scale analytics | Department-specific analysis |
| Users | Organisation-wide analysts and teams | Engineers, data scientists, analysts | One department or business group |
| Data schema | Usually schema-on-write | Usually schema-on-read | Usually predefined |
| Example | Company-wide sales reporting | Raw logs, images, sensor streams | Marketing campaign dashboard |

### Schema-on-Write vs Schema-on-Read

* **Schema-on-write:** Define the structure before storing data. This is common in data warehouses.
* **Schema-on-read:** Store data first, then decide its structure when analysing it. This is common in data lakes.

### Large Organisations Often Use All Three

```mermaid
flowchart LR
    A["Raw data sources"] --> B["Data lake"]
    B --> C["Data warehouse"]
    C --> D["Finance data mart"]
    C --> E["Marketing data mart"]
```

## 3.4 Types of Data Architectures

### Data Fabric

A data fabric is an architecture that connects data across many systems, clouds, databases, data lakes, warehouses, APIs, and applications.

Its goal is to make data easier to find, access, govern, and use, even when it is physically stored in many places. Key features include:

* **Data integration:** Connects different sources.
* **Data virtualisation:** Lets users access data without knowing its physical location.
* **Data governance:** Enforces security, privacy, quality, and compliance rules.
* **Data orchestration:** Automates pipelines and workflows.
* **Metadata management:** Records datasets’ meaning, ownership, and lineage.

Think of data fabric as an intelligent connecting layer over an organisation’s distributed data environment.

### Data Mesh

A data mesh is a decentralised approach in which each business domain owns and manages its own data.

For example:

* Marketing owns marketing data products.
* Sales owns sales data products.
* Customer service owns support data products.

Instead of one central data team becoming responsible for every dataset, domain teams take responsibility for making their data useful, documented, secure, and shareable.

Key principles:

* **Domain-oriented ownership:** Teams own data from their business area.
* **Data as a product:** Data should be reliable, documented, discoverable, and usable by others.
* **Self-service platform:** Teams receive shared tools for storage, access, monitoring, and governance.
* **Federated governance:** Shared organisation-wide rules exist, while data ownership remains distributed.

### Data Fabric vs Data Mesh

| Data fabric | Data mesh |
| --- | --- |
| Focuses on connecting and integrating data technically | Focuses on distributing ownership organisationally |
| Uses automation, metadata, virtualisation, and orchestration | Uses domain teams and data-product thinking |
| Answers: “How can all our data work together?” | Answers: “Who should own and maintain each dataset?” |

## 3.5 Big Data Solutions

### Architectural Shifts in the Big Data Era

| Area | Traditional approach | Modern approach |
| --- | --- | --- |
| Data generation | Mostly relational, structured, batch data | Relational + NoSQL, structured + unstructured, batch + real time |
| Ingestion | On-premises ETL | Cloud ELT and streaming |
| Storage | Centralised warehouse | Cloud warehouses, distributed storage, data lakes |
| Analytics | Historical reports and data mining | Predictive/prescriptive analytics, AI/ML, real-time insights |
| Consumption | Central dashboards and reports | Self-service tools and AI-driven insights |

**Polyglot persistence** means using different database technologies for different needs, rather than forcing every type of data into one relational database.

### NoSQL Databases

NoSQL databases were developed for data that is massive, distributed, rapidly changing, or not neatly structured in tables.

Relational databases are still very important, especially when strong consistency and complex transactions are needed. However, they can be less suitable for huge amounts of sparse, semi-structured, or globally distributed internet-scale data.

Common NoSQL characteristics:

* Can scale across many machines
* Support fast reads and writes
* Often have flexible or schema-less structures
* Support replication and distribution
* May accept trade-offs in strict ACID transactions for speed and scalability

#### Main NoSQL Types

| Type | Best for | Example use |
| --- | --- | --- |
| Key-value store | Very fast, simple lookups | Sessions, cache, chat data |
| Document database | Flexible JSON-like records | Product catalogues, content management |
| Column store | Large analytical or time-series data | Event logs, IoT data |
| Graph database | Relationship-heavy data | Social networks, fraud detection, recommendations |

### Big Data Architecture Patterns

#### Batch Architecture

Batch architecture processes accumulated data at scheduled times.

For example, it can generate a sales report every night using all transactions from that day. It is best when immediate results are not required.

```mermaid
flowchart LR
    A["Data collected<br/>throughout the day"] --> B["Stored in database<br/>or data lake"]
    B --> C["Scheduled batch job<br/>(e.g. every night)"]
    C --> D["Reports and dashboards"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

#### Streaming Architecture

Streaming architecture processes data continuously or almost immediately as it arrives.

For example, it can detect suspicious card transactions as they occur. It is best when a fast response is important.

```mermaid
flowchart LR
    A["Live event<br/>(e.g. payment or GPS update)"] --> B["Stream platform<br/>(e.g. Kafka)"]
    B --> C["Real-time processing"]
    C --> D["Immediate alert,<br/>action, or dashboard update"]

    style A fill:#FFFFFF,stroke:#059669,stroke-width:2px
    style B fill:#FFFFFF,stroke:#059669,stroke-width:2px
    style C fill:#FFFFFF,stroke:#059669,stroke-width:2px
    style D fill:#FFFFFF,stroke:#059669,stroke-width:2px
```

#### Lambda Architecture

Lambda architecture combines batch and streaming processing:

* The batch layer processes complete historical data accurately.
* The speed layer processes recent live data quickly.
* The results are combined for analysis.

For example, a social-media platform may analyse historical user behaviour in batch while also responding to new posts and interactions in near real time.

```mermaid
flowchart TB
    A["Incoming data"] --> B["Batch layer<br/>Processes full historical data"]
    A --> C["Speed layer<br/>Processes newest data immediately"]

    B --> D["Serving / combined layer"]
    C --> D
    D --> E["Accurate and near-real-time analytics"]

    style A fill:#FFFFFF,stroke:#EA580C,stroke-width:2px
    style B fill:#FFFFFF,stroke:#EA580C,stroke-width:2px
    style C fill:#FFFFFF,stroke:#EA580C,stroke-width:2px
    style D fill:#FFFFFF,stroke:#EA580C,stroke-width:2px
    style E fill:#FFFFFF,stroke:#EA580C,stroke-width:2px
```

## 3.6 Data Dictionary Table 

### Purpose and Characteristics

A data dictionary documents each data element, including its:

* Name
* Format
* Length
* Business meaning

It provides a shared reference for:

* Consistent database design
* Data architecture implementation


---

# 4. Cloud Reference Architecture
## 4.1 On-Premisess vs Cloud
<details>
    <summary>On-Premise</summary>

On-Premises

An on-premises system is hosted and managed using infrastructure owned by the organisation.

The organisation is responsible for:

* physical servers;
* networking equipment;
* operating systems;
* databases;
* application deployment;
* security;
* backups and maintenance.

On-premises infrastructure provides greater control but usually requires higher initial costs, specialised staff and more maintenance.
</details>

<details>
    <summary>Cloud</summary>

A cloud system uses infrastructure and services provided by companies such as AWS, Microsoft Azure or Google Cloud.

Cloud computing provides:

* faster deployment;
* elastic scaling;
* pay-as-you-use pricing;
* managed backups and recovery;
* access to specialised services;
* reduced infrastructure maintenance.

Possible concerns include security, privacy, ongoing costs, internet dependency and vendor lock-in.
---
| Model    | Description                             | Customer manages                   | Example           |
| -------- | --------------------------------------- | ---------------------------------- | ----------------- |
| **IaaS** | Provides virtual infrastructure         | OS, runtime, applications and data | AWS EC2           |
| **PaaS** | Provides a managed application platform | Applications and data              | Google App Engine |
| **SaaS** | Provides a complete application         | Configuration and usage            | Gmail, Salesforce |
---
Other Cloud Service Models
* Network as a Service (NaaS)
* Communications as a Service (CaaS)
* Compute as a Service (CompaaS)
* Data Storage as a Service (DSaaS)

</details>

## 4.2 Principles for cloud-native architecture
Cloud-native architecture means designing a system to take advantage of cloud capabilities instead of simply placing an existing application on a cloud server.

<details>
    <summary>Principle 1: Design for Automation</summary>

Cloud systems should automate repetitive and error-prone activities.

Automation can be applied to:

* infrastructure provisioning;
* software building and testing;
* application deployment;
* scaling;
* monitoring;
* backup and recovery.

Examples include:

* using Docker to package applications;
* using Terraform to create infrastructure;
* using CI/CD pipelines to test and deploy software;
* using autoscaling to add or remove instances.

Automation makes deployment faster, more consistent and less vulnerable to human error.
</details>

<details>
    <summary>Principle 2: Be Smart with State</summary>

State is information about a user’s current situation within an application.

Examples include:

* login status;
* shopping-cart contents;
* form progress;
* game-session progress.

If state is stored inside one application server, the information may be lost when the server crashes. It also becomes difficult to send the user to another server.

Therefore, application servers should be stateless where possible. Important state should be stored externally in systems such as:

* Redis;
* managed databases;
* cloud storage.

For example, an online store can store shopping-cart information in Redis. Any application server can then retrieve the cart using the customer’s identifier.
</details>

<details>
    <summary>Principle 3: Favour Managed Services</summary>

Managed services are operated and maintained by the cloud provider.

Examples include:

* managed databases;
* message queues;
* cloud storage;
* machine-learning services;
* analytics services.

The provider normally handles:

* infrastructure maintenance;
* updates;
* backups;
* replication;
* availability.

This allows the development team to focus on the product. However, using provider-specific services may create vendor lock-in.

Vendor lock-in can be reduced by:

* using open standards;
* using open-source-compatible services;
* placing provider-specific code behind interfaces;
* using containers;
* documenting a migration strategy.

</details>

<details>
    <summary>Principle 4: Practise Defence in Depth</summary>

Defence in depth means protecting the system with multiple security layers.

These layers may include:

1. Edge firewall: blocks suspicious external traffic.
2. Network segmentation: separates internal parts of the system.
3. Authentication: verifies the identity of users and services.
4. Authorisation: controls what each user or service can access.
5. Application security: validates input and checks permissions.
6. Endpoint security: protects individual devices and servers.
7. Encryption: protects data during storage and transmission.
8. Continuous monitoring: detects suspicious behaviour.

Cloud-native architecture should not automatically trust a component simply because it is located inside the organisation’s network.
</details>

<details>
    <summary>Principle 5: Always Be Architecting</summary>

Cloud architecture should continuously evolve as:

* user requirements change;
* traffic increases;
* security threats develop;
* cloud services improve;
* organisational needs change;
* new technologies become available.

Architects should regularly review and improve the system rather than waiting for a major failure.

For example, a video-streaming platform must adapt its architecture to support new video formats, higher resolutions and increasing user demand.
</details>

<details>
    <summary>Applying the Principles to C4 Diagrams</summary>

The container and component diagrams from previous weeks should be updated to reflect cloud decisions.

Possible changes include:

* replacing a self-hosted database with a managed database;
* adding object storage;
* adding a message queue;
* introducing authentication services;
* adding caching;
* separating state from application servers;
* showing cloud-hosted APIs.

The design should then be justified using the five cloud-native principles.
</details>


## 4.3 Deployment Diagram
A deployment diagram shows how software systems and containers are installed and run on infrastructure in a particular environment, such as development, staging, or production.

* Deployment nodes represent where software runs, including:
    * Physical servers or devices
    * Virtual machines and cloud services such as IaaS or PaaS
    * Containers such as Docker
    * Execution environments such as database servers, Java application servers, or Microsoft IIS

* Deployment nodes can be nested. For example, a Docker container may run inside a virtual machine hosted on AWS.

* The diagram can also include infrastructure components, such as:
    * DNS services
    * Load balancers
    * Firewalls

* AWS, Azure, or other cloud-provider icons may be used, but all icons should be explained in the diagram’s key or legend.

In simple terms: A deployment diagram explains where each part of a system runs and how the infrastructure components are arranged.

### 4.3.1 Example Bank Deployment Diagram
<img src="https://online.visual-paradigm.com/repository/images/d05814ec-ea32-4f01-a160-b07805252807/c4-model-design/c4-model-deployment-diagram-for-internet-banking-system.png" />

### 4.3.2 Example Pet Clinic Diagram
<img src="https://tarf.co.uk/Reference/Architecture/media/20240119134009.png" />

## 4.4 System Landscape Diagram
A System Landscape Diagram shows how multiple software systems and people fit together across an organisation, department, or enterprise.

Unlike a standard C4 System Context Diagram, which focuses on one specific system, a System Landscape Diagram provides a broader overview without making any single system the main focus.

* Scope: An entire enterprise, organisation, department, or similar area.
* Main elements: People, software systems, and the relationships between them.
* Purpose: To understand how systems interact and support the wider organisation.
* Audience: Both technical and non-technical stakeholders, inside and outside the development team.
* Further detail: Each important system can be explored separately using the standard C4 model.

<img src="https://tarf.co.uk/Reference/Architecture/media/20240119133739.png"/>

---

# 5. Security and Privacy

## 5.1 Dynamic Diagram

A **dynamic diagram** shows how system elements interact **at runtime** to complete a feature, use case, or user story. Interactions are numbered to show the order of communication. It can include systems, containers, or components.

**Purpose:** understand **how data moves through the system** before analysing security threats.

<details>
    <summary>Simple example</summary>
Tutorial Diagram

<img src="https://miro.medium.com/v2/resize:fit:1400/1*SmxJZZPcZkDvFvq9g1Pbzg.png" />

---

```mermaid
flowchart LR
    A["User"] -->|"1"| B["Login Controller"]
    B -->|"2"| C["Security Component"]
    C -->|"3"| D["Database"]
    D -->|"4"| E["Response"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

`User → Login Controller → Security Component → Database → Response`

</details>

## 5.2 Threat Modelling

**Threat modelling** is the process of identifying what could go wrong in a system and how to reduce the risk.

Focus on:

* **Entry points** — where users or systems can access the application
* **Trust boundaries** — where data moves between different trust levels
* **Data flow** — how information moves through the system
* **Threats** — possible security problems
* **Mitigations** — controls used to reduce those threats

## 5.3 Security Principles

<details>
    <summary>Minimise Attack Surface</summary>

Reduce the number of possible places an attacker can target.

Examples:

* Disable unnecessary services
* Close unused ports
* Limit exposed APIs
* Restrict admin access

</details>

<details>
    <summary>Secure the Weakest Link</summary>

A system's security can depend on its least secure component.

Example:

`Strong encryption + Secure database + Weak password = Still vulnerable`

The tutorial asks you to consider both principles when analysing a system.

</details>

## 5.4 STRIDE Threat Model

STRIDE is used to classify common security threats. Apply it to components and data flows in the architecture to identify possible threats.

| STRIDE | Meaning | Security Property | Simple Meaning |
|---|---|---|---|
| **S** | Spoofing | Authentication | Pretending to be another user |
| **T** | Tampering | Integrity | Changing data or code |
| **R** | Repudiation | Non-repudiation | Denying an action |
| **I** | Information Disclosure | Confidentiality | Accessing information without permission |
| **D** | Denial of Service | Availability | Making a service unavailable |
| **E** | Elevation of Privilege | Authorization | Gaining permissions you should not have |

## 5.5 Mitigation

A **mitigation** is a security control used to reduce or prevent a threat.

| Threat | Possible Mitigation |
|---|---|
| Spoofing | Authentication / MFA |
| Tampering | Integrity checks |
| Repudiation | Logging and audit records |
| Information Disclosure | Access control / encryption |
| Denial of Service | Rate limiting |
| Elevation of Privilege | Authorization controls |

## 5.6 Connection to C4 Diagrams

Security and privacy should be included in architecture diagrams such as:

* Application/Data Container Diagram
* Component Diagram
* Deployment Diagram

The goal is to show not only **how the system is built**, but also **how it is protected**.

<details>
    <summary>Key process to remember</summary>

```mermaid
flowchart TD
    A["Architecture"] --> B["Dynamic Diagram<br/>How does the system operate?"]
    B --> C["Data Flow<br/>Where does the data go?"]
    C --> D["Threat Modelling<br/>What could go wrong?"]
    D --> E["STRIDE<br/>What type of threat is it?"]
    E --> F["Mitigation<br/>How do we reduce the threat?"]
    F --> G["C4 Diagram<br/>Show security in the architecture"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style G fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

> **Dynamic Diagram** = How the system works
> **Threat Modelling** = What could go wrong
> **STRIDE** = Classify the threat
> **Mitigation** = How to protect against it

</details>

---

# 6. Architecture Styles and Communication Patterns

Week 6 focuses on:

* recognising **bad architecture**
* understanding **dependencies**
* choosing suitable **architecture styles**
* choosing how components **communicate**

## 6.1 Architecture Smells

Architecture smells are warning signs that a system may be difficult to maintain, change, or scale.

| Architecture Smell | Simple Meaning | Marathon Example | Improvement |
|---|---|---|---|
| **Feature Concentration** | One component does too many things | **Backend API** handles registration, schedules, volunteers, vendors, tracking, notifications, feedback, and results | Split into focused components or services |
| **Scattered Functionality** | One responsibility is spread across multiple components | Notification responsibilities exist across Web App, Mobile App, Backend API, and Notification Provider | Centralise notification rules |
| **Dense Structure** | Too many direct dependencies between components | **Backend API** directly connects to apps, database, authentication, payment, timing, notification, and mapping systems | Use focused integration components and asynchronous messaging |
| **Cyclic Dependency** | Components eventually depend back on each other | No cyclic dependency identified in the current Marathon architecture | Recheck after architecture changes |
| **Unstable Dependency** | A core component depends directly on less-stable or external systems | Backend API directly depends on Payment, Notification, Mapping, and Timing services | Use adapters, queues, retries, timeouts, and failure handling |


<details>
    <summary>Easy way to identify them</summary>

```mermaid
flowchart TD
    Q1["One component does too much?"] --> A1["Feature Concentration"]
    Q2["Same responsibility exists everywhere?"] --> A2["Scattered Functionality"]
    Q3["Too many arrows or connections?"] --> A3["Dense Structure"]
    Q4["Dependencies form a loop?"] --> A4["Cyclic Dependency"]
    Q5["Core system relies directly on external systems?"] --> A5["Unstable Dependency"]

    style Q1 fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style Q2 fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style Q3 fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style Q4 fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style Q5 fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style A1 fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style A2 fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style A3 fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style A4 fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style A5 fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
```

</details>

<details>
    <summary>Single Responsibility Principle</summary>

To avoid **Feature Concentration**, each container or component should have **one clear responsibility**. This keeps changes and fixes focused and localised.

Instead of one Backend API owning every capability:

```text
Backend API
 ├─ Registration
 ├─ Tracking
 ├─ Results
 ├─ Volunteers
 ├─ Vendors
 └─ Notifications
```

separate the responsibilities:

```text
Backend API
 ├─ Registration Component
 ├─ Event Management Component
 ├─ Volunteer Component
 ├─ Vendor Component
 ├─ Tracking Component
 └─ Results Component
```

The updated Marathon solution follows this structure.

</details>

<details>
    <summary>Marathon Database example</summary>

The original Marathon Database stores registration, schedules, volunteers, vendors, timing records, results, and feedback, creating **Feature Concentration**.

The improved architecture separates:

```mermaid
flowchart LR
    A["Operational Database"] --- B["Live-Tracking Data Store"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

This keeps normal operational data separate from rapidly changing race-tracking data.

</details>

## 6.2 Dependencies

If `A → B`:

* **A depends on B**
* A must know how to connect to B
* B does not need to know about A
* communication can move both ways, but A normally initiates it

<details>
    <summary>Marathon examples</summary>

```mermaid
flowchart LR
    A["Web App"] --> C["Backend API"]
    B["Mobile App"] --> C
    C --> D["Marathon Database"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

| Component | Depends On |
|---|---|
| Web Application | Backend API |
| Mobile Application | Backend API |
| Backend API | Marathon Database |

</details>

## 6.3 Architecture Styles

Compare architecture styles by **advantages**, **disadvantages**, and **suitable use cases**, then justify which styles should be used in the system.

| Style | Meaning / Marathon Use | Advantages | Disadvantages |
|---|---|---|---|
| **Layered** | Separates presentation, business, and data responsibilities | Clear structure; easier testing and maintenance | Layers may become tightly coupled; limited independent scaling |
| **Service-Oriented** | Used for Payment, Mapping, Notification, and Authentication integrations | Reusable services and standard interfaces | More coordination and governance |
| **Event-Driven** | Used for timing, tracking, race updates, and alerts | Handles traffic spikes, asynchronous processing, and real-time events | Harder tracing, testing, ordering, and error handling |
| **Microservices** | Separate capabilities such as Registration, Tracking, or Results | Independent deployment/scaling and failure isolation | More deployment, networking, monitoring, and data complexity |

<details>
    <summary>Marathon selected approach</summary>

The sample solution uses a **hybrid architecture**:

```mermaid
flowchart TD
    H["Hybrid Architecture"] --> L["Layered<br/>internal application organisation"]
    H --> S["Service-Oriented<br/>external integrations"]
    H --> E["Event-Driven<br/>timing, tracking, notifications"]
    H --> M["Microservices<br/>selected functions needing independent scaling"]

    style H fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style L fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style S fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style M fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

</details>

## 6.4 Communication Patterns

The tutorial introduces four main communication methods:

| Pattern | Simple Meaning | Marathon Example |
|---|---|---|
| **Repository** | Components read and write shared stored data | Backend API → Operational Database |
| **API** | Consumer sends a request to a provider | Web/Mobile → Backend API |
| **Persistent Connection** | Connection remains open for real-time communication | Notification Service → Mobile App |
| **Queue / Broker** | A middleman carries messages asynchronously | Timing Events → Event Broker → Tracking Processor |

## 6.5 Repository Communication

Multiple containers read and write data through a shared repository, usually a database.

```mermaid
flowchart TD
    A["Backend API"] --> B["Operational Database"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

### Limitations

* mainly supports **CRUD**
* constant polling can waste resources
* multiple writers can create consistency problems

CRUD: **Create**, **Read**, **Update**, **Delete**.

## 6.6 API Communication

With APIs, `Consumer → Provider`. The **consumer initiates communication** and can **pull** or **push** information.

<details>
    <summary>Marathon examples</summary>

```mermaid
flowchart LR
    A["Web App"] --> C["Backend API"]
    B["Mobile App"] --> C
    C --> D["Payment Service"]
    C --> E["Mapping Service"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

These use APIs over **HTTPS/JSON** in the sample architecture.

</details>

### REST APIs

REST is the main API style discussed in the tutorial.

> **URL = resource/noun**
> **HTTP method = action/verb**

| Method | Example | Meaning |
|---|---|---|
| GET | `/tickets` | Retrieve tickets |
| GET | `/tickets/123` | Retrieve one ticket |
| POST | `/tickets` | Create |
| PUT | `/tickets/123` | Update |
| DELETE | `/tickets/123` | Delete |

Important response codes:

| Code | Meaning |
|---|---|
| **200** | Success |
| **400** | Bad request |
| **401** | Not authenticated |
| **403** | No permission |
| **404** | Not found |

REST APIs are also **stateless**: each request is processed independently without relying on previous requests. Data is commonly exchanged using **JSON**.

### API Limitation → Persistent Connections

REST communication is initiated by the consumer. That creates a problem for real-time updates.

```mermaid
flowchart TD
    A["Race alert occurs"] --> B["Server needs to notify Mobile App"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

The server should not need to wait for the Mobile App to ask for an update. This is where **persistent connections** are useful.

## 6.7 Persistent Connections / WebSockets

A persistent connection remains open:

```mermaid
flowchart LR
    A["Client"] <-->|"WebSocket"| B["Server"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

After the consumer creates the connection:

* the client can send messages
* the server can send messages
* either side can close it

Used for timely Marathon:

* race updates
* emergency alerts
* mobile notifications

### Limitations

* **Ambiguous interface:** WebSockets do not strongly define what messages or events should look like, so both sides must agree on the format.
* **Difficult to scale:** persistent connections make the backend more stateful and harder to divide across services.

## 6.8 Queues and Brokers

Instead of services communicating directly (`Producer → Consumer`), use a middleman:

```mermaid
flowchart TD
    A["Producer"] --> B["Queue / Broker"]
    B --> C["Consumer"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Message queues can provide:

* reliability
* ordering
* prioritisation
* load balancing
* buffering
* playback
* translation

<details>
    <summary>Marathon timing example</summary>

This is an important example of **event-driven communication**:

```mermaid
flowchart TD
    A["Timing Devices"] --> B["IoT Data Ingestion"]
    B --> C["Event Broker"]
    C --> D["Tracking Event Processor"]
    D --> E["Tracking DB"]
    D --> F["Operational DB"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Why use a broker? If thousands of runners cross checkpoints at once, the broker helps **buffer events and decouple the timing devices from processing**.

```mermaid
flowchart TD
    A["Thousands of timing events"] --> B["Event Broker"]
    B --> C["Processed safely by consumers"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

</details>

<details>
    <summary>Publish / Subscribe</summary>

With **Pub/Sub**:

* a **publisher** produces events
* a **subscriber** receives events
* a service can be both

Events are organised into **topics/channels**. The publisher does not need to know every subscriber.

```mermaid
flowchart TD
    A["Publisher"] --> B["Topic: Race Update"]
    B --> C["Event Broker"]
    C --> D["Mobile"]
    C --> E["Dashboard"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

</details>

<details>
    <summary>Marathon notification example</summary>

Instead of `Backend API → Notification Provider`, the improved architecture uses:

```mermaid
flowchart TD
    A["Backend API"] --> B["Event Broker"]
    B --> C["Notification Worker"]
    C --> D["Notification Provider"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Notification delivery becomes **asynchronous**, so sending a notification does not need to block the user's main request.

</details>

## 6.9 Marathon Communication Summary

| Source → Destination | Pattern | Why |
|---|---|---|
| Web → Backend API | API | Immediate response |
| Mobile → Backend API | API | Current race information |
| Backend → Operational DB | Repository | Store authoritative data |
| Backend → Payment | API | Payment confirmation |
| Backend → Mapping | API | Route information |
| Timing → IoT | Broker / MQTT | High-volume device communication |
| IoT → Event Processing | Queue/Broker | Scalable asynchronous processing |
| Processor → Tracking DB | Repository | Frequent tracking updates |
| Backend → Notifications | Queue/Broker | Avoid blocking user requests |
| Notification → Mobile | Persistent connection | Real-time updates |

<details>
    <summary>Main Week 6 takeaway</summary>

```mermaid
flowchart TD
    A["Good Architecture"] --> B["Clear Responsibilities"]
    A --> C["Controlled Dependencies"]
    A --> D["Correct Communication Pattern"]

    style A fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

> **Architecture Style** = how the system is organised.
> **Architecture Smell** = warning that the organisation has a problem.
> **Dependency** = which component relies on another.
> **Communication Pattern** = how components exchange information.

For the Marathon system:

```text
Immediate request?
      → API

Store/retrieve data?
      → Repository

Real-time two-way/update communication?
      → Persistent Connection

High-volume or asynchronous events?
      → Queue / Broker
```

This is the core logic connecting the Week 6 tutorial concepts to the Marathon Management System sample solution.

</details>

---

# 7. Architecture Evaluation

Week 7 focuses on:

* checking whether a design can **meet requirements** and handle realistic situations
* comparing architecture alternatives with **ATAM**
* finding failure risks with **HAZOP**
* documenting decisions and **updating the C4 model**

## 7.1 Purpose of Architecture Evaluation

Architecture evaluation checks whether a system design can **meet requirements, handle realistic situations, and avoid major failures**.

Mistakes are easier and cheaper to fix early.

```mermaid
flowchart TD
    A["Architecture"] --> B["Evaluate"]
    B --> C["Find weaknesses"]
    C --> D["Compare alternatives"]
    D --> E["Improve design"]
    E --> F["Document decisions"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

## 7.2 ATAM — Architecture Trade-off Analysis Method

ATAM evaluates how well an architecture handles different **scenarios** and helps compare alternatives.

> **ATAM = Which architecture is better for this situation, and what trade-offs do we accept?**

```mermaid
flowchart TD
    A["Scenario"] --> B["Alternative A vs B"]
    B --> C["Benefits"]
    C --> D["Trade-offs"]
    D --> E["Decision"]
    E --> F["Justification"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

<details>
    <summary>Tutor sample — architectural alternatives</summary>

| Scenario | Alternatives | Benefits | Trade-offs | Decision | Justification |
|---|---|---|---|---|---|
| Large burst of timing events | **A:** Direct to Backend API<br />**B:** IoT Data Ingestion + Event Stream | A: Simple<br />B: Buffers traffic, scalable, reliable | A: API overload/lost events<br />B: More infrastructure and ordering complexity | **B** | Protects Backend API and supports race-day scaling |
| Notification Provider unavailable | **A:** Synchronous API call<br />**B:** Queue + asynchronous delivery | A: Immediate result<br />B: Retries and failure isolation | A: Provider failure affects app<br />B: Delivery may be delayed | **B** | Improves resilience |
| Tracking data grows heavily | **A:** Use Operational DB<br />**B:** Separate Tracking Data Store | A: Simple<br />B: Independent scaling | A: Tracking may slow core DB<br />B: More integration complexity | **B** | Protects registration/admin workloads |

</details>

<details>
    <summary>Event burst</summary>

Instead of sending timing events straight to the Backend API:

```mermaid
flowchart TD
    A["Timing Devices"] --> B["Backend API"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

use a buffer so the API is not overwhelmed:

```mermaid
flowchart TD
    A["Timing Devices"] --> B["IoT Ingestion"]
    B --> C["Event Stream"]
    C --> D["Processor"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

The Event Stream acts as a **buffer**, so the Backend API is not overwhelmed.

</details>

<details>
    <summary>Notification failure</summary>

Instead of a synchronous call:

```mermaid
flowchart LR
    A["Backend API"] --> B["Provider"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

use a queue so the user request does not fail immediately if the provider is down:

```mermaid
flowchart LR
    A["Backend API"] --> B["Queue"]
    B --> C["Worker"]
    C --> D["Provider"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

</details>

<details>
    <summary>Large tracking data</summary>

Separate high-volume tracking data from operational data:

```mermaid
flowchart TD
    A["Operational DB"] --> B["registration / admin / results"]
    C["Tracking DB"] --> D["live tracking"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

This prevents tracking traffic from slowing important operational functions.

</details>

## 7.3 Trade-offs

A design is rarely best at everything.

| Decision | Improves | Trade-off |
|---|---|---|
| Event Stream | Scalability, reliability | More complexity |
| Separate Tracking DB | Performance | Data consistency becomes harder |
| Notification queue | Availability | Notifications may be delayed |
| Validation | Correctness / security | More processing |

So architecture evaluation asks:

> **Are these disadvantages acceptable compared with the benefits?**

## 7.4 HAZOP — Hazard and Operability Analysis

HAZOP looks for possible failures in **interactions between system components**.

> **HAZOP = What can go wrong when data moves through the system?**

You normally examine an interaction such as:

```mermaid
flowchart TD
    A["Timing Device"] --> B["IoT Data Ingestion"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Then apply guide words.

## 7.5 HAZOP Guide Words

| Guide Word | Meaning | Simple Example |
|---|---|---|
| **No** | Nothing arrives | No timing event |
| **More** | Extra / duplicate data | Same event received twice |
| **Part of** | Missing information | Checkpoint ID missing |
| **Other than** | Information exists but is wrong | Wrong runner ID |
| **Early** | Arrives too early | Event received before expected time |
| **Late** | Arrives too late | Tracking event delayed |
| **Before / After** | Wrong sequence | CP2 processed before CP1 |

## 7.6 HAZOP Analysis

<details>
    <summary>Tutor sample — HAZOP analysis</summary>

| Interaction | Guide Word | Deviation | Cause | Consequence | Risk | Mitigation |
|---|---|---|---|---|---|---|
| Timing Device → IoT Ingestion | **No** | No event received | Device / network / battery failure | Runner time / location missing | High | Buffer locally and resend |
| Timing Device → IoT Ingestion | **More** | Duplicate events | Retry / repeated delivery | Duplicate results | High | Unique event ID + deduplication |
| Timing Device → IoT Ingestion | **Part of** | Required field missing | Faulty / incomplete message | Cannot match event correctly | High | Validate required fields |
| Timing Device → IoT Ingestion | **Other than** | Wrong runner / checkpoint ID | Misconfiguration / tampering | Wrong tracking / results | High | Authenticate and validate |
| IoT Ingestion → Event Stream | **Late** | Event delayed | Congestion / overload / retries | Tracking becomes inaccurate | Medium | Monitor latency and scale |
| Event Stream → Processing | **Before / After** | Events processed in wrong order | Async / parallel processing | Wrong progress / results | High | Timestamps + sequence numbers |

</details>

<details>
    <summary>No</summary>

```mermaid
flowchart LR
    A["Timing Device"] -.->|"nothing arrives"| B["IoT Ingestion"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Nothing arrives, so the system cannot record the runner event.

</details>

<details>
    <summary>More</summary>

```mermaid
flowchart TD
    A["Event 15"] --> D["IoT Ingestion"]
    B["Event 15"] --> D
    C["Event 15"] --> D

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
```

The same event arrives multiple times.

> Use a unique event ID and ignore duplicates.

</details>

<details>
    <summary>Part of</summary>

Expected:

```text
Runner ID
Checkpoint ID
Time
```

Received:

```text
Runner ID
Time
```

Some required data is missing.

</details>

<details>
    <summary>Other than</summary>

All fields exist, but one is wrong.

```text
Actual runner: 521
Received ID: 125
```

</details>

<details>
    <summary>Late</summary>

```text
Runner crosses checkpoint: 10:30
System receives event: 10:36
```

The event is correct, but too delayed.

</details>

<details>
    <summary>Before / After</summary>

Expected:

```text
CP1 → CP2 → CP3
```

Received:

```text
CP2 → CP1 → CP3
```

Use timestamps and sequence numbers to reorder events.

</details>

## 7.7 HAZOP Answer Structure

A proper HAZOP answer should follow the structure used in the tutor solution:

```mermaid
flowchart TD
    A["Interaction"] --> B["Guide Word"]
    B --> C["Deviation"]
    C --> D["Cause"]
    D --> E["Consequence"]
    E --> F["Risk"]
    F --> G["Mitigation"]
    G --> H["Responsible Element"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style G fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style H fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

## 7.8 ATAM vs HAZOP

| | ATAM | HAZOP |
|---|---|---|
| Main purpose | Compare architecture choices | Find failure risks |
| Starts with | Scenario | Interaction |
| Question | Which design is better? | What can go wrong? |
| Looks at | Benefits + trade-offs | Deviation + cause + consequence |
| Result | Architectural decision | Risk mitigation |
| Example | Direct API vs Event Stream | What if event arrives late? |

> **ATAM = Choose / improve the design**
> **HAZOP = Try to find how the design can fail**

## 7.9 Architectural Decisions

After evaluation, important decisions should be documented.

<details>
    <summary>Tutor sample — architectural decisions</summary>

| Issue | Decision | Rationale |
|---|---|---|
| Timing bursts overload API | Use IoT Ingestion + Event Stream | Buffers traffic and allows scaling |
| Provider failure blocks requests | Use queued notifications | Supports retries and isolates failure |
| Tracking affects main DB | Use separate Tracking Store | Independent scaling |
| Duplicate / incomplete events | Validate and deduplicate | Protect result integrity |
| Events arrive out of order | Reorder using timestamps / sequence | Correct progress / results |
| Results published too early | Require verification | Prevent incorrect official results |

</details>

A useful documentation pattern is:

```mermaid
flowchart TD
    A["Issue"] --> B["Alternatives"]
    B --> C["Decision"]
    C --> D["Rationale"]
    D --> E["Affected C4 Elements"]
    E --> F["Stakeholders"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

## 7.10 Evaluation Changes the Architecture

The tutor's final architecture adds components because of the problems found during evaluation.

| Problem | Architecture Improvement |
|---|---|
| Event burst | IoT Data Ingestion + Event Broker |
| Invalid events | Validation + Dead-Letter Queue |
| Duplicate / out-of-order events | Tracking Event Processor |
| Provider failure | Notification Worker + Queue |
| Large tracking volume | Separate Tracking Data Store |
| Hard-to-detect failures | Monitoring and Alerting |

The updated C4 diagram includes the Event Broker, DLQ, Tracking Processor, Notification Worker, monitoring, separate tracking storage, audit logs, and identity service.

## 7.11 Dead-Letter Queue

A **Dead-Letter Queue (DLQ)** stores messages that cannot be processed correctly.

```mermaid
flowchart TD
    A["Incoming Event"] --> B["Validation"]
    B --> C["Valid"]
    B --> D["Invalid"]
    C --> E["Process"]
    D --> F["DLQ"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
```

Instead of losing the failed event, the system keeps it for:

* investigation
* retry
* correction

The tutor's architecture sends invalid timing events and failed processing / notifications to the DLQ.

## 7.12 Monitoring

Monitoring checks whether the architecture is operating correctly.

The sample monitors:

* queue depth
* ingestion latency
* event processing
* notification delivery
* DLQ failures

> **Not every problem can be prevented, so the system must also detect problems quickly.**

## 7.13 Connection to C4

Earlier weeks:

```mermaid
flowchart TD
    A["Requirements"] --> B["C4 Context"]
    B --> C["C4 Container"]
    C --> D["Architecture Design"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style C fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Week 7:

```mermaid
flowchart TD
    A["Existing C4"] --> B["ATAM"]
    B --> C["HAZOP"]
    C --> D["Find problems"]
    D --> E["Add / change components"]
    E --> F["Updated C4"]

    style A fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style B fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style C fill:#EAF3FF,stroke:#2563EB,stroke-width:2px
    style D fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style E fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
    style F fill:#FFFFFF,stroke:#2563EB,stroke-width:2px
```

Week 7 is about **testing and improving the architecture you already designed**.

<details>
    <summary>Main Week 7 takeaway</summary>

> **Architecture Evaluation** checks whether a design can handle realistic scenarios and failures.
> **ATAM** compares architectural alternatives, benefits, and trade-offs to choose an appropriate design.
> **HAZOP** examines interactions using guide words such as No, More, Part of, Other than, Late, and Before / After to identify causes, consequences, risks, and mitigations.
> The results are then used to improve the architecture, update the C4 model, and document architectural decisions and rationale.

</details>

---

# 8-12. Project Selection and Peer Review (PR)

---

# Extend (Elective Topic)

These four topics apply architectural principles to dedicated devices, web applications, product families, and independently deployed services.

## Extend: Embedded Systems

*Lecture reference from the supplied notes: Embedded Software 2022 — 62 slides.*

### What Is an Embedded System?

An **embedded system** is a special-purpose computer that performs one or a few dedicated functions, usually inside a larger device.

Examples include car braking systems, pacemakers, microwaves, smart meters, and industrial controllers.

| Characteristic | What it means |
|---|---|
| **Dedicated purpose** | Designed for specific tasks rather than general computing |
| **Firmware** | Software commonly stored in Flash or read-only memory |
| **Limited resources** | Restricted CPU, memory, storage, and power |
| **Limited interface** | May have no screen or keyboard |
| **Timing constraints** | Some tasks must finish within strict deadlines |
| **Hardware integration** | Interacts closely with sensors, actuators, and other physical devices |

**Quiz distinction:** A control system is not necessarily embedded; it can run on a general-purpose computer. An embedded system is not necessarily hard real-time.

### Constraints and Quality Attributes

Hardware limits shape the architecture. A battery-powered controller, for example, must balance useful work against CPU usage, memory, and energy consumption.

| Quality attribute | Architectural goal |
|---|---|
| **Real-time performance** | Complete operations within their required time limits |
| **Computational efficiency** | Minimise CPU, memory, and power usage |
| **Portability** | Adapt software to different or newer hardware |
| **Reliability and recoverability** | Operate correctly and recover safely from failures |
| **High determinacy** | Define predictable behaviour, including responses to exceptional conditions |

**Hard real-time:** Missing a required deadline counts as system failure, even when the computed result is correct.

**High determinacy:** Define how the system responds to expected conditions and exceptions, including safe fallback actions.

### Designing for Reliability

The architecture should both **reduce the chance of failure** and **support recovery** when a failure occurs.

| Technique | Purpose |
|---|---|
| **Watchdog timer** | Detect an unresponsive system and trigger recovery, such as a restart |
| **Redundancy** | Use duplicate modules and compare results to detect faults |
| **Modularity** | Separate responsibilities so faults are easier to contain |
| **Low coupling** | Limit how much one component's failure affects others |
| **Simplicity** | Reduce unexpected interactions and difficult failure combinations |
| **Fallback behaviour** | Move to a defined safe response when normal operation fails |

**Trade-off:** Tight coupling may reduce communication overhead, but it can make changes and failures spread between components. Loose coupling makes components easier to change and isolate.

### Evaluating the Architecture

Evaluate performance, timing, reliability, hardware capacity, and failure scenarios before implementation. **Architecture Description Languages (ADLs)** and diagrams can support this analysis.

Two limitations matter:

* **Model fidelity:** The model may not accurately represent hardware speed, capacity, or power consumption.
* **Simulation:** Real behaviour and interactions can be difficult to predict before the system exists.

### Operating System Architectures

| Aspect | Microkernel | Monolithic kernel |
|---|---|---|
| **Structure** | Small kernel; many services run separately | More services integrated into the kernel |
| **Communication** | Often relies on message passing between services | More direct calls within the kernel |
| **Performance** | Messaging and context switches can add overhead | Direct interaction can reduce overhead |
| **Fault isolation** | Separate services can improve isolation | A kernel-service fault can affect the whole system |
| **Extensibility** | Services can be easier to replace independently | Changes require care across integrated kernel code |
| **Main challenge** | Communication and process coordination | Kernel complexity and interdependencies |

**Layering** describes how responsibilities and dependencies are organised. It is not synonymous with a monolithic kernel; a kernel can use layers internally.

### Real-Time Scheduling

A **Real-Time Operating System (RTOS)** provides scheduling and predictable execution mechanisms so tasks can meet deadlines. Meeting those deadlines also depends on the workload and system design.

| Approach | How it works | Main consideration |
|---|---|---|
| **Priority-based** | In a preemptive scheduler, higher-priority tasks can interrupt lower-priority tasks | Flexible, but shared resources can cause priority inversion |
| **Time-triggered** | Tasks run at predetermined times or clock intervals | Predictable timing, but the schedule must accommodate the workload |

**Priority inversion:** A high-priority task waits for a resource held by a lower-priority task. Other work may delay the lower-priority task and extend that wait.

### Intelligent Real-Time Control

Autonomous vehicles and robots combine perception, modelling, decision-making, and physical action.

```mermaid
flowchart LR
    E["Environment"] --> S["Sensing"]
    S --> W["World modelling"]
    W --> B["Behaviour generation"]
    W --> V["Value judgement"]
    V --> B
    B --> A["Actuation"]
    A --> E
```

This simplified flow shows how the responsibilities relate:

* **Sensing:** Collect and interpret environmental information.
* **World modelling:** Maintain a representation of the environment.
* **Value judgement:** Assess costs, benefits, and uncertainty.
* **Behaviour generation:** Plan actions.
* **Actuation:** Carry out actions in the physical world.

**Remember:** Embedded architecture balances resource limits, predictable timing, reliability, recovery, and interaction with hardware.

## Extend: Web Application

*Lecture reference from the supplied notes: WebSystems 2022 — 46 slides.*

### What Is a Web Application?

A **web application** is accessed through a browser or web-based interface. Its components communicate over a network, commonly using HTTP or HTTPS.

```mermaid
flowchart LR
    C["Browser / Client<br/>User interface"] <-->|"HTTP / HTTPS"| S["Web / Application Server<br/>Business logic and APIs"]
    S <-->|"Queries and results"| D[("Database<br/>Persistent data")]
```

### HTTP and Session State

**HTTP is stateless:** The protocol does not automatically remember previous interactions. Applications add mechanisms to associate requests with a user session.

A typical server-side session works as follows:

1. The user logs in.
2. The server creates a session and returns a cookie containing a session identifier.
3. The browser sends that cookie with later requests.
4. The server uses the identifier to look up the session.

**Quiz distinction:** A stateless protocol can support an application that maintains state. The application manages that state explicitly.

### Communication Between Components

| Aspect | XML-RPC | REST | SOAP |
|---|---|---|---|
| **Core idea** | Invoke remote procedures | Interact with resources identified by URIs | Exchange structured messages |
| **Representation** | XML | Flexible, such as JSON or XML | XML |
| **Communication** | Commonly HTTP POST | Commonly uses HTTP methods | Often HTTP; other transports are possible |
| **Typical strength** | Simple remote function calls | Resource-oriented interfaces | Formal messaging and service contracts |
| **Main consideration** | Procedure-oriented interface | Requires consistent resource and method design | More messaging and tooling complexity |

**XML-RPC** encodes remote procedure calls and responses in XML. **REST (Representational State Transfer)** is an architectural style, rather than a message format.

**SOAP** uses structured XML messages. SOAP services often describe their operations and message types using **WSDL (Web Services Description Language)**.

| HTTP method | Typical purpose |
|---|---|
| `GET` | Retrieve a resource |
| `POST` | Submit data for processing, often creating a resource |
| `PUT` | Create or replace the state of the resource at a known URI |
| `DELETE` | Remove a resource |

### Model–View–Controller and Action–Domain–Responder

**Model–View–Controller (MVC)** separates application responsibilities:

| Component | Responsibility |
|---|---|
| **Model** | Application data and domain logic |
| **View** | Presentation and user interface |
| **Controller** | Handle input and coordinate the Model and View |

```mermaid
flowchart LR
    U["User request"] --> C["Controller"]
    C <-->|"Read or update"| M["Model"]
    C --> V["View"]
    V --> R["Response"]
```

This is a simplified request flow; interactions vary between MVC implementations.

**Action–Domain–Responder (ADR)** separates HTTP request handling into three roles:

* **Action:** Receive input and coordinate the operation.
* **Domain:** Execute business logic and manage state.
* **Responder:** Construct the HTTP response.

### Fat Client vs Thin Client

| Fat client | Thin client |
|---|---|
| More processing on the user's device | More processing on the server |
| Greater client-side responsibility | Greater centralised responsibility |
| Example: Calculate a loan estimate locally | Example: Submit a reservation for server-side processing |

These describe where processing happens. A web application can combine both approaches for different functions.

### N-Tier Architecture and Scaling

**N-tier architecture** separates an application into tiers, such as presentation, application logic, and data storage. Tiers can run on different servers and scale independently.

| Scaling approach | What changes | Example |
|---|---|---|
| **Horizontal** | Add more instances or servers | Distribute traffic across three application servers with a load balancer |
| **Vertical** | Increase one server's capacity | Add CPU or RAM to the application server |

**Session-state consideration:** Horizontal scaling is easier when requests can reach any instance. Keeping session state in shared storage reduces reliance on one server's local memory.

### Quality Attributes

| Attribute | Goal |
|---|---|
| **Scalability** | Handle increasing users and traffic |
| **Security** | Protect users, applications, and data |
| **Usability** | Make interfaces understandable and easy to use |
| **Reliability** | Continue operating and recover from failures |
| **Modifiability** | Accommodate frequent requirement changes |
| **Performance** | Provide suitable response times and throughput |

**Throughput** is the number of requests completed per unit of time. **Response time** is how long an individual request takes. High throughput does not guarantee a fast response for every user.

### Related Web Concepts

| Concept | Meaning |
|---|---|
| **Web 2.0** | User participation, collaboration, and user-generated content |
| **E-commerce** | Electronic buying and selling |
| **Software as a Service (SaaS)** | Software delivered as a service over a network |
| **Internet of Things (IoT)** | Connected physical devices exchanging information |
| **Cloud computing** | Shared computing resources that can be provisioned and scaled |

**Remember:** Web architecture connects clients, application logic, and data while balancing scalability, security, usability, and performance.

## Extend: Product Line Architectures

*Lecture reference from the supplied notes: Product Line Architecture 2022 — 46 slides.*

### What Is a Software Product Line?

A **Software Product Line (SPL)** is a family of related systems built from shared core assets, with controlled variations for different products or customers.

For example, a family of cameras may share image-processing software while supporting different sensors, lenses, and features.

```mermaid
flowchart TD
    C["Shared core assets<br/>Architecture, components, requirements, tests"] --> A["Product A<br/>Core + Variation 1"]
    C --> B["Product B<br/>Core + Variation 2"]
    C --> D["Product C<br/>Core + Variation 3"]
```

### Core Terminology

| Term | Meaning |
|---|---|
| **Commonality** | Features, components, and processes shared across the family |
| **Variability** | Characteristics that differ between products |
| **Core assets** | Reusable requirements, architecture, code, tests, documentation, tools, and processes |
| **Variation point** | A planned place where products can differ |

**Key distinction:** A product line reuses the wider development effort, including architecture and tests. It goes beyond copying code between projects.

### Benefits and Trade-offs

| Benefit | Why it matters |
|---|---|
| **Lower development cost** | Shared assets reduce repeated work |
| **Faster time to market** | Products need less development from scratch |
| **Higher productivity** | Teams reuse established solutions |
| **Improved quality** | Fixes to shared assets can benefit multiple products |
| **More predictable development** | Plans, tests, and methods can be reused |
| **Architectural consistency** | Products follow common design principles |

The benefits require investment and ongoing control:

* **Initial cost:** Shared assets take time to build and generalise.
* **Reduced flexibility:** Individual products must fit the shared architecture.
* **Configuration complexity:** Teams must manage supported feature combinations and versions.
* **Organisational commitment:** Reuse needs consistent processes and ownership.
* **Feature growth:** Uncontrolled additions can make the family difficult to maintain.

**Lecture-specific cost point:** The supplied notes describe recovering the extra investment after the third product. Treat this as the lecture's illustration; actual break-even depends on costs and reuse.

### Designing for Variation

Begin with the shared business processes. Identify what stays constant and what must vary, then carry out three architectural activities:

1. **Identify variation points:** Find requirements and components that differ between products.
2. **Support variation points:** Provide mechanisms for controlled differences.
3. **Evaluate the architecture:** Check that it supports the intended product family and its quality requirements.

| Variability technique | How it works | Example |
|---|---|---|
| **Parameterisation** | Configure behaviour through values | Set language, currency, or transaction limits |
| **Information hiding** | Put interchangeable implementations behind a stable interface | Swap payment providers |
| **Inheritance** | Extend or specialise shared functionality | Implement specialised product variants |

The goal is to support planned differences without repeatedly changing the shared core architecture.

### Managing Product Line Evolution

Product lines evolve as technology and customer needs change. Watch for:

* **Feature bloat:** Too many features accumulate in the shared assets.
* **Incompatible components:** Variants no longer work together.
* **Architectural limits:** New requirements exceed what the original architecture supports.
* **Uncontrolled variation:** Too many combinations become difficult to build, test, and maintain.

**Design principle:** Plan and control reuse. More reuse is useful only when the resulting products remain manageable.

<details>
<summary><strong>Case study — CelsiusTech Ship System 2000</strong></summary>

The supplied notes describe a naval command-and-control product family with a shared architecture across different systems.

Key architectural features include:

* Support for different sensors, weapons, and computing environments.
* Strongly typed messages and hardware-independent component interactions.
* Strict architectural layering.
* Significant reuse between products.

Its quality concerns include **performance, modifiability, safety, reliability, availability, and testability**.

The case illustrates how a shared architecture can support variations across complex real-time products.

</details>

**Remember:** Product line architecture combines shared assets with controlled variation to build a family of related products.

## Extend: Microservices Architecture

*Lecture reference from the supplied notes: Microservices Architecture 2022 — 36 slides.*

### What Are Microservices?

**Microservices architecture** divides an application into services organised around focused business capabilities. Services communicate through defined interfaces and can be deployed independently.

An e-commerce application might separate customers, products, orders, payments, and recommendations into services.

### Monolithic vs Microservices Architecture

| Aspect | Monolithic application | Microservices |
|---|---|---|
| **Deployment** | One main deployable application | Multiple independently deployable services |
| **Execution** | Modules commonly run within one application process | Services run in separate processes |
| **Changes** | Commonly require redeploying the application | Can be released service by service |
| **Scaling** | Commonly scales the whole application | Can scale individual services |
| **Operations** | Simpler initial deployment and monitoring | More distributed infrastructure to manage |
| **Coupling** | Can be modular, but boundaries may be easier to cross | Requires deliberate control of API and data dependencies |

```mermaid
flowchart TD
    subgraph MONO["Monolith: one deployment"]
        M["Customers + Orders + Payments + Products"]
    end
    subgraph MICRO["Microservices: separate deployments"]
        C["Customer Service"]
        O["Order Service"]
        P["Payment Service"]
        R["Product Service"]
        O --> C
        O --> P
        O --> R
    end
```

### Service Boundaries: Cohesion and Coupling

| Concept | Meaning | Desired direction |
|---|---|---|
| **Cohesion** | How closely related a service's responsibilities are | **High:** Keep related behaviour together |
| **Coupling** | How strongly services depend on each other | **Low:** Limit the effects of changes and failures |

A good service has a focused business responsibility, hides its internal implementation, and exposes a clear API.

The **Single Responsibility Principle** helps define a coherent reason for a service to change. A useful business capability may still require several services to collaborate.

### Benefits

| Benefit | Architectural value |
|---|---|
| **Independent development** | Teams can work on separate services |
| **Independent deployment** | Release changes without redeploying the entire application |
| **Independent scaling** | Allocate capacity to the services that need it |
| **Fault isolation** | Boundaries can help contain failures |
| **Maintainability** | Focused codebases can be easier to understand |
| **Technology flexibility** | Services can use different languages or storage technologies |
| **Team autonomy** | Teams can own development, deployment, and support |

**Fault isolation is conditional:** A service failure can still affect its callers. Service boundaries alone do not guarantee that the rest of the application stays available.

### Costs and Challenges

| Challenge | Why it occurs |
|---|---|
| **Distributed complexity** | Services communicate across process and network boundaries |
| **Communication overhead** | Remote calls add latency and can fail |
| **Testing difficulty** | Behaviour depends on interactions between services |
| **Operational complexity** | Many services need deployment, monitoring, and maintenance |
| **Data consistency** | Updates may span independently owned data stores |
| **Debugging difficulty** | One failure may involve several services |
| **Rollout coordination** | Changes affecting multiple services need compatible interfaces and release planning |

### Data Ownership and Eventual Consistency

Each service should **own its data or schema**. Other services access that data through defined interfaces rather than directly depending on its internal tables.

Data ownership supports independent changes and storage choices. It also makes cross-service transactions harder and may require duplicated data with explicit synchronisation.

**Eventual consistency** allows temporary differences between copies of data. If no new updates occur and propagation succeeds, the copies eventually converge.

Example: an order service keeps a copy of a customer's current contact address.

1. The customer updates their contact address in the Customer Service.
2. The Order Service temporarily retains the previous copy.
3. The update propagates to the Order Service.
4. Both services reflect the same current contact address.

This example concerns a synchronised contact record; an existing order may intentionally preserve its original shipping address.

| Consistency model | What readers observe |
|---|---|
| **Strong consistency** | In the usual single-copy model, reads reflect the latest completed write |
| **Eventual consistency** | Readers may temporarily see older values while updates propagate |

**Quiz distinction:** Independent services can use different technology stacks, but they must still agree on communication contracts and how shared information stays consistent.

### Migrating from a Monolith

Migration can happen incrementally:

1. Identify distinct business capabilities.
2. Select a focused capability to extract.
3. Implement it as an independently running service.
4. Define its API and data ownership.
5. Integrate it with the remaining monolith.
6. Repeat as the benefits justify further extraction.

```mermaid
flowchart LR
    M["Monolithic application"] --> R["Extract one capability<br/>Define interfaces and integrate"]
    R --> H["Remaining monolith"]
    R --> S["Independent service"]
    H <-->|"Defined interface"| S
```

A business function may be delivered by several collaborating services. It does not have to fit entirely inside one service.

### Layering and Dependencies

Services can be arranged in layers, with higher-level services coordinating lower-level capabilities. The supplied notes also describe front-end macroservices coordinating back-end microservices.

**Keep the examples distinct:** CelsiusTech uses strict layering in its product line. Microservices do not inherently require one strict hierarchy; their dependencies still need clear boundaries.

### Team Organisation and DevOps

A team can own the full service lifecycle:

```text
Development → Testing → Deployment → Monitoring → Maintenance
```

The lecture's **“you build it, you support it”** approach connects implementation with operational responsibility. Clear ownership helps teams respond to failures and changing requirements.

### Common Anti-patterns

| Anti-pattern | Problem | Design response |
|---|---|---|
| **Service that does too much** | Becomes a miniature monolith with unrelated responsibilities | Revisit boundaries around cohesive business capabilities |
| **Shared persistence** | Services directly depend on the same database structures | Establish data ownership and communicate through defined interfaces |

### When Are Microservices Useful?

Consider microservices when:

* Different capabilities need independent scaling.
* Teams benefit from separate ownership and release schedules.
* Independent deployment provides clear value.
* A growing application has boundaries that can be separated meaningfully.

For a small or early-stage application, distributed operations may cost more than they help. Choose service boundaries and deployment complexity to match the actual requirements.

**Remember:** Microservices aim for high cohesion, low coupling, and independent development, deployment, and scaling—with additional distributed-system complexity.

## Extend: Topic Comparison

| Topic | Main focus | Core principle | Main challenge |
|---|---|---|---|
| **Embedded systems** | Dedicated functions within physical devices | Predictability, efficiency, and reliability | Resource limits and real-time deadlines |
| **Web applications** | Applications accessed across a network | Client–server communication and separation of responsibilities | Security, performance, and scalability |
| **Product line architectures** | Families of related products | Shared assets and controlled variation | Initial investment and variability management |
| **Microservices** | Independently deployable services | High cohesion and low coupling | Distributed operations and data consistency |

These topics can overlap. A product line can contain embedded systems, and a web application can use microservices.

## Extend: Quiz Review

Try answering each question before expanding it.

<details>
<summary><strong>1. What happens when a hard real-time system misses a deadline?</strong></summary>

The missed deadline counts as system failure, even if the result is otherwise correct.

</details>

<details>
<summary><strong>2. What is high determinacy?</strong></summary>

Defined, predictable behaviour for operating conditions and exceptions, including fallback actions when normal operation cannot continue.

</details>

<details>
<summary><strong>3. How do horizontal and vertical scaling differ?</strong></summary>

**Horizontal:** Add more instances or servers. **Vertical:** Increase the capacity of an existing server, such as its CPU or RAM.

</details>

<details>
<summary><strong>4. What does HTTP being stateless mean?</strong></summary>

HTTP does not automatically retain context between requests. Applications can maintain sessions explicitly, for example using a cookie that identifies a server-side session.

</details>

<details>
<summary><strong>5. What is the central principle of a software product line?</strong></summary>

Build related products from shared core assets while controlling the variations between them.

</details>

<details>
<summary><strong>6. What are the three product-line variability techniques?</strong></summary>

**Parameterisation, information hiding, and inheritance.** They allow configuration, interchangeable implementations, and specialisation respectively.

</details>

<details>
<summary><strong>7. What two qualities should good microservices have?</strong></summary>

**High cohesion** within each service and **low coupling** between services.

</details>

<details>
<summary><strong>8. Can microservices be developed, deployed, and scaled independently?</strong></summary>

Yes. This is a central goal, supported by clear service boundaries, compatible interfaces, and independent data ownership.

</details>

<details>
<summary><strong>9. Can microservices use different technology stacks?</strong></summary>

Yes. Services can use different languages and storage technologies while communicating through agreed interfaces.

</details>

<details>
<summary><strong>10. What is eventual consistency?</strong></summary>

Copies of data may temporarily differ but eventually converge if updates stop and propagation succeeds.

</details>
