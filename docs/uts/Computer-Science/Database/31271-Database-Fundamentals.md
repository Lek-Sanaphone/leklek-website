---
id: Database-Fundamentals
description: This course builds core skills in database
title: 31271 Database Fundamentals
---
# Database Fundamentals - Summary
# 1. Introduction to DBMS and Data Modeling Part I

## 1.1 Introduction to Database Concepts

### 1. Business Rules (BR)

* Business rules define the structure and constraints of a business scenario in a database context.
* They help identify:

  * **Entities** (e.g., Member, Book)
  * **Attributes** (e.g., Title, Author)
  * **Relationships** (e.g., a member can rent many books)
  * **Identifiers** (e.g., membership number as a unique ID)

### 2. Primary Key (PK)

* A **Primary Key** uniquely identifies each record in a table.
* Example: A student’s unique ID (e.g., student number).
* In ERDs, PKs are **bolded and underlined**.

### 3. Foreign Key (FK)

* A **Foreign Key** is a reference to a Primary Key in another entity.
* It establishes **relationships** between tables (e.g., Rentals refer to both Member and Book).
* In ERDs, FKs are **implied by lines**, not listed as attributes.

### 4. Entity Relationship Diagrams (ERD)

* **Graphical representation** of a database model.
* Composed of:

  * **Entities**: collections of related attributes (e.g., Book, Member, Rental)
  * **Attributes**: individual data fields (e.g., name, DOB)
  * **Relationships**: how entities relate (e.g., a member rents a book)

---

# 2. Structured Query Language (SQL) - Data Definition Language (DDL) and Data Manipulation Language (DML)

## 2.1 DDL and DML
- **DDL commands**: CREATE, ALTER, DROP, RENAME
- **DML commands**:  INSERT, DELETE, UPDATE

### 1. Create Table and Constraints, and DROP

**Defines the structure of a table, including columns and constraints.**

```sql
CREATE TABLE Customer_T (
  CustomerID NUMERIC(4) NOT NULL,
  CustomerName VARCHAR(25),
  CustomerState CHAR(2),
  CONSTRAINT Customer_PK PRIMARY KEY (CustomerID)
);
```
A primary key constraint can be defined in two ways:
- Named constraint (out-of-line):
  - `CONSTRAINT Customer_PK PRIMARY KEY (CustomerID)`
  - This allows you to assign a custom name like Customer_PK, which is useful for clarity, maintenance, and future alterations
- Inline constraint:
  - `CustomerID NUMERIC(4) NOT NULL PRIMARY KEY`
  - This creates the constraint without a custom name. Instead, the database auto-generates a name. 
  - Less readable and harder to reference


**DROP table**

```sql
DROP TABLE Customer_T
```

### 2. Insert Data

**Adds new rows to a table.**

```sql
-- With specific columns
INSERT INTO Customer_T (CustomerID, CustomerName, CustomerState)
VALUES (1, 'Contemporary Casuals', 'NSW');

-- Without specifying columns (must match column order)
INSERT INTO Customer_T
VALUES (2, 'Home Furnishings', 'VIC');
```
- Without specify columns: Data that will be insert must match with all columns.
- With specify columns: Only specific columns will be insert. Columns that aren't define will result as "(NULL)"

### 3. Update Data

**Modifies existing data in a table.**

```sql
UPDATE Customer_T
SET CustomerName = 'Modern Interiors'
WHERE CustomerID = 2;
```


### 4. Delete Data

**Removes rows from a table.**

```sql
DELETE FROM Customer_T
WHERE CustomerID = 2;
```


### 5. Alter Table

**Modifies the structure of an existing table.**

```sql
-- Add a column
ALTER TABLE Customer_T ADD CustomerEmail VARCHAR(100);

-- Drop a column
ALTER TABLE Customer_T DROP COLUMN CustomerEmail;

-- Rename a column
ALTER TABLE Customer_T RENAME COLUMN CustomerName TO Name;

-- Change data type
ALTER TABLE Customer_T ALTER COLUMN Name TYPE VARCHAR(50);

-- Set a default value
ALTER TABLE Customer_T ALTER CustomerState SET DEFAULT 'NSW';

-- Drop default
ALTER TABLE Customer_T ALTER CustomerState DROP DEFAULT;

-- Add a unique constraint
ALTER TABLE Customer_T ADD CONSTRAINT Unique_Name_Street
UNIQUE (CustomerName, CustomerState);

-- Rename the table
ALTER TABLE Customer_T RENAME TO Customer_Main;
```


### 6. Composite Keys

**Combines multiple columns to form a single primary or foreign key.**

```sql
CREATE TABLE OrderLine_T (
  OrderID NUMERIC(5) NOT NULL,
  ProductID NUMERIC(4) NOT NULL,
  OrderedQuantity NUMERIC(10),
  PRIMARY KEY (OrderID, ProductID), -- Composite PK (auto-named)
  FOREIGN KEY (OrderID) REFERENCES Order_T(OrderID), -- FK1 (auto-named)
  FOREIGN KEY (ProductID) REFERENCES Product_T(ProductID) -- FK2 (auto-named)
);
```

- Use constraint for set the name manually
```sql
CONSTRAINT OrderLine_PK PRIMARY KEY (OrderID, ProductID),
CONSTRAINT FK_Order FOREIGN KEY (OrderID) REFERENCES Order_T(OrderID),
CONSTRAINT FK_Product FOREIGN KEY (ProductID) REFERENCES Product_T(ProductID)
```

### 7. Design Reminders

**Best practices when designing tables and relationships.**

* Create primary key tables before foreign key tables.
* Foreign key columns must match the data type of the referenced primary key.
* Use domain constraints:

```sql
State CHAR(2) CHECK (State IN ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'ACT', 'NT'))
```

* Use `DEFAULT CURRENT_DATE` for automatic dates.


### 8. Foreign Key with Default Value

**Defines a foreign key and uses a default value for a column.**

```sql
CREATE TABLE Order_T (
  OrderID NUMERIC(5) NOT NULL,
  CustomerID NUMERIC(4),
  OrderDate DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (CustomerID) REFERENCES Customer_T(CustomerID)
);
```


### 9. Querying Relationships

**Examples of retrieving data using PK–FK relationships.**

```sql
-- Retrieve all data from table
SELECT * FROM Order_T;

-- Retrieve some fields from table
SELECT field-1, field-2 FROM Order_T;

-- Retrieve all orders for CustomerID 1, allow: =, >, <, <=, >=, and, or
SELECT * FROM Order_T WHERE CustomerID = 1;

-- Count how many orders a customer has placed
SELECT COUNT(*) FROM Order_T WHERE CustomerID = 1;
```

---

# 3. Data Modeling Part II


## 3.1 Modeling Relationships

### Relationship 
<details>
<summary>1. Relationship Types vs. Relationship Instances</summary>
* **Relationship Type:** General pattern showing how two or more entities are related (e.g., "Instructor teaches Subject").
* **Relationship Instance:** Specific example of the relationship in the database (e.g., "Fahimeh teaches Database Fundamentals").
* Relationship type appears as **lines** in an ERD; instances are **rows in related tables**.

**Example**

```mermaid
erDiagram
    INSTRUCTOR ||--o{ SUBJECT : teaches
```
</details>

<details>
<summary>2. Degree of Relationships</summary>
* **Degree:** Number of entity types involved in the relationship.

  * **Unary:** One entity related to itself.
  * **Binary:** Two entities involved.
  * **Ternary:** Three entities involved.

**Example**
<img src="https://media.cheggcdn.com/media/e76/e76594f9-1098-4a48-94a8-f707635e18ef/chegg14-8.png" />

</details>

<details>
<summary>3. Cardinality of Relationships</summary>
* **Cardinality:** Number of entity instances that can or must be associated.

  * **One-to-One (1:1):** Each record relates to only one in the other table.
  * **One-to-Many (1\:M):** One record relates to many others.
  * **Many-to-Many (M\:N):** Many records relate to many others.
* **Minimum cardinality:** Optional (0) or mandatory (1+).
* **Maximum cardinality:** Maximum allowed links.

**Example**

```mermaid
erDiagram
    PERSON ||--|| PASSPORT : owns
    INSTRUCTOR ||--o{ SUBJECT : teaches
    STUDENT }o--o{ COURSE : enrolls
```
</details>

<details>
<summary>4. Multiple Relationships Between Entities</summary>
* Two entities can have more than one type of relationship at the same time.
* Example: A professor can **teach courses** and also be **qualified to teach** other courses.
* May include additional rules, like minimum numbers.

**Example**

```mermaid
erDiagram
    PROFESSOR ||--o{ COURSE : teaches
    PROFESSOR ||--o{ COURSE : qualifiedFor
```
</details>

<details>
<summary>5. Relationships with Attribute(s)</summary>
* A relationship can have its own attributes.
* Example: "DateCompleted" in the relationship between Employee and Course.
* These attributes describe **the association itself**, not the entities.

**Example**

```mermaid
erDiagram
    EMPLOYEE ||--o{ ENROLLMENT : completes
    COURSE   ||--o{ ENROLLMENT : includes
    ENROLLMENT {
        date DateCompleted
    }
```

</details>


### Associative Entity – Combination of Relationship and Entity
<details>
<summary>M:N Relationship -> Two 1:M relationships</summary>

* Converts an **M\:N relationship** into **two 1\:M relationships**.
  * Relational databases do not support M:N relationships directly.
  * Must break it down into two 1:M relationships using an associative entity
* Acts as both a relationship and an entity with attributes.
* Usually has a **composite primary key** from the related entities.

**Example**

```mermaid
flowchart LR
  subgraph L["Before: M:N Relationship"]
    E1[EMPLOYEE] ---|M:N| C1[COURSE]
  end

  L -->|Transform| R

  subgraph R["After: Two 1:M via Associative Entity"]
    E2[EMPLOYEE] ---|1:M| CERT[CERTIFICATE]
    C2[COURSE]  ---|1:M| CERT
  end
```
</details>


### Multivalued Attributes Can be Represented as Relationships
<details>
<summary>Multivalued Attributes</summary>

* If an attribute can have multiple values, store it in a separate related table.
* Simple Multivalued Attributes:
  * <img src="https://files.transtutors.com/book/qimg/83f6f99e-3de1-4a93-8949-57881d4015d1.png" />
* Composite Multivalued Attributes:
  * <img src="https://files.transtutors.com/book/qimg/b1c66302-14e2-4fa6-b7f2-839e0ad2e0d4.png"/>

</details>



### Weak and Strong Entities – Identifying Relationship

* **Strong Entity:** Can exist independently; has its own PK.
* **Weak Entity:** Depends on a strong entity’s PK for identification; **cannot exist without it**.
* **Identifying Relationship:** Double line; connects strong to weak entity.
* Weak entity PK (Composite Key) = Strong entity PK + its own partial key.

**Example**

```mermaid
erDiagram
    EMPLOYEE ||--o{ DEPENDENT : has

    EMPLOYEE {
        int EmployeeID "PK"
        string EmployeeName
        date BirthDate
    }

    DEPENDENT {
        int EmployeeID "PK, FK"
        string DependentName "PK"
        date DateOfBirth
    }

```


## 3.2 Notations

* **Crow’s Foot Notation** is commonly used in ERDs:
  * Boxes = Entities.
  * Lines = Relationships.
  * Symbols show cardinality (e.g., one, many).
* **Solid line:** Normal relationship.
* **Double line:** Identifying relationship (weak and strong entities).
* **Attributes:** Shown inside entity boxes; PKs underlined.

**Example**

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    EMPLOYEE ||--o{ DEPENDENT : "Identifying (Double Line)"
    EMPLOYEE ||--o{ DEPARTMENT : "Non-identifying (Single Line)"

    CUSTOMER {
        int CustomerID PK
        string CustomerName
    }
    ORDER {
        int OrderID PK
        date OrderDate
        int CustomerID FK
    }

    EMPLOYEE {
        int EmployeeID "PK"
        string EmployeeName
    }

    DEPENDENT {
        int EmployeeID "PK, FK"
        string DependentName "PK"
        date DateOfBirth
    }

    DEPARTMENT {
        int DepartmentID "PK"
        string DepartmentName
    }

```

# 4. Data Modeling Part III
## 4.1 Supertypes, Subtypes, Relationship

### Supertypes and Subtypes
* **Supertype**: general entity with common attributes.
* **Subtype**: subgroup with distinct attributes or relationships.
* **Attribute inheritance**: subtypes inherit all supertype attributes.
* Rule: create subtypes only if specific attributes/relationships exist.
* PK of supertype = also PK (and FK) in each subtype.

#### Example Cases
<details>
<summary>Vehicles: CAR, TRUCK share attributes → VEHICLE supertype</summary>

<img src="https://gateoverflow.in/?qa=blob&qa_blobid=12782612434912197914" />
</details>


### Relationships and Subtypes

<details>
<summary>All subtypes share a relationship & Only some subtypes have unique relationships</summary>

* If all subtypes share a relationship → define at **supertype level**.
  * All `PATIENT` is cared for `RESPONSIBLE PHYSICIAN`
* If only some subtypes have unique relationships → define at **subtype level**.
  * `RESIDENT PATIENT` is (only) assigned to `BED`
<img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint1.jpg" />
</details>


### Generalization vs Specialization

* **Generalization** (bottom-up): combine similar entity sets into a more general supertype
  * `Car, Truck -> Vehicle`
* **Specialization** (top-down): create subtypes from a supertype.
  * Top-down process: start from a supertype and define one or more subtypes that capture distinct attributes/relationships.

<details>
<summary>Specialization to MANUFACTURED PART and PURCHASED PART</summary>

<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgkgYi93rouA2BQ4LLOgbvKcCrA6DgAcyeedZLzNli2Qzxw1aobbymEMAxuvclwK7DBXBd25JVWkgt9U3RNCDFtjYEfSPGj3GAS3N_qiVY24CeUpyc1SRhWsgMs2pPj70JUqgbhDOoukdg/s459/specilization.png" />
* Example: PART specialized into MANUFACTURED PART and PURCHASED PART.
* Issues: multivalued attributes and data duplication → solved with **associative entities** (e.g., SUPPLIES linking PART and SUPPLIER).
</details>


### Constraints in Supertype/Subtype Relationships

<details>
  <summary>Disjoint vs Overlap and Total vs Partial Specialization</summary>

- Disjoint vs Overlap:
  - **Disjoint (D)**: An entity can belong to only one subtype. Example: A Vehicle is either a Car or a Truck, not both.
  - **Overlap (O)**: An entity can belong to multiple subtypes. Example: A Person could be both a Student and an Employee.
- Total vs Partial Specialization:
  - **Total specialization (T)**: Every entity in the supertype must belong to at least one subtype. Example: Every Employee must be either a SalariedEmployee or an HourlyEmployee.
  - **Partial specialization (P)**: Some entities in the supertype may not belong to any subtype. Example: A Vehicle may be a Car, or a Truck, or just a Vehicle with no subtype.
</details>

<details>
<summary>Completeness Constraint</summary>

Determines whether every instance of a supertype must belong to a subtype.

* **Total Specialization (Double Line)**: Every supertype instance must be in at least one subtype.
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint1.jpg?w=600" />
* **Partial Specialization (Single Line)**: Some supertype instances may not belong to any subtype.
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint2.jpg?w=598" />
</details>

<details>
<summary>Disjointness Constraint</summary>

Determines whether a supertype instance can belong to one or more subtypes at the same time.

* **Disjoint Rule**: A supertype instance can be a member of only one subtype.
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint3.jpg?w=600" />
* **Overlap Rule**: A supertype instance can belong to multiple subtypes.
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint4.jpg?w=596" />
</details>

<details>
<summary>Subtype Discriminator</summary>

An attribute of the supertype used to decide which subtype(s) an instance belongs to.

* **Disjoint Case**: A simple attribute with alternative values (e.g., Type = \{Car, Truck\}).
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint5.jpg?w=600"/>
* **Overlap Case**: A composite attribute (set of Boolean flags) where each flag shows whether the instance belongs to that subtype (e.g., Is_Student = Y/N, Is_Employee = Y/N).
  * <img src="https://theneuroflux.wordpress.com/wp-content/uploads/2013/03/constraint6.jpg?w=597"/>
  * Example: 
    * Employee_Type ∈ `{H, S, C}` tells us if EMPLOYEE is Hourly, Salaried, or Consultant
    * Example: H? S? C? with Y/N values.
    * YNY = employee is Hourly and Consultant.
    * NYN = employee is only Salaried.

</details>

# 5. Convert ERD to Relations
## 5.1 Relational Model
### Components of relational model

- **Data Structure**: Tables (relations), rows, and columns.
- **Data Manipulation**: SQL operations (queries, inserts, updates).
- **Data Integrity**: Rules to maintain accuracy (primary key, foreign key, constraints).

### Relations (Table)

- A relation = named table with rows and columns.
- Requirements to qualifty table as relation:
  - Unique table name.
  - Atomic attribute values (no multivalued/composite).
  - Unique rows.
  - Unique column names.
  - Order of rows/columns irrelevant.

#### Relational Model Concepts Correspond to E-R Model

<details>
  <summary>Entity to Relation</summary>

* Relations (tables) correspond with entity types and with many-to-many relationship types.
* Rows correspond with entity instances and with many-to-many relationship instances.
* Columns correspond with attributes.

**Entity types**
```mermaid
classDiagram
    class Instructor {
        Ins_ID
        Ins_F_Name
        Ins_L_Name
    }
```
**Relations (tables)**

| Ins_ID | Ins_F_Name | Ins_L_Name |
|--------|------------|------------|
| 12548  | Danna      | Ramezani   |
| 45476  | Ricky      | Brown      |
| 14475  | Jack       | Cooper     |
</details>

### Integrity Constraints

#### 3 Types of Constraints
- **Domain Constraint**: Values in a column must come from the same domain (e.g., Student_ID must be 4-digit integer).
- **Entity Integrity**: PK must not be null.
- **Referential Integrity**: FK must match a valid PK value in another table.

#### Referential Integrity Rules (for deletes):
1. **Restrict** – prevent deleting parent if child rows exist.
2. **Cascade** – delete child rows automatically when parent is deleted.
3. **Set-to-Null** – set FK to null when parent is deleted (not allowed for weak/mandatory entities).

## 5.2 Transforming ERD into Relations

<details>
  <summary>Mapping ERD to Relations</summary>

- Simple attributes → direct columns.
  - <img src="https://i-blog.csdnimg.cn/blog_migrate/fbf3cc49fb60a4f8fa32e8fb8765f70a.png"/>
- Composite attributes → break into component columns.
  - <img src="https://i-blog.csdnimg.cn/blog_migrate/128424bf2fe998853b5b253de5727910.png"/>
- Multivalued attributes → new table with FK back to main entity.
  - <img src="https://files.transtutors.com/book/qimg/f757f365-ad9e-4f07-93f2-7ffac8c55ec1.png"/>
</details>

<details>
  <summary>Mapping Binary Relationships</summary>

- 1:M → PK of “one” side becomes FK in “many” side.
  - <img src="https://i-blog.csdnimg.cn/blog_migrate/2a1d908a6119eb69374c4e357a6346c8.png"/>
- 1:1 → PK of mandatory side becomes FK in optional side.
  - <img src="https://i-blog.csdnimg.cn/blog_migrate/519428077bbb8a4448ba13bfd31bb7fb.png" />
- M:N → Create new relation (associative entity) with composite PK from both sides.
  * <img src="https://i-blog.csdnimg.cn/blog_migrate/ca6a3a380e001117905fa59f6fedb38a.png"/>
</details>

<details>
  <summary>Mapping Ternary (and n-ary) Relationships</summary>
- <img src="https://i-blog.csdnimg.cn/blog_migrate/13d8a0b29a868602738ec8339737c69d.png"/>
- Create relation for each entity + one associative relation.
- Associative relation’s PK often includes multiple FKs (sometimes add surrogate key to simplify).
</details>

<details>
  <summary>Mapping Weak Entities</summary>
- <img src="https://i-blog.csdnimg.cn/blog_migrate/85069529693a23d356385aa05164329c.png"/>
- Weak entity becomes its own table.
- PK = Partial identifier + PK of strong entity (as FK).
- FK cannot be null (mandatory).
</details>

<details>
  <summary>Mapping Unary Relationships</summary>

- <img src="https://i-blog.csdnimg.cn/blog_migrate/3ddee3ffcc596de4f7cab7a50aa1f26a.png"/>
- 1:1 or 1:N → Recursive FK in the same table.
- M:N → Separate associative table with two FKs referencing same entity.
</details>

<details>
  <summary>Mapping Supertype/Subtype Relationships</summary>

- One table for supertype, one for each subtype.
- Supertype PK = PK for subtypes.
- Discriminator attribute indicates subtype category.
- Subtype relations hold only their specific attributes.
</details>
