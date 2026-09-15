---
id: module-3-learning-criterion-and-loss-functions
description: Instance losses, information theory, structured prediction, expected and empirical risk, and Hoeffding's bound.
title: Module 3 - Learning Criterion and Loss Functions
sidebar_position: 4
---

# Module 3 - Summary

# 1. From a Learning Goal to a Criterion

## 1.1 Main question and purpose

<details>
<summary>Purpose of this module</summary>

Module 2 defined the hypothesis family, data, criterion, and learning algorithm. Module 3 asks how to turn “good prediction” into a computable loss, how that loss changes for different outputs, and when a loss measured on finite examples reflects performance on new data.

</details>

## 1.2 What a criterion does

A learning algorithm selects a hypothesis $h$ from a family $\mathcal H$. It needs a **criterion** to compare candidates. A criterion is a rule that assigns a numerical cost to a hypothesis's predictions. Lower cost usually means better performance under the chosen definition of success.

There are two levels:

- An **instance loss** compares one prediction with one target: $L(\hat y,y)$.
- A **risk or global criterion** aggregates instance losses across possible inputs, either under the population distribution or over a finite dataset.

The loss is a design choice. A poor choice can reward predictions that are easy to optimize but unhelpful for the real task. The criterion also interacts with the hypothesis space and the learning algorithm introduced in Module 2.

## 1.3 Define a valid instance loss

An instance loss is a function

$$
L:\mathcal Y\times\mathcal Y\longrightarrow\mathbb R_{\ge 0},
\qquad
(\hat y,y)\longmapsto L(\hat y,y).
$$

It must be **computable** from the represented outputs. For a predicted asset price, the output is a scalar. For a robot command such as “sit,” the system may need joint angles, speed, stability, and timing before a numeric comparison is possible. Object detection needs representations for boxes and classes.

A useful loss generally has these properties:

| Property | Why it matters | Qualification |
| --- | --- | --- |
| Nonnegative | A cost should not reward an error with a negative penalty by accident. | Some optimization objectives add terms with different signs, but the instance loss here is nonnegative. |
| Zero for an adequate match | A correct prediction should have minimum cost. | “Adequate” depends on the task and tolerance. |
| Computationally affordable | It may be evaluated millions of times during training. | Exact task metrics can be too expensive or discontinuous. |
| Useful optimization landscape | Nearby parameter changes should produce informative changes in cost. | Differentiability is especially helpful for gradient-based training. |
| Appropriate to the output | The cost should reflect scalar, categorical, spatial, sequential, or physical structure. | No single loss suits all output types. |

A loss need **not** be a mathematical distance. It may be asymmetric and fail the triangle inequality. For example, predicting a probability distribution and comparing it with a target using cross-entropy gives a different cost if the two arguments are exchanged.

## 1.4 Ambiguity changes what “correct” means

Some inputs admit more than one valid output. Different medical experts may provide plausible diagnoses; a generated image can have many acceptable realizations; a two-link robot arm may reach one point in more than one configuration. A loss that penalizes every alternative except one recorded target can misrepresent the task.

In these cases, the model may need to predict a **distribution**, a set of valid outcomes, or task-specific equivalence classes. Uncertainty may remain even if the learning algorithm is ideal.

---

# 2. Regression Losses

## 2.1 Squared error and mean squared error

For scalar regression, squared error is

$$
L_2(\hat y,y)=(\hat y-y)^2.
$$

For $N$ examples, mean squared error (MSE) is

$$
\operatorname{MSE}
=\frac1N\sum_{i=1}^{N}(\hat y_i-y_i)^2.
$$

It is smooth and convex as a function of a single scalar prediction. Its derivative with respect to the prediction is $2(\hat y-y)$, so large errors create large gradients. Consequently, outliers can strongly move a fitted line. With independent Gaussian observation noise and fixed variance, minimizing squared error corresponds to maximizing likelihood up to constant factors.

## 2.2 Absolute error and mean absolute error

Absolute error is

$$
L_1(\hat y,y)=|\hat y-y|,
\qquad
\operatorname{MAE}=\frac1N\sum_{i=1}^{N}|\hat y_i-y_i|.
$$

Its penalty grows linearly rather than quadratically, so it is more robust to large outliers. It is convex but not differentiable at zero; gradient-based methods use a subgradient or another suitable implementation. With Laplace observation noise of fixed scale, MAE has a negative-log-likelihood interpretation. For a constant predictor, MSE favors the sample mean while MAE favors a sample median.

This instance loss is separate from **$L_1$ regularization** on model weights, although both use absolute values. Weight regularization can promote sparse coefficients.

## 2.3 Huber loss balances the two

For residual $r=\hat y-y$ and threshold $\delta>0$, Huber loss is

$$
L_\delta(r)=
\begin{cases}
\frac12r^2,&|r|\le\delta,\\
\delta\left(|r|-\frac12\delta\right),&|r|>\delta.
\end{cases}
$$

It is quadratic near zero and linear for large residuals. The threshold controls where the penalty changes behavior. MSE, MAE, and Huber can fit different hypotheses to the same observations because each weights errors differently.

| Loss | Large-error growth | Smooth at zero? | Common reason to choose it |
| --- | --- | --- | --- |
| Squared error | Quadratic | Yes | Strong penalty for large mistakes; Gaussian-noise model |
| Absolute error | Linear | No | Reduced sensitivity to outliers; Laplace-noise model |
| Huber | Linear beyond $\delta$ | Yes | Smooth small-error fitting with greater outlier robustness |

---

# 3. Classification Losses and Probabilistic Outputs

## 3.1 Why counting mistakes is difficult to optimize

The **0–1 loss** is

$$
L_{0/1}(\hat y,y)=\mathbf1\{\hat y\ne y\}.
$$

It directly counts classification errors, but it changes only when the predicted class crosses a decision boundary. Its gradient is zero or undefined in the places where a gradient-based optimizer would need guidance. Classification models therefore usually train with a smooth surrogate, then report accuracy or other task metrics for evaluation.

## 3.2 Binary classification: logits and sigmoid

A binary classifier can output a **logit** $z\in\mathbb R$. Sigmoid converts it to a positive-class probability:

$$
p=\sigma(z)=\frac{1}{1+e^{-z}},
\qquad
z=\log\frac{p}{1-p}.
$$

The derivative is $\sigma'(z)=p(1-p)$. For label $y\in\{0,1\}$, binary cross-entropy is

$$
L_{\mathrm{BCE}}(z,y)
=-y\log p-(1-y)\log(1-p).
$$

The logit form is numerically more stable than first computing a probability extremely close to 0 or 1 and then taking its logarithm. For sigmoid plus BCE, the derivative with respect to the logit is $p-y$.

## 3.3 Multi-class classification: softmax and cross-entropy

For $K$ mutually exclusive classes and logits $z_1,\ldots,z_K$, softmax defines

$$
q_k=\frac{e^{z_k}}{\sum_{j=1}^{K}e^{z_j}},
\qquad
\sum_{k=1}^{K}q_k=1.
$$

The target can be a probability vector $p=(p_1,\ldots,p_K)$. Its cross-entropy with the prediction $q$ is

$$
H(p,q)=-\sum_{k=1}^{K}p_k\log q_k.
$$

For a one-hot target whose true class is $c$, this becomes **negative log-likelihood**:

$$
L_{\mathrm{CE}}(z,c)=-\log q_c
=-z_c+\log\sum_{j=1}^{K}e^{z_j}.
$$

The last expression is implemented with a numerically stable log-sum-exp calculation. If the model assigns tiny probability to the true class, the loss becomes large. In contrast to 0–1 loss, it distinguishes a confident wrong prediction from a barely wrong one.

The softmax Jacobian and the resulting loss gradient are

$$
\frac{\partial q_i}{\partial z_j}
=q_i(\mathbf1\{i=j\}-q_j),
\qquad
\frac{\partial L_{\mathrm{CE}}}{\partial z_k}
=q_k-\mathbf1\{k=c\}.
$$

This simple gradient is a key reason softmax plus cross-entropy is useful for training.

---

# 4. Entropy, KL Divergence, and Information

## 4.1 Entropy measures uncertainty

For a discrete random variable $Y$ with outcomes $1,\ldots,K$,

$$
H(Y)=-\sum_{k=1}^{K}P(Y=k)\log P(Y=k).
$$

Use base-2 logarithms for **bits** and natural logarithms for **nats**. Terms with zero probability contribute zero by continuity. A deterministic outcome has zero entropy. $K$ equally likely outcomes have entropy $\log K$. Binary entropy is largest at a 50/50 split.

Entropy also has a coding interpretation: common outcomes need shorter descriptions, while rare outcomes require more information. A predictable bit sequence is more compressible than a genuinely uncertain one.

## 4.2 Cross-entropy and KL divergence

When observations actually follow distribution $P$ but are modeled with $Q$, cross-entropy is the expected coding cost using $Q$:

$$
H(P,Q)=-\sum_kP(k)\log Q(k).
$$

Kullback–Leibler (KL) divergence is

$$
D_{\mathrm{KL}}(P\|Q)
=\sum_kP(k)\log\frac{P(k)}{Q(k)}
=H(P,Q)-H(P).
$$

Thus,

$$
H(P,Q)=H(P)+D_{\mathrm{KL}}(P\|Q).
$$

KL divergence is nonnegative and equals zero when the distributions agree wherever $P$ has support. It is **asymmetric**, so it is not a distance metric. If $Q$ assigns zero probability to an event with positive probability under $P$, KL divergence is infinite. For one-hot $P$, its entropy is zero and KL reduces to the negative log probability of the true class.

## 4.3 Conditional entropy and mutual information

The chain rule is

$$
H(X,Y)=H(X)+H(Y\mid X).
$$

$H(Y\mid X)$ describes the uncertainty in the target after observing the input. Mutual information measures how much knowing the input reduces uncertainty:

$$
I(X;Y)=H(Y)-H(Y\mid X)
=D_{\mathrm{KL}}\!\left(P(X,Y)\,\|\,P(X)P(Y)\right).
$$

It is symmetric in $X$ and $Y$. If labels remain ambiguous after seeing $X$, $H(Y\mid X)>0$. Under the true distribution and a sufficiently flexible, correctly optimized probabilistic model, the minimum attainable **expected cross-entropy** is $H(Y\mid X)$. This is an irreducible uncertainty floor for log loss, not a promise that a finite model or dataset will attain it.

---

# 5. Structured Outputs Need Structured Criteria

## 5.1 Semantic segmentation

A semantic segmentation model predicts a class distribution at each pixel of an $H\times W$ image. A direct training loss is the average per-pixel cross-entropy:

$$
L_{\mathrm{seg}}
=\frac{1}{HW}\sum_{u=1}^{H}\sum_{v=1}^{W}
-\log q_{u,v}(y_{u,v}).
$$

The ground-truth mask and prediction have a fixed spatial alignment. Local continuity and spatial correlation can be supported by the architecture or an added regularizer. If most pixels belong to background, overall pixel accuracy can be misleading; class weighting or overlap-based objectives such as Dice loss may be useful.

## 5.2 Object detection

Detection outputs a **variable-size unordered set** of boxes and classes. A prediction at position one does not necessarily correspond to the first ground-truth object. The loss must establish correspondence before comparing box coordinates and labels.

Possible strategies include:

- Match candidate and target boxes using intersection over union (IoU) thresholds.
- Find a global assignment with the Hungarian algorithm.
- Use grid cells or anchors to define an assignment rule, as in YOLO-style detectors.

After matching, a detector combines **classification**, **localization**, and often **objectness/background** terms. It also needs to account for missed objects and false positives. The matching method and model architecture are linked design decisions: grid-based methods impose a spatial assignment rule, while set-prediction methods can use global matching.

## 5.3 Language and sequence prediction

An autoregressive model represents a token sequence through

$$
P(y_{1:T})=\prod_{t=1}^{T}P(y_t\mid y_{<t}).
$$

Training commonly uses teacher forcing and sums token-wise cross-entropies:

$$
L_{\mathrm{seq}}
=-\sum_{t=1}^{T}\log P(y_t\mid y_{<t}).
$$

A large vocabulary makes each probability calculation expensive. Systems may use tied embeddings, mixed precision, or alternative softmax schemes. During training, the model conditions on true previous tokens; during generation, it conditions on its own outputs, creating a train–generation mismatch. Token loss and perplexity are useful training measures, while generated text may also be evaluated using sequence-level measures such as BLEU or ROUGE. These measures capture different aspects of quality and are not interchangeable.

## 5.4 Physics-informed neural networks

A physics-informed neural network (PINN) predicts a function, such as a field over space and time, expected to satisfy a differential equation. A typical objective combines residual and boundary terms:

$$
L_{\mathrm{PINN}}
=\lambda_{\mathrm{PDE}}L_{\mathrm{PDE}}
+\lambda_{\mathrm{BC}}L_{\mathrm{BC}}
+\lambda_{\mathrm{IC}}L_{\mathrm{IC}}.
$$

$L_{\mathrm{PDE}}$ measures how well the predicted function satisfies the equation at sampled coordinates; the other terms enforce boundary and initial conditions. Automatic differentiation can calculate derivatives of the model output with respect to input coordinates. Labeled input-output pairs are not always required, but the terms may have very different scales, so weighting and optimization need care.

The general pattern is to encode the output structure, establish any discrete correspondence, then use differentiable losses for the parts that can be compared.

---

# 6. Training Losses and Evaluation Metrics Serve Different Jobs

A metric can describe task success even when it is a poor gradient-based training loss.

| Metric | What it measures | Why it is awkward as a direct training loss |
| --- | --- | --- |
| Accuracy / top-$k$ accuracy | Whether the true class is selected or appears among the top $k$ choices | Hard class selection changes discontinuously. |
| Precision, recall, and $F_1$ | True-positive tradeoffs after thresholding | Counts change discretely with predictions. |
| ROC and area under the curve (AUC) | Ranking quality across classification thresholds | Ranking and threshold operations are typically non-smooth. |
| Average precision / mean average precision | Precision–recall ranking, often across classes | Depends on discrete ranking and matching. |
| IoU | Overlap of predicted and target regions or boxes | Useful for evaluation and matching, but an exact task pipeline can include discrete choices. |
| BLEU / ROUGE | Sequence-level overlap with references | Generated-token decisions are discrete. |

A system may train with cross-entropy or a differentiable surrogate while reporting several evaluation metrics. Metric choice depends on the task: for a rare positive class, high accuracy may hide poor recall. ROC plots true-positive rate against false-positive rate across thresholds, and AUC summarizes the curve. AUC assesses ranking, not the correctness of one chosen operating threshold.

---

# 7. Expected Risk and Empirical Risk

## 7.1 A criterion is a functional of the hypothesis

An instance loss evaluates one prediction. A population criterion evaluates an entire function $h$:

$$
E_{\mathrm{out}}[h]
=\mathbb E_{(X,Y)\sim P}\!\left[L(h(X),Y)\right]
=\int L(h(x),y)\,dP(x,y).
$$

It is a **functional**: it maps a function $h$ to a number. In a deterministic-target setting with target function $f^*$, it can be written as $\int L(h(x),f^*(x))\,dP_X(x)$.

An unweighted geometric integral over all inputs is a useful picture, but it is generally not the learning objective. Real inputs are not uniformly distributed across an enormous representation space. The expected risk weights errors according to the task distribution.

## 7.2 Why geometric coverage is difficult

In high dimensions, a fixed number of examples occupies a tiny fraction of the ambient volume. Filling the whole input space with a fine grid grows exponentially with dimension. Even geometric comparisons change rapidly: the volume ratio of a unit ball to its enclosing cube shrinks as the dimension increases.

This **curse of dimensionality** matters for exhaustive coverage. Yet natural inputs, such as photographs, tend to lie in structured high-probability regions rather than being uniform random pixel arrays. Expected risk asks how a model performs where inputs actually occur.

## 7.3 Finite samples estimate population performance

For an i.i.d. sample $D=\{(x_i,y_i)\}_{i=1}^{N}$, empirical risk is

$$
E_{\mathrm{in}}[h;D]
=\frac1N\sum_{i=1}^{N}L(h(x_i),y_i).
$$

For a **fixed** $h$, this is a Monte Carlo estimate of $E_{\mathrm{out}}[h]$. Under suitable integrability conditions, the law of large numbers gives convergence as $N$ grows. For 0–1 loss, $E_{\mathrm{out}}[h]$ is the probability of misclassification and $E_{\mathrm{in}}[h;D]$ is the observed fraction of wrong labels.

A visual analogy is to color each input “correct” or “wrong” according to a fixed classifier. Random samples estimate the population fraction of each color without filling the entire space. For two linear separators on a uniformly sampled unit sphere, the disagreement probability is the angle between their normals divided by $\pi$. A simulation can compare empirical error with this true probability in dimensions 5 and 100; both concentrate as sample size grows.

---

# 8. Hoeffding's Bound and Generalization

## 8.1 Bound for a fixed hypothesis

Let $Z_i=L(h(x_i),y_i)$ be i.i.d. losses for a hypothesis $h$ fixed independently of the sample, with $a\le Z_i\le b$. Hoeffding's inequality gives

$$
P\!\left(
\left|E_{\mathrm{in}}[h;D]-E_{\mathrm{out}}[h]\right|
\ge\varepsilon
\right)
\le
2\exp\!\left(-\frac{2N\varepsilon^2}{(b-a)^2}\right).
$$

For 0–1 loss, $a=0$ and $b=1$, so

$$
P\!\left(
|E_{\mathrm{in}}[h;D]-E_{\mathrm{out}}[h]|
\ge\varepsilon
\right)
\le 2e^{-2N\varepsilon^2}.
$$

With probability at least $1-\delta$, the deviation is at most

$$
\sqrt{\frac{\log(2/\delta)}{2N}}.
$$

For $N=1000$ and $\delta=0.05$, this is about $0.043$, or 4.3 percentage points. Holding confidence fixed, halving the error tolerance requires approximately four times as many samples. The fixed-hypothesis bound has no explicit input dimension, because it concerns estimating the mean of bounded losses rather than covering the entire input space.

## 8.2 Why selecting a model from the sample is different

Empirical risk minimization chooses

$$
\hat h\in\operatorname*{arg\,min}_{h\in\mathcal H}E_{\mathrm{in}}[h;D].
$$

Here $\hat h$ depends on $D$. The fixed-$h$ Hoeffding bound cannot simply be applied to $\hat h$ using the same training data: searching many candidates can find one that looks good on the sample by chance.

For a **finite** hypothesis family, apply a union bound over all $|\mathcal H|$ candidates:

$$
P\!\left(
\sup_{h\in\mathcal H}
|E_{\mathrm{in}}[h;D]-E_{\mathrm{out}}[h]|
\ge\varepsilon
\right)
\le
2|\mathcal H|e^{-2N\varepsilon^2}
$$

for 0–1 loss. Thus, with probability at least $1-\delta$, every candidate in the family satisfies

$$
|E_{\mathrm{in}}[h;D]-E_{\mathrm{out}}[h]|
\le
\sqrt{\frac{\log(2|\mathcal H|/\delta)}{2N}}.
$$

This uniform guarantee also covers the selected $\hat h$. Infinite families require another complexity measure or argument, such as VC theory. Input dimension can matter indirectly through hypothesis-family complexity, even though it does not appear in the fixed-hypothesis concentration bound.

An independent test sample can estimate the risk of a model that was fixed before that test sample was drawn. Repeatedly selecting models based on the same test results again creates a selection problem.

## 8.3 Optional proof sketch: Chernoff, Hoeffding's lemma, optimization

The optional technical reading derives the concentration inequality in three steps:

1. **Chernoff's trick:** for $t>0$, apply Markov's inequality to $e^{tX}$:
   $P(X\ge c)\le e^{-tc}\mathbb E[e^{tX}]$.
2. **Hoeffding's lemma:** if $Z$ is centered and bounded in $[a,b]$, then
   $\mathbb E[e^{tZ}]\le \exp(t^2(b-a)^2/8)$.
3. **Combine independent variables:** factor the moment-generating function of the centered sum, then choose $t$ that minimizes the upper bound. Repeat for the lower tail and add the two probabilities.

For independent, potentially non-identically bounded variables $Z_i\in[a_i,b_i]$, the one-sided result for their average is

$$
P\!\left(
\frac1N\sum_{i=1}^{N}(Z_i-\mathbb E Z_i)\ge\varepsilon
\right)
\le
\exp\!\left(
-\frac{2N^2\varepsilon^2}{\sum_{i=1}^{N}(b_i-a_i)^2}
\right).
$$

The two-sided result multiplies the right-hand side by 2. Convexity of the exponential is the core idea behind Hoeffding's lemma; the proof bounds its moment-generating function between endpoints of the bounded interval.

---

# 9. Choosing and Interpreting a Learning Criterion

## 9.1 Connect the pieces

A complete learning system specifies the output representation, an instance loss, a hypothesis family, and a way to estimate risk from examples. The optimizer minimizes a finite-sample training objective, while the real goal is low population risk on the intended distribution.

$$
\text{output structure}
\;\longrightarrow\;
\text{instance loss}
\;\longrightarrow\;
E_{\mathrm{in}}[h;D]
\;\longrightarrow\;
\text{selected }\hat h
\;\longrightarrow\;
E_{\mathrm{out}}[\hat h].
$$

The arrows do not imply that a small training loss automatically guarantees a small population loss. The relation depends on sampling assumptions, loss bounds, and the complexity of the candidates considered.

## 9.2 Key distinctions to remember

| Distinction | Practical meaning |
| --- | --- |
| Instance loss vs risk | One prediction's cost versus an aggregate criterion for a whole hypothesis |
| Training loss vs evaluation metric | Differentiable optimization signal versus task-facing performance measure |
| MSE vs MAE | Quadratic versus linear response to large regression errors |
| 0–1 loss vs cross-entropy | Discrete error count versus probability-sensitive training objective |
| Entropy vs cross-entropy vs KL | Uncertainty in $P$, coding cost under $Q$, and excess cost from using $Q$ |
| Expected vs empirical risk | Population performance versus finite-sample estimate |
| Fixed vs selected hypothesis | Direct concentration for one predetermined model versus a uniform generalization problem |
| Ambient dimension vs distribution | Geometric coverage can be hard, while random-sample estimation of a fixed bounded loss can still concentrate |

A well-designed criterion reflects what counts as an error, provides an optimization signal, and remains interpretable when the hypothesis is evaluated on new data.
