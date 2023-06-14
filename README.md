## Nextjs examples with HTML and API  

- Created base [Next.js](https://nextjs.org/)
- Created by[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

### Dev requirements

Docker and docker-compose for postgres db creation
```bash
docker version
docker-compose version
```

Or an available postgres connection

### Environments preparation
```bash
cp .env.example .env
```

Using an existing database and fill variables in `.env`
Or define db enviroments in `.env` and then
```bash
docker-compose up
```

### Getting Started

Run the development server:
```bash
npm run dev
```

### Build and start in prod
```bash
npm run build
npm run start
```

### Ops requirements

1. Aws cli
From <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>
```bash
$ aws --version
aws-cli/2.11.11 Python/3.11.2 Darwin/22.3.0 exe/x86_64 prompt/off
```

2. Config aws cli
```bash
$ aws configure
AWS Access Key ID [****************HH64]: 
AWS Secret Access Key [****************tmA+]: 
Default region name [ap-southeast-2]: 
Default output format [None]:
```

3. Docker
```bash
docker version
```

### Build images and push to ECR
```bash
aws sts get-caller-identity --query Account \
  | docker build . -t $(xargs).dkr.ecr.ap-southeast-2.amazonaws.com/nextapi:latest

aws sts get-caller-identity --query Account \
  | echo "$(xargs).dkr.ecr.ap-southeast-2.amazonaws.com" \
  | echo "$(aws ecr get-login-password --region ap-southeast-2) $(xargs)" \
  | docker login  --username AWS --password $(xargs)

aws sts get-caller-identity --query Account \
  | docker push $(xargs).dkr.ecr.ap-southeast-2.amazonaws.com/nextapi:latest
```

Remove local image if not needed
```bash
aws sts get-caller-identity --query Account \
  | docker rmi $(xargs).dkr.ecr.ap-southeast-2.amazonaws.com/nextapi:latest
```

### Create role and policy
```bash
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://ecs-tasks-trust-policy.json

aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

### Create task-define and update service

Create `task-define.json` file based on `task-define.example.json` and fill out required values

```bash
cp task-define.example.json task-define.json
```

```bash
aws ecs register-task-definition \
  --family nextapi \
  --cli-input-json file://task-define.json \
  --region ap-southeast-2 \
  --query taskDefinition.revision

aws ecs update-service \
  --cluster nextapi \
  --service nextapiservice \
  --task-definition nextapi:${taskRevision} \
  --desired-count 2 \
  --region ap-southeast-2 \
  --query service.taskDefinition
```

Force update service
```bash
aws ecs update-service \
  --cluster nextapi \
  --service nextapiservice \
  --force-new-deployment \
  --query service.taskDefinition
```
