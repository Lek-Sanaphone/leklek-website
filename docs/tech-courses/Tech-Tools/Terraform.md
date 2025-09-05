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
</details>

<details>
    <summary>Variables and Outputs</summary>
</details>

<details>
    <summary>Modules</summary>
</details>

</details>