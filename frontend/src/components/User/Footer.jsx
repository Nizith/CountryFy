import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t-[2px] border-gray-300 px-28 py-4 bg-lme-300 font-semibold">
            <div className="flex justify-between items-center">
                {/* Left side: Logo or Branding */}
                <div className="text-indigo-600">
                    <p className="text-md">© 2025 Application Frameworks Project. All rights reserved.</p>
                </div>

                {/* Center: Navigation Links */}
                <div className="flex space-x-4">
                    <p className="text-indigo-600 hover:text-indigo-800 text-md">
                    SLIIT
                    </p>
                    <div className='border-l-2 border-gray-400'></div>
                    <p className="text-indigo-600 hover:text-indigo-800 text-md">
                    Software Engineering
                    </p>
                    <div className='border-l-2 border-gray-400'></div>
                    <p className="text-indigo-600 hover:text-indigo-800 text-md">
                    Y3S2
                    </p>
                </div>
            </div>
        </footer>
    );
}