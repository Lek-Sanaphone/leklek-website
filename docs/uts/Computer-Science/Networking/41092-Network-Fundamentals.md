---
id: Network-Fundamentals
description: This course builds core skills in networking
title: 41092 Network Fundamentals
---
# Network Fundamental - Summary
# 1. Internet Structure & Network Fundamentals

## 1.1 Protocol

- A **protocol** is a set of rules for how data is sent and received over a network.
- Examples: HTTP, TCP, IP, FTP.

## 1.2 Internet Structure

### Key Components:
- **Network Edge**: Devices like clients and servers (e.g., phones, laptops, web servers).
- **Access Networks & Physical Media**: Connect users to the internet using DSL, cable, fiber, or wireless.
- **Network Core**: Routers and links that connect different networks using **packet switching**.

## 1.3 Access Networks

### DSL (Digital Subscriber Line)
- Uses telephone lines to send data and voice at the same time.
- Speeds: 1–25 Mbps.
- DSL modem separates voice and data signals.

### HFC (Hybrid Fibre-Coaxial)
- Combines fiber-optic and coaxial cables.
- Uses encryption and **Frequency Division Multiplexing (FDM)** to separate users.
- Speeds: Up to hundreds of Mbps.

### NBN (National Broadband Network)
- Australia’s national network.
- Expensive and often slow (around 55 Mbps).
- **FTTH (Fibre to the Home)** brings fiber directly to homes and businesses.

### Enterprise Networks
- Private high-speed networks for companies.
- Uses dedicated fiber lines.

## 1.4 Physical Media

- **Bit**: Smallest unit of data.
- **Physical Link**: Connection between devices.
  - **Guided Media** (Wired): Copper, coaxial, fiber.
  - **Unguided Media** (Wireless): Air, radio waves.

## 1.5 Packet Switching & Delays

- Data is split into packets.
- Routers forward packets one hop at a time.

### Types of Delay:

- **Transmission Delay**:  
  `Delay = L / R`  
  (L = packet size, R = link speed)

- **Store and Forward**:  
  Routers must receive the full packet before sending.

- **End-to-End Delay**:  
  `Total Delay = L / R1 + L / R2`

- **Queueing Delay**:  
  Happens when too many packets arrive at once.  
  Can cause buffering or packet loss.

## 1.6 Network Core Functions

| Function    | Description                                |
|-------------|--------------------------------------------|
| Routing     | Decides the full path across the network   |
| Forwarding  | Chooses next router to send the packet     |

## 1.7 Circuit Switching

- Reserves full path before sending data.
- Guarantees performance but wastes resources if idle.

### Multiplexing:

- **FDM (Frequency Division Multiplexing)**:  
  Each user gets a different frequency.

- **TDM (Time Division Multiplexing)**:  
  Each user gets a time slot.

| Type | Best for        | Description                |
|------|------------------|----------------------------|
| FDM  | Analog systems   | Continuous transmission    |
| TDM  | Digital systems  | More efficient and flexible|

## 1.8 Packet Switching vs Circuit Switching

| Feature           | Circuit Switching      | Packet Switching     |
|------------------|------------------------|----------------------|
| Bandwidth Usage  | Reserved (may be idle) | Shared (efficient)   |
| Scalability      | Lower                  | Higher               |
| Example (2 Mbps) | 2 users max            | 3+ users possible    |

## 1.9 Internet Structure

- The internet is a **"network of networks"**.
- Each organization (ISP, company, university) manages its own part of the internet.

---
# 2. Networking Performance & Internet Stack

## 2.1 Sources of Packet Delay

### Transmission Delay
Time to push all bits into the link.  
**Formula**:  
$$ \text{Transmission Delay} = \frac{L}{R} $$  
Where `L` = packet length (bits), `R` = link bandwidth (bits per second)

### Propagation Delay
Time for a signal to travel through the medium.  
$$ \text{Propagation Delay} = \frac{\text{distance}}{\text{propagation speed}} $$

### Queueing Delay
Time a packet waits in the queue until it can be transmitted.  
Depends on traffic load.

### Processing Delay
Time to examine packet header and determine forwarding.

## 2.2 Traffic Intensity (La/R)

- **La/R ≈ 0** → Minimal queueing delay  
- **La/R → 1** → Large queueing delay  
- **La/R > 1** → Queue builds indefinitely; infinite delay

## 2.3 Packet Loss

Occurs when the queue (buffer) is full.  
- Incoming packets are **dropped**
- May be retransmitted by sender, router, or lost permanently

## 2.4 Throughput

**Throughput** is the rate at which bits are successfully delivered from sender to receiver.

- **Instantaneous Throughput**: At a specific moment  
- **Average Throughput**: Over a time interval  
$$ \text{Throughput} = \frac{\text{Total bits received}}{\text{Total time}} $$

## 2.5 Internet Protocol Stack (TCP/IP)

The **5-layer model** of the Internet:

1. **Application Layer** – Network applications (e.g., HTTP, FTP, DNS)  
2. **Transport Layer** – Process-to-process data transfer (e.g., TCP, UDP)  
3. **Network Layer** – Routing of datagrams (e.g., IP)  
4. **Link Layer** – Data transfer between adjacent network nodes (e.g., Ethernet, WiFi)  
5. **Physical Layer** – Transmission of raw bits (e.g., copper, fiber, radio)

## 2.6 Packet Overlap & Queue Test (Visual Method)

Use color-coded diagrams to check for overlap in packet transmission.  
- If the **red** packet finishes **after** the green starts → overlap (queuing occurs)  
- If the **red** finishes **before** the green starts → no overlap

### Visual Method
- Compute each packet’s transmission time using $$ \frac{L}{R} $$
- Compare end time of earlier packet to start time of next
- Helps identify if traffic will queue or pass freely

## 2.7 TCP/IP Model Summary Table
- Application Layer: Web, Email, FTP, DNS
- Transport Layer: TCP, UDP
- Network Layer: IP, ICMP, Routing
- Link Layer: Ethernet, Wi-Fi, PPP
- Physical Layer: Copper, Fiber, Radio
---
# 3. Application Layer (1 of the 5 Layers)

## 3.1 What an Application-Layer Protocol Defines

An application-layer protocol defines:

- **Types of messages exchanged** (e.g., request, response)
- **Message syntax**: Format and structure
- **Message semantics**: Meaning of info in each field
- **Rules for sending/receiving** messages

### Protocol Examples

- **Open Protocols** (e.g., HTTP, SMTP):
  - Publicly defined in RFCs
  - Interoperable across systems
  - Example: Google Chrome uses HTTP

- **Proprietary Protocols** (e.g., Zoom, MS Teams):
  - Privately owned and maintained

## 3.2 Internet Transport Protocol Services

| Protocol | Features                                                                 |
|----------|--------------------------------------------------------------------------|
| **TCP**  | Reliable, ordered delivery, congestion control, connection-oriented      |
| **UDP**  | Unreliable, faster, minimal overhead, no connection setup                |

> **Note**: TCP is better for accuracy (e.g., email, downloads),  
> UDP is faster for streaming (e.g., video calls), but may need buffering.

### Example Transport Use by Application

| Application        | Protocol Used     |
|--------------------|------------------|
| FTP (File Transfer)| TCP              |
| SMTP (Email)       | TCP              |
| HTTP (Web)         | TCP              |
| Skype, Zoom        | UDP or TCP       |
| Streaming Video    | UDP or TCP       |

## 3.3 Web and HTTP

### What is a Web Page?

A web page consists of:
- **Objects**: Images, text, audio, video
- **Base HTML file** and additional objects
- Each object is addressable via a **URL**  
  Example:  
  `www.somesite.com/images/logo.png`

### HTTP: Stateless Protocol

- The server does **not remember** past requests
- Each HTTP request is independent

### Persistent vs Non-Persistent HTTP

| Type              | Description                                                              |
|------------------|---------------------------------------------------------------------------|
| **Persistent**    | Multiple objects sent over single TCP connection (faster, preferred)     |
| **Non-Persistent**| One object per TCP connection (more overhead)                            |

**Tip**: Use persistent HTTP for:
- Web browsing
- API requests
- Efficient resource fetching

---
# 4. Network Fundamentals

## 4.1 TCP and UDP

- **TCP (Transmission Control Protocol)**: Reliable, ensures data arrives in order and without errors.
- **UDP (User Datagram Protocol)**: Unreliable but faster, no error checking or ordering.

### Example: Python UDP Server
```python
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(("", serverPort))
print("The server is ready to receive")

while True:
    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
```

## 4.2 Cache and Cookies

* **Cache**: Temporarily stores website content for faster loading on revisits.
* **Cookies**: Store user-specific data (login status, preferences, shopping carts).

**Analogy**:

* Cache = remembers *what* you've seen (e.g., layout).
* Cookies = remember *who* you are (e.g., login).

## 4.3 DNS (Domain Name System)

**How DNS Works**:

1. Computer contacts Local DNS Server.
2. If unknown, Local DNS contacts Root Server.
3. Root → TLD Server → Authoritative Server.
4. IP is returned to your computer to load the site.

## 4.4 Email Protocols

### SMTP (Simple Mail Transfer Protocol)

* Used for sending emails.
* Works between clients and mail servers or between servers.

### POP3 vs. IMAP

* **POP3**: Downloads and removes mail from the server.
* **IMAP**: Keeps mail on the server; allows syncing across devices.

### Email Journey (Alice to Bob)

1. Alice writes and sends via SMTP.
2. Travels server to server using SMTP.
3. Bob retrieves using IMAP.
4. Bob replies; Alice retrieves via POP3.

### SMTP Response Codes

* 2xx = Success (e.g., 250 OK)
* 3xx = Intermediate (e.g., 354 Start mail input)
* 4xx = Temporary error (e.g., 450 Mailbox unavailable)
* 5xx = Permanent error (e.g., 550 User does not exist)

### SMTP vs HTTP Message Endings

* **SMTP**: Ends message with a single `.` line.
* **HTTP**: Uses `Content-Length` header.

## 4.5 Python TCP Server Example

```python
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print("The server is ready to receive")

while True:
    connectionSocket, addr = serverSocket.accept()
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = sentence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    connectionSocket.close()
```

### Explanation

* `socket(AF_INET, SOCK_STREAM)`: IPv4, TCP.
* `bind()`: Assign IP and port.
* `listen()`: Queue connections.
* `accept()`: Wait for client.
* `recv() / send()`: Receive and send data.
* `close()`: Close the connection.

## 4.6 Encoding vs Decoding

* **Bytes**: Machine-readable data (used in transport).
* **Strings**: Human-readable text.
* **ASCII vs Unicode (UTF-8)**: ASCII for 127 characters; Unicode supports over 1 million.

**Use `encode()` to convert string to bytes.**
**Use `decode()` to convert bytes to string.**

---
# 5. Transport Layer

## 5.1 UDP – User Datagram Protocol

- UDP sends data without ensuring delivery.
- No handshake or error checking.
- Used for fast, real-time apps (e.g., games, VoIP).

## 5.2 TCP vs UDP

- TCP is reliable and connection-based (used by HTTP).
- UDP is faster but unreliable.

## 5.3 Port Numbers

- Identify apps on a device.
- Ranges:
  - 0–1023: Well-known (HTTP 80, FTP 21)
  - 1024–49151: Registered
  - 49152–65535: Dynamic/Temporary

## 5.4 Checksum (UDP)

- Detects data errors using 1’s complement.
- Sender adds data, flips bits → sends checksum.
- Receiver re-adds and checks for all 1s.

## 5.5 Reliable Data Transfer (RDT)

- Ensures packets are delivered and correct.
- Uses ACK (acknowledged) and NAK (resend).
- TCP implements this via sequence numbers and retransmission.
---
# 6. Transport Layer & TCP

## 6.1 TCP 3-Way Handshake

The 3 steps to establish a reliable TCP connection:

1. **SYN** – Client: "Can we talk?"
2. **SYN-ACK** – Server: "Yes!"
3. **ACK** – Client: "Let’s go!"

After this, both sides can send/receive data.


## 6.2 Why Use UDP Instead of TCP?

* UDP allows **more control** over:

  * What data is sent in each segment.
  * When the segment is sent.


## 6.3 TCP Sequence and Acknowledgment Numbers

* **SEQ# (Sequence Number):** Tells where data fits in the stream.
* **ACK# (Acknowledgment Number):** Confirms receipt and tells what’s expected next.

**Formula:**

* `ACK# = SEQ# + data length`
* `Next SEQ# = ACK#`


## 6.4 Cumulative Acknowledgment (ACK)

* TCP sends **one ACK** for multiple received segments.
* Saves bandwidth, simplifies recovery, and increases efficiency.


## 6.5 TCP Window Size

* The **TCP window** limits how much unacknowledged data can be in flight.
* Think of it like mailing only 5 letters at once—wait for a reply before sending more.


## 6.6 Go-Back-N (Sliding Window Protocol)

* Sender can send multiple segments up to the window size.
* If one fails, resend **that one + all after it**.

### Summary of Go-Back-N Cases:

* **Case A (Segment 2 corrupted):** Retransmit 2–5 → Total 9 segments.
* **Case B (ACK for 2 lost):** No resend needed due to ACK 3 (cumulative).
* **Case C (ACK for 5 lost):** Retransmit segment 5 → Total 6 segments.


## 6.7 TCP Flow Control

* If **Receiver's read speed < Sender's speed**, TCP flow control reduces sender's rate.
* Controlled by `rwnd` (Receiver Window).

  * `rwnd = 0`: pause sending
  * `rwnd > 0`: resume

---

# 7. Switch Fabric & Packet Conversion

## 7.1 Decimal to Binary Conversion

**Method 1 (Subtracting powers of 2):**
Break the decimal into binary by subtracting the highest powers of 2.

**Method 2 (Divide by 2):**
Divide decimal by 2 repeatedly. Binary is the remainders in reverse order.

Example:

* `202 → 11001010`
* `3 → 00000011`
* `14 → 00001110`
* `25 → 00011001`

**Final IP in binary:**

```
11001010.00000011.00001110.00011001
```

**Binary to Decimal:**
Multiply each bit by powers of 2 from right to left and sum the results.


## 7.2 Switch Fabric Overview

### Types:

* **Memory-based switching:** All packets go through a shared memory. One at a time.
* **Bus-based switching:** Shared bus. Only one packet can use it at once.
* **Crossbar switching:** Allows multiple packets to go through simultaneously if different outputs.

**Delay Summary:**

| Fabric Type | Max Delay   |
| ----------- | ----------- |
| Memory      | (N - 1) × D |
| Bus         | (N - 1) × D |
| Crossbar    | 0           |


## 7.3 Switch Architecture Scheduling

### Round Robin (RR)

* Every flow gets an equal chance to send packets in a rotating fashion.

### Weighted Fair Queuing (WFQ)

* Each flow is assigned a weight.
* Higher weight = More packet-sending opportunities.
* Example ratio for weights 0.5 : 0.25 : 0.25 → Serve packets in 2:1:1 pattern.


## 7.4 IP Header & Fragmentation

### IPv4 Header Basics

* Total Length field = Header + Payload
* Header = 20 Bytes
* Carries Layer 4 payload (e.g., TCP, UDP, ICMP)

### IP Fragmentation

* If a packet is too large, it's split into fragments.
* **Fields:**

  * **Identification:** Same for all fragments.
  * **Fragment Offset:** Position in the original packet.
  * **Flags:** Indicate more fragments.

Fragments are reassembled at the destination.

---

# 8. Network Layer Basics & IP Addressing

## 8.1 What is a Network & IP Address?
- A network is a system that allows devices to communicate.
- IP address identifies each device on a network.

## 8.2 What is a Subnet Mask?
- Defines how IP addresses are divided into network and host portions.
- Subnet masks help route data efficiently.

## 8.3 Routing vs Forwarding Tables
- **Routing Table**: Like GPS — determines possible routes.
- **Forwarding Table**: Like a driver — decides the actual next step for each packet.

## 8.4 Forwarding Table Behavior
- Routers use **destination IP only** — not the source — to determine packet path.
- They cannot forward differently based on sender.

## 8.5 Classful IP Addressing
- Legacy method with fixed subnet sizes: Class A, B, C.

## 8.6 CIDR (Classless Inter-Domain Routing)
- Allows flexible subnetting using notation like `/24`, `/16`.
- Routers pick the **longest prefix match** (most specific).

## 8.7 Windows Network Configuration Example
- IP Range: `10.1.4.0/24`
- Gateway: `10.1.4.1`

## 8.8 Longest Prefix Match (LPM)
- Routers choose the route with the most matching bits in the network address.

## 8.9 DHCP (Dynamic Host Configuration Protocol)
- Assigns IP automatically using 4 steps (DORA):
  - Discover → Offer → Request → Acknowledge
- Provides IP, Gateway, DNS.

## 8.10 NAT (Network Address Translation)
- Allows private IPs to access public internet.

### Static NAT
- One-to-one permanent IP mapping.

### Dynamic NAT
- Uses a pool of public IPs, assigned temporarily.
- Limited by available public IPs.

### PAT (Port Address Translation)
- Many private IPs share a single public IP.
- Uses different **port numbers** to track sessions.

---

# 9. Routing Algorithms

## 9.1 Dijkstra’s Link State Routing

- Goal: Find the shortest path from a source node to all others.
- Steps:
  1. Start at source, initialize distances (0 for source, ∞ for others).
  2. Check direct neighbors, record link costs.
  3. Select the node with the lowest tentative cost.
  4. Update costs for neighbors of that node.
  5. Repeat until all nodes are visited.

**Terms:**
- `N′`: Set of nodes with known shortest paths.
- `D(x)`: Shortest distance from source to node x.
- `p(x)`: Previous node on the shortest path to x.

**Shortest Path Example (u to z)**:
- Result: `u → v → x → z`
- Total cost = 14

## 9.2 Bellman-Ford’s Distance Vector Routing

- Each router maintains a routing table with cost to each destination.
- Routers send their tables to neighbors.
- Update table if a shorter path is found.
- Repeat until no more updates (network converges).

**Formula:**
```

New Cost to Destination = Cost to Neighbor + Neighbor’s Cost to Destination

```

**Problem Summary:**
Router `x`:
- Connected to:
  - `y` with cost 4 (and y→u = 11)
  - `w` with cost 6 (and w→u = 9)

To update:
- If `c(x, w) < 5`: route via w is shorter → update & notify.
- If `c(x, y) > 5`: route via w becomes better → update.

No update:
- If `c(x, w) ≥ 5`: no better than 14.
- If `c(x, y) < 4`: cost reduces slightly but doesn’t change route.

## 9.3 Link State vs Distance Vector

| Feature                | Link State (Dijkstra)       | Distance Vector (Bellman-Ford)      |
|------------------------|-----------------------------|--------------------------------------|
| Information Shared     | Entire network topology     | Only to neighbors                   |
| Update Trigger         | On topology change          | On receiving updated vectors         |
| Convergence Speed      | Fast                        | Slower, can have loops              |
| Computation            | Local Dijkstra algorithm    | Iterative table updates             |

---

# 10. Autonomous Systems

## 10.1 Border Gateway Protocol (BGP)

- BGP connects Autonomous Systems (AS) across the internet.
- Chooses best path to send data based on multiple factors, not just shortest AS-path.
- Loop prevention: BGP checks for its own AS in AS-PATH and rejects if found.

**Example:**
UTS (AS7575) → Telstra (AS1221) → Google (AS15169).  
If AS7575 sees itself in the path again, it drops the route.

## 10.2 BGP Path Selection and Economics

- A longer AS path may be preferred for cost/partnership reasons.
- UTS may choose:
  - Path 1: Short (2 hops) via ISP-A
  - Path 2: Longer (3 hops) via ISP-B (preferred due to cost/relationship)

## 10.3 BGP vs IGPs (RIP, OSPF)
- Between ASes:
  - eBGP: External BGP between ASes.
  - iBGP: Internal BGP within the same AS.

---
# 11. Network

## 11.1 Parity Check

**What is Parity?**  
A method to detect transmission errors using an extra bit to ensure the number of 1s is even (even parity) or odd (odd parity).

**Even Parity Example (2D Parity):**  
Each row and column must have an even number of 1s.  
Single-bit errors can be located and corrected.  
Double-bit errors can be detected but not corrected.

## 11.2 Address Resolution Protocol (ARP)

**Definition:**  
ARP (Address Resolution Protocol) maps an IP address (Layer 3) to a MAC address (Layer 2) within the same LAN.

**How it Works:**
- PC1 sends an ARP request: "Who has IP X?"
- Target device responds with its MAC address.
- Sender saves it in ARP cache and sends the data.

## 11.3 IP & MAC Assignment (Network Example)

**Subnets:**
- Subnet 1 → `192.168.1.xxx`
- Subnet 2 → `192.168.2.xxx`
- Subnet 3 → `192.168.3.xxx`

Each host and router interface is assigned an IP and MAC address. These addresses are essential for routing and ARP resolution.

## 11.4 ARP Table (Up-to-date)

**Host E to Host B:**  
1. Host E (in Subnet 3) sees B is in another subnet → sends to default gateway (Router 2).
2. R2 forwards to R1 → R1 checks destination → sends to Host B via MAC.

MAC changes at each hop, IP stays the same.

## 11.5 ARP Table (Empty)

**Host E to Host B with Empty Table:**  
1. Host E sends ARP request: “Who has IP 192.168.3.2?”  
2. Router 2 replies with MAC.  
3. Host E sends real packet using MAC.  
Same routing process as before resumes.

## 11.6 Router Replaced by Switch (Scenario)

### a. Host E to Host F  
Same subnet → E uses ARP to get F’s MAC → sends directly (no router).

### b. Host E to Host B  
Different subnet → E sends to default gateway → ARP for Router R1’s MAC.

### c. Host A to Host B  
Same subnet, no MAC in cache → A sends ARP broadcast.  
Switch floods ARP to all ports.

**Switch S1 Actions:**
- Floods the ARP request.
- Learns MAC from incoming frames.

**Router R1 Action:**  
Does **not** forward ARP broadcasts (Layer 2).

**Host B Action:**  
Learns A’s MAC from the ARP request.

**Switch After Reply:**  
Updates MAC table and forwards unicast reply to A.


