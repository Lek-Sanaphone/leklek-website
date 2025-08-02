---
id: Database-Fundamentals
description: This course builds core skills in database
title: 31271 Database Fundamentals
---
# Database Fundamentals - Summary
# 1. Introduction to DBMS and Data Modeling

## Introduction to Database Concepts

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

### **4. Entity Relationship Diagrams (ERD)**

* **Graphical representation** of a database model.
* Composed of:

  * **Entities**: collections of related attributes (e.g., Book, Member, Rental)
  * **Attributes**: individual data fields (e.g., name, DOB)
  * **Relationships**: how entities relate (e.g., a member rents a book)


# 2. Structured Query Language (SQL) - Data Definition Language (DDL) and Data Manipulation Language (DML)

## DDL and DML
- **DDL commands**: CREATE, ALTER, DROP, RENAME
- **DML commands**:  INSERT, DELETE, UPDATE

### 1. Create Table and Constraints

**Defines the structure of a table, including columns and constraints.**

```sql
CREATE TABLE Customer_T (
  CustomerID NUMERIC(4) NOT NULL,
  CustomerName VARCHAR(25),
  CustomerState CHAR(2),
  CONSTRAINT Customer_PK PRIMARY KEY (CustomerID)
);
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
  PRIMARY KEY (OrderID, ProductID),
  FOREIGN KEY (OrderID) REFERENCES Order_T(OrderID),
  FOREIGN KEY (ProductID) REFERENCES Product_T(ProductID)
);
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
-- Retrieve all orders for CustomerID 1
SELECT * FROM Order_T WHERE CustomerID = 1;

-- Count how many orders a customer has placed
SELECT COUNT(*) FROM Order_T WHERE CustomerID = 1;
```

