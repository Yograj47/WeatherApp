function SettingsSection({ title, children }) {
    return (
        <div className="mb-4 last:mb-0">
            <p
                className="
                    mb-2 px-1
                    text-[10px] font-semibold
                    uppercase tracking-wider
                    text-gray-400
                    dark:text-gray-500
                "
            >
                {title}
            </p>

            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
}

export default SettingsSection;