---
id: Terraform
description: Infrastructure as Code
title: Terraform
---

## Terraform
### Core

<details>
    <summary>Init, Plan, Apply</summary>

- terraform init
    - Set up providers & backend in that directory
```bash
terraform init
```

- terraform plan
    - Preview changes
```bash
terraform plan
```

- terraform apply
    - Make changes (add -auto-approve to skip prompt)
```bash
terraform apply
```
</details>

<details>
    <summary>Core Concept</summary>

<img src="https://cdn.shopify.com/s/files/1/0779/4361/files/image2.png?v=1647545002"/>
<details>
    <summary>1. Providers</summary>

- Providers is a Terraform Plugin to interact with API
- Best practice: Providers must be located in a separate file ex:`terrafrom.tf`
- Example of providers which `Terraform Support`
```hcl
# terraform.tf
terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 5. 0"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}
```
---
- `Local provider` is used for creating and managing resources on your local machine (no API interaction)
```hcl
# terraform.tf
terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
      version = "2.5.3"
    }
  }
}
```
</details>

<details>
    <summary>2. Resources + Meta-Arguments</summary>

- Actual components that will be define
- Best practice: Resources must be located in `main.tf`
- Syntax:
```hcl
resource "type" "resource_name" {}
```
- Example of [local provider (Requirements & Optionals)](https://registry.terraform.io/providers/hashicorp/local/latest/docs/resources/file#schema):
```hcl
# main.tf (local provider)
resource "local_file" "local" {
    # requirement
    filename = "<relative path>/filename.txt"

    # or use a relative path command with ${}
    # filename = "${path.module}/filename.txt"

    #optional
    content  = "This is a local file created by Terraform"
}
```

---
- [Meta-Arguments](https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on):
    - Special arguments that can be used with every resource
    - They work with every resource type to control how Terraform creates or manages them.
<details>
    <summary>depends_on</summary>

- Forces an explicit dependency between resources.
- Useful when Terraform can’t automatically detect the dependency.
- Example:
```hcl
resource "aws_s3_bucket" "example" {
  bucket = "my-bucket"
}

resource "aws_s3_bucket_policy" "example_policy" {
  bucket = aws_s3_bucket.example.id
  policy = data.aws_iam_policy_document.example.json

  depends_on = [aws_s3_bucket.example] # ensures bucket is created first
}
```
</details>
<details>
    <summary>count</summary>

- Creates multiple instances of the same resource.
- You can access each instance with an index ([0], [1], etc.).
- Example:
```hcl
resource "aws_instance" "servers" {
  count = 3
  ami   = "ami-123456"
  instance_type = "t2.micro"
}
```
- → Creates 3 EC2 instances.
</details>
<details>
    <summary>for_each</summary>

- Similar to count, but instead of an index, it uses a map or set of strings.
- Gives more control over naming and referencing.
- Example:
```hcl
resource "aws_s3_bucket" "buckets" {
  for_each = toset(["dev", "staging", "prod"])
  bucket   = "myapp-${each.key}"
}
```
- → Creates 3 uniquely named buckets.
</details>
<details>
    <summary>provider</summary>

- Lets you specify which provider configuration a resource should use, especially when multiple providers of the same type exist.
- Example:
```hcl
provider "aws" {
  region = "us-east-1"
  alias  = "east"
}

provider "aws" {
  region = "us-west-2"
  alias  = "west"
}

resource "aws_instance" "west_server" {
  provider = aws.west
  ami      = "ami-654321"
  instance_type = "t2.micro"
}
```
</details>
<details>
    <summary>lifecycle</summary>

- Controls special behaviors for resources during apply/destroy.
- Common options:
    - `create_before_destroy` = true → ensures a new resource is made before deleting the old one.
    - `prevent_destroy` = true → protects critical resources from being destroyed.
    - `ignore_changes` = [field] → tells Terraform to ignore changes to certain fields.
- Example:
</details>

</details>

<details>
    <summary>3. State management</summary>

<details>
    <summary>Definitions</summary>

1. **What It Is**
   * The state file is like Terraform’s “notebook.”
   * It records all resources that Terraform has created, modified, or deleted.
   * It acts as Terraform’s **database** for keeping track of infrastructure.

2. **Current vs Desired State**
   * **Desired State** = what you define in your `.tf` configuration files.
   * **Current State** = what Terraform knows already exists (stored in the state file).
   * Terraform compares the two and makes changes to bring the current state in line with the desired state.

3. **How It Works in Practice**
   * At first, the state file is empty because nothing exists.
   * When you run `terraform apply`, Terraform:
     1. Creates the infrastructure.
     2. Updates the state file with details of the created resources (like IDs, attributes, etc.).
   * If you later change or delete resources in your config, Terraform compares with the state file and applies only the necessary updates.

4. **State File Format**
   * Stored as **JSON** in `terraform.tfstate`.
   * Contains metadata (Terraform version, provider info).
   * Stores details of each resource: type, name, attributes, IDs, and configuration.

5. **Why It’s Important**
   * Terraform relies on it to know what’s already been provisioned.
   * Without it, Terraform would not know whether resources already exist and might recreate or duplicate them.
   * It enables Terraform’s **declarative approach**: always moving the current state toward the desired state.

</details>

<details>
    <summary>State Sub Command</summary>

* Usage: `terraform state <subcommand> [options] [args]`
    * List all sub commands: `terraform state -h`
* `terraform state list`, List resources in the state
* `terraform state mv`, Move an item in the state
* `terraform state pull`, Pull current state and output to stdout
* `terraform state push`, Update remote state from a local state file
* `terraform state replace-provider`, Replace provider in the state
* `terraform state rm`, Remove instances from the state
* `terraform state show`, Show a resource in the state
    * `terraform state show <specific resources>`, gives information of that resource only

</details>

<details>
    <summary>**IMPORTANT: State Drift**</summary>

* State Drift: $\color{tomato}\text{Actual Infrastructure} \neq \text{Terraform tfstate}$
* Occur when someone delete resources manually from the Provider's UI
* Solution:
    1. `terraform init` and then `terraform apply` (Recommend)
        * Init helps to compare the actual infra and current state file
        * apply create the missing/difference between the two, hence create missing resource(s) + config the state file
    2. `terraform refresh` (Not Recommend)
        * If the deletion is intentional
        * terraform refresh will not change anything in the infra, but it will changes the current state file
        * However, this command doesn't consider the `resource file`

</details>

</details>

<details>
    <summary>Variables and Outputs</summary>
</details>

<details>
    <summary>Modules</summary>
</details>

</details>