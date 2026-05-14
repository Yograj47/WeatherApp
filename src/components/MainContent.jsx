import Header from "./Header"
import TodayHighlights from "./TodayHighlights"

function MainContent() {
    return (
        <div className="w-full h-full flex flex-col">

            {/* Top Section: Navigation + Weekly Forecast */}
            <section>
                <Header />
            </section>

            {/* Bottom Section: Grid of Widgets (UV, Humidity, etc.) */}
            <section className="flex-1">
                <TodayHighlights />
            </section>

        </div>
    );
}

export default MainContent;