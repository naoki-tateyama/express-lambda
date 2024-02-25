FROM node:20-buster-slim AS base

FROM base AS builder
COPY /express ./
RUN npm ci
RUN npm run build

FROM base AS runner
ENV PORT 3000
ENV READINESS_CHECK_PATH /health
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /dist/index.js index.js
EXPOSE 3000
CMD ["node", "index.js"]