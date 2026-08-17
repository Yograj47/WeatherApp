import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw, X } from "lucide-react";

function Timer({ onClose }) {
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const [remainingSeconds, setRemainingSeconds] = useState(
        5 * 60
    );

    const [isRunning, setIsRunning] = useState(false);

    const isFinished = remainingSeconds === 0;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setRemainingSeconds((current) => {
                if (current <= 1) {
                    setIsRunning(false);
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    function handleStart() {
        if (remainingSeconds <= 0) {
            const total =
                Number(minutes) * 60 +
                Number(seconds);

            if (total <= 0) return;

            setRemainingSeconds(total);
        }

        setIsRunning(true);
    }

    function handleReset() {
        setIsRunning(false);

        setRemainingSeconds(
            Number(minutes) * 60 +
            Number(seconds)
        );
    }

    function handleMinutesChange(event) {
        const value = Math.max(
            0,
            Math.min(59, Number(event.target.value) || 0)
        );

        setMinutes(value);

        if (!isRunning) {
            setRemainingSeconds(
                value * 60 + seconds
            );
        }
    }

    function handleSecondsChange(event) {
        const value = Math.max(
            0,
            Math.min(59, Number(event.target.value) || 0)
        );

        setSeconds(value);

        if (!isRunning) {
            setRemainingSeconds(
                minutes * 60 + value
            );
        }
    }

    const displayMinutes = Math.floor(
        remainingSeconds / 60
    );

    const displaySeconds = remainingSeconds % 60;

    const formattedTime = `${String(
        displayMinutes
    ).padStart(2, "0")}:${String(
        displaySeconds
    ).padStart(2, "0")}`;

    return (
        <div
            className="
                absolute
                bottom-14
                right-0
                w-72
                rounded-3xl
                border border-gray-100
                bg-white
                p-5
                shadow-[0_15px_50px_rgba(0,0,0,0.12)]
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                        Timer
                    </h2>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                        Set a countdown
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        rounded-full
                        p-1.5
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                    "
                    aria-label="Close timer"
                >
                    <X size={15} />
                </button>
            </div>

            {/* Countdown */}
            <div className="mt-6 text-center">
                <span
                    className={`
                        text-5xl
                        font-light
                        tracking-tight
                        ${
                            isFinished
                                ? "text-gray-300"
                                : "text-gray-900"
                        }
                    `}
                >
                    {formattedTime}
                </span>

                {isFinished && (
                    <p className="mt-2 text-xs font-medium text-gray-400">
                        Timer finished
                    </p>
                )}
            </div>

            {/* Time input */}
            {!isRunning && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="text-center">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={minutes}
                            onChange={handleMinutesChange}
                            className="
                                h-10
                                w-16
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                text-center
                                text-sm
                                font-medium
                                text-gray-900
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:bg-white
                            "
                            aria-label="Minutes"
                        />

                        <p className="mt-1 text-[10px] text-gray-400">
                            min
                        </p>
                    </div>

                    <span className="mb-4 text-gray-300">
                        :
                    </span>

                    <div className="text-center">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={seconds}
                            onChange={handleSecondsChange}
                            className="
                                h-10
                                w-16
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                text-center
                                text-sm
                                font-medium
                                text-gray-900
                                outline-none
                                transition
                                focus:border-gray-400
                                focus:bg-white
                            "
                            aria-label="Seconds"
                        />

                        <p className="mt-1 text-[10px] text-gray-400">
                            sec
                        </p>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="mt-6 flex items-center gap-2">
                <button
                    type="button"
                    onClick={
                        isRunning
                            ? () => setIsRunning(false)
                            : handleStart
                    }
                    disabled={
                        !isRunning &&
                        remainingSeconds <= 0
                    }
                    className="
                        flex
                        h-10
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gray-900
                        text-xs
                        font-medium
                        text-white
                        transition
                        hover:bg-gray-800
                        disabled:cursor-not-allowed
                        disabled:bg-gray-200
                        disabled:text-gray-400
                    "
                >
                    {isRunning ? (
                        <>
                            <Pause size={14} />
                            Pause
                        </>
                    ) : (
                        <>
                            <Play size={14} />
                            {isFinished ? "Start" : "Start"}
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        text-gray-500
                        transition
                        hover:bg-gray-50
                        hover:text-gray-900
                    "
                    aria-label="Reset timer"
                >
                    <RotateCcw size={14} />
                </button>
            </div>
        </div>
    );
}

export default Timer;
