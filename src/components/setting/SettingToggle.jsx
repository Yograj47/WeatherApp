function SettingToggle({
    icon,
    label,
    description,
    enabled,
    onChange,
}) {
    const Icon = icon;

    return (
        <div
            className="
                flex w-full items-center justify-between gap-4
                rounded-2xl px-2 py-2.5
                transition
                hover:bg-gray-50
                dark:hover:bg-gray-800/60
            "
        >
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div
                    className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-xl
                        bg-gray-50 text-gray-500
                        dark:bg-gray-800
                        dark:text-gray-400
                    "
                >
                    <Icon size={15} />
                </div>

                <div className="min-w-0">
                    <p
                        className="
                            text-xs font-medium leading-4
                            text-gray-800
                            dark:text-gray-100
                        "
                    >
                        {label}
                    </p>

                    <p
                        className="
                            mt-0.5 truncate
                            text-[10px] leading-4
                            text-gray-400
                            dark:text-gray-500
                        "
                    >
                        {description}
                    </p>
                </div>
            </div>

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
                    dark:focus:ring-gray-700
                    ${
                        enabled
                            ? "bg-gray-900 dark:bg-white"
                            : "bg-gray-200 dark:bg-gray-700"
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
                        ${
                            enabled
                                ? "translate-x-4 dark:bg-gray-900"
                                : "translate-x-0 dark:bg-gray-400"
                        }
                    `}
                />
            </button>
        </div>
    );
}

export default SettingToggle;