param()
$secureKey = Read-Host 'OpenAI API key (Enter for author-only mode)' -AsSecureString
$previous = $env:ROOM17_OPENAI_API_KEY
try {
  $env:ROOM17_OPENAI_API_KEY = [System.Net.NetworkCredential]::new('', $secureKey).Password
  node (Join-Path $PSScriptRoot 'server.cjs')
} finally {
  $env:ROOM17_OPENAI_API_KEY = $previous
}
