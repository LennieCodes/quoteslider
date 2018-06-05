Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "C:\Users\lpinskiy\Documents\applications\quoteslider\quoteslider.bat" & Chr(34), 0
Set WinScriptHost = Nothing