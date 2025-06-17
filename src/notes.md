## certified compilation
- https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf
### compcert
- [https://lean-lang.org/papers/beans_appendix.pdf](https://lean-lang.org/papers/beans_appendix.pdf)
- [https://leanprover-community.github.io/archive/stream/270676-lean4/topic/verified.20compiler.html](https://leanprover-community.github.io/archive/stream/270676-lean4/topic/verified.20compiler.html)
### lean
 >For a proof assistant, there are three main ways to do this: (1) testing, (2) independent reimplementation, and (3) formal verification. Lean has a fairly robust test suite, but testing helps more in the high-frequency low-impact do- main; soundness bugs are rare and generally occur in areas that are insufficiently tested because the developer did not even consider the error condition.

## efforts

### argument
- on RISC-V: https://argument.xyz/blog/riscv-good-bad/
	- cites: [_An empirical study of optimization bugs in GCC and LLVM_ by Zhou et al](https://www.sciencedirect.com/science/article/abs/pii/S0164121220302740)
	- CompCert claims they produce code about 10% slower than GCC's -o1 (make a hot-take about zkVM benchmarks using -o3)
- Ix or Loam?
> "Loam is a reduction machine zkVM, purpose built to provide the smallest instruction set surface for the most performant verifiable virtual machine across a variety of back-ends."
- certified rust through [aenas](https://github.com/AeneasVerif/aeneas)
	- verification toolchain for rust, converts MIR into a lambda calculus (affine most likely)
	- doesn't support full rust (especially not unsafe)
- path to zkEVM:
	- EVMYulLean (executable EVM in Lean)
	- compile Lean kernel

### formal land
- garden
	- [post](https://twitter.com/FormalLand/status/1922219486918119522)
	- [repository](https://github.com/formal-land/garden)
	- grant: [verified zkEVM](https://verified-zkevm.org)
	- coq
- https://github.com/orgs/noir-lang/discussions/8609

### risc-0
- [blog post](https://risczero.com/blog/RISCZero-formally-verified-zkvm)
- eth proofs talk mentions "picus v2 already formally soundness verified wrt determinism"
- working on "full formal verification as well"
- proved keccak circuit is deterministic
- argues 70% of bugs are circuit layer, and 96% of those are underconstrained
> this seems like a relatively natural result — it’s fundamentally easier to test for completeness issues than soundness. To catch a completeness bug, you simply have to run the “honest” prover in a way that appropriately exercises the constraints and witness generation procedure. But to catch a soundness bug, you have to come up with the right dishonest prover to take advantage of the underconstrained part of the circuit.
- shows the compilation pipeline
> These “trusted code assumptions” are currently the weakest link in the proof. However, it should be noted that trusting the correctness of the compiler is a requirement for building on top of any circuit DSL, and trusting the correctness of the formal methods tools is a foundational assumption for any formal methods work.

### sp1
- audits + verification efforts with nethermind + veridise
- https://leanprover.zulipchat.com/#narrow/channel/284757-job-postings/topic/Succinct.20is.20looking.20for.20a.20formal.20verification.20intern/with/504068917

### jolt
- [verifying jolt zkVM lookup semantics](https://eprint.iacr.org/2024/1841)
	- uses [ACL2](https://en.wikipedia.org/wiki/ACL2)
- [towards a verified jolt zkVM - james parker (galois)](https://www.youtube.com/watch?v=O_bT89JK6_c)
	- stage 1 (in progress)
		- define reference risc-v semantics with sail
		- implement [zkLean](https://github.com/GaloisInc/zk-lean/tree/main)
		- tool that extracts jolt's arithmetization from zkLean
	- stage 2
		- verify jolt arithmetization match sail's risc-v semantics
		- integrate these checks into jolt's ci
	- understand zkLean vs cLean
	- mentioned working on lean backend for sail
- zkLean
	- supports r1cs, lookup tables and composition of lookup tables
	- extensible to other constraint systems
	- agnostic to zk backend
		- i want to understand these types of claims more
	- monadic language (builder)
	- final goal is to extract the circuits directly from this dsl
- also mentioned finding an optimization from verification efforts (figure out who else said this)
- ci
	- compliance with sail spec
	- detect when theorems break
- whole flow
	- "extract" jolt's rust code into lean
	- exctract sail's risc-v model into lean
	- prove equivalence
- comparison between zkLean and zkLib
	- zkLean is more of a DSL (frontend), code circuits, arithimetize
	- zkLib is about verifying cryptographic implementations work (backend)
- showed indiference towards different risc-v formalizations, sail is generated and complex, but it's battle-tested
	- need to understand better their discussion on extracting rust code into lean, they mention r1cs asts, but for lookup table they have to emulate first to then get an ast (and after the ast it's just a "pretty printer" which I get)
	- they could have used tools like hax but they figured that for jolt it was already easy enough to just work with the asts, requiring fewer assumptions

### certik
- zkWASM
- blogposts:
	- [blockchains](https://www.certik.com/resources/blog/advanced-formal-verification-of-zero-knowledge-proof-blockchains)
	- [verifying a zk instruction](https://www.certik.com/resources/blog/advanced-formal-verification-of-zkp-verifying-a-zk-instruction)
	- [a tale of two bugs](https://www.certik.com/resources/blog/advanced-formal-verification-of-zkp-a-tale-of-two-zk-bugs)
	- [how zk memory was proven](https://www.certik.com/resources/blog/advanced-formal-verification-of-zkp-how-zk-memory-was-proven)
- coq
- [repository](https://github.com/CertiKProject/zkwasm-fv)
> The aim of the formal verification is to prove that the zkWasm circuits are sound with respect to the Wasm semantics. In other words, if all the circuit constraints are satisfied, each row in the ETable should represent a valid state in the execution of the program. On the other hand, everything except the Halo2 circuits themselves are considered out of scope and we do not prove anything about the algorithms written in Rust. Thus the zkWasm code that creates the tables is not verified (but it is not security-critical), Wasmi and Halo2 is out of scope, and some Rust code to programatically construct constraints is assumed to be correct (see section about allocation below).
- 
> FV circuits + non-FV smart contracts = non-FV ZKP
> non-FV circuits + FV smart contracts = non-FV ZKP
> FV circuits + FV smart contracts = FV ZKP


### reilabs
- job posting
- https://github.com/reilabs/proven-zk dsl for gnark
- https://github.com/Consensys/gnark/issues/836 found vulnerability on Gnark
- https://github.com/reilabs/formal-verification/blob/main/2024/worldcoin-semaphore-mtb.pdf worldcoin formal verification
- https://reilabs.io/blog/zero-knowledge-systems-you-can-trust/#:~:text=Formal%20Verification%20to%20the%20Rescue blogpost
	1. **Extraction:** We integrate with the system where the circuits are defined, and use automated tooling—such as the [Gnark Lean Extractor](https://github.com/reilabs/gnark-lean-extractor?ref=reilabs.io) for Semaphore MTB and its use of Gnark—to turn these circuits into formal definitions. These definitions then exist in [Lean](https://lean-lang.org/about/?ref=reilabs.io), our Theorem Proving environment of choice, which means we’re now ready to reason about them.
	2. **Equivalence:** The extracted representation is not _identical_ to the circuits, as circuit definitions themselves are quite opaque to formal reasoning. Instead, the formal definitions are in an _equivalent_ but not _identical_ [form](https://github.com/reilabs/proven-zk?ref=reilabs.io) to the originals. This means we can actually prove properties about them without resorting to logical gymnastics that might obscure the proving process.
	3. **Invariants:** Once we have ensured the equivalence of these circuit representations, we can use mathematical and logical reasoning on them to construct theorems about what the circuits _should_ do. The aim of this step is to make sure that we have a theorem for each of the required properties for those circuits; this way _our prover will tell us_ if the circuits violate any of them.
	4. **Compositional Reasoning:** We can use our theorems to reason about the correctness of _circuits_ from the correctness of _gates_, but also the correctness of _systems_ from the correctness of the _circuits_ they depend on. We can prove theorems about how these circuits and their verification can change the system state, giving us _far_ more confidence than if we only looked at the individual pieces.?

## ## tools & misc
### picus
- [repository](https://github.com/Veridise/Picus)
- checks if circuits are underconstrained or not
- I think it simply works by figuring out of there's multiple solutions to a certain circuit
### hax talk
##### hax
 - [using hax for correct and secure zero-knowledge implementations](https://www.youtube.com/watch?v=b56AVxQaONI)
 - swiss e-voting regulations require formal verification
 - a subset of safe Rust with translations to proof assistants
 - makes internet standards (e.g. IETF and NIST) machine-readable.
 - executable specification in safe Rust
 - efficient implementation when building on the libcrux library of verified cryptographic primitives
##### ssprove
- a foundational framework for modular cryptographic proofs in Rocq
- ﻿﻿formal way of doing State Separating Proofs (SSP)
- ﻿﻿a language with monadic state and probability
- ﻿﻿a program logic derived from the categorical dijkstra monad framework SIS Prove
- ﻿﻿game hopping style proofs in the computational model
- many useful examples (e.g. the Joy of Crypto)
##### concert
- smart contract certification framework in rocq
- models an abstract account-based blockchain with pure smart contracts
- ﻿﻿verified compilation to a number of targets including wasm
	- check if we could say "certified" instead
##### sigma-protocol
- not actually a tool i'm just going through the hax talk
- for interactive schnorr proofs
##### others
- verification process
	- EasyCrypt: Not foundational
- unmaintained, but part of the inspiration for ssprove
	- certicrypt
	- foundational cryptography framework (fcf)
	- cryptHOL
- symbolic proofs and provers: present in hax
	- ﻿﻿[squirrel](https://squirrel-prover.github.io/)
	- [tamarin](https://tamarin-prover.com)
	- [proverif](https://bblanche.gitlabpages.inria.fr/proverif/)

### plink talk
- [plink: verified generation of constraints for plonk - pablo castellanos (imdea software institute)](https://www.youtube.com/watch?v=WM-wR-H7es8)
- table | name | target    | written in        | verification         | verified with
	-  | leo      | r1cs        | rust                 | compiler + r1cs | acl2
	-  | coda   | r1cs        | ocaml (edsl)  | hl program         | coq
	-  | clap    | plonkish | rust (edsl)      | compiler            | agda
	-  | plink   | plonk      | liquid haskell |  compiler + hl.   | liquid haskell
	- (fuck [[should I use monospace?]])
- liquid haskell
	- refinement type-checker
	- proofs with smt solver
- plink proves semantic preservation between IR and constraint system
## grants, bounties & programs
- [verified zkEVM](https://verified-zkevm.org)

## zooko threads
- https://twitter.com/zooko/status/1914056629789839422
	- quoted https://twitter.com/prestonevans__/status/1914510532628848816
	- https://twitter.com/zooko/status/1914591910066569561
	- ![[Pasted image 20250609203118.png]]
		- ![[Pasted image 20250609203316.png]]


## prompt
```
I have one day to finish the slides for my talk, can you help me process my notes async because I also have to work and I'm low-key kinda fucked?

It's about formal verification in zkVMs

I want you to help me structure my talk, it's supposed to last for about 30 minutes. Things I want to mention:

1. I need to give a brief introduction to zkVMs in a way that highlights the points that are going to be relevant for my talk
    
2. I need a slightly bigger introduction to dependent-types and formal verification in general, curry-howard etc
    
3. The main point of my talk is to help people understand and have intuition about what these formal verification projects verify, what are their assumptions etc. I think people have intuition for this, that they understand these projects have scope, but they don't really understand what they are verifying. We are then going to mention that there's a lot of scope to cover:
    
    1. you need to verify that the circuit corresponds to the zkVM spec (soundness and completeness)
        
    2. you could try to verify the cryptographic constructions themselves, which's more a validation the theory is correct, especially considering with programmable cryptography a lot of projects are composing crypto constructions but not always giving security proofs
        
    3. you could get more existential and wonder about all the implementations of these tools and if they are correct, and eventually wonder about the compilation pipeline too
        
4. I'll first cover more standard approaches for verifying the soundness of circuits, which involve extraction and equivalence proofs etc
    
    1. for that I think the Risc0 blogpost I have here is important
        
    2. the Reilabs report is also interesting (https://github.com/reilabs/formal-verification/blob/main/2024/worldcoin-semaphore-mtb.pdf) and I want to go through it and show in practice/hands-on what they actually had to do to prove properties about the code
        
5. I know way less about the more niche/specific formal verification tools which are not based on depently-typed languages, I mention a few of them on the "hax talk" thing, I wish I could say more about them (e.g. ACL2, squirrel, tamarin)
    
6. then after we go all these more standard down-to-earth approaches, I'll go more existential mode, mentioning certified compilation pipelines, reflections on trusting trust eventually leading to the argument/Ix approach
    
    1. make a point of how many zk libraries in lean we have (zkLib/ArkLib, cLean, zkLean, provenZK etc), and that instead of the mess we saw before of how many tools and models you need to have, that this way it seems more composable
        
    2. tie back to the certik point that you need to verify both the VMs and the apps that are going to run on top of them
        
    3. tie back to the compilation bugs part of Risc0 and reflections on trusting trust, and how this approach has a good shot of making end-to-end certified compilation pipeline for zk, which is more sensitive of this than most other types of applications (due to soundness problems) and also has a more stacked pipeline which makes it harder to verify too
        
    4. go about the arguments on the "zooko/preston evans threads" about ISAs and targets, both the pessimistic and the optimistic (e.g. "I don't think LLVM will stop making bugs [...] we run bitcoin for 15 years without exploitable bugs" but also that due to the nature of ZK circuits that bugs are inherently more exploitable)
        
    5. be overall bullish for graph-based reduction but contingent on benchmarks (though Lurk 0.5 had benchmarks and is spiritually similar to Ix: https://argument.xyz/blog/perf-2024/), tho on ethproofs calls argument mentioned they had optimizations orthogonal to the rest of (the von Neumann architecture) zkVMs
        

This is somewhat of an open-ended task, but if you can help me tie in my talking points really neatly that'd be cool
```
