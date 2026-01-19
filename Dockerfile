# Production Dockerfile for AWS Lambda deployment
FROM public.ecr.aws/lambda/nodejs:20

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy server code
COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/src ./src

# Lambda handler
CMD ["src/index.handler"]
