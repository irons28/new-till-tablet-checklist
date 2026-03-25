window.checklistData = {
  sections: [
    {
      id: "core",
      section: "Core System Setup",
      description: "Required on every device before device-specific configuration begins.",
      device: ["till", "tablet"],
      steps: [
        {
          id: "performance",
          title: "Optimise for Best Performance",
          summary: "Adjust Windows visual effects for performance-first use.",
          device: ["till", "tablet"],
          instructions: [
            "Press the Windows key.",
            "Search for 'Adjust the appearance and performance of Windows'.",
            "Open the settings panel and choose 'Adjust for best performance'.",
            "Click Apply."
          ]
        },
        {
          id: "rename-device",
          title: "Rename the Device",
          summary: "Set the correct device name before deployment.",
          device: ["till", "tablet"],
          instructions: [
            "Go to Settings > System > About.",
            "Click 'Rename this PC'.",
            "Enter the agreed device name.",
            "Restart when prompted."
          ]
        },
        {
          id: "users",
          title: "Create / Verify Users",
          summary: "Confirm the local support accounts exist with the right permissions.",
          device: ["till", "tablet"],
          instructions: [
            "Open Settings > Accounts > Family & other users.",
            "Add 'Swan' if it does not exist.",
            "Add 'Swan Support' if it does not exist.",
            "Apply the correct account permissions."
          ]
        },
        {
          id: "rdp",
          title: "Enable Remote Desktop",
          summary: "Turn on remote access so support can manage the device later.",
          device: ["till", "tablet"],
          instructions: [
            "Go to Settings > System > Remote Desktop.",
            "Toggle Remote Desktop on.",
            "Confirm the Windows prompt."
          ]
        },
        {
          id: "region",
          title: "Date, Time & Region",
          summary: "Make sure UK settings are correctly applied.",
          device: ["till", "tablet"],
          instructions: [
            "Set time and timezone automatically.",
            "Confirm the timezone is UK based.",
            "Ensure language is English (UK).",
            "Ensure the keyboard layout is UK only."
          ]
        },
        {
          id: "updates",
          title: "Windows Updates",
          summary: "Run updates repeatedly until nothing remains outstanding.",
          device: ["till", "tablet"],
          instructions: [
            "Open Settings > Windows Update.",
            "Click 'Check for updates'.",
            "Install every available update.",
            "Restart and repeat until fully up to date."
          ]
        },
        {
          id: "dotnet",
          title: ".NET Framework 3.5",
          summary: "Enable legacy framework support if required by store software.",
          device: ["till", "tablet"],
          instructions: [
            "Open Control Panel > Programs.",
            "Select 'Turn Windows features on or off'.",
            "Tick '.NET Framework 3.5'.",
            "Install the feature."
          ]
        },
        {
          id: "power-hours",
          title: "Power & Active Hours",
          summary: "Prevent sleep interruptions during trading hours.",
          device: ["till", "tablet"],
          instructions: [
            "Set sleep to Never.",
            "Set active hours to 08:00 to 20:00."
          ]
        }
      ]
    },
    {
      id: "software",
      section: "Software Setup",
      description: "Shared software and presentation steps for all devices.",
      device: ["till", "tablet"],
      steps: [
        {
          id: "logmein",
          title: "Install LogMeIn",
          summary: "Install remote support tooling and assign the device.",
          device: ["till", "tablet"],
          instructions: [
            "Install LogMeIn using the company-approved installer.",
            "Assign the device to the correct account or group.",
            "Verify remote access is working."
          ]
        },
        {
          id: "chrome",
          title: "Install Google Chrome",
          summary: "Install Chrome and make it the default browser if required.",
          device: ["till", "tablet"],
          instructions: [
            "Install Google Chrome.",
            "Set it as the default browser if the role requires it."
          ]
        },
        {
          id: "background",
          title: "Background Image",
          summary: "Apply the company background if one is part of the standard build.",
          device: ["till", "tablet"],
          instructions: [
            "Apply the approved company wallpaper if required for the site."
          ]
        }
      ]
    },
    {
      id: "printer",
      section: "Printer Setup",
      description: "Till-only peripherals and system settings before go-live.",
      device: ["till"],
      steps: [
        {
          id: "printer-rp1",
          title: "Printer Setup (RP1)",
          summary: "Connect and configure the receipt printer correctly.",
          device: ["till"],
          instructions: [
            "Connect the printer.",
            "Open Settings > Printers & scanners.",
            "Add the printer.",
            "Disable drawer trigger.",
            "Set the correct paper length.",
            "Always confirm the printer is installed on the correct USB port."
          ]
        },
        {
          id: "uac",
          title: "UAC Settings",
          summary: "Reduce prompts where the till workflow requires it.",
          device: ["till"],
          instructions: [
            "Run 'useraccountcontrolsettings'.",
            "Set the slider to the lowest level."
          ]
        },
        {
          id: "stability",
          title: "Device Stability Settings",
          summary: "Disable power saving that can interfere with peripherals and connectivity.",
          device: ["till"],
          instructions: [
            "Disable NIC power saving.",
            "Disable USB power saving."
          ]
        },
        {
          id: "autologin",
          title: "Auto Login",
          summary: "Allow the Swan account to sign in automatically on boot.",
          device: ["till"],
          instructions: [
            "Run 'netplwiz'.",
            "Select the Swan user.",
            "Disable the password prompt requirement.",
            "Confirm automatic sign-in works after restart."
          ]
        },
        {
          id: "shortcuts",
          title: "Shortcuts",
          summary: "Pin the utilities most likely to be needed in support scenarios.",
          device: ["till"],
          instructions: [
            "Pin File Explorer.",
            "Pin Devices & Printers."
          ]
        },
        {
          id: "smb",
          title: "SMB 1.0 (If Required)",
          summary: "Enable SMB 1.0 only where legacy equipment still depends on it.",
          device: ["till"],
          instructions: [
            "Open Windows Features.",
            "Enable SMB 1.0 only if the site setup requires it."
          ]
        }
      ]
    },
    {
      id: "tablet",
      section: "Tablet Configuration",
      description: "Tablet-only configuration tuned for handheld use.",
      device: ["tablet"],
      steps: [
        {
          id: "tablet-config",
          title: "Tablet Configuration",
          summary: "Apply practical defaults for day-to-day tablet use.",
          device: ["tablet"],
          instructions: [
            "Turn rotation lock on.",
            "Adjust brightness for the environment.",
            "Turn dark mode on.",
            "Turn Bluetooth off if it is not needed."
          ]
        },
        {
          id: "tablet-mode",
          title: "Disable Tablet Mode (Windows 10)",
          summary: "Prevent Windows from switching interface modes unexpectedly.",
          device: ["tablet"],
          instructions: [
            "Set tablet mode to Off.",
            "Set Windows to avoid asking or switching automatically."
          ]
        }
      ]
    },
    {
      id: "final-checks",
      section: "Final Checks",
      description: "Run these checks before the device leaves setup.",
      device: ["till", "tablet"],
      steps: [
        {
          id: "device-name-check",
          title: "Confirm device name",
          summary: "Final validation that the naming standard is correct.",
          device: ["till", "tablet"],
          instructions: [
            "Check the final device name matches the agreed naming standard."
          ]
        },
        {
          id: "users-check",
          title: "Confirm support users",
          summary: "Make sure required users are present and accessible.",
          device: ["till", "tablet"],
          instructions: [
            "Confirm the Swan and Swan Support users exist and work as expected."
          ]
        },
        {
          id: "rdp-check",
          title: "Confirm remote access",
          summary: "Verify Remote Desktop and support tooling are ready.",
          device: ["till", "tablet"],
          instructions: [
            "Verify Remote Desktop is enabled.",
            "Verify LogMeIn is installed and reachable."
          ]
        },
        {
          id: "updates-check",
          title: "Confirm updates complete",
          summary: "Ensure no update cycle remains outstanding.",
          device: ["till", "tablet"],
          instructions: [
            "Check Windows Update again and confirm the device is fully up to date."
          ]
        },
        {
          id: "till-final",
          title: "Till final validation",
          summary: "Till-specific validation checks before handover.",
          device: ["till"],
          instructions: [
            "Confirm the printer is working.",
            "Confirm auto login is working.",
            "Confirm USB power saving is disabled.",
            "Confirm NIC power saving is disabled.",
            "Confirm UAC is set correctly."
          ]
        },
        {
          id: "tablet-final",
          title: "Tablet final validation",
          summary: "Tablet-specific validation checks before handover.",
          device: ["tablet"],
          instructions: [
            "Confirm rotation lock is set.",
            "Confirm tablet mode is disabled.",
            "Confirm brightness is adjusted.",
            "Confirm Bluetooth is off if not needed."
          ]
        }
      ]
    }
  ],
  pitfalls: [
    "Printer installs on the wrong USB port.",
    "Power saving is left enabled on NIC or USB.",
    "Auto login is missed on tills.",
    "Windows updates are skipped before the final restart cycle."
  ]
};
