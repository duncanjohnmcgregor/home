# Database Backups

This directory stores database backups created by the backup script.

## Usage

### Create a Backup
```bash
./scripts/backup.sh
```

### Restore from Backup
```bash
# Restore latest
./scripts/restore.sh latest

# Restore specific backup
./scripts/restore.sh backup_20240101_120000.sql.gz
```

## Backup Files

Backups are automatically:
- Named with timestamp: `backup_YYYYMMDD_HHMMSS.sql.gz`
- Compressed with gzip
- Limited to last 10 backups (older ones auto-deleted)

## Backup Schedule

For production, set up automated backups via cron:

```bash
# Run daily at 2 AM
0 2 * * * cd /opt/life-management && ./scripts/backup.sh
```

## Notes

- Backup files are NOT committed to git (see .gitignore)
- Store production backups in a secure, off-site location
- Test restore procedures regularly
