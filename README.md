# Blue-Green Deployment with AWS ECS and AI/ML Integration

## Overview

This project demonstrates a blue-green deployment strategy using AWS ECS to achieve zero-downtime application updates. It also integrates a simple machine learning component for workload prediction, showing how DevOps and AI/ML can work together in modern cloud systems.

## Tech Stack

* AWS ECS (Fargate)
* Application Load Balancer (ALB)
* Terraform (Infrastructure as Code)
* Node.js (Application Layer)
* Python (Machine Learning)
* Jenkin (CI/CD)

## Features

* Blue-green deployment strategy for zero downtime
* Infrastructure provisioning using Terraform
* Containerized application deployment on ECS
* CI/CD pipeline using jenkin
* Basic machine learning model for workload prediction
* Modular and scalable architecture

## Architecture

The system consists of two environments:

* Blue environment: currently serving production traffic
* Green environment: new version deployment

Traffic is routed through an Application Load Balancer. When a new version is deployed, it is first launched in the green environment. After validation, traffic is shifted from blue to green.

The infrastructure is provisioned using Terraform, including:

* ECS cluster and services
* Load balancer
* Security groups and networking

## AI/ML Component

The project includes a basic machine learning workflow:

* Dataset: `cloud_workload_dataset.csv`
* Training script: `train_model.py`
* Prediction script: `predict.py`

The model is designed to simulate workload prediction, which can be extended for:

* Auto-scaling decisions
* Traffic forecasting
* Resource optimization

## CI/CD Workflow

* Code is pushed to GitHub
* Jenkin pipeline is triggered
* Application is built and deployed to ECS
* New version is deployed in green environment
* Traffic can be switched after validation

## Project Structure

* `blue-app/` : Blue environment application
* `Red_app/` : Green environment application
* `Terraform-blue-green/` : Infrastructure code
* `train_model.py` : ML training script
* `predict.py` : ML prediction script
* `cloud_workload_dataset.csv` : Dataset

## How to Run

### Infrastructure Setup

```bash
terraform init
terraform plan
terraform apply
```

### Application Deployment

* Configure AWS credentials
* Run GitHub Actions workflow or deploy manually via ECS

### Machine Learning

```bash
python train_model.py
python predict.py
```

## Future Improvements

* Integrate ML predictions with auto-scaling policies
* Add monitoring using CloudWatch
* Implement canary deployments
* Improve CI/CD with automated rollback
