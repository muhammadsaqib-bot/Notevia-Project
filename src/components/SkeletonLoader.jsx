import React from 'react';

export const CardSkeleton = () => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm h-full animate-pulse border border-gray-100">
            <div className="flex justify-between mb-4">
                <div className="w-2/3">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export const DashboardSkeleton = () => {
    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            <div className="hidden md:block w-[290px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 z-50">
                <div className="p-6 mt-10">
                    <div className="h-8 bg-gray-200 rounded w-32 mb-10 mx-auto"></div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:ml-72.5 flex-1 p-4 md:p-8 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 animate-pulse gap-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="h-10 bg-gray-200 rounded w-full lg:w-60"></div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl h-32 w-full sm:w-72 border border-gray-100">
                            <div className="flex items-center gap-4 h-full">
                                <div className="w-12 h-12 bg-gray-200 rounded-2xl shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
                </div>
            </div>
        </div>
    )
}

export const FormSkeleton = () => {
    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            <div className="hidden md:block w-[290px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 z-50">
                <div className="p-6 mt-10">
                    <div className="h-8 bg-gray-200 rounded w-32 mb-10 mx-auto"></div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:ml-72.5 flex-1 p-4 md:p-8 w-full animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-8"></div>

                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                            <div className="h-12 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-12 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div className="mb-8">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-64 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <div className="h-12 bg-gray-200 rounded w-24"></div>
                        <div className="h-12 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ViewSkeleton = () => {
    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">
            <div className="hidden md:block w-[290px] bg-white h-screen fixed left-0 top-0 border-r border-gray-100 z-50">
                <div className="p-6 mt-10">
                    <div className="h-8 bg-gray-200 rounded w-32 mb-10 mx-auto"></div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:ml-72.5 flex-1 p-4 md:p-8 w-full animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>

                <div className="flex justify-between items-center mb-6">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="flex gap-2">
                        <div className="h-10 w-24 bg-gray-200 rounded"></div>
                        <div className="h-10 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-100 h-[500px]">
                </div>
            </div>
        </div>
    )
}