# Advanced Jobs to Be Done (AJTBD) — Methodology Reference

> **Purpose:** Working reference for DIANA to analyze 8 BUSY Bar stakeholders using the AJTBD framework.
> **Sources:** Christensen "Competing Against Luck", Moesta "Demand-Side Sales 101", Ulwick "JOBS TO BE DONE: Theory to Practice", Strategyn ODI methodology.

---

## 1. Core Concepts

### 1.1 What is JTBD?

Jobs to Be Done is a theory of customer motivation: **people don't buy products — they "hire" them to make progress in their lives.** The unit of analysis is not the customer demographic or the product category, but the **job** the customer is trying to get done.

Key insight (Clayton Christensen): "When we buy a product, we essentially 'hire' it to help us do a job. If it does the job well, the next time we're confronted with the same job, we tend to hire that product again. And if it does a crummy job, we 'fire' it and look for an alternative."

### 1.2 Basic JTBD vs. Advanced JTBD

| Aspect | Basic JTBD | Advanced JTBD (AJTBD) |
|---|---|---|
| Focus | Single job statement | Full job anatomy: main + related + emotional + social + consumption chain |
| Analysis | Qualitative only | Qualitative + quantitative (ODI opportunity scoring) |
| Forces | Implicit | Explicit 4 Forces of Progress analysis |
| Outcomes | Vague "desired outcomes" | Structured desired outcome statements with measurable metrics |
| Customers | Monolithic "user" | Job executor, beneficiary, lifecycle support, buyer — distinct roles |
| Segmentation | Demographic | Needs-based (segments by unmet outcomes) |

### 1.3 Two Schools of JTBD

**"Drill bit" school (Ulwick/Strategyn — ODI):** Focuses on the **functional job** as a measurable process. Breaks it into steps, defines desired outcomes, scores opportunities quantitatively. Best for: systematic product development, feature prioritization.

**"Milkshake" school (Moesta/Christensen — Switch):** Focuses on the **progress** people want to make in their lives. Uses switch interviews to understand the forces driving and blocking change. Best for: understanding adoption, marketing, sales, reducing churn.

**AJTBD combines both schools.** Use the Switch/Forces model to understand adoption dynamics, and ODI to prioritize features and outcomes.

---

## 2. Job Anatomy

For each stakeholder, DIANA should identify ALL of the following:

### 2.1 Core Functional Job

The underlying process the person is trying to get done. This is the **reason a market exists.**

- Format: Verb + object + contextual clarifier
- Examples: "Maintain deep focus during knowledge work", "Signal availability to household members"
- Must be **solution-agnostic** (no mention of BUSY Bar)
- Must be **stable over time** (technologies change, the job doesn't)

### 2.2 Related Jobs

Peripheral functional jobs that the executor must also complete, often before or after the core job. A product that addresses related jobs alongside the core job is perceived as more valuable.

- Example: If core job = "maintain deep focus", related jobs might include "track time spent on tasks", "review productivity patterns", "transition between focus and collaboration modes"

### 2.3 Emotional Jobs (Personal)

How the job executor wants to **feel** while getting the core job done.

- Format: "Feel [emotion] when [doing the job]"
- Examples: "Feel in control of my attention", "Feel like a productive professional", "Feel calm rather than guilty when ignoring messages"

### 2.4 Social Jobs

How the job executor wants to **be perceived by others** while getting the job done.

- Format: "Be seen as [perception] by [audience]"
- Examples: "Be seen as focused and professional by colleagues", "Be seen as respectful of others' time by teammates", "Be seen as a thoughtful parent who balances work and family"

### 2.5 Consumption Chain Jobs

Jobs related to the **product lifecycle** — not the core job itself, but jobs that arise from acquiring, using, maintaining, and disposing of the product/solution.

Relevant consumption chain stages for a hardware+software product like BUSY Bar:
1. **Evaluate** — Research and compare solutions
2. **Purchase** — Make the buying decision ($249 price point)
3. **Set up / Install** — Unbox, connect WiFi/Matter, configure software
4. **Learn** — Understand features, form habits
5. **Use daily** — Integrate into workflow
6. **Maintain** — Update firmware/software, troubleshoot
7. **Integrate** — Connect with other tools (Slack, calendar, smart home)
8. **Upgrade** — Move to new rings/features
9. **Dispose/Replace** — End of product life

### 2.6 The Buyer's Financial Job

The purchase decision maker evaluates: "Minimize the likelihood of making a poor purchase decision." They have their own desired outcomes around cost, ROI, risk, and value perception.

---

## 3. Customer Roles

For each stakeholder, identify WHO plays each role:

| Role | Definition | Question to Ask |
|---|---|---|
| **Job Executor** | Person who uses the product to get the core functional job done | Who directly uses BUSY Bar to accomplish the job? |
| **Job Beneficiary** | Person who enjoys the benefits of the job being done | Who benefits when the job is done well? (May not be the user!) |
| **Job Overseer** | Person responsible for the results of the job | Who cares about whether the job outcome is achieved? |
| **Purchase Executor** | Person who makes/executes the buying decision | Who actually buys the BUSY Bar? |
| **Purchase Influencer** | Person who influences the buying decision | Who recommends or discourages the purchase? |
| **Product Lifecycle Support** | People who install, maintain, integrate, support the product | Who sets it up? Who troubleshoots? Who manages the fleet? |

**Important for BUSY Bar:** Many stakeholders play multiple roles. The Focus Worker is often executor + buyer + lifecycle support. But in a Team context, the IT Manager may be buyer, Team Lead may be overseer, and the worker is the executor.

---

## 4. The 4 Forces of Progress

The **Forces of Progress** model (Bob Moesta) explains why people switch to a new solution — or fail to switch. For every stakeholder, analyze all four forces:

```
                    FORCES ENABLING CHANGE
                    ========================
        F1: PUSH of the current situation
            (pain, frustration, "this isn't working")
                           +
        F2: PULL of the new solution
            (attraction, aspiration, "my life could be better")

                           vs.

                    FORCES BLOCKING CHANGE
                    ========================
        F3: ANXIETY of the new solution
            (fear, uncertainty, "what if it doesn't work?")
                           +
        F4: HABIT of the present
            (comfort, inertia, "what I do now is fine")
```

**The switch happens when F1 + F2 > F3 + F4.**

### 4.1 F1: Push of the Current Situation

What's happening in the person's life that makes them think "I need something different"? This is about THEIR situation, not about the product.

- What's not working?
- What's the struggling moment?
- What event or change triggered dissatisfaction?
- How long have they been tolerating this?

### 4.2 F2: Pull of the New Solution (Magnetism)

What about the new solution (BUSY Bar) attracts them? This is aspirational — "what could my life be like?"

- What does the ideal future look like?
- What specific capabilities attract them?
- What emotional/social payoff do they imagine?
- Is the pull functional, emotional, or social?

### 4.3 F3: Anxiety of the New Solution

What fears or uncertainties does the new solution create? **This is the most overlooked force** — Moesta says half the time, the solution is to remove features/complexity, not add them.

- Will it actually work as promised?
- Can I learn to use it? Will I look foolish?
- What if I waste $249?
- What if it creates new problems? (privacy, team resentment, etc.)
- Is the technology reliable? Will it be supported long-term?

### 4.4 F4: Habit of the Present (Allegiance/Inertia)

What keeps them comfortable with the current situation, even if it's suboptimal?

- "I've always done it this way"
- Switching cost (time, money, cognitive effort)
- Social proof of current behavior ("everyone does it this way")
- Sunk cost in current tools/workflows

### 4.5 Design Implications

| Force | Design Response |
|---|---|
| Weak Push | Help them see the cost of inaction; quantify the problem |
| Weak Pull | Demonstrate concrete value; show aspirational outcomes |
| Strong Anxiety | Reduce complexity; offer guarantees; provide social proof; free trial |
| Strong Habit | Make switching frictionless; bridge from familiar patterns; don't require wholesale change |

**Moesta's key insight:** "We could build the best product in the world, but if the push and the pull are not greater than the anxiety and the habit, they're not going to buy. In business school we are taught to add more features and benefits — it's not true! We've got to reduce their anxiety."

---

## 5. Outcome-Driven Innovation (ODI)

### 5.1 Desired Outcome Statements

Ulwick's contribution: define customer needs as **desired outcome statements** — measurable, solution-agnostic metrics that customers use to evaluate success.

**Format:** `[Direction of improvement] + [unit of measure] + [object of control] + [contextual clarifier]`

- "Minimize the time it takes to enter a focused state"
- "Minimize the likelihood of being interrupted during deep work"
- "Increase the percentage of the workday spent in productive flow"
- "Minimize the effort required to communicate availability to others"

**Characteristics of good outcome statements:**
- Solution-agnostic (no product names)
- Stable over time
- Measurable (even if conceptually)
- Controllable
- Unambiguous
- Structured for prioritization in surveys

### 5.2 Opportunity Scoring

Once desired outcomes are defined, score each one:

**Opportunity Score = Importance + max(Importance - Satisfaction, 0)**

Where:
- **Importance** (1-10): How important is this outcome to the customer?
- **Satisfaction** (1-10): How well do current solutions satisfy this outcome?

| Score Range | Interpretation |
|---|---|
| >15 | Extreme opportunity — underserved, high importance |
| 12-15 | High opportunity — strong innovation target |
| 10-12 | Moderate opportunity |
| <10 | Adequately served or overserved |

**Overserved outcomes** (low importance, high satisfaction) = opportunities to simplify/reduce cost.
**Underserved outcomes** (high importance, low satisfaction) = opportunities to differentiate.

### 5.3 Growth Strategy Matrix

Based on outcome analysis, choose a strategy:

| Strategy | When to Use |
|---|---|
| **Differentiated** | Target underserved segment with premium solution that gets the job done better |
| **Dominant** | Get the job done better AND more cheaply (rare but powerful) |
| **Disruptive** | Target overserved segment with simpler, cheaper solution |
| **Discrete** | Serve a small segment with a specific unmet need |
| **Sustaining** | Incremental improvements to maintain position |

---

## 6. Job Statement Formats

### 6.1 Standard JTBD Statement

```
When [situation/context], I want to [motivation/action], so I can [expected outcome].
```

Example: "When I'm about to start a complex coding task, I want to signal to my household that I need uninterrupted time, so I can reach deep focus and complete quality work."

### 6.2 Extended JTBD Statement (with pain)

```
When [situation], I want to [job], so I can [outcome], without [current pain point].
```

Example: "When I work from home with family around, I want to protect my focus time, so I can deliver quality work on deadline, without creating resentment by constantly telling people to leave me alone."

### 6.3 Actor-Specific Statement

```
As a [role/actor], when [trigger/moment], I need to [verb] [noun], so [objective].
```

Example: "As a team lead, when my remote team member activates focus mode, I need to see their status in Slack, so I can route urgent questions to someone else."

---

## 7. The JTBD Interview / Switch Interview

### 7.1 Who to Interview

Interview people who have **recently switched** — either TO your product, FROM your product, or to/from a competitor. The switch moment reveals the forces at play.

For BUSY Bar analysis (since product is pre-market), interview:
- People who recently adopted any focus/productivity tool
- People who recently started working from home
- People who tried a focus tool and abandoned it

### 7.2 The Timeline

Every switch has a timeline with key moments:

1. **First thought** — "Something needs to change" (could be months/years before purchase)
2. **Passive looking** — Awareness without active search
3. **Active looking** — Deliberately searching for solutions (Event 1: what triggered this?)
4. **Deciding** — Evaluating options (Event 2: what narrowed the choice?)
5. **Purchasing** — The transaction
6. **First use / Onboarding** — Initial experience
7. **Ongoing use** — Integration into life
8. **Satisfaction / Dissatisfaction** — Did it get the job done?

### 7.3 Key Interview Questions

**Establishing context (the Push):**
- "Take me back to when you first thought about [solving this problem]. What was going on?"
- "What was the specific moment when you said 'enough is enough'?"
- "How long had you been tolerating the situation before you acted?"
- "What happened right before you started looking for a solution?"

**Understanding the Pull:**
- "When you first heard about [solution], what caught your attention?"
- "What did you imagine your life would be like with this?"
- "What was the #1 thing that attracted you?"

**Uncovering Anxiety:**
- "What almost stopped you from [buying/switching]?"
- "What were you worried might go wrong?"
- "Did you try to talk yourself out of it? What did you say?"
- "What did you need to see/hear/know before you felt comfortable?"

**Mapping Habit:**
- "What were you doing before to [get the job done]?"
- "What was good about that old way?"
- "What would you have missed if you switched?"
- "Who else was affected by your decision to change?"

**The Milkshake Question (Christensen):**
- "What 'job' did you 'hire' this product to do?"
- "What would you have done if this product didn't exist?"
- "What did you 'fire' when you 'hired' this?"

---

## 8. The Milkshake Example (Reference Case)

Clayton Christensen's classic example:

**Situation:** McDonald's wanted to sell more milkshakes. Traditional approach: survey customers on flavor, size, price preferences.

**JTBD insight:** Researchers observed that 40% of milkshakes were sold before 8:30 AM. These morning commuters had a **job**: make the boring commute engaging and stay full until lunch.

**What they "fired":** Bananas (too quick), donuts (messy, crumby), bagels (dry, needed cream cheese while driving), Snickers bars (guilt).

**Why milkshake was "hired":** Thick (lasted the whole commute), could be held in cup holder, not messy, filling, slightly indulgent but not guilt-inducing.

**Real competition:** Not other beverages — it was bananas, bagels, boredom, and hunger.

**Design implication:** Make it thicker (lasts longer), add fruit chunks (surprise/engagement), move dispensers to front of counter (speed for commuters), offer prepaid cards (no waiting in line).

**Lesson for BUSY Bar:** The real competition isn't other LED indicators. It's DND mode on Slack, closed doors, headphones as a "don't talk to me" signal, going to a coffee shop, working odd hours to avoid interruptions. Understanding what people currently "hire" to protect their focus reveals the true competitive landscape.

---

## 9. Hardware/Software Product JTBD Example

**Nest Thermostat** (relevant analogy for BUSY Bar as smart hardware):

| Job Layer | Nest Example | BUSY Bar Parallel |
|---|---|---|
| Core functional | Maintain comfortable home temperature | Maintain deep focus during knowledge work |
| Related jobs | Save energy, avoid manual adjustments | Track focus time, manage interruptions, transition between modes |
| Emotional | Feel smart/capable, feel taken care of | Feel in control, feel professional, feel calm |
| Social | Be seen as eco-conscious, tech-savvy | Be seen as productive, respectful of boundaries |
| Consumption chain | Easy install, works with HVAC, app setup | Easy WiFi setup, works with Slack/calendar, app onboarding |
| Push | Manual thermostat is wasteful, programmable one is confusing | Constant interruptions, DND doesn't work, WFH chaos |
| Pull | Learns automatically, beautiful design, phone control | Physical signal others can see, auto-detection, focus analytics |
| Anxiety | $249 price, will it work with my system?, privacy concerns | $249 price, will people respect it?, will I actually use it? |
| Habit | "I just adjust it when I'm cold/hot" | "I just put on headphones / close the door" |

---

## 10. Templates for DIANA — Per-Stakeholder Analysis

For each of the 8 BUSY Bar stakeholders, complete ALL sections below:

### Template A: Stakeholder Profile

```
STAKEHOLDER: [Name]
PRIORITY: [P0/P1/P2/P3]
RING REACH: [Which rings they interact with]

CUSTOMER ROLES:
- Job Executor: [Yes/No — are they the primary user?]
- Job Beneficiary: [Yes/No — do they benefit from the job being done?]
- Job Overseer: [Yes/No — are they responsible for results?]
- Purchase Executor: [Yes/No — do they make the buy decision?]
- Purchase Influencer: [Yes/No — do they influence purchase?]
- Lifecycle Support: [Yes/No — do they install/maintain/integrate?]
```

### Template B: Job Anatomy

```
CORE FUNCTIONAL JOB:
"[Verb] + [object] + [contextual clarifier]"

RELATED JOBS (3-5):
1. [...]
2. [...]
3. [...]

EMOTIONAL JOBS (2-3):
1. "Feel [emotion] when [context]"
2. [...]

SOCIAL JOBS (2-3):
1. "Be seen as [quality] by [audience]"
2. [...]

KEY CONSUMPTION CHAIN JOBS (most critical 3-4):
1. [Stage]: [specific job]
2. [...]
```

### Template C: JTBD Statements

```
PRIMARY JTBD STATEMENT:
"When [situation], I want to [motivation], so I can [outcome], without [pain]."

SECONDARY JTBD STATEMENT (if applicable):
"When [situation], I want to [motivation], so I can [outcome], without [pain]."
```

### Template D: 4 Forces of Progress

```
F1 — PUSH (dissatisfaction with current situation):
- [Struggling moment 1]
- [Struggling moment 2]
- [Struggling moment 3]
- Trigger event: [What specific event makes this acute?]

F2 — PULL (attraction to BUSY Bar):
- [Aspiration / attraction 1]
- [Aspiration / attraction 2]
- [Aspiration / attraction 3]
- Key magnet: [Single strongest pull factor]

F3 — ANXIETY (fears about adopting BUSY Bar):
- [Fear / uncertainty 1]
- [Fear / uncertainty 2]
- [Fear / uncertainty 3]
- Biggest blocker: [Single strongest anxiety]

F4 — HABIT (attachment to current behavior):
- [Current solution / workaround 1]
- [Current solution / workaround 2]
- [Comfort factor]
- What they'd "fire": [What current solution would BUSY Bar replace?]

FORCE BALANCE ASSESSMENT:
- Push + Pull strength: [Weak / Moderate / Strong]
- Anxiety + Habit strength: [Weak / Moderate / Strong]
- Net: [Likely to switch / On the fence / Unlikely to switch without intervention]
- Design priority: [Increase push? Increase pull? Reduce anxiety? Break habit?]
```

### Template E: Desired Outcomes (ODI)

```
TOP 5 DESIRED OUTCOMES:
(Format: Direction + measure + object + context)

1. "[Minimize/Increase] the [metric] of [what] when [context]"
   - Importance (est.): [1-10]
   - Current satisfaction: [1-10]
   - Opportunity score: [calculated]

2. [...]
3. [...]
4. [...]
5. [...]

BIGGEST OPPORTUNITY: [Outcome with highest opportunity score]
OVERSERVED AREA: [Outcome that current solutions handle well — potential for simplification]
```

### Template F: Competitive Landscape

```
WHAT THEY CURRENTLY "HIRE" TO GET THE JOB DONE:
1. [Current solution / workaround] — "hired" because [reason]
2. [...]
3. [...]

WHAT THEY WOULD "FIRE" IF THEY "HIRE" BUSY BAR:
1. [Solution they'd stop using] — because BUSY Bar does [what] better
2. [...]

UNEXPECTED COMPETITORS (non-obvious alternatives):
1. [...]
2. [...]
```

---

## 11. Cross-Stakeholder Analysis Prompts

After completing all 8 stakeholders, DIANA should also answer:

1. **Job overlap:** Which stakeholders share the same core functional job? Where do jobs conflict?
2. **Force patterns:** Which forces are strongest across all stakeholders? Is anxiety or habit the bigger universal blocker?
3. **Outcome alignment:** Which desired outcomes appear across multiple stakeholders? These are highest-leverage features.
4. **Outcome conflicts:** Where does satisfying one stakeholder's outcome hurt another's?
5. **Adoption sequence:** Based on force analysis, which stakeholders will adopt first? Which need the most anxiety-reduction?
6. **Ring mapping:** How do JTBD priorities map to BUSY Bar's 4-ring expansion strategy?

---

## 12. Key References

- **Christensen, C.** "Competing Against Luck" (2016) — Original JTBD theory, milkshake example
- **Moesta, B.** "Demand-Side Sales 101" (2020) — 4 Forces of Progress, switch interviews, timeline
- **Ulwick, T.** "JOBS TO BE DONE: Theory to Practice" (2016) — ODI methodology, outcome statements, opportunity scoring
- **Ulwick, T.** "What Customers Want" (2005) — Original ODI framework
- **Kalbach, J.** "The Jobs to Be Done Playbook" (2020) — Practical templates and tools
- **Klement, A.** "When Coffee and Kale Compete" (2018) — Alternative JTBD perspective

---

*This document is a working reference. DIANA should use Templates A-F for each of the 8 stakeholders, then complete the cross-stakeholder analysis in Section 11.*
