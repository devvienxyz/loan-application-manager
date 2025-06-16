# Documentation for database docker job

## Default setup

Docker sets up the database for us. We just need to set the environment values in a  `.env` file.

## View docker logs for database service

```bash
./scripts/docker.sh logs-db
```

## Accessing the database using DBeaver

Add a new connection and configure. Sample values:

```txt
port = 15432
host = localhost
database = dev_loan_db
user = loan_db_admin
password = replacethiswithyoursecurepasswordhere
```
