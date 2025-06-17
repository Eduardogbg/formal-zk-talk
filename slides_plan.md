## don't talk to me: I need to lock the fuck in
### up for joints later tho

1. title
2. introductory slide
	1. who am I
		- Eduardo, like maths, developer (mention I built a verifier?)
		- maybe just print twitter bio
	2. why am I doing a talk on this topic?..
		1. wait this guy doesn't even work on formally verifying zkVMs why is he doing a talk on this, am I being scammed? who let this guy in? wait he's saying exactly what's written on the slide, is this a standup? I might leave...
3. I love Lean tweet
		1. wait for audience to laugh :)
	1. explain briefly that I think formal verification is super dope tech
		1. dependent-types is the highest form of programming (leave the cue for Curry-Howard) (maybe make an RPG joke)
		2. I think it's going to be a dope way to study math, and a good tool for reasoning
			1. talk very briefly about my Bell numbers proof (maybe have some visuals for it so I don't have to spend too much time describing it visually)
		3. It's going to be pivotal once AI commoditizes intellectual labor (maybe mention other companies with this thesis, like Lean FRO, Harmonic, HOC etc...)
4. "ok but now fr"
	1. cryptography needs formal verification, maybe more than anything else
		1. because it's tricky
		2. because it's critical
	2. programmable cryptography, especially so
		1. it's going to be used by non-formally trained practicioners of cryptography
		2. going to be deployed across a variety of critical protocols
	3. I had this existential fear where it seemed very hard to completely trust zkVMs
		1. they all depend on complex compiler pipelines
		2. soundness bugs are catasthropic if unnoticed (and hard to notice) (RISC0 blog) (I need to elaborate this argument some point further down, I can't just state this)
		3. tie-in to the ISA debate, zooko/preston evans threads (? maybe later)
	4. so I was invested in this and wanted to figure it out
5. brief intro to zkVMs
	1. nah you guys got this
	2. no ok but what's important about them for this talk is that:
		1. they verify _traces of computation_
			- (this sublety is going to be part of an elegant analogy later down the line)
		2. most of them target RISC-V
		3. and thus they model von Neumann architecture machines
			- mention the recent result of Jolt achieving similar memory hierarchy performance characteristics as modern CPUs
		4. that's obviously a good shortcut to get zkVMs up to speed with what computers can already do which's obviously great, but you gotta wonder: is that inherently the better approach when it comes to ZK? 
6. "brief" intro to formal verification
	1. what even is formal verification?
		1. ask stuff to the audience, like if they get confused, if they don't understand completely what the assumptions are and what's actually being proven
		2. hope they don't because that's what we are going to talk about here
	2. formal model -> prove properties
		1. of course any model is an abstraction which forgets details, and which details to forget and which behavior to model is going to be the main essence of formal verification efforts, which's going to lead to what are your assumptions and conclusions (I need examples)
		2. that's a bunch of abstract babble though which's why I have these slides with lots of concrete hands on examples of code in production!
7. what does it actually mean to formally verify a zkVM
	1. soundness & completness of the circuit vs a reference implementation of the function
	2. security proof of the ZK construction (the so called "backend")
	3. certified compilation pipeline (circuit -> constraints then from constraints to prover and verifier)
		1. prover can include witness gen
8. what are actual examples in the industry
	1. risc0 slide
	2. sp1 slide
	3. talk about extraction in general
	4. talk about the determinism checker