---
id: AWS-Certified-Solutions-Architect-Associate-SAA-C03
description: Reference from Adrian Cantrill (cantrill)
title: AWS Certified Solutions Architect Associate SAA-C03
---
Tips: [Create multiples AWS Account using 1 Email](https://youtu.be/hnien_pKs4g?si=-wxAnnH3NpHf9Hag)

## 0. Cloud, Networking and Technical Fundamental
<details>
<summary>OSI 7-Layer Networking Model</summary>
<details>
<summary>OSI Model</summary>

OSI 7-Layer Model

* **Lower (Media) Layers:** Physical, Data Link, Network – deal with how data physically moves between points (local or global).
* **Upper (Host) Layers:** Transport, Session, Presentation, Application – deal with how data is packaged, transmitted reliably, and interpreted by applications.

Data flows **down** the OSI stack on the sender’s side and **up** the stack on the receiver’s side. For example, a web browser on one end communicates with a web server on the other through these layers.

---

#### Diagram – OSI 7 Layers

```mermaid
graph TD
    A[Application Layer] --> B[Presentation Layer]
    B --> C[Session Layer]
    C --> D[Transport Layer]
    D --> E[Network Layer]
    E --> F[Data Link Layer]
    F --> G[Physical Layer]

    classDef host fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px;
    classDef media fill:#f1f8e9,stroke:#43a047,stroke-width:2px;

    class A,B,C,D host
    class E,F,G media

```

* **Host Layers (Top):** Handle data formatting, reliability, and application logic.
* **Media Layers (Bottom):** Handle transmission and routing of data across networks.

</details>

<details>
<summary>Layer 1 - Physical</summary>


**Layer 1 (Physical Layer)** is the foundation of networking. It defines how raw bits (0s and 1s) are transmitted over a **shared physical medium** (copper, fiber optic, or wireless).

* Key Concepts:
    * **Point-to-Point Links:**
        * Two devices (e.g., laptops) can communicate using a direct cable connection or by joining the same wireless network.
    * **Physical Mediums:**
        * **Copper cable** → electrical signals
        * **Fiber optic** → light pulses
        * **Wireless (Wi-Fi)** → radio frequencies
    * **Standards/Specifications:**
        * Define **voltage levels, timings, data rates, distances, modulation methods, and connector types** so that devices can interpret signals consistently.

* How Communication Works
    * Network Interface Cards (NICs) transmit bits as signals (e.g., 1 volt = binary 1, 0 volts = binary 0).
    * Both devices must use the **same physical standard** to interpret signals correctly.

```mermaid
graph TD

    subgraph Point-to-Point Connection
        A[Laptop 1<br/>NIC] ---|Copper Cable| B[Laptop 2<br/>NIC]
    end

    subgraph Shared Medium with Hub
        C[Laptop 1<br/>NIC] --- H(Hub)
        D[Laptop 2<br/>NIC] --- H
        E[Laptop 3<br/>NIC] --- H
        F[Laptop 4<br/>NIC] --- H
    end

    classDef device fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px;
    classDef hub fill:#f1f8e9,stroke:#43a047,stroke-width:2px;

    class A,B,C,D,E,F device
    class H hub
```

* Expanding to Multiple Devices
    * **Hub (Layer 1 Device):**
        * A hub retransmits incoming signals to all other ports.
        * Creates a **shared medium** for multiple devices.
        * Forms one **broadcast domain** and one **collision domain**.

* Limitations of Layer 1
    * **No addressing:** All transmissions are broadcast to everyone.
    * **Collisions:** If two devices transmit at once, signals overlap and corrupt data.
    * **No Media Access Control (MAC):** No rules to decide who transmits and when.
    * **No error detection or correction:** Layer 1 cannot identify or recover from collisions.
    * **Poor scalability:** More devices → higher chance of collisions.

* Importance
    * Layer 1 is **fundamental**: it enables the physical transmission of data.
    * However, it lacks intelligence for reliable, directed communication.
    * **Layer 2 (Data Link Layer)** builds on top of Layer 1 to provide **addressing, access control, and error handling**, making practical communication possible.

---

- Key Concept:
    - Layer 1 defines the **physical transmission environment** for networking, but by itself only supports raw broadcasting without reliability or control. 
    - For effective networking, we need the intelligence of higher layers starting with **Layer 2**.


</details>

<details>
<summary>Layer 2 - DataLink</summary>


#### Role of Layer 2

* Sits above Layer 1 (Physical layer).
* Enables reliable device-to-device communication on the same network segment.
* Provides addressing, flow control, and error detection/correction.

#### Frames
* <img src="https://miro.medium.com/v2/resize:fit:1400/0*ro3VqGmW4ReKaGW-.png" />
* Layer 2 introduces **frames** as the unit of communication.
* Frame structure includes:

  * **Preamble & Start delimiter** – identifies start of frame.
  * **Destination & Source MAC addresses** – unique 48-bit hardware identifiers.
  * **EtherType field** – indicates which Layer 3 protocol is encapsulated.
  * **Payload** – actual data (often Layer 3 packets).
  * **Frame Check Sequence (FCS)** – error detection via CRC.
* Concept of **encapsulation**: higher-layer data is wrapped inside a frame.

#### Media Access Control

* Solves the collision problem of Layer 1 shared mediums.
* Uses **CSMA/CD** (Carrier Sense Multiple Access with Collision Detection):

  * Check if medium is free before sending.
  * Detect collisions, send jam signal, apply random backoff, retry.
* Supports **unicast** (one-to-one) and **broadcast** (one-to-all).

#### Devices

* **Hubs (Layer 1)**: repeat signals blindly, cause collisions, all devices receive data.
* **Switches (Layer 2)**:

  * Understand frames and maintain **MAC address tables**.
  * Forward frames intelligently to the correct port.
  * Each port is its own collision domain.
  * Store-and-forward mechanism ensures only valid frames are delivered.

#### Benefits of Layer 2

* Provides unique device identification (MAC addresses).
* Enables controlled and reliable sharing of a medium.
* Reduces collisions and improves scalability (especially with switches).
* Forms the foundation for higher-layer protocols and the internet itself.

</details>

<details>
<summary>Layer 3 - Network</summary>

#### Purpose of Layer 3

* Enables communication **across different Layer 2 networks** (internetworking).
* Provides **logical addressing, routing, and packet delivery** between devices separated by multiple networks.
* Supports scalability beyond local LANs.

#### Packets and Encapsulation

* Layer 3 unit of data = **Packet**.
* Packets have **source and destination IP addresses** (can be global, unlike Layer 2).
* Encapsulation: IP packet is placed inside a Layer 2 frame for each hop.
* As packets move, **frames change** but the **IP packet remains constant**.

#### Key Fields in IP Packets

* **Source IP & Destination IP** – device identifiers.
* **Protocol field** – specifies Layer 4 protocol (e.g., TCP=6, UDP=17, ICMP=1).
* **Time To Live (TTL)** / Hop Limit – maximum hops before discard.
* **Payload** – data from Layer 4 protocols.

#### IPv4 vs IPv6

* **IPv4**: 32-bit addresses, dotted decimal (e.g., 133.33.3.7).
* **IPv6**: 128-bit addresses, larger space, similar structure but with Hop Limit.
* Both carry Layer 4 data inside.

#### IP Addressing & Subnetting

* IP address = **Network part + Host part**.
* Subnet mask (e.g., /16, 255.255.0.0) defines network vs host bits.
* Devices are **local** if network parts match; otherwise, communication goes through a **router**.
* Subnets allow calculation of **network start and end addresses**.

#### Routing and Route Tables

* **Routers** forward packets between networks.
* Each router has a **routing table**:

  * Destination network (prefix).
  * Next hop (where to send packet).
* **Default route (0.0.0.0/0)** used if no specific match exists.
* Routing can be static or dynamic (e.g., BGP).

#### Address Resolution Protocol (ARP)

* Translates IP addresses to MAC addresses for local delivery.
* Process: device broadcasts “Who has IP X?” → target replies with MAC address.
* Enables Layer 3 packets to be encapsulated in Layer 2 frames.

#### Example Scenarios

* **Local communication**: Devices use ARP to resolve MAC and send directly.
* **Remote communication**: Device sends packet to **default gateway (router)**, which forwards it across multiple networks until destination is reached.

#### Limitations of Layer 3

* Provides only **basic delivery** (no sessions, no reliability).
* Packets can arrive **out of order**. No flow control, leading to possible congestion and packet drops.
* Cannot distinguish between multiple application streams on the same devices.
* These gaps are solved by **Layer 4 protocols** (TCP/UDP).

</details>

<details>
<summary>Layer 4 & 5</summary>

#### Layer 4 (Transport Layer) Functions

* Adds **TCP** (reliable, ordered, connection-oriented) and **UDP** (fast, connectionless, less reliable).
* Introduces **segments**, encapsulated in IP packets.
* Provides **multiplexing** via **source/destination ports**.
* Ensures **ordering** with sequence numbers and acknowledgements.
* Implements **flow control** using window size.
* Uses **checksums** for error detection.
* Can prioritize data with the **urgent pointer**.

#### TCP Architecture

* **Client-server model** with **ephemeral ports** (client) and **well-known ports** (server, e.g., 443).
* **Bidirectional communication**: each direction has its own source/destination port pair.
* Segments provide a **reliable stream** despite packet unreliability at Layer 3.

#### TCP Three-Way Handshake

1. **SYN**: client sends initial sequence number.
2. **SYN-ACK**: server responds with its own sequence number and acknowledges client’s.
3. **ACK**: client acknowledges server’s sequence number.

* After this, both sides are synchronized and ready to exchange data reliably.

#### Sessions and State

* A **session** is the ongoing, stateful communication between client and server.
* Managed via TCP sequence numbers, acknowledgements, and connection state.

#### Stateless vs Stateful Firewalls

* **Stateless (e.g., AWS NACLs)**: Require explicit rules for both directions (outbound and inbound).
* **Stateful (e.g., AWS Security Groups)**: Track TCP connection state—allowing return traffic automatically once an initial connection is permitted.

</details>

</details>


<details>
    <summary>Network Address Translation (NAT)</summary>

#### Purpose of NAT

* Solves the **IPv4 address shortage** by allowing multiple private devices to share fewer public IPs.
* Translates **private IP addresses ↔ public IP addresses** so private devices can access the internet.
* Provides **basic security benefits** by hiding internal private addresses.
* Not required in IPv6 (sufficient address space).

#### Types of NAT

**1. Static NAT (One-to-One)**

* Permanent mapping between a private IP and a specific public IP.
* Used when a device (e.g., server) must always be reachable on the same public IP.
* Example: AWS Internet Gateway.

**2. Dynamic NAT (Many-to-Many, from a pool)**

* Private IPs are temporarily mapped to available public IPs from a pool.
* Allocation happens only when needed.
* If the pool is exhausted, new connections fail.
* Suitable when public IPs are fewer than private devices, but not all need internet simultaneously.

**3. Port Address Translation (PAT) / NAT Overload (Many-to-One)**

* Most common (e.g., home routers, AWS NAT Gateway).
* Many private devices share **one public IP**.
* Differentiates sessions using **unique source ports**.
* Maintains a NAT translation table with mappings:

  * (Private IP, Private Port) → (Public IP, Public Port).
* Return traffic is correctly routed back using this table.
* Limitation: **inbound connections cannot be initiated** directly to private devices (no entry in NAT table).

#### Key Points

* NAT operates only with **IPv4** (IPv6 removes the need).
* Ensures private devices can access public services like Netflix or APIs.
* Static = fixed mapping, Dynamic = temporary pool mapping, PAT = many devices share one public IP via ports.
* Widely used in **business networks, home routers, and cloud (AWS NAT Gateway/Instance)**.

</details>

<details>
    <summary>IP Address Space & Subnetting</summary>


#### IPv4 Address Classes

1. **Class A** (0.0.0.0 – 127.255.255.255)

   * 128 networks, each with \~16.7 million addresses.
   * Historically allocated to large organizations (e.g., Apple, Ford, US Military).

2. **Class B** (128.0.0.0 – 191.255.255.255)

   * 16,384 networks, each with \~65,536 addresses.
   * Used by medium-to-large organizations.

3. **Class C** (192.0.0.0 – 223.255.255.255)

   * Over 2 million networks, each with 256 addresses.
   * Common for small businesses.

4. **Class D** (224.0.0.0 – 239.255.255.255)

   * Reserved for multicast.

5. **Class E** (240.0.0.0 – 255.255.255.255)

   * Experimental use.


#### Private IPv4 Address Ranges (RFC 1918)

1. **10.0.0.0 – 10.255.255.255**

   * Single Class A block (\~16.7 million addresses).
   * Widely used in cloud platforms.

2. **172.16.0.0 – 172.31.255.255**

   * Sixteen Class B networks (\~65,536 addresses each).
   * Default range for AWS VPCs.

3. **192.168.0.0 – 192.168.255.255**

   * 256 Class C networks (256 addresses each).
   * Common in home and small office networks.

**Key Note**: Private ranges cannot be routed on the internet and require Network Address Translation (NAT).


#### IPv6 Addressing

* **Need for IPv6**: IPv4 addresses are nearly exhausted due to rapid device growth and cloud services.
* **Scale**: IPv6 provides **340 undecillion addresses** (3.4 × 10³⁸).


#### Subnetting Concepts

* **Definition**: Subnetting divides a larger network into smaller networks, each with its own prefix length.
* **CIDR (Classless Inter-Domain Routing)**: Introduced prefixes (e.g., `/16`, `/24`) to describe subnet size.
* **Principles**:

  * Larger prefix number = smaller subnet.
  * Example: `10.0.0.0/16` can be split into two `/17` networks, each covering half the range.
  * Repeated subdivision can produce multiple smaller subnets.

</details>

<details>
    <summary>Distributed Denial of Service (DDOS) Attacks</summary>

#### Categories of DDoS Attacks

1. **Application Layer Attacks (Layer 7)**

   * Examples: HTTP floods.
   * **Method**: Attackers exploit computational imbalance—simple client requests trigger expensive server responses.
   * **Impact**: Servers become overloaded, leading to performance degradation or failure.

2. **Protocol-Based Attacks (Layer 3/4)**

   * Examples: SYN floods.
   * **Method**: Exploit the TCP three-way handshake by sending spoofed SYN packets.
   * **Impact**: Server holds connections in half-open state, consuming memory and network resources, preventing legitimate users from connecting.

3. **Volumetric/Amplification Attacks**

   * Examples: DNS amplification.
   * **Method**: Small requests (with spoofed victim IP) trigger disproportionately large responses from third-party servers to the victim.
   * **Impact**: Saturates the victim’s network bandwidth, making services inaccessible even if servers remain operational.

</details>

<details>
    <summary>VLANS, TRUNKS & Q-in-Q</summary>

#### What VLANs Solve
- A VLAN (Virtual Local Area Network) is a logical separation of devices on the same physical switch.
- Using VLANs, one switch can host multiple isolated networks.
- Each VLAN creates its own broadcast domain, so broadcasts don’t leak into other groups.
- Distinguish by VLAN ID (eg. Finance = VLAN 20, Game Testers = VLAN 10, Sales = VLAN 30)
#### 802.1Q-Capable Switch (Managed Switch/VLAN Tagging)
- <img src="https://cdn.networklessons.com/wp-content/uploads/2014/07/8021q-frame-headers.png" />
- Standard that makes VLANs work.
- It modifies the Ethernet frame to add a VLAN tag (12 bits) → supports up to 4096 VLANs.
- How it works:
    - Devices connected to a switch don’t see VLAN tags.
    - Switches add/remove tags internally to know which VLAN traffic belongs to.
- **Access and Trunk ports** apply when switch supports VLANs (via IEEE 802.1Q standard)

#### Access Ports vs Trunk Ports
- <img src="https://study-ccna.com/wp-content/uploads/2020/04/access_and_trunk_ports.jpg" />
- Access Port
    - Belongs to a single VLAN.
    - Strips off the VLAN tag before sending frames to the end device.
    - End devices (PCs, printers, phones) don’t need to understand VLAN tags.
- Trunk Port
    - Carries multiple VLANs across a single link (usually switch-to-switch, or switch-to-router/firewall).
    - Frames keep their 802.1Q VLAN tags while traveling over the trunk.
    - The receiving device must also understand 802.1Q.
- Benefit: Access + Trunk ports allow VLANs to work across a network of switches instead of being stuck on just one switch.

#### Q-in-Q (802.1ad, VLAN Stacking)
- <img src="https://www.megaport.com/blog/q-in-q-questions-answered-2.jpg" />
- Problem: What if you and your service provider both use VLANs? IDs might conflict (e.g., both use VLAN 1337).
- Solution: Q-in-Q = add a second VLAN tag
- VLAN in VLAN, Outer envelope = provider’s VLAN. Inner envelope = your VLAN.

#### Key
- 802.1Q define (VLANS)
- 802.1AD define (nested QinQ VLANS)
</details>

<details>
    <summary></summary>
</details>

<details>
    <summary></summary>
</details>

## 1. Cloud, Networking and Technical Fundamentals
### Cloud Computing

## 2. AWS Fundamentals

## 3. IAM, ACCOUNTS AND AWS ORGANISATIONS

## 4. SIMPLE STORAGE SERVICE (S3)

## 5. VIRTUAL PRIVATE CLOUD (VPC) BASICS

## 6. ELASTIC COMPUTE CLOUD (EC2) BASICS

## 7. CONTAINERS & ECS

## 8. ADVANCED EC2

## 9. Route 53 - Global DNS

## 10. Relational Database Service (RDS)

## 11. NETWORK STORAGE & DATA LIFECYCLE

## 12. HA & SCALING

## 13. SERVERLESS AND APPLICATION SERVICES

## 14. GLOBAL CONTENT DELIVERY AND OPTIMIZATION

## 15. ADVANCED VPC Networking

## 16. HYBRID ENVIRONMENTS AND MIGRATION

## 17. SECURITY, DEPLOYMENT & OPERATIONS

## 18. Infrastructure as Code (CloudFormation)

## 19. NOSQL Databases & DynamoDB

## 20. Machine Learning 101

## 21. Other Services & Features