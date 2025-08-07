---
id: 31282-Systems-Testing-and-Quality-Management-32571-Enterprise-Software-Testing
description: ""
title: 31282 Systems Testing and Quality Management 32571 Enterprise Software Testing
---
# 31282 and 32571 - Summary

## 1. Software Testing and Quality Assurance

### Software Quality and Software Quality Assurance (SQA)


- **Software quality** is often a moral and legal requirement.
- **Quality** (almost) always comes with a cost.
- **Cost Categories**:
    - **Prevention Costs:** Training, planning, early reviews/testing.
    - **Appraisal Costs:** Inspections and testing.
    - **Failure Costs:** Rework, complaint handling, loss management.

### Software Quality
- 3 different terms of software quality issues:
    - **Errors**: An error is something in the static artefacts of a system that causes a failure.
        - ex: Syntax error
    - **Defect/Fault**: A defect or bug is a situation at runtime where some underlying error has become reflected in the system's runtime state.
        - ex: Incorrect condition in logic
    - **Failure**: A failure is any deviation of the observed behaviour of a program or system from the specification.
        - ex: Software's working, but fail/lag during the runtime

### Measuring Software Quality

- Technical Quality Parameters
    - **Correctness:** Defect rate
    - **Reliability:** Failure rate
    - **Capability:** Requirements coverage
    - **Maintainability:** Ease of modification
    - **Performance:** Speed, memory, and resource efficiency
- User Quality Parameters
    - **Usability:** User satisfaction
    - **Installability:** Installation experience
    - **Documentation:** Clarity and usefulness of manuals
    - **Availability:** System uptime and access
- Quality Models and Standards
    - **McCall’s Quality Factors:** Operation, Transition, Revision
    - **Standards:** ISO/IEC 90003:2018, CMMI


### Software Quality Assurance (SQA)

- SQA is a structured set of activities to ensure both the software product and its development process meet functional, technical, and managerial requirements.
- Objectives:
    - Prevent defects early in development
    - Improve development and maintenance efficiency
    - Ensure alignment with quality goals

### Three Principles of SQA

1. **Know What You Are Doing**: Understand current system state and project progress. Maintain clear reporting, structure, and planning.

2. **Know What You Should Be Doing**: Maintain and track up-to-date requirements and specifications. Use acceptance criteria, prototypes, and user feedback.

3. **Measure the Difference**:Use tests and metrics to compare actual vs. expected performance. Quantify quality (e.g., percentage of passed test cases).



### SQA Environment Considerations

1. **Contractual Requirements** – Timeline, budget, functional scope
2. **Customer-Supplier Relationship** – Active collaboration and validation
3. **Team Collaboration** – Diverse skills and mutual review
4. **Inter-team Cooperation** – External expertise and project division
5. **System Interfaces** – Interaction with other software systems
6. **Team Turnover** – Knowledge transfer and onboarding
7. **Software Maintenance** – Long-term operational quality

### Software Quality Models
<details>
    <summary>McCall's Quality Factors</summary>
    <p>
    McCall’s model categorizes software quality into three main perspectives:
    <ul>
      <li><strong>Product Operation:</strong> Correctness, Reliability, Efficiency, Integrity, Usability</li>
      <li><strong>Product Revision:</strong> Maintainability, Flexibility, Testability</li>
      <li><strong>Product Transition:</strong> Portability, Reusability, Interoperability</li>
    </ul>
    These factors are depicted as branches of a tree, emphasizing how they contribute to "Quality Software."
  </p>
</details>

<details>
    <summary>Boehm's Software Quality Tree</summary>
    <p>
    Boehm’s model uses a hierarchical quality tree structure with characteristics such as:
    <ul>
      <li><strong>As-is Utility:</strong> Portability, Reliability, Efficiency, Usability (Human Engineering)</li>
      <li><strong>Maintainability:</strong> Testability, Understandability, Modifiability</li>
    </ul>
    Each characteristic further breaks down into attributes like Robustness, Consistency, Accuracy, etc., showing interrelated quality aspects.
  </p>
</details>

<details>
    <summary>ISO/IEC 9126</summary>
    <p>
    ISO/IEC 9126 defines six high-level quality characteristics for software:
    <ul>
      <li>Functionality</li>
      <li>Reliability</li>
      <li>Usability</li>
      <li>Efficiency</li>
      <li>Maintainability</li>
      <li>Portability</li>
    </ul>
    Each characteristic answers key questions such as “How easy is it to use/modify/transfer the software?” or “How reliable is the software?”
  </p>
</details>

<details>
    <summary>Dromey's Quality Model</summary>
    <p>
    Dromey’s model links product properties with quality attributes and focuses on how implementation affects software quality.
    <ul>
      <li><strong>Product properties:</strong> Correctness, Internal, Contextual, Descriptive</li>
      <li><strong>Quality attributes:</strong> Functionality, Reliability, Maintainability, Efficiency, Reusability, Portability, Usability</li>
    </ul>
    This model provides a constructive framework that emphasizes the role of implementation.
  </p>
</details>

<details>
    <summary>ISO 9128</summary>
    <p>
    ISO/IEC 25010 is an evolution of ISO 9126 and provides a more detailed breakdown of quality factors and sub-factors:
    <ul>
      <li><strong>Functionality:</strong> Suitability, Accuracy, Interoperability, Compliance, Security</li>
      <li><strong>Reliability:</strong> Maturity, Fault Tolerance, Recoverability, Compliance</li>
      <li><strong>Efficiency:</strong> Time behavior, Resource behavior, Compliance</li>
      <li><strong>Maintainability:</strong> Analyzability, Changeability, Stability, Testability, Compliance</li>
      <li><strong>Portability:</strong> Adaptability, Installability, Co-existence, Replaceability, Compliance</li>
      <li><strong>Usability:</strong> Understandability, Learnability, Operability, Attractiveness, Compliance</li>
    </ul>
  </p>
</details>

---

## 2. Software Testing and Processes 

### Software Testing

#### Verification vs. Validation
- Verification – Confirms that the software meets specified requirements
- Validation – Ensures the developed software meets user needs and expectations

#### V-model
| Development Phase     | Corresponding Test Phase |
| --------------------- | ------------------------ |
| Business Requirements | User Acceptance Testing  |
| System Requirements   | System Testing           |
| Architecture/Design   | Integration Testing      |
| Program Specification | Unit Testing             |
| Coding                | (Implementation phase)   |


### Types, Techniques, and Levels of Testing

#### Overview:
- <img src="https://miro.medium.com/v2/resize:fit:1078/1*r6wYRG2gMjvs3aMTf3zfJw.png" height="220" />

#### Testing Types:
- **Static Testing** – Conducted without executing the program (e.g., inspections, analyses, documenting).
- **Dynamic Testing** – Involves executing the program to observe outputs.

#### Levels of Testing based on system abstraction:
- **[Unit Testing](#unit-testing-techniques)** (On: Code) – Individual components are tested independently to ensure their quality. Focus to detect error on:
    - Data structure
    - Program logic and program structure
    - Interface
    - Functions and operations
- **Integration Testing** (On: Design) – A group of dependent components are composed and tested together. Objectives to detect errors in:
    - Software architecture
    - Integrated functions or operations
    - Interfaces and interactions between components
- **System Testing** (On: Requirements) – Tests the overall system (both hard- & soft- ware) if they meet the requirements. Objects:
    - System input/output
    - System functions and information
    - System interfaces with external parts
    - User interfaces
    - System behavior and performance
behavior and performance.
- **Acceptance Testing** (On: What users
really need) – Confirms the software meets customer needs and expectations. 

#### (Unit) Testing Techniques:
- **Black Box** – Based on input-output behavior without internal code knowledge.
- **White Box** – Focuses on internal code paths and structures.
- **Grey Box** – Partial knowledge of internal code is used.


###  Software Processes and Their Role in SQA
- Software development includes:
    - Requirements → Specification → Design → Code → Testing → Maintenance
- Testing is a **continuous** activity throughout the lifecycle:
    - The development of code (unit testing)
    - The integration of the units into subsystems (integration testing)
    - The acceptance of the first version of the software system (system testing)
- Core Activities:
    - Specification: Define requirements
    - Development: Build the product
    - Validation: Ensure it meets needs
    - Evolution: Adapt to changes
- Common Process Models:
    - Waterfall, Prototyping, Spiral, Iterative

### Specification and Requirement Engineering
- Define what the client wants and ensure it is:
    - Clear, complete, consistent, testable
    - Approved and traceable
- Common Traps:
    - Hidden Evidences, Implicit, Ambiguous, Imprecise (inaccurate), Incomplete, Inconsistency, and Untestability
- Solutions:
    - Formal/specification methods, prototyping, reviews and audits