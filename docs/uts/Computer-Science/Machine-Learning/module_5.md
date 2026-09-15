---
id: module-5-training-algorithms-and-gradient-optimization
description: Empirical-risk minimization, closed-form and data-based learners, gradient descent, learning-rate choices, and adaptive optimizers.
title: Module 5 - Training Algorithms and Gradient Optimization
sidebar_position: 6
---

# Module 5 - Summary

# 1. From a Criterion to a Working Model

## 1.1 Main question and purpose

<details>
<summary>Purpose of this module</summary>

The earlier modules specified data, losses, and a hypothesis family. Module 5 asks how a learning algorithm actually constructs a member of that family. It contrasts models that store and consult the training data with models that fit parameters, then develops gradient-based optimization when a closed-form solution is unavailable.

</details>

## 1.2 Empirical risk minimization is an objective, not an algorithm

For observed examples $D=\{(x_i,y_i)\}_{i=1}^{N}$ and instance loss $L$, empirical risk minimization (ERM) seeks

$$
\hat h\in\operatorname*{arg\,min}_{h\in\mathcal H}
E_{\mathrm{in}}[h;D],
\qquad
E_{\mathrm{in}}[h;D]
=\frac1N\sum_{i=1}^{N}L(h(x_i),y_i).
$$

The equation describes **what** would be selected. A learning algorithm must specify **how** to represent candidates and find a useful one. Depending on the family and objective, the answer may be a linear-system solve, a constrained optimizer, an iterative gradient method, or a prediction rule that uses the stored observations directly. A practical algorithm may only approximate the minimum.

## 1.3 Parameterized and data-based routes

| Route | Working model after training | Typical examples | Main tradeoff |
| --- | --- | --- | --- |
| **Parameterized** | A fitted vector $\theta$ defines $h_\theta(x)$ | Linear or logistic regression, neural networks | Prediction can be independent of the training-set size, but fitting the vector may be difficult. |
| **Data-based** | Prediction consults stored examples or learned coefficients anchored to them | $k$-nearest neighbours, kernel ridge regression, kernel SVM | Can adapt to sample locations, but memory and query cost may grow with data. |

This is a useful spectrum, not a strict division. Kernel methods often **do** optimize coefficients, and parametric models can have a large number of parameters. SVMs optimize at training time while retaining selected training examples for prediction.

---

# 2. Closed-Form Parametric Training: Linear Regression

## 2.1 Model and squared-loss objective

Put the $N$ input vectors into rows of $X\in\mathbb R^{N\times d}$ and the targets into $y\in\mathbb R^N$. For $h_w(x)=x^\top w$, ordinary least squares minimizes

$$
J(w)=\|Xw-y\|_2^2.
$$

A bias can be included by appending a constant 1 to each input row. Expanding the quadratic gives

$$
J(w)=w^\top X^\top Xw-2w^\top X^\top y+y^\top y.
$$

## 2.2 First-order condition and the chain rule

At a differentiable interior minimum, a sufficiently small perturbation of any parameter cannot lower the objective. Hence its gradient must be zero. This is generally a **necessary** condition; a zero gradient can also occur at a saddle or maximum for a non-convex objective.

Here the model prediction is $\hat y=Xw$. The derivative of squared loss with respect to $\hat y$ is $2(\hat y-y)$, and the Jacobian of $\hat y$ with respect to $w$ is $X$. The chain rule yields

$$
\nabla_wJ(w)=2X^\top(Xw-y).
$$

Setting it to zero gives the **normal equations**:

$$
X^\top Xw=X^\top y.
$$

If $X^\top X$ is invertible, the unique least-squares solution is

$$
w^*=(X^\top X)^{-1}X^\top y.
$$

If it is singular, least-squares solutions may still exist; a pseudoinverse or a suitable linear-system method can find one. In practice, solving the system through QR or SVD is usually more numerically stable than explicitly forming the matrix inverse. Because this squared-loss objective is convex, any solution of its normal equations is a global minimizer.

After fitting, prediction is $x^\top w^*$, with cost proportional to $d$ rather than directly to the number of stored training examples. The normal-equation derivation introduces two recurring ideas: compute a local optimality condition, and use the **chain rule/Jacobian** to move derivatives from predictions back to parameters. Backpropagation applies that chain rule through many network layers.

---

# 3. Data-Based Training and Prediction

## 3.1 $k$-nearest neighbours

$k$-nearest neighbours (KNN) stores the training inputs and targets. For a new query $x$:

1. Find the $k$ nearest stored inputs under a chosen distance.
2. For classification, use a vote among their labels.
3. For regression, average their target values.

With $k=1$, the boundary can tightly follow individual observations; a larger $k$ smooths the vote but can wash out local detail. The distance metric and feature scaling are as important as the neighbour count. Standard exhaustive lookup costs roughly $O(Nd)$ per query, though indexing or approximation can reduce cost in favorable settings.

Under regularity assumptions, if $k\to\infty$ while $k/N\to0$ as $N\to\infty$, KNN classification can be consistent. That asymptotic statement does not remove finite-sample difficulty. In high dimensions, a small radius may contain few examples while a large one loses locality; irrelevant coordinates can make distances uninformative.

## 3.2 Similarity-weighted kernel averaging

Given a nonnegative similarity kernel, a Nadaraya–Watson-style estimate is

$$
\hat y(x)=
\frac{\sum_{i=1}^{N}k(x,x_i)y_i}
{\sum_{i=1}^{N}k(x,x_i)},
$$

provided the denominator is nonzero. It resembles a soft neighbour average. With a hard neighbourhood indicator, it averages only points in the chosen neighbourhood. The method needs a kernel or bandwidth choice, but it does not fit a shared vector of coefficients through ERM. Dense clusters contribute several votes, and the estimator can be biased by the local sample distribution.

## 3.3 Kernel ridge regression fits shared coefficients

A different kernel model has

$$
h_\alpha(x)=\sum_{i=1}^{N}\alpha_i k(x_i,x).
$$

For kernel ridge regression with squared loss and the usual RKHS penalty, the coefficients solve

$$
(K+\lambda I)\alpha=y,
\qquad
K_{ij}=k(x_i,x_j),
\qquad
\lambda>0.
$$

The exact factor attached to $\lambda$ depends on how the average loss and regularizer are scaled. The Gram matrix $K$ records similarities between training inputs. Unlike naive kernel averaging, the learned coefficients account for their relationships jointly. A new prediction still requires kernel evaluations against stored anchors unless the model is approximated or compressed. Solving a dense $N\times N$ system can be costly for large $N$.

## 3.4 Support vector machines retain selected examples

A kernel support vector machine (SVM) learns a margin-based classifier. For binary labels $y_i\in\{-1,+1\}$, its soft-margin dual can be written as

$$
\max_{\alpha}
\left[
\sum_{i=1}^{N}\alpha_i
-\frac12\sum_{i,j=1}^{N}
\alpha_i\alpha_jy_iy_jk(x_i,x_j)
\right]
$$

subject to $0\le\alpha_i\le C$ and $\sum_i\alpha_i y_i=0$. The decision function is

$$
f(x)=\sum_{i:\alpha_i>0}\alpha_i y_i k(x_i,x)+b.
$$

Only points with nonzero coefficients—**support vectors**—appear in the final expansion. These often lie near or inside the margin. The convex formulation provides global optimality of the objective when solved, although parameter coefficients need not always be unique. Training is an optimization problem, while prediction remains anchored to selected observations.

| Model | What fitting does | What a query needs |
| --- | --- | --- |
| Linear regression | Solves for $d$-dimensional $w$ | Fitted weights |
| KNN | Stores data and chooses neighbourhood rule | Training inputs and targets |
| Kernel averaging | Stores data and chooses similarity rule | Training inputs and targets |
| Kernel ridge regression | Fits one coefficient per anchor | Coefficients and training anchors |
| Kernel SVM | Optimizes margin and selected coefficients | Support vectors and coefficients |

---

# 4. Parameterized Models Need Iterative Optimization

## 4.1 A nonlinear network has coupled parameters

When $\mathcal H=\{h_\theta:\theta\in\Theta\}$, ERM becomes a scalar objective over parameters:

$$
\theta^*\in\operatorname*{arg\,min}_{\theta\in\Theta}J(\theta),
\qquad
J(\theta)=\frac1N\sum_{i=1}^{N}
L(h_\theta(x_i),y_i).
$$

The two-layer XOR example composes an affine hidden layer, sigmoid activations, another affine layer, and a sigmoid output. For a two-input, two-hidden-unit, one-output network, there are nine scalar weights and biases. Binary cross-entropy depends nonlinearly on all of them. The chain rule can compute a gradient, but the equations $\nabla J(\theta)=0$ are coupled and generally have no useful closed-form solution. Iterative optimization makes local progress instead.

## 4.2 First-order Taylor approximation

Near the current parameter vector $\theta_t$,

$$
J(\theta_t+\Delta)
\approx
J(\theta_t)+\nabla J(\theta_t)^\top\Delta.
$$

For a fixed Euclidean step length, the negative gradient is the steepest local descent direction. **Gradient descent** follows

$$
g_t=\nabla J(\theta_t),
\qquad
\theta_{t+1}=\theta_t-\eta_tg_t.
$$

$\eta_t>0$ is the learning rate. The first-order approximation gives a direction but only describes an infinitesimally small neighbourhood. A finite step must be chosen so that the true objective improves. On a two-parameter loss surface, the sequence of $\theta_t$ traces a path across contour lines toward a low-loss region.

## 4.3 Gradient computation is a separate problem

For a model composed of operations, the chain rule propagates sensitivities backward through each operation. The gradient of the loss with respect to an output is multiplied by Jacobians of intermediate transformations until derivatives with respect to all parameters are obtained. Automatic differentiation and backpropagation perform this efficiently without writing one giant symbolic formula. Choosing a descent **direction** and choosing a **step size** are separate algorithmic decisions.

---

# 5. Perceptron Updates and the Learning-Rate Problem

## 5.1 Misclassification-driven perceptron rule

For $y_i\in\{-1,+1\}$ and score $w^\top x_i$, the classical perceptron updates a misclassified or zero-margin example:

$$
w\leftarrow w+y_ix_i
\quad\text{when}\quad
y_iw^\top x_i\le0.
$$

The update moves the score of that example toward the correct side. It resembles a gradient step, but **0–1 error has no informative gradient**. A precise optimization interpretation uses the perceptron loss

$$
L_{\mathrm{perc}}(w;x_i,y_i)
=\max(0,-y_iw^\top x_i),
$$

whose subgradient on a negative-margin example is $-y_ix_i$. A tie at zero needs a subgradient or update convention.

If the data are linearly separable with margin $\gamma>0$ under a unit-norm separator and $\|x_i\|\le R$, the perceptron mistake bound is at most $(R/\gamma)^2$. On nonseparable data, that termination guarantee does not apply; updates can keep revisiting conflicting examples. The module’s Iris and XOR trajectories illustrate these two cases.

## 5.2 Smooth classification loss gives richer signals

For binary logistic regression, $p_i=\sigma(w^\top x_i)$ and $y_i\in\{0,1\}$, cross-entropy has example gradient

$$
\nabla_w L_i=(p_i-y_i)x_i.
$$

A confidently correct prediction contributes a small example gradient; an incorrect one contributes more. This is more informative than merely counting errors. It does **not** ensure stable training with any learning rate: gradients from different examples may cancel at a finite optimum, and an overly large $\eta$ can still overshoot or diverge.

## 5.3 Small and large steps

A small learning rate may make progress very slow. A large one can leave the neighbourhood where the first-order model is accurate, jump across a narrow valley, oscillate around a minimum, or diverge. A fixed rate does not automatically adapt to local curvature.

Common step-size approaches include:

- A fixed rate chosen with validation or a training-loss diagnostic.
- A decreasing schedule, such as $\eta_t\propto1/\sqrt{t}$, that reduces steps over time.
- **Line search**, which tests or approximately optimizes the objective along a chosen direction.
- Adaptive methods that use gradient history to set different scales for parameters.

A held-out set can guide hyperparameter selection, but repeatedly tuning against the same evaluation set can overfit it.

---

# 6. Curvature, Convexity, and Non-Convexity

## 6.1 Second-order approximation and Newton's direction

The Hessian $H(\theta)=\nabla^2J(\theta)$ describes local curvature. A second-order expansion is

$$
J(\theta+\Delta)
\approx
J(\theta)+g^\top\Delta+\frac12\Delta^\top H\Delta.
$$

If $H$ is positive definite, minimizing this local quadratic gives the Newton direction $\Delta=-H^{-1}g$. Directions with high curvature get smaller steps. If the Hessian is singular or indefinite, an inverse may not exist or the proposed direction may fail to descend; damping, trust regions, or other safeguards can be needed.

With $p$ parameters, a dense Hessian takes $O(p^2)$ storage and a dense linear solve typically costs $O(p^3)$ arithmetic. This is usually infeasible for large neural networks. Learning-rate choices and adaptive optimizers use much cheaper, partial information about the loss geometry.

## 6.2 Convex objectives

A differentiable objective is convex when

$$
J(\lambda\theta+(1-\lambda)\theta')
\le
\lambda J(\theta)+(1-\lambda)J(\theta')
$$

for $\lambda\in[0,1]$. Any stationary point of a differentiable convex objective is a global minimizer. Squared-loss linear regression and regularized linear logistic regression have convex objectives in their linear-model parameters. Gradient descent convergence still requires suitable step sizes and regularity assumptions; convexity alone does not make every step safe.

## 6.3 Neural-network landscapes

Nonlinear neural networks generally have non-convex objectives. A zero gradient may occur at a local minimum, a saddle, or—in principle—a local maximum. At a saddle, some directions locally rise and others fall; the Hessian has positive and negative curvature directions. Different initializations can lead to different optimization trajectories and final losses, as the XOR demonstration shows.

It is too strong to say gradient descent always reaches the nearest local minimum. It can stall, pass through regions of small gradients, diverge with a bad step size, or converge to different stationary structures. Stochastic mini-batches, momentum, and perturbations can change these trajectories; none provides a general guarantee of the global minimum for arbitrary networks.

---

# 7. Why Change Vanilla Gradient Descent?

## 7.1 Narrow valleys cause zig-zag motion

If curvature is steep across one direction but flat along another, the gradient may point strongly across the valley. A single global learning rate safe enough for the steep direction can move slowly along the valley floor. Increasing it may amplify across-valley oscillation.

## 7.2 Sparse and uneven parameter updates

Some dimensions receive gradients only occasionally, such as embeddings for rare tokens. Applying the same global step scale everywhere may under-update sparse parameters and over-update frequently active ones. Gradient magnitude history can guide **per-coordinate scaling**, although it is only a heuristic proxy for curvature and does not equal a full Hessian inverse.

The module introduces four variants to address direction memory and coordinate scaling: momentum, AdaGrad, RMSProp, and Adam.

---

# 8. Momentum, AdaGrad, RMSProp, and Adam

## 8.1 Momentum accumulates directions

Let $g_t=\nabla J(\theta_t)$. One common momentum convention is

$$
v_{t+1}=\beta v_t+g_t,
\qquad
\theta_{t+1}=\theta_t-\eta v_{t+1},
\qquad
0\le\beta<1.
$$

With $v_0=0$, the velocity is an exponentially weighted sum of past gradients. Alternating across-valley components can partly cancel, while persistent downhill components reinforce. Momentum may reduce zig-zagging, but a high momentum coefficient or learning rate can overshoot. Other equivalent-looking conventions put a factor $(1-\beta)$ inside the velocity update, so their learning-rate scales differ.

## 8.2 AdaGrad scales coordinates using cumulative squares

AdaGrad keeps an accumulator for each coordinate $j$:

$$
G_{t,j}=G_{t-1,j}+g_{t,j}^2,
\qquad
\theta_{t+1,j}
=
\theta_{t,j}
-
\frac{\eta\,g_{t,j}}{\sqrt{G_{t,j}}+\varepsilon},
$$

where $G_{0,j}=0$ and $\varepsilon>0$ prevents a zero denominator. Frequent or large gradients grow the denominator and reduce that coordinate's future effective step. Sparse coordinates retain relatively larger effective steps when their gradients arrive.

Because $G_{t,j}$ never decreases, effective scales can become very small during long training runs. That decay can be useful in some convex settings but may cause slow progress in a changing non-convex landscape. Whether it becomes a practical problem depends on the gradient sequence and learning-rate choice.

## 8.3 RMSProp uses recent squared gradients

RMSProp replaces AdaGrad’s cumulative sum with an exponential moving average:

$$
s_t=\rho s_{t-1}+(1-\rho)(g_t\odot g_t),
\qquad
\theta_{t+1}
=
\theta_t-\eta\,
\frac{g_t}{\sqrt{s_t}+\varepsilon}.
$$

All vector operations in the update are coordinate-wise. Old squared gradients fade, so the denominator can adapt to the current regime instead of only growing. $\rho$ controls how much history is retained. $\rho=0$ uses only the current squared gradient; $\rho$ near 1 gives a long-memory average, but **does not become AdaGrad’s cumulative sum simply by taking $\rho\to1$**. RMSProp adapts scales but has no first-moment direction memory in this basic form.

## 8.4 Adam combines two moving averages

Adam tracks the first moment of gradients and the second **raw** moment of squared gradients:

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,
\qquad
s_t=\beta_2s_{t-1}+(1-\beta_2)(g_t\odot g_t),
$$

with $m_0=s_0=0$. These initial zero values bias the early moving averages toward zero. Adam corrects them:

$$
\hat m_t=\frac{m_t}{1-\beta_1^t},
\qquad
\hat s_t=\frac{s_t}{1-\beta_2^t},
\qquad
\theta_{t+1}
=
\theta_t-\eta\,
\frac{\hat m_t}{\sqrt{\hat s_t}+\varepsilon}.
$$

$\hat s_t$ estimates recent **mean squared gradient**, not centered statistical variance. Bias correction adjusts the moments; the resulting Adam update is not simply “smaller early steps” in every circumstance, because numerator and denominator corrections interact.

The Rosenbrock example plots trajectories from a common starting point through a curved valley. Under the chosen hyperparameters, vanilla GD moves slowly, momentum follows a more sustained direction, RMSProp adapts axes, and Adam combines both behaviors. That demonstration is task- and tuning-specific; no optimizer is universally fastest.

## 8.5 Compare their memory and scaling

| Optimizer | Direction history | Per-coordinate scale | Main limitation |
| --- | --- | --- | --- |
| Vanilla GD | Current gradient only | One global $\eta$ | Zig-zagging or slow progress in uneven geometry |
| Momentum | Exponential sum of gradients | One global $\eta$ | Can overshoot; no per-coordinate adaptation |
| AdaGrad | No direction smoothing | Cumulative squared gradients | Effective scale only shrinks |
| RMSProp | No direction smoothing | Recent squared-gradient average | Still lacks direction memory |
| Adam | Recent gradient average | Recent squared-gradient average, both bias-corrected | Behavior depends on tuning and objective |

---

# 9. Choosing an Optimization Procedure

## 9.1 Match the algorithm to the model

A closed-form or direct linear-system method is attractive for a modest convex problem such as ordinary least squares. A data-based predictor may need little fitting but pay for neighbours or anchors at query time. A constrained convex model such as an SVM needs a dedicated optimization solve. A large nonlinear network typically uses iterative gradients, automatic differentiation, and a carefully chosen step policy.

## 9.2 Key ideas to retain

- A first-order stationary condition is computable, but it is not generally sufficient for global optimality.
- The chain rule connects loss derivatives to parameters; backpropagation scales that computation to layered models.
- A perceptron update has a subgradient interpretation through **perceptron loss**, not through the discontinuous 0–1 error count.
- Negative gradient gives a local direction. Learning rate, curvature, and objective shape determine whether a finite step helps.
- Convexity makes stationary minima global; nonlinear networks need more careful interpretation of initialization and stationary points.
- Momentum remembers gradient directions. AdaGrad, RMSProp, and Adam use gradient history to adjust coordinate scales in different ways.
- Training cost, prediction cost, storage, and population generalization are separate questions. An optimizer with low training loss has not by itself proved that a model will work on new data.
