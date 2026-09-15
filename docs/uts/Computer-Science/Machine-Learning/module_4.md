---
id: module-4-hypothesis-design-and-unsupervised-models
description: Hypothesis-space design through global and local basis functions, kernels, representation learning, and probabilistic generative models.
title: Module 4 - Hypothesis Design and Unsupervised Models
sidebar_position: 5
---

# Module 4 - Summary

# 1. Why Design a Hypothesis Space?

## 1.1 Main question and purpose

<details>
<summary>Purpose of this module</summary>

Module 3 showed how to score predictions and estimate risk. Module 4 asks which functions a learner should be allowed to search. It builds hypothesis families from simple basis functions, compares global and local designs, and then extends the same design ideas to learning structure from data without externally assigned labels.

</details>

## 1.2 Restriction makes learning possible

A hypothesis space $\mathcal H$ is the family of candidate functions from which a learning algorithm selects:

$$
\hat h\in\operatorname*{arg\,min}_{h\in\mathcal H}
E_{\mathrm{in}}[h;D].
$$

Allowing **every** function $\mathcal X\to\mathcal Y$ creates too much freedom. A model could set the desired value at each training input and behave randomly everywhere else. The Iris illustration uses exactly this idea: two feature coordinates and two classes are enough to show a prediction field that fits the marked observations yet assigns irregular probabilities nearby. Training fit alone does not make the candidate useful.

A restricted family encodes an **inductive bias**: nearby points might have similar outputs, a boundary might be smooth, or a pattern might be built by composing a small number of simpler patterns. Restriction reduces the search burden and makes generalization from a finite sample plausible.

## 1.3 Three design requirements

| Requirement | Question | Failure at one extreme |
| --- | --- | --- |
| **Expressivity** | Can some member of $\mathcal H$ approximate the relevant input-output relationship? | A family of only straight boundaries cannot solve XOR in its original coordinates. |
| **Generalization** | Can finite observations identify a candidate that works on new inputs? | An unconstrained function family can memorize the sample. |
| **Learnability / tractability** | Can an algorithm represent and find a good member within available time and memory? | A rich objective can be non-convex, costly, or hard to search. |

These requirements can pull in different directions. Enlarging $\mathcal H$ may lower the best possible population risk, but it can also make sample selection and optimization harder.

The quantity $\inf_{h\in\mathcal H}E_{\mathrm{out}}[h]$ is the **best population risk available within the family**. An approximation *excess* error needs a reference, such as the Bayes-optimal risk:

$$
\varepsilon_{\mathrm{approx}}(\mathcal H)
=
\inf_{h\in\mathcal H}E_{\mathrm{out}}[h]
-
\inf_{g\text{ measurable}}E_{\mathrm{out}}[g].
$$

If the target is noisy, the optimal reference risk need not be zero. Variation across possible training datasets describes how sensitive a learning procedure is to its sample; that is distinct from the family’s best attainable risk. The expected squared difference between a selected model’s risk and the family optimum is **expected squared excess risk**, rather than the standard statistical variance of a predictor.

## 1.4 The linear perceptron as a baseline

For input $x\in\mathbb R^d$, a linear unit computes

$$
h_{w,b}(x)=\phi(w^\top x+b).
$$

The weights and bias define the family; the activation $\phi$ converts the score into an output. Thresholding a monotone activation gives a hyperplane decision boundary. This works when classes are approximately linearly separable but cannot represent the XOR pattern without extra features or layers.

Linear models with appropriate convex losses can be efficient to optimize. Their limited shape can also reduce overfitting relative to a much more flexible family, although few parameters alone do **not** guarantee generalization when data are scarce, noisy, or shifted.

Historically, the XOR limitation of single-layer perceptrons motivated interest in richer architectures. Later neural-network results, including universal approximation results under suitable assumptions, showed that nonlinear networks can express much broader classes of functions. Expressivity alone still does not settle learnability or generalization.

---

# 2. Functions Built From Basis Functions

## 2.1 Finite numbers can define a function on a continuous space

Partition a domain $\mathcal X$ into $M$ disjoint cells $U_1,\ldots,U_M$. Assign one number $a_i$ to each cell:

$$
f(x)=\sum_{i=1}^{M}a_i\,\mathbf1_{U_i}(x).
$$

The indicator $\mathbf1_{U_i}(x)$ is 1 inside cell $U_i$ and 0 elsewhere. This is a piecewise-constant function on a continuous space specified by only $M$ coefficients. A Voronoi partition makes each cell the set of points closest to one center.

Finer cells allow more detailed patterns, but also create more degrees of freedom and can reproduce arbitrary noise. Two inputs in the same cell must receive the same value under this family. The **basis functions**, not merely the coefficients, decide what variation is possible.

## 2.2 Basis, span, and hypothesis family

A general finite basis construction has the form

$$
h_a(x)=\sum_{j=1}^{M}a_j\psi_j(x).
$$

The $\psi_j$ are the building blocks; the $a_j$ are learned coefficients. Their span is the family of all such linear combinations. For a true algebraic basis, the functions are linearly independent as well as spanning the intended space. In machine-learning discussions, “basis functions” is sometimes used more loosely for a useful feature collection that may be redundant.

| Design | Support of each $\psi_j$ | Typical effect | Examples |
| --- | --- | --- | --- |
| **Local** | Nonzero mainly in one region | Nearby or partition-based behavior; fine detail where bases are placed | Cell indicators, tree leaves, radial bumps |
| **Global** | Acts across most of the domain | Broad, rigid modes of variation | Coordinates, polynomials, Fourier harmonics, neural hidden units |

Local bases divide the space or spread influence around anchors. Global bases capture patterns through their functional shape. Both restrict an otherwise unlimited family of functions.

## 2.3 Constructing the data space

Real objects or events must be encoded before a numerical model processes them. If $\omega$ denotes a real-world instance, measurements are functions $X_j(\omega)$ and the representation is

$$
\omega\longmapsto x(\omega)
=(X_1(\omega),\ldots,X_d(\omega))\in\mathbb R^d.
$$

For a patient, coordinates may include age and blood pressure. Measurement choices change the geometry of the data: which examples look close, which directions matter, and which relationships a simple model can express. Once numerical inputs exist, coordinate functions $\psi_j(x)=x_j$ themselves form a natural global feature collection; the constant function 1 supplies the bias term.

Representation design can continue **during** modeling. New derived coordinates can change a non-linear problem in the original space into a linear one in a transformed space.

---

# 3. Global Bases: Features, Neural Networks, and Boosting

## 3.1 Coordinates and the geometric limit of one linear unit

The score of a linear unit is

$$
s(x)=b+\sum_{j=1}^{d}w_jx_j.
$$

Its constant-score sets are hyperplanes. A monotone scalar activation such as a threshold, sigmoid, or $\tanh$ changes score values but does not curve that unit’s decision boundary. In two dimensions, the resulting field can be pictured as a rotated and shifted color gradient.

The XOR labeling requires two separated positive regions, so one straight line in the original two coordinates cannot separate it.

## 3.2 Extend the feature map

Let $\Phi(x)=(\psi_1(x),\ldots,\psi_M(x))$ contain engineered features. A linear model in feature space is

$$
h(x)=\phi\!\left(w^\top\Phi(x)+b\right).
$$

Its boundary can be curved when viewed back in the original input space. For example, points inside a circle of radius $r$ satisfy

$$
x_1^2+x_2^2<r^2.
$$

Add the feature $\psi(x)=x_1^2+x_2^2$. A linear threshold on $\psi(x)-r^2$ now separates interior and exterior points. For XOR on binary inputs, an interaction feature such as $x_1x_2$ can similarly change separability.

Polynomial bases and Fourier harmonics are classical examples of global feature collections. Taylor-like polynomial expansions approximate sufficiently smooth local behavior; Fourier expansions describe periodic structure with sines and cosines. In a hand-designed feature family, the shapes are fixed first and learning adjusts their coefficients. Designing the right features becomes harder as the raw input grows.

## 3.3 Neural networks learn the basis shapes

A hidden unit defines a feature whose parameters are learned:

$$
g_j(x)=\phi(w_j^\top x+b_j),
\qquad
f(x)=\sum_{j=1}^{M}v_jg_j(x).
$$

Each individual $g_j$ may have a straight threshold boundary, but a weighted combination of several nonlinear units can produce a curved final boundary. Stacking layers recursively builds features out of features. This lets the architecture learn transformations instead of requiring every basis shape to be fixed by hand.

A nonlinear activation is essential to this construction: if every layer uses the identity map, their composition collapses to one affine map. Depth can represent some compositional patterns more efficiently than a very wide shallow network, but that advantage depends on the function class and architecture. Wider or deeper networks also increase optimization and generalization considerations.

## 3.4 Gradient boosting builds an additive family

Boosting also combines basis-like learners:

$$
F_M(x)=\sum_{m=1}^{M}\alpha_mh_m(x).
$$

A weak learner may be a decision stump that tests one coordinate against one threshold. Boosting adds learners sequentially to reduce the remaining objective or residual. The number of rounds and early stopping control the resulting family’s size. Neural networks usually adjust their interacting hidden-unit parameters jointly; boosting commonly fits a new learner in response to the current ensemble while earlier learners stay fixed.

---

# 4. Local Bases: Neighbours and Kernels

## 4.1 Put local anchors where data occur

Randomly located Voronoi centers create cells without regard to observed inputs. If centers are training points, the partition adapts to the sample: cells are typically smaller where observations are dense and larger where they are sparse.

The simplest resulting predictor is **1-nearest neighbour**. For a query $x$, find the closest training input $x_i$ and use its label. Its cell indicator is a hard local basis. This makes the output depend on data geometry, but it changes abruptly at cell boundaries and provides no graded influence.

## 4.2 Smooth similarity with a kernel

A kernel $k(x,x')$ evaluates a relationship between two inputs. For a valid positive-semidefinite kernel, it is symmetric and every finite Gram matrix $K_{ij}=k(x_i,x_j)$ is positive semidefinite:

$$
k(x,x')=k(x',x),
\qquad
\sum_{i,j}c_ic_jk(x_i,x_j)\ge0
$$

for all finite input sets and real coefficients $c_i$. This condition supports an inner-product feature representation. **Positive semidefinite does not mean every kernel value is positive or that the kernel is a normalized probability weight.**

The Gaussian radial basis function (RBF) kernel is

$$
k_{\mathrm{RBF}}(x,x')
=\exp\!\left(-\frac{\|x-x'\|^2}{2\sigma^2}\right).
$$

It equals 1 at identical inputs and decays with Euclidean distance. Small $\sigma$ gives narrow, highly local bumps; large $\sigma$ produces broad, overlapping influence. A smooth kernel model anchored at $N$ training inputs can be written as

$$
h(x)=\sum_{i=1}^{N}\alpha_i k(x_i,x).
$$

The coefficients are generally learned, often with regularization. Simply setting $\alpha_i=y_i$ is an illustration, not the usual fitted estimator.

A normalized similarity-weighted predictor is a separate construction:

$$
\hat y(x)
=\frac{\sum_i y_i k(x_i,x)}
{\sum_i k(x_i,x)}.
$$

This needs a nonnegative kernel and a nonzero denominator. Kernel ridge regression, support vector machines, and Gaussian-process regression use kernels differently; their predictions should not all be reduced to this normalized average.

## 4.3 Different kernels encode different assumptions

| Kernel | Formula | Main interpretation |
| --- | --- | --- |
| Linear | $k(x,x')=x^\top x'$ | Ordinary linear feature geometry |
| Polynomial | $k(x,x')=(x^\top x'+c)^p$ | Interactions and polynomial features without explicit expansion |
| Gaussian RBF | $\exp(-\|x-x'\|^2/(2\sigma^2))$ | Smooth distance-based influence |

For polynomial kernels, parameter choices must yield a valid positive-semidefinite kernel. Kernels need not all be spatially local: the linear and polynomial kernels are global feature constructions. “Kernel methods as local bases” is clearest for distance-decaying kernels such as RBF.

Kernel methods avoid an explicit partition and can adapt basis locations to training data. Their number of data anchors can also grow with $N$, increasing memory and computation. The meaning of distance depends strongly on the representation chosen in Section 2.

## 4.4 RKHS and the representer theorem

A positive-semidefinite kernel defines a reproducing-kernel Hilbert space (RKHS) with a feature map $\Phi(x)=k(x,\cdot)$ and inner product

$$
\langle\Phi(x),\Phi(x')\rangle_{\mathcal H_k}=k(x,x').
$$

The **reproducing property** is

$$
f(x)=\langle f,k(x,\cdot)\rangle_{\mathcal H_k}.
$$

The representer theorem says that for a broad class of regularized empirical-risk problems, a minimizer can be expressed in the span of the training-point kernel functions:

$$
f^*(x)=\sum_{i=1}^{N}\alpha_i k(x_i,x).
$$

This explains why optimization in a possibly infinite-dimensional feature space can reduce to $N$ coefficients. The regularizer and assumptions matter; the theorem is not a statement that every conceivable kernel objective has this form.

Cauchy and Poisson integral formulas are historical analogies for reconstructing unknown values from known boundary information through a weighting function. Their “kernels” and machine-learning positive-semidefinite kernels have related weighting intuition, but they are not automatically the same mathematical object.

## 4.5 Neural networks and kernels meet in limiting regimes

At random initialization, appropriately scaled neural networks can converge in distribution to a **Gaussian process** as hidden width tends to infinity. Its covariance kernel depends on architecture, activation, and initialization. A GP is a distribution over functions specified by a mean function and covariance kernel.

For sufficiently wide networks trained in a regime where the feature kernel changes little, the **neural tangent kernel** (NTK) can approximate gradient-descent dynamics. These are limiting or approximate results, not a claim that every finite trained network is just fixed-kernel regression.

An RKHS and a GP may be associated with the same kernel, but typical GP sample paths do not generally lie in that RKHS. The kernel defines covariance for the GP and a function-space norm for the RKHS; those roles are related but distinct.

---

# 5. Why Learn From Data Without Assigned Labels?

## 5.1 The input/output split is a modeling choice

Supervised learning specifies a target $y$ and learns $h:x\mapsto y$. The same image can support different tasks: predict a missing half, infer one channel from others, or model all pixels together. The variables themselves do not arrive with one permanent input/output partition.

One unsupervised goal is therefore to describe the joint structure of observable variables, or the distribution $p(x)$, so that different later tasks can use it. Another is to learn a useful **similarity geometry or representation** from unlabeled inputs instead of fixing a kernel by hand.

Unsupervised and self-supervised learning use data-derived objectives rather than externally assigned target labels. This does not mean they have no training signal: reconstruction, masking, and next-token prediction create one from the observations themselves.

## 5.2 Data can shape the representation

A finite-width neural network changes its internal features while training. An effective similarity

$$
k_\theta(x,x')
=\langle\Phi_\theta(x),\Phi_\theta(x')\rangle
$$

can therefore change with the parameters $\theta$. With supervised labels, the representation may organize examples in ways useful for prediction. With an unlabeled objective, it may organize examples by reconstructive or predictive structure. The learned geometry is task-dependent; unlabeled training does not automatically discover the only “true” notion of similarity.

---

# 6. PCA and Autoencoders

## 6.1 PCA: a data-derived global linear basis

For data vector $X\in\mathbb R^d$ with mean $\mu$, the covariance matrix is

$$
\Sigma
=\mathbb E[(X-\mu)(X-\mu)^\top].
$$

It is symmetric and positive semidefinite, so it has orthonormal eigenvectors $u_1,\ldots,u_d$ with nonnegative eigenvalues $\lambda_1\ge\cdots\ge\lambda_d$. The variance along $u_k$ is $\lambda_k$. The top-$K$ directions define principal components:

$$
a_k=u_k^\top(x-\mu),
\qquad
\hat x_K=\mu+\sum_{k=1}^{K}a_ku_k.
$$

The coefficients $a_k$ compress a $d$-dimensional input to $K$ numbers. PCA minimizes average squared linear-reconstruction error among $K$-dimensional subspaces. This works when most variation lies near a low-dimensional **linear** subspace; low-variance information can still matter for a downstream task.

The image example treats each pixel as a coordinate, displays principal directions as images, and reconstructs faces by adding components. It illustrates how a small set of learned global modes can capture visible structure. The precise number of components needed depends on the dataset.

## 6.2 Autoencoders: nonlinear reconstruction

An autoencoder uses an encoder and decoder:

$$
z=f_{\mathrm{enc}}(x),
\qquad
\hat x=f_{\mathrm{dec}}(z),
\qquad
L_{\mathrm{rec}}
=\frac1N\sum_{i=1}^{N}
\|x_i-f_{\mathrm{dec}}(f_{\mathrm{enc}}(x_i))\|^2.
$$

A lower-dimensional latent code can model a curved data manifold more flexibly than PCA’s linear subspace. The reconstruction target is derived from the input itself, so externally assigned labels are not required.

A bottleneck discourages the trivial identity map, but **a low latent dimension alone does not guarantee useful or non-memorizing features**. Architecture, regularization, data, and the chosen reconstruction objective all affect what the representation retains. Pixel-wise reconstruction may preserve visual detail that is irrelevant to a downstream semantic task or miss details that matter there.

## 6.3 Images: convolution and spatial priors

A convolutional autoencoder uses local receptive fields and shared filters. These encode spatial locality and translation equivariance, fitting images better than a fully connected design with no built-in spatial relation. An encoder can downsample into a compact representation; a decoder upsamples to reconstruct.

A U-Net-style architecture adds skip connections from encoder to decoder stages. They help recover spatial detail lost through the bottleneck and are useful in segmentation and image reconstruction. Yet those bypass paths can also weaken the pressure to store all detail in the deepest latent code; their role depends on the task.

## 6.4 Language: attention, masking, and next-token prediction

Transformers build context-sensitive token representations with self-attention:

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{softmax}\!\left(
\frac{QK^\top}{\sqrt{d_k}}
\right)V.
$$

Each row of the attention matrix weights other positions for one query token. This is a **data-adaptive pairwise weighting mechanism**, analogous to a similarity operation, but ordinary attention weights are generally asymmetric and row-normalized; they need not form a positive-semidefinite kernel.

A masked language model hides some tokens and predicts them from the visible context. Its bottleneck is **missing information**, rather than necessarily a smaller numerical latent dimension. The text example shows several attention heads learning different patterns while reconstructing masked words.

Autoregressive models instead predict each next token from earlier tokens:

$$
p(x_{1:T})=\prod_{t=1}^{T}p(x_t\mid x_{<t}).
$$

They also obtain supervision from the data itself, but they are not classical encoder–decoder autoencoders: there need be no explicit compressed latent code or reconstruction decoder. Both approaches can learn representations without human-supplied labels.

---

# 7. Probabilistic Generative Models

## 7.1 Two capabilities: evaluation and sampling

A probabilistic data model describes a distribution $p(x)$. Two important questions are:

1. **Evaluation:** Can it compute or estimate the density or mass $p(x)$ for an observation?
2. **Sampling:** Can it generate a new $x$ according to the model?

A formula that contains an intractable integral does not by itself provide a practical evaluation procedure. Different generative families emphasize different capabilities: flows can support tractable likelihood and sampling; GANs produce samples but do not supply ordinary point likelihoods; score-based methods generally use iterative sampling and indirect likelihood machinery.

A continuous density is not literally the probability of an exact point; probabilities are assigned to regions, and density values depend on coordinates and units. A high model density also does not automatically mean an observation is valid for every downstream purpose.

Models of $p(x)$ can support generation, data augmentation, representation learning, and compression. If logarithms use base 2, ideal code length relates to $-\log_2p(x)$ bits. A joint generative classifier can model $p(x,y)=p(x\mid y)p(y)$ and use Bayes’ rule:

$$
p(y\mid x)=\frac{p(x\mid y)p(y)}{p(x)}.
$$

## 7.2 Latent-variable construction

A latent-variable model introduces an unobserved code $Z$:

$$
Z\sim p(z),
\qquad
X\mid Z=z\sim p_\theta(x\mid z).
$$

The joint and observable marginal are

$$
p_\theta(x,z)=p_\theta(x\mid z)p(z),
\qquad
p_\theta(x)=\int p_\theta(x\mid z)p(z)\,dz.
$$

A typical construction uses a simple prior, an expressive decoder map $f_\theta(z)$, and an observation-noise model around that map. The latent dimension and noise assumptions restrict the explanations the model may learn. The latent code can describe shared structure, while the noise accounts for residual variation.

Sampling is straightforward **once the model is learned**: draw $z\sim p(z)$, then $x\sim p_\theta(x\mid z)$. In contrast, likelihood evaluation may require a difficult marginal integral. Maximizing observed-data log-likelihood involves

$$
\sum_{i=1}^{N}\log p_\theta(x_i)
=
\sum_{i=1}^{N}
\log\int p_\theta(x_i\mid z)p(z)\,dz.
$$

The logarithm does not eliminate the integral.

## 7.3 Inference does not automatically solve likelihood evaluation

Bayes’ rule gives the identity

$$
p_\theta(x)
=
\frac{p_\theta(x\mid z)p(z)}
{p_\theta(z\mid x)}
$$

where the posterior density in the denominator is defined and nonzero. This identity is exact, but it is **not a computational shortcut if $p_\theta(z\mid x)$ is itself unknown**. A posterior sample alone does not reveal its density or accurately evaluate the marginal integral. Practical approaches may use variational inference, Monte Carlo methods, importance sampling, or model structures with closed-form marginals. Each has approximation or cost limits.

This matters for separating two jobs: **inference** estimates latent explanations for observed $x$, while **learning and likelihood evaluation** compare a candidate distribution with observations. These jobs are linked, but solving one approximately does not make the other free.

## 7.4 Classical baselines

**Naive Bayes** assumes observed features are conditionally independent given a class:

$$
p(x\mid y)=\prod_{j=1}^{d}p(x_j\mid y).
$$

This makes classification computations simple. It can work well even when the assumption is imperfect, but it cannot directly model correlations among features within one class.

**Probabilistic PCA (PPCA)** gives PCA a generative interpretation:

$$
z\sim\mathcal N(0,I_K),
\qquad
x\mid z\sim\mathcal N(Wz+\mu,\sigma^2I_d).
$$

Here $W\in\mathbb R^{d\times K}$. Marginalizing $z$ yields a Gaussian with covariance $WW^\top+\sigma^2I_d$, so likelihood and sampling are tractable. Its latent-to-data map is linear. Replacing that map with a nonlinear decoder increases expressivity but generally loses the closed-form marginal; this motivates variational autoencoders and related approximate-inference methods.

---

# 8. How the Model Families Relate

## 8.1 One recurring design question

Across the module, the central question is how to allocate a limited number of effective degrees of freedom across a large input or data space.

| Family | What is designed or learned? | Main restriction |
| --- | --- | --- |
| Linear model | Coefficients on raw coordinates | Flat boundaries in original features |
| Engineered global features | Fixed feature shapes, fitted coefficients | Only chosen feature interactions |
| Neural network | Feature shapes and combinations learned jointly | Architecture and optimization bias |
| Boosted ensemble | Weak learners added sequentially | Learner class and number of rounds |
| Nearest neighbour | Local centers at observations | Similarity depends on distance and sample coverage |
| Kernel model | Similarity function and fitted anchor coefficients | Kernel geometry, regularization, data-anchor cost |
| PCA | Top linear directions of data variation | Linear low-dimensional subspace |
| Autoencoder | Encoder, latent code, decoder | Reconstruction objective and architecture |
| Latent generative model | Prior, decoder, observation noise | Assumed latent explanation and inference method |

Supervised families focus on an input-to-target function. Unsupervised and self-supervised families describe or compress the data distribution, create data-derived prediction tasks, or learn representations useful for later tasks.

## 8.2 Key conclusions

- Restricting $\mathcal H$ makes finite-data learning meaningful; perfect training fit can still be empty evidence of population performance.
- The basis or feature map determines which patterns the coefficients can express.
- A single activated linear unit keeps a flat threshold boundary; nonlinear **compositions** or transformed features can curve it.
- Data-anchored local functions provide a different way to generalize: propagate observations through a chosen notion of similarity.
- Kernels connect finite data-anchored models with feature-space methods, but kernel functions vary and are not necessarily local or normalized.
- Unlabeled objectives can learn structure, yet reconstruction and density models carry their own inductive biases and tractability limits.
- A generative formula is most useful when its evaluation, inference, sampling, and training procedures are computationally specified.
