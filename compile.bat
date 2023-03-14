@echo off
setlocal enabledelayedexpansion
rmdir site\ /S /Q
mkdir site\
for /r /d %%d in (*) do (
	for %%f in (%%d\*) do (
		set toCopy=FALSE
		if /i %%~xf==.html set toCopy=TRUE
		if /i %%~xf==.css set toCopy=TRUE
		if /i %%~xf==.js set toCopy=TRUE
		if /i %%~xf==.map set toCopy=TRUE
		if /i !toCopy!==TRUE (
			mkdir site%%~pf
			copy %%f site%%~pf
			echo %%f to site%%~pf
		)
		set toCopy=
	)
)