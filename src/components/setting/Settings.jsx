import { useEffect, useRef, useState } from "react";
import {
    Settings as SettingsIcon,
    Moon,
    Clock3,
    Timer,
    X,
} from "lucide-react";
import SettingsSection from "./SettingsSection";
import SettingToggle from "./SettingToggle";
import SettingAction from "./SettingAction";
import TimerPopup from "./Timer";
import Clock from "./Clock";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimerOpen, setIsTimerOpen] = useState(false);
    const [isClockOpen, setIsClockOpen] = useState(false);

    const [showSettings, setShowSettings] = useState(() => {
        return localStorage.getItem("weatherapp-show-settings") !== "false";
    });

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("weatherapp-dark-mode") === "true";
    });

    const settingsRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("weatherapp-show-settings", String(showSettings));
    }, [showSettings]);

    useEffect(() => {
        localStorage.setItem("weatherapp-dark-mode", String(darkMode));
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div ref={settingsRef} className="group fixed bottom-15 right-4 z-50">
            {/* Settings Panel */}
            {isOpen && (
                <div className="absolute bottom-14 right-0 w-72 rounded-3xl border border-gray-100 bg-white p-4 shadow-[0_15px_50px_rgba(0,0,0,0.12)]">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                Settings
                            </h2>
                            <p className="mt-0.5 text-[11px] text-gray-400">
                                Customize your weather app
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            aria-label="Close settings"
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Interface */}
                    <SettingsSection title="Interface">
                        <SettingToggle
                            icon={SettingsIcon}
                            label="Show settings button"
                            description="Always show the settings button"
                            enabled={showSettings}
                            onChange={setShowSettings}
                        />
                        <SettingToggle
                            icon={Moon}
                            label="Dark mode"
                            description="Use dark appearance"
                            enabled={darkMode}
                            onChange={setDarkMode}
                        />
                    </SettingsSection>

                    {/* Utilities */}
                    <SettingsSection title="Utilities">
                        <SettingAction
                            icon={Clock3}
                            label="Clock"
                            description="Open location clock"
                            onClick={() => {
                                setIsOpen(false);
                                setIsClockOpen(true);
                            }}
                        />
                        <SettingAction
                            icon={Timer}
                            label="Timer"
                            description="Open timer"
                            onClick={() => {
                                setIsOpen(false);
                                setIsTimerOpen(true);
                            }}
                        />
                    </SettingsSection>
                </div>
            )}

            {isClockOpen && (
                <Clock
                    onClose={() => setIsClockOpen(false)}
                />
            )}

            {isTimerOpen && (
                <TimerPopup
                    onClose={() => setIsTimerOpen(false)}
                />
            )}

            {/* Settings Button */}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:text-gray-900 hover:shadow-md ${showSettings
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none translate-y-2 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                aria-label="Open settings"
            >
                <SettingsIcon
                    size={18}
                    className="transition-transform duration-300 hover:rotate-45"
                />
            </button>
        </div>
    );
}

export default Settings;