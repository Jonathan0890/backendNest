
find ./logs -type f -name "*.log" -mtime +7 -exec rm {} \;
echo "🧼 Logs antiguos eliminados"
