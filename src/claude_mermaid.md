# Formal Verification of zkVMs - Diagrams

## 1. zkVM Verification Layers

```mermaid
flowchart TB
    %% ───────────── 1. SEEDED SOURCE ─────────────
    subgraph SeededSource["Seeded compiler source  (hidden bug)"]
        direction TB
        SrcCode["Source code"]
        HiddenBug["Hidden bug"]
    end
    style SeededSource stroke-dasharray: 5 5

    %% ───────────── 2. MALICIOUS COMPILER ────────
    SeededSource --> MalCompiler["Malicious compiler binary"]

    %% ───────────── 3. POISONING A CLEAN COMPILER ─
    MalCompiler -- compiles --> CleanSrc["Clean compiler source"]
    MalCompiler -- injects bug --> CleanSrc
    CleanSrc --> PoisonedCompiler["Poisoned compiler binary"]

    %% ───────────── 4. ANY PROGRAM BUILT AFTERWARDS ─
    PoisonedCompiler -- compiles --> VictimSrc["Any program source"]
    VictimSrc --> VictimBin["Program binary (back-door)"]

```

```mermaid
graph TB
    subgraph "Application Layer"
        A[Programs running on zkVM]
    end
    
    subgraph "zkVM Layer"
        B[zkVM Specification]
        C[Circuit Implementation]
    end
    
    subgraph "Cryptographic Layer"
        D[ZK Construction/Backend]
        E[Constraint System]
    end
    
    subgraph "Compilation Pipeline"
        F[Circuit → Constraints]
        G[Constraints → Prover/Verifier]
    end
    
    A --> B
    B --> C
    C --> E
    E --> D
    C --> F
    F --> G
    
    style A fill:#ff9999
    style B fill:#99ccff
    style C fill:#99ccff
    style D fill:#99ff99
    style E fill:#99ff99
    style F fill:#ffcc99
    style G fill:#ffcc99
```

## 2. Compilation Pipeline (Trust Chain)

```mermaid
graph LR
    A[High-level Program] --> B[Compiler 1]
    B --> C[IR/AST]
    C --> D[Circuit DSL]
    D --> E[Constraint System]
    E --> F[Prover Code]
    E --> G[Verifier Code]
    
    H[Trusted] --> B
    I[Trusted] --> D
    J[Trusted] --> E
    K[Trusted] --> F
    L[Trusted] --> G
    
    style H fill:#ff9999
    style I fill:#ff9999
    style J fill:#ff9999
    style K fill:#ff9999
    style L fill:#ff9999
```

## 3. Extraction vs Equivalence Proof Approaches

```mermaid
graph TB
    subgraph "Standard Approach: Extraction"
        A1[Circuit Implementation] --> A2[Extract to Formal Model]
        A2 --> A3[Prove Properties]
        A4[Reference Spec] --> A5[Prove Equivalence]
        A3 --> A5
    end
    
    subgraph "Certified Compilation Approach"
        B1[Formal Spec] --> B2[Verified Compiler]
        B2 --> B3[Generated Circuit]
        B3 --> B4[Provably Correct]
    end
    
    style A2 fill:#ffcc99
    style A5 fill:#ffcc99
    style B2 fill:#99ff99
    style B4 fill:#99ff99
```

## 4. Von Neumann vs Graph-based Reduction

```mermaid
graph TB
    subgraph "Von Neumann (Current zkVMs)"
        V1[RISC-V ISA]
        V2[Memory Model]
        V3[Sequential Execution]
        V1 --> V2
        V2 --> V3
    end
    
    subgraph "Graph-based Reduction (Ix/Loam)"
        G1[Lambda Calculus]
        G2[Graph Reduction]
        G3[Parallel Evaluation]
        G1 --> G2
        G2 --> G3
    end
    
    V3 --> C[Circuit Compilation]
    G3 --> C
    
    style V1 fill:#ff9999
    style V2 fill:#ff9999
    style V3 fill:#ff9999
    style G1 fill:#99ff99
    style G2 fill:#99ff99
    style G3 fill:#99ff99
```

## 5. Bug Distribution (from RISC0 blog)

```mermaid
pie title Bug Distribution in zkVMs
    "Circuit Layer (70%)" : 70
    "Other Layers (30%)" : 30
```

```mermaid
pie title Circuit Layer Bugs
    "Underconstrained (96%)" : 96
    "Other Circuit Bugs (4%)" : 4
```

## 6. Formal Verification Tool Ecosystem

```mermaid
graph TB
    subgraph "Lean Ecosystem"
        L1[zkLib/ArkLib]
        L2[cLean]
        L3[zkLean]
        L4[ProvenZK]
    end
    
    subgraph "Other Tools"
        O1[ACL2 (Jolt)]
        O2[Coq (FormalLand)]
        O3[Agda (CLAP)]
        O4[Liquid Haskell (Plink)]
    end
    
    subgraph "Circuit Analysis"
        C1[Picus (Underconstrained)]
        C2[Hax (Rust Extraction)]
    end
    
    L1 --> V[Verified Implementation]
    L2 --> V
    L3 --> V
    L4 --> V
    O1 --> V
    O2 --> V
    O3 --> V
    O4 --> V
    C1 --> V
    C2 --> V
    
    style L1 fill:#99ff99
    style L2 fill:#99ff99
    style L3 fill:#99ff99
    style L4 fill:#99ff99
```

## 7. Soundness vs Completeness Bug Detection

```mermaid
graph TB
    A[Run Honest Prover] --> B{Test Passes?}
    B -->|No| C[Completeness Bug Found]
    B -->|Yes| D[Need Dishonest Prover]
    
    D --> E[Create Malicious Witness]
    E --> F{Verifier Accepts?}
    F -->|Yes| G[Soundness Bug Found]
    F -->|No| H[Circuit Correctly Rejects]
    
    style C fill:#ffcc99
    style G fill:#ff9999
    style H fill:#99ff99
```