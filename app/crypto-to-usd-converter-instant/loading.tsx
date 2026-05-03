export default function Loading() {
    return (
        <div className="min-h-screen bg-[#05070b] text-white flex items-center justify-center px-4">
            <div className="w-full max-w-3xl animate-pulse">

                {/* Title */}
                <div className="mb-8">
                    <div className="h-4 w-40 bg-gray-800 rounded mb-3"></div>
                    <div className="h-10 w-80 bg-gray-700 rounded"></div>
                </div>

                {/* Card */}
                <div className="bg-[#0b0f14] border border-gray-800 rounded-2xl p-8">

                    {/* Inputs Row */}
                    <div className="flex items-center gap-4">

                        {/* Left Input */}
                        <div className="flex-1">
                            <div className="h-3 w-24 bg-gray-800 rounded mb-2"></div>
                            <div className="h-14 bg-gray-700 rounded-xl"></div>
                        </div>

                        {/* Swap Button */}
                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>

                        {/* Right Input */}
                        <div className="flex-1">
                            <div className="h-3 w-24 bg-gray-800 rounded mb-2"></div>
                            <div className="h-14 bg-gray-700 rounded-xl"></div>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-10 grid grid-cols-3 gap-6">
                        <div>
                            <div className="h-3 w-28 bg-gray-800 rounded mb-2"></div>
                            <div className="h-4 w-36 bg-gray-700 rounded"></div>
                        </div>

                        <div>
                            <div className="h-3 w-24 bg-gray-800 rounded mb-2"></div>
                            <div className="h-4 w-28 bg-gray-700 rounded"></div>
                        </div>

                        <div>
                            <div className="h-3 w-32 bg-gray-800 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-gray-700 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}