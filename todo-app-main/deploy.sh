#!/bin/bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl rollout restart deployment/todo-app-main