# Git Configuration Fix

If you're experiencing the `libcurl-4.dll` error when running `git pull`, try these solutions:

## Solution 1: Update Git Configuration (Recommended)

Run these commands in PowerShell:

```powershell
git config --global http.sslBackend schannel
git config --global http.version HTTP/1.1
git config --global http.postBuffer 524288000
```

## Solution 2: Reinstall Git

If the error persists, you may need to reinstall Git for Windows:
1. Download the latest Git for Windows from https://git-scm.com/download/win
2. Uninstall the current Git installation
3. Install the new version

## Solution 3: Increase Virtual Memory (Paging File)

The error "The paging file is too small" indicates Windows needs more virtual memory:
1. Open System Properties → Advanced → Performance Settings
2. Go to Advanced tab → Virtual Memory
3. Increase the paging file size
4. Restart your computer

## Solution 4: Use SSH Instead of HTTPS

If HTTPS continues to fail, switch to SSH:
```powershell
git remote set-url origin git@github.com:username/repository.git
```

## Current Project Structure

The project is located at:
```
Banking_V1/banking_v1/
```

To run the project:
```powershell
cd "Banking_V1\banking_v1"
npm run dev
```

