# Docker Usage

## Start

```powershell
docker compose up -d --build
```

Open:

```text
http://localhost:3000
```

## Stop

```powershell
docker compose down
```

## Check Status

```powershell
docker compose ps
```

## LAN Access

Find the host machine IPv4 address:

```powershell
ipconfig
```

Other computers on the same network can open:

```text
http://<host-ip>:3000
```

Example:

```text
http://192.168.1.50:3000
```

The host machine must keep Docker Desktop running, and Windows Firewall must allow inbound access to port `3000`.

## Database Initialization

On first startup with an empty Docker volume, MySQL automatically runs:

```text
docker/mysql/init/01-init-user-tbl.sql
```

That script creates `USER_TBL` and inserts the initial CSV data.

If you need to recreate the database from scratch:

```powershell
docker compose down -v
docker compose up -d --build
```

Warning: `docker compose down -v` deletes the MySQL Docker volume and all data inside it.
