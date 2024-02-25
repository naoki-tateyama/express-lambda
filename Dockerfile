FROM public.ecr.aws/lambda/nodejs:20 as builder
COPY /express ./
RUN npm ci
RUN npm run build

FROM builder as runner
ENV PORT 3000
ENV READINESS_CHECK_PATH /health
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /var/task/dist/index.js /var/task
EXPOSE 3000
CMD ["index.handler"]