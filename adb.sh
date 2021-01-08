#!/bin/bash

adbOut=$(adb connect $1)

echo $adbOut

#[[ $adbOut != "connected to $1:5555" ]] || 

if  [[ ($adbOut != "connected to $1:5555") && ($adbOut != "already connected to $1:5555") ]]; then
    echo "Unsucessful"
    exit 6
else
    echo "Yes";

    $(adb shell input keyevent KEYCODE_WAKEUP | adb shell monkey -p org.xbmc.kodi -c android.intent.category.LAUNCHER 1)
    exit 0
fi