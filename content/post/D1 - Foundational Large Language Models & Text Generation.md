---
title: D2
date: 2025-02-23
tags:
  - GenAI
  - philosophy
aliases: 
categories:
  - Paradigm-Shift
status:
  - in progress
---

# Contents

## Why language models are important

> [!PDF|yellow] [[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=7&selection=20,15,30,29&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.7]]
> > Although foundational LLMs trained in a variety of tasks on large amounts of data perform very well out of the box and display emergent behaviors (e.g. the ability to perform tasks they have not been directly trained for) they can also be adapted to solve specific tasks where performance out of the box is not at the level desired through a process known as fine-tuning. This requires significantly less data and computational resources than training an LLM from scratch.
> 
> 

**The big question is: how do these large language models work?** 
The next section explores the core building blocks of LLMs, 
+ focusing on transformer architectures and their evolution from the original ‘Attention is all you need’ to the latest models such as Gemini, Google’s most capable LLM. 
+ We also cover training and fine-tuning techniques, as well as methods to improve the speed of response generation. The whitepaper concludes with a few examples of how language models are used in practice.

## Large language models

A language model predicts the probability of a sequence of words.
> [!PDF|yellow] [[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=8&selection=10,49,18,21&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.8]]
> > Commonly, when given a prefix of text, a language model assigns probabilities to subsequent words. For example, given the prefix “The most famous city in the US is…”, a language model might predict high probabilities to the words “New York” and “Los Angeles” and low probabilities to the words “laptop” or “apple”. 
> 

You can create a basic language model by storing an n-gram table,2 while modern language models are often based on neural models, such as **transformers**
Before the invention of transformers, **recurrent neural networks (RNNSs)** were the popular approach for modeling sequences. 
+ In particular, **“long short-term memory” (LSTM)** and **“gated recurrent unit” (GRU)** were common architectures.
+ RNNs process input and output sequences sequentially. They generate a sequence of hidden states based on the previous hidden state and the current input. 
+ The sequential nature of RNNs makes them compute-intensive and hard to parallelize during training
  > [!PDF|yellow] [[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=8&selection=34,0,38,23&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.8]]
> > This area includes language problems such as machine translation, text classification, text summarization, and questionanswering, among others

**Transformers**, on the other hand
+ are a type of neural network that can process sequences of tokens in parallel thanks to the self-attention mechanism
+ This makes them significantly faster to train, and more powerful compared to RNNs for handling longterm dependencies in long sequence tasks
+  However, the cost of self-attention in the original transformers is quadratic in the context length which limits the size of the context, while RNNs have a theoretically infinite context length
  + Transformers have become the most popular approach for sequence modeling and transduction problems in recent years

## Transformer 

> [!PDF|yellow] [[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=9&selection=6,0,10,63&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.9]]
> > The transformer architecture was developed at Google in 2017 for use in a translation model.

It’s a sequence-to-sequence model capable of converting sequences from one domain into sequences in another domain. 
> For example, translating French sentences to English sentences. 

The original transformer architecture consists of two parts: an encoder and a decoder. 
+ *The encoder* converts the input text (e.g., a French sentence) into a representation, which is then passed to the decoder. 
+ *The decoder* uses this representation to generate the output text (e.g., an English translation) autoregressively.

Notably, the size of the output of the transformer encoder is linear in the size of its input. 

<mark class="hltr-green">The transformer consists of multiple layers. A layer in a neural network comprises a set of parameters that perform a specific transformation on the data. </mark>
![[Files/clipboard/Barektain et al_Foundational Large Language Models & Text Generation 1.webp]]

[[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=10&rect=50,145,543,675|Barektain et al_Foundational Large Language Models & Text Generation, p.10]]  

### Input preparation and embedding 

To prepare language inputs for transformers, we convert an input sequence into tokens and then into input embeddings.
At a high level, an input embedding is a high-dimensional vector that represents the meaning of each token in the sentence.
This embedding is then fed into the transformer for processing. Generating an input embedding involves the following steps:
![[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=11&rect=56,254,550,444&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.11]]
### Multi-head attention 

After converting input tokens into embedding vectors, you feed these embeddings into the multi-head attention module (see Figure 1). 
**Self-attention** is a crucial mechanism in transformers; it enables them to focus on specific parts of the input sequence relevant to the task at hand and to capture long-range dependencies within sequences more effectively than traditional RNNs
> “The tiger jumped out of a tree to get a drink because it was thirsty.”

**Self-attention** helps to determine relationships between different words and phrases in sentences. For example, in this sentence, “the tiger” and “it” are the same object, so we would expect these two words to be strongly connected. Self-attention achieves this through the following steps:

1. *Creating queries, keys, and values*: Each input embedding is multiplied by three learned weight matrices (Wq, Wk, Wv) to generate query (Q), key (K), and value (V) vectors. These are like specialized representations of each word. 
   • Query: The query vector helps the model ask, “Which other words in the sequence are relevant to me?” 
   • Key: The key vector is like a label that helps the model identify how a word <mark class="hltr-red">might be relevant</mark> to other words in the sequence. 
   • Value: The value vector holds the actual word content information. 
2.  *Calculating scores*: Scores are calculated to determine <mark class="hltr-red">how much each word should ‘attend’</mark> to other words. This is done by taking the dot product of the query vector of one word with the key vectors of all the words in the sequence. 
3.  *Normalization*: The scores are divided by the square root of the key vector dimension (dk) for stability, then passed through a softmax function to obtain attention weights. These weights indicate <mark class="hltr-red">how strongly each word is connected</mark> to the others. 
4. *Weighted values*: Each value vector is multiplied by its corresponding attention weight. The results are summed up, producing a context-aware representation for each word.

![[Files/clipboard/Barektain et al_Foundational Large Language Models & Text Generation.webp]]

[[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=13&rect=47,108,561,561|Barektain et al_Foundational Large Language Models & Text Generation, p.13]]


In practice, these computations are performed at the same time, by stacking the query, key and value vectors for all the tokens into Q, K and V matrices and multiplying them together as shown in Figure 3

![[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=14&rect=48,405,575,603&color=yellow|Barektain et al_Foundational Large Language Models & Text Generation, p.14]]
### Multi-head attention: power in diversity
+ Multi-head attention employs multiple sets of Q, K, V weight matrices. 
+ These run in parallel, each ‘head’ potentially focusing on different aspects of the input relationships. 
+ The outputs from each head are concatenated and linearly transformed, giving the model a richer representation of the input sequence.
   
 > [!note]+ The use of multi-head attention improves the model’s ability to handle complex language patterns and long-range dependencies. The mechanism enables the transformer to consider multiple interpretations and representations of the input, which enhances its performance on these tasks.

### Layer normalization and residual connections

Each layer in a transformer, consisting of a multi-head attention module and *a feed-forward layer, employs layer normalization and residual connections*. This corresponds to the Add and Norm layer in [[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=10&rect=50,145,543,675|Fig1]]   
+ where ‘Add’ corresponds to the residual connection 
  >Residual connections propagate the inputs to the output of one or more layers. This has the effect of making the optimization procedure easier to learn and also helps deal with vanishing and exploding gradients.
+ and ‘Norm’ corresponds to layer normalization.
  >Layer normalization computes the *mean*( average value) and *variance*( how much the activations deviate from the mean) of the activations to normalize the activations in a given layer. This is typically performed to reduce covariate shift as well as improve gradient flow to yield faster convergence during training as well as improved overall performance.

### Feedforward layer
[[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=15&selection=38,0,56,19|p.15]]
- **Output of multi-head attention** and **'Add and Norm'** is passed to the feedforward layer.
- **Feedforward layer** applies a **position-wise transformation** for each sequence position, adding **non-linearity** and **complexity**.
- Structure: Two **linear transformations** with a **non-linear activation** (e.g., ReLU, GELU) in between. Enhances **representational power** of the model.
- Processed data undergoes another **'Add and Norm'**, ensuring **stability** and **effectiveness** in deep transformer models.

### Encoder and decoder 
[[Barektain et al_Foundational Large Language Models & Text Generation.pdf#page=16|p.16]]
1. The original transformer architecture relies on a combination of encoder and decoder modules. 
Each encoder and decoder consists of a series of layers, with each layer comprising key components:
   - Multi-head self-attention  
   - Position-wise feedforward network  
   - Normalization layers  
   - Residual connections  

2. **Encoder Functionality**:  
   - Processes input sequence into a continuous representation that holds **contextual representations** for each token.  
   - Workflow:  
     - Normalize, tokenize, and convert input to embeddings.  
     - Add **positional encodings** to retain sequence order.  
     - Use **self-attention** for tokens to dynamically attend to one another, capturing **contextual relationships**.  
   - Output: Embedding vectors \( Z \) for the sequence.

3. **Decoder Functionality**:  
   - Generates the output sequence based on \( Z \).  
   - Workflow:  
     - Begins with a **start-of-sequence token**.  
     - **Masked self-attention**: Ensures tokens attend only to earlier positions (preserves **auto-regressive property**).  
     - **Encoder-decoder cross-attention**: Focuses on relevant parts of \( Z \).  
     - Stops at an **end-of-sequence token**.  

#### **Decoder-Only Transformer (Used in LLMs)**:
- **Simplified Design**: Eliminates encoder-decoder separation. Fcusing instead on directly generating the output sequence from the input.
- Workflow:  
  - Input undergoes a similar process of **embedding and positional encoding**.  
  - Decoder uses **masked self-attention** to generate predictions for each subsequent token based on the previously generated tokens
- **Advantage**: Streamlined for tasks where encoding and decoding can merge effectively.
  

### Training Transformers

 **Key Differences Between Training and Inference**:
- **Training**: Adjusts model parameters using **loss functions** and **backpropagation**.  
- **Inference**: Uses fixed parameters to generate outputs without updating weights.

---

#### Data preparation
**Steps in Training Transformers**:
1. **Data Preparation**:
   - **Clean the Data**: Apply **filtering**, **deduplication**, and **normalization**.  
   - **Tokenization**: Convert text into tokens using methods like **Byte-Pair Encoding** or **Unigram tokenization**, creating a vocabulary for the model.  
   - **Data Splitting**: Divide into training and test datasets for model development and evaluation.

2. **Training Process**:
   - Sample batches of **input sequences** and their **corresponding targets**.  
   - **Input sequences** are fed into the transformer, generating predicted outputs.  
   - Compare predictions with targets using a **loss function** (e.g., **cross-entropy loss**) to compute gradients.  
   - Use an **optimizer** (e.g., Adam) to update parameters based on gradients.  
   - Repeat until the model reaches desired performance or processes a specific number of tokens.

---

#### **Training Tasks by Model Type**:

1. **Decoder-Only Models** (e.g., GPT):  
   - Task: **Language modeling**  
   - Target: Shifted version of the input sequence (e.g., "The cat sat on" → predict "the").  

2. **Encoder-Only Models** (e.g., BERT):  
   - Task: **Masked language modeling (MLM)**  
   - Example: "The [MASK] sat on the mat" → predict "cat".  

3. **Encoder-Decoder Models** (e.g., Original Transformer):  
   - Task: **Sequence-to-sequence tasks** (e.g., translation, summarization, question-answering).  
   - Example: Translate "Le chat est assis sur le tapis" → "The cat sat on the mat".  

---

#### **Additional Training Considerations**:

- **Context Length**:  
   - Refers to how many previous tokens the model uses to predict the next one.  
   - **Trade-offs**:  
     - Longer contexts improve model understanding of complex dependencies.  
     - Increased computation and memory costs.  
   - Must balance context length with task complexity and resource limits.