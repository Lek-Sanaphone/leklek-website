---
id: 48433-Software-Architecture
description: This course builds core skills in software architecture
title: 48433 Software Architecture
---
# 48433 - Summary
# 1. Introduction to Software Architecture
## 1.1 Lecture

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

---