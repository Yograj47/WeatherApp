import { useEffect, useRef, useState } from "react";
import {
    Settings as SettingsIcon,
    Moon,
    Clock3,
    Timer,
    X,
} from "lucide-react";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);

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
                            onClick={() => console.log("Clock clicked")}
                        />
                        <SettingAction
                            icon={Timer}
                            label="Timer"
                            description="Open timer"
                            onClick={() => console.log("Timer clicked")}
                        />
                    </SettingsSection>
                </div>
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

function SettingsSection({ title, children }) {
    return (
        <div className="mb-4 last:mb-0">
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {title}
            </p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}

function SettingToggle({
    icon,
    label,
    description,
    enabled,
    onChange,
}) {

    const Icon = icon
    return (
        <div className="flex w-full items-center justify-between gap-4 rounded-2xl px-2 py-2.5 transition hover:bg-gray-50">
            {/* Label */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                    <Icon size={15} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-medium leading-4 text-gray-800">
                        {label}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] leading-4 text-gray-400">
                        {description}
                    </p>
                </div>
            </div>

            {/* Toggle */}
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={label}
                onClick={() => onChange(!enabled)}
                className={`
                    relative
                    flex h-6 w-10
                    shrink-0
                    items-center
                    rounded-full
                    p-0.5
                    transition-colors
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-200
                    ${enabled
                        ? "bg-gray-900"
                        : "bg-gray-200"
                    }
                `}
            >
                <span
                    className={`
                        block
                        h-5 w-5
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-transform
                        duration-200
                        ${enabled
                            ? "translate-x-4"
                            : "translate-x-0"
                        }
                    `}
                />
            </button>
        </div>
    );
}

function SettingAction({ icon, label, description, onClick }) {
    const Icon = icon
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-2.5 text-left transition hover:bg-gray-50"
        >
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
                    <Icon size={15} />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-800">{label}</p>
                    <p className="mt-0.5 truncate text-[10px] text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
            <span className="text-xs text-gray-300">→</span>
        </button>
    );
}

export default Settings;