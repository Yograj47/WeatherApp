function SettingAction({
    icon,
    label,
    description,
    onClick,
}) {
    const Icon = icon;

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex w-full
                items-center justify-between
                gap-3
                rounded-2xl
                px-2 py-2.5
                text-left
                transition
                hover:bg-gray-50
                dark:hover:bg-gray-800/60
            "
        >
            <div className="flex min-w-0 items-center gap-3">
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
                            text-xs font-medium
                            text-gray-800
                            dark:text-gray-100
                        "
                    >
                        {label}
                    </p>

                    <p
                        className="
                            mt-0.5 truncate
                            text-[10px]
                            text-gray-400
                            dark:text-gray-500
                        "
                    >
                        {description}
                    </p>
                </div>
            </div>

            <span
                className="
                    text-xs text-gray-300
                    dark:text-gray-600
                "
            >
                →
            </span>
        </button>
    );
}

export default SettingAction;