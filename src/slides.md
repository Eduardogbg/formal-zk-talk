---
    marp: true
    theme: uncover
    _class: invert
---

<!-- # zkVMs formal verification -->
## Cryptography agenda ZuBerlin 2025
### 17th of June (Tuesday)
- `16:20` Talk: Formal Verification. By Eduardo Bonilha `(Main stage)`

---

## this talk
- hosted on [`proofproofpass.it`](https://proofproofpass.it)
- source on [`Eduardogbg/proofproofpass.it`](https://github.com/Eduardogbg/proofproofpass.it)

---

## 1. whoami
- Eduardo, like maths, developer (mention I built a verifier?)
- works at stealth MEV company
    ![width:520px](./images/twitter_bio.png)
---
## 2. why am I doing a talk on this topic?..

---
## 2. why am I doing a talk on this topic?..
<style scope>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.line-1 { animation: fadeIn 0.8s ease-out 0s both; }
.line-2 { animation: fadeIn 0.8s ease-out 3s both; }
.line-3 { animation: fadeIn 0.8s ease-out 4s both; }
.line-4 { animation: fadeIn 0.8s ease-out 5s both; }
.line-5 { animation: fadeIn 0.8s ease-out 8s both; }
</style>
<p class="line-1">
wait this guy doesn't even work on formally verifying zkVMs?
</p>
<p class="line-2">
am I being scammed?
</p>
<p class="line-3">
who let this guy in?
</p>
<p class="line-4">
wait, he's saying exactly what's written on the slide?
</p>
<p class="line-5">
I think I might leave...
</p>
</div>


---
<!-- header: 2. why am I doing a talk on this topic?.. -->
![](./images/i_love_lean.png)

```lean
theorem bell.recurrence (n: ℕ) :
  bell (n + 1) = (Finset.range (n + 1)).sum (fun k => Nat.choose n k * bell k)

def partition.insert_recurrence
  (x: X)
  (x_not_in_S: x ∉ S):
  partition (insert x S) ≃ Σ (s : S.powerset), partition (S \ s)

theorem bell.eq_partition_count:
  ∀ n : ℕ,
  ∀ S : Finset X,
    S.card = n → bell n = partition.count S
```

---

- I genuinely think automated theorem provers/proof assistants are technology as transformative as AI
- because it's the solution to the slop-topia LLMs coding would bring us to
- some people who low-key kinda agree with this
    ![width:240px](./images/hoc_logo.png) ![width:240px](./images/lean_logo.svg)
    ![width:360px](./images/harmonic_logo.svg)

---

1. cryptography needs formal verification, maybe more than anything else
    1. because it's tricky
    2. because it's critical

---

2. programmable cryptography, especially so
    1. it's going to be used by non-formally trained practicioners of cryptography
    2. going to be deployed across a variety of sensitive protocols

---

3. I had this existential fear where it seemed hard to completely trust zkVMs
    1. they all depend on complex compiler pipelines
    2. soundness bugs are catasthropic if unnoticed (and hard to notice)

4. so I was invested in this and wanted to figure this out

---

<!-- header: 3. brief intro to zkVMs -->

## 3. brief intro to zkVMs

---

## 3. brief intro to zkVMs
1. nah you guys got this

---

## 3. brief intro to zkVMs
1. nah you guys got this
2. ok ok, what's important about them for this talk is that:

---

1. they verify _traces of computation_
    - (this sublety is going to be part of an elegant analogy later)
```
trace of a n-step computation
    [
             (state_0, instruction_0),
        ..., (state_i, instruction_i),
        ..., (state_n, it's  o v e r)
    ]
```
2. most of them target RISC-V
3. and thus they model von Neumann architecture machines


---
<!-- header: 4. "brief" intro to formal verification -->

## 4. "brief" intro to formal verification
1. what even is formal verification?
2. formal model -> prove properties

![width:360px](./images/curry_howard_square.jpg) ![width:360px](./images/lambda_cube.png)
_curry-howard babyyy_

---

---

## proof carrying-code (PCC)
```lean
structure Fin (n : Nat) where
  /-- Creates a `Fin n` from `i : Nat` and a proof that `i < n`. -/
  mk ::
  /--
  The number that is strictly less than `n`.

  `Fin.val` is a coercion, so any `Fin n` can be used in a position where a `Nat` is expected.
  -/
  val  : Nat
  /--
  The number `val` is strictly less than the bound `n`.
  -/
  isLt : LT.lt val n

```

---

## proof carrying-code
```lean
@[ext] structure partition (S: Finset X) where
  
  family : Finset (Finset X)
  
  covers: family.biUnion id = S
  
  non_empty: ∀ c ∈ family, c ≠ ∅
  
  disjoint:  ∀ c ∈ family,
             ∀ d ∈ family,
                c ≠ d → Disjoint c d

```

---

<!-- header: 5. what does it actually mean to formally verify a zkVM -->

## 5. what does it actually mean to formally verify a xzkVM
1. soundness & completness
    - equivalence between circuit & reference implementation/spec
2. security proof of the ZK construction (the so called "backend")
3. certified compilation pipeline
    - circuit -> constraints
    - constraints -> prover & verifier
        - (prover can include witness gen)
4. (optional, recommended): a way to also prove properties about the programs running on this VM

---

## 5.3. certified compilation pipeline

- CompCert
![](./images/compcert.png)

- Reflections on Trusting Trust
```
backdoored compiler source -(compiler)-> malicious binary 

safe source -(malicious compiler)-> backdoored compiler

```

---
<!-- _header: "" -->
<!-- _footer: "" -->

<style scoped>
  section {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  p {
    margin: 0;
    padding: 0;
    height: 95%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    flex: 0 0 auto;
  }
</style>

![](./images/zooko_thread2.png)![](./images/zooko_thread1.png)

---

## 5.2. verifying cryptographic constructions
- ssprove: state-separating proofs
- concert: smart contract modelling in rocq
- [squirrel](https://squirrel-prover.github.io/)
- [tamarin](https://tamarin-prover.com)
- [proverif](https://bblanche.gitlabpages.inria.fr/proverif/)

---

<!-- _header: "" -->

![bg](./images/tamarin-attack.png)

---

<!-- _header: "" -->

<style scoped>
  section {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  p {
    margin: 0;
    padding: 0;
    height: 95%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    flex: 0 0 auto;
  }
</style>
![bg](./images/squirrel_1.png) ![bg](./images/squirrel_0.png) 

---

## 5.1. soundness & completness 

---

<style scoped>
    section { margin: 0; padding: 0;}
    img {
        height: 100%;
        width: 100%
    }
</style>

![](./images/risc0/bugs_layers.png)

---
<style scoped>
    section { margin: 0; padding: 0;}
    img {
        height: 100%;
        width: 100%
    }
</style>

![](./images/risc0/bugs_circuits.png)

---
<!-- header: "6. extraction" -->

  _REAL TIME PROVING™, gotta go fast 🔥🔥🔥_
-
🤔🤔🤔 how do we prove properties of code in random ass langs?
　
　
　
　　　　　　　　　　e x t r a c t i o n
-

---

### picus (veridise)
- proves soundness with respect to __determinism__
    - risc0 extracted Keccak circuit and "large parts of our new RISC-V circuit."
    - sp1 extracted addition, boolean ops, binary ops etc
        - they had to translate Plonky3 circuits into LLZK

```lean
def determinism (k: SomeOtherInput):
    ∀a, ∀b,
    circuit(a, k) = true
    → verifier(b, k) = true
    → a = b  
```

---

<style scoped>
    body { height: 100vh }
    section { margin: 0; padding: 0;}
    img {
        height: 100%;
        width: 100%
    }
</style>

![bg](./images/risc0/zirgen_pipeline.png)　
.　　　
　
　
　
　　
　
　　　　　　　(we can safely
　　　　　　　ignore green arrows)

---


.　　　　extract artifact after certain compilation step
　　　　　　　　　　　　　≃
　　　　　　　　　　　s t o n k s
-

(kinda?)

---
<!-- _header: "8. extraction" -->
### worldcoin semaphore merkle tree batcher (reilabs)
- extracted the gnark constraints to lean (proven-ZK)
- proved following properties:
    - hash correctness (against another reference implementation)
    - determinism (UniqueAssignment)
    - merkle tree ops comply to spec

---

wanna see what the extracted code looks like?

---
<!-- header: "" -->
<style scoped>
    body { height: 100vh }
    section { margin: 0; padding: 0;}
    img {
        height: 100%;
        width: 100%
    }
</style>

![](./images/extraction.png)

---
<!-- header: "" -->
<style scoped>
    body { height: 100vh }
    section { margin: 0; padding: 0;}
    img {
        height: 100%;
        width: 100%
    }
</style>

![](./images/extraction2.png)

---
<!-- _header: "8. extraction" -->

### the theorems... are neat though

---

```lean
axiom reducedKeccak640_collision_resistant :
  ∀x y, reducedKeccak640 x = reducedKeccak640 y → x = y

theorem inputHash_deterministic:
    SemaphoreMTB.InsertionMbuCircuit_4_30_4_4_30
        InputHash₁ StartIndex PreRoot PostRoot IdComms MerkleProofs₁
    ∧
    SemaphoreMTB.InsertionMbuCircuit_4_30_4_4_30
        InputHash₂ StartIndex PreRoot PostRoot IdComms MerkleProofs₂
    →
    InputHash₁ = InputHash₂
  := Insertion_InputHash_deterministic

theorem inputHash_deterministic:
    SemaphoreMTB.DeletionMbuCircuit_4_4_30_4_4_30
        InputHash₁ DeletionIndices PreRoot PostRoot IdComms₁ MerkleProofs₁
    ∧
    SemaphoreMTB.DeletionMbuCircuit_4_4_30_4_4_30 InputHash₂
        DeletionIndices PreRoot PostRoot IdComms₂ MerkleProofs₂
    → InputHash₁ = InputHash₂
:= Deletion_InputHash_deterministic
```
---

```lean
def deletionRoundSemantics
    (Index Item : F)
    (Tree : MerkleTree F poseidon₂ D)
    (Proof : Vector F D)
    (k : MerkleTree F poseidon₂ D → Prop): Prop :=
  if Index.val < 2 ^ (D + 1)
    then if h : Index.val < 2 ^ D
      then Tree.itemAtFin ⟨Index.val, h⟩ = Item ∧
           Tree.proofAtFin ⟨Index.val, h⟩ = Proof.reverse ∧
           k (Tree.setAtFin ⟨Index.val, h⟩ 0)
      else k Tree
    else False

theorem deletionRoundCircuit_eq_deletionRoundSemantics
    [Fact (CollisionResistant poseidon₂)]:
        gDeletionRound tree.root index item proof k
        ↔
        deletionRoundSemantics index item tree proof (fun t => k t.root)
```

---

```lean
def insertionRoundSemantics
    (Index Item : F)
    (Tree : MerkleTree F poseidon₂ D)
    (Proof : Vector F D)
    (k : MerkleTree F poseidon₂ D → Prop)
    : Prop
:=
  if h : Index.val < 2 ^ D then
    Tree.itemAtFin ⟨Index.val, h⟩ = 0 ∧
    Tree.proofAtFin ⟨Index.val, h⟩ = Proof.reverse ∧
    k (Tree.setAtFin ⟨Index.val, h⟩ Item)
  else False

theorem insertionRoundCircuit_eq_insertionRoundSemantics
    [Fact (CollisionResistant poseidon₂)]
    {Tree : MerkleTree F poseidon₂ D} :
        gInsertionRound Index Item Tree.root Proof k
        ↔
        insertionRoundSemantics Index Item Tree Proof (fun t => k t.root)
```

---

```lean
/--
Tests the Poseidon implementation automatically derived from the circuit, by
comparing its output on an arbitrary value to a reference value.

The reference value is taken from
<https://extgit.iaik.tugraz.at/krypto/hadeshash/blob/master/code/test_vectors.txt>
-/
theorem poseidon₂_test:
    poseidon₂ vec![1,2] = 0x115cc0f5e7d690413df64c6b9662e9cf2a3617f2743245519e19607a4417189a
  := by native_decide
```

---
<!-- header: "8. extraction" -->

## jolt
- define jolt lookup table semantics
- extract rust circuit (r1cs) into zkLean
- compare that against Sail risc-v model
- acl2

---
<style scoped>
    body { height: 100vh }
    section { margin: 0; padding: 0;}
    img {
        height: 95%;
        width: 95%
    }
</style>
![bg](./images/jolt-sail-lean.png)

"towards a verified jolt zkVM" talk

---

## 9. correct by construction

---
<!-- header: "9. correct by construction" -->

## argument/ix (previous known as lurk)
(remember pcc? now make it zk!)

- implemented lean in lean
- then zk-proved lean (oh yea!)
- could have truly end-to-end certified zkVM
    - contracts could either be in lean
    - or extracted from (e.g.) rust with aenas

---

![bg](./images/ix.jpeg)

---

## argument/ix
- from their readme.md:
> [...] hardware based process isolation costs 25%-33% overhead
[...] because we don't know how to safely run applications in protection ring 0.
[...] zkPCC potentially enables more sophisticated software-based process isolation.

---

## don't forget slides about
- ethproofs
- verified zkEVM
    - 20 mil invested in this
- 

---
