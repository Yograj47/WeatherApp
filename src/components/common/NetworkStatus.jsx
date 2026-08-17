import { Wifi, WifiOff } from "lucide-react";
import useOnlineStatus from "../../hooks/useOnlineStatus";

function NetworkStatus() {
    const isOnline = useOnlineStatus();

    return (
        <div
            className={`
                fixed bottom-4 right-5 z-50
                flex items-center gap-2
                rounded-full
                border
                px-3 py-2
                text-xs font-medium
                shadow-sm
                backdrop-blur
                transition-all duration-300

                ${
                    isOnline
                        ? `
                            border-green-200
                            bg-white/90
                            text-green-600
                            dark:border-green-900
                            dark:bg-gray-900/90
                            dark:text-green-400
                        `
                        : `
                            border-red-200
                            bg-red-50/95
                            text-red-600
                            dark:border-red-900
                            dark:bg-red-950/90
                            dark:text-red-400
                        `
                }
            `}
            title={isOnline ? "You're online" : "You're offline"}
        >
            {isOnline ? (
                <Wifi
                    size={14}
                    className="text-green-500 dark:text-green-400"
                />
            ) : (
                <WifiOff
                    size={14}
                    className="text-red-500 dark:text-red-400"
                />
            )}

            <span>
                {isOnline ? "Online" : "Offline"}
            </span>
        </div>
    );
}

export default NetworkStatus;