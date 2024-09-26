import React, { useState } from 'react';

const MyCourse = () => {
    const [isMobileDropdownVisible, setMobileDropdownVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('semua');

    const toggleMobileDropdown = () => {
        setMobileDropdownVisible(!isMobileDropdownVisible);
    };
    const handleFilterClick = (filter) => {
        setSelectedFilter(filter); // Set the selected filter
    };
    

    // Course data array
    const courses = [
        {
            name: 'JavaScript Intermediate',
            modules: 10,
            level: 'Intermediate Level',
            duration: '120 Menit',
            progress: '50%',
            image: 'https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg',
        },
        {
            name: 'React for Beginners',
            modules: 8,
            level: 'Beginner Level',
            duration: '90 Menit',
            progress: '100%',
            image: 'https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg',
        },
        {
            name: 'Data Science Essentials',
            modules: 12,
            level: 'Advanced Level',
            duration: '150 Menit',
            progress: '70%',
            image: 'https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg',
        },
        {
            name: 'UI/UX Design Basics',
            modules: 5,
            level: 'Beginner Level',
            duration: '60 Menit',
            progress: '20%',
            image: 'https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg',
        },
        {
            name: 'Python Programming',
            modules: 15,
            level: 'Intermediate Level',
            duration: '200 Menit',
            progress: '0%',
            image: 'https://blog.tempoinstitute.com/wp-content/uploads/2019/07/aperture-black-blur-274973-800x600.jpg',
        },
    ];

    const filteredCourses = () => {
        if (selectedFilter === 'belum') {
            return courses.filter(course => course.progress === '0%');
        }
        else if (selectedFilter === 'selesai') {
            return courses.filter(course => course.progress === '100%');
        }
        return courses; // Show all courses for other filters
    };



    return (
        <main className="container mx-auto px-4 py-10 bg-blue-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold text-gray-900">Kelas Saya</h2>
                <button onClick={toggleMobileDropdown} className="md:hidden bg-blue-500 text-white px-4 py-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Button Group for Filters */}
            {/* Button Group for Filters */}
            <div className="flex flex-wrap justify-center md:justify-start mb-4">
                <button
                    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${selectedFilter === 'semua' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-400'}`}
                    onClick={() => handleFilterClick('semua')}
                >
                    Semua Kelas
                </button>
                <button
                    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${selectedFilter === 'belum' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-400'}`}
                    onClick={() => handleFilterClick('belum')}
                >
                    Belum Dimulai
                </button>
                <button
                    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${selectedFilter === 'sedang' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-400'}`}
                    onClick={() => handleFilterClick('sedang')}
                >
                    Sedang Dipelajari
                </button>
                <button
                    className={`w-40 font-bold text-sm md:text-base mx-1 mt-2 px-3 py-1 rounded-md ${selectedFilter === 'selesai' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-400'}`}
                    onClick={() => handleFilterClick('selesai')}
                >
                    Selesai
                </button>
            </div>


            <div className="flex flex-col md:flex-row">
                <div className="md:hidden mb-4">
                    {isMobileDropdownVisible && (
                        <div className="bg-white shadow-md rounded-md p-4 overflow-hidden">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>
                            {["Paling Baru", "Paling Populer", "Gratis"].map((label, index) => (
                                <div className="flex items-center mb-2" key={index}>
                                    <input type="checkbox" id={`filter-${label}`} className="mr-2 checkbox-custom" />
                                    <label htmlFor={`filter-${label}`} className="text-sm md:text-base">{label}</label>
                                </div>
                            ))}

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori</h3>
                            {["UI/UX Design", "Web Development", "Android Development", "Data Science", "Business Intelligence"].map((category, index) => (
                                <div className="flex items-center mb-2" key={index}>
                                    <input type="checkbox" id={`filter-${category}`} className="mr-2 checkbox-custom" />
                                    <label htmlFor={`filter-${category}`} className="text-sm md:text-base">{category}</label>
                                </div>
                            ))}

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Level Kesulitan</h3>
                            {["Beginner Level", "Intermediate Level", "Advanced Level"].map((level, index) => (
                                <div className="flex items-center mb-2" key={index}>
                                    <input type="checkbox" id={`filter-${level}`} className="mr-2 checkbox-custom" />
                                    <label htmlFor={`filter-${level}`} className="text-sm md:text-base">{level}</label>
                                </div>
                            ))}

                            <button className="px-10 py-2 rounded-md text-red-600 mt-10 whitespace-nowrap">Hapus Filter</button>
                        </div>
                    )}
                </div>

                {/* Desktop filter section, always visible */}
                <div className="hidden md:flex md:flex-col md:w-1/4 mb-6 md:mr-4">
                    <div id="fitur" className="bg-white shadow-md rounded-md p-4 md:p-6 overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>
                        {["Paling Baru", "Paling Populer", "Gratis"].map((label, index) => (
                            <div className="flex items-center mb-2" key={index}>
                                <input type="checkbox" id={`filter-${label}`} className="mr-2 checkbox-custom" />
                                <label htmlFor={`filter-${label}`} className="text-sm md:text-base">{label}</label>
                            </div>
                        ))}

                        <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori</h3>
                        {["UI/UX Design", "Web Development", "Android Development", "Data Science", "Business Intelligence"].map((category, index) => (
                            <div className="flex items-center mb-2" key={index}>
                                <input type="checkbox" id={`filter-${category}`} className="mr-2 checkbox-custom" />
                                <label htmlFor={`filter-${category}`} className="text-sm md:text-base">{category}</label>
                            </div>
                        ))}

                        <h3 className="text-xl font-bold text-gray-800 mb-4">Level Kesulitan</h3>
                        {["Beginner Level", "Intermediate Level", "Advanced Level"].map((level, index) => (
                            <div className="flex items-center mb-2" key={index}>
                                <input type="checkbox" id={`filter-${level}`} className="mr-2 checkbox-custom" />
                                <label htmlFor={`filter-${level}`} className="text-sm md:text-base">{level}</label>
                            </div>
                        ))}

                        <button className="px-10 py-2 rounded-md text-red-600 mt-10 whitespace-nowrap">Hapus Filter</button>
                    </div>
                </div>

                {/* Cards section */}
                <div id="card" className="md:w-3/4 pl-0 md:pl-4">
                    {filteredCourses().map((course, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-6 flex flex-col md:flex-row">
                            <img src={course.image} alt="Course Image" className="w-full md:w-40 h-30 mr-8 rounded-md" />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-blue-800">{course.name}</h3>
                                    <button className="bg-blue-500 hover:bg-slate-400 text-white mt-3 px-3 py-2 text-wrap rounded-md">Lihat Detail Kelas</button>
                                </div>
                                <div className="flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2">
                                        <path d="M3 5C6 3 10 3 12 5V19C10 17 6 17 3 19V5Z" />
                                        <path d="M21 5C18 3 14 3 12 5V19C14 17 18 17 21 19V5Z" />
                                        <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
                                    </svg>
                                    <span>{course.modules} Modul</span>
                                </div>

                                <div className="flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="#32CD32" strokeWidth="2">
                                        <path d="M12 2L4 6V12C4 17.5 7.5 21 12 22C16.5 21 20 17.5 20 12V6L12 2Z" />
                                        <polygon points="12,9 12.75,11 14.5,11 13,12.25 13.5,14 12,13 10.5,14 11,12.25 9.5,11 11.25,11" fill="#32CD32" />
                                    </svg>
                                    <span>{course.level}</span>
                                </div>

                                <div className="flex items-center mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="#32CD32" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-6">
                                    <div className="bg-indigo-500 rounded-full h-full flex items-center justify" style={{ width: course.progress }}>
                                        <span className="ml-5 text-white text-xs text-nowrap font-bold">{course.progress} Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};  

export default MyCourse;
