import  { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/SidebarInstruktur";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguages } from "../../../redux/actions/adminDataInterLangActions";
import HeadInstruktur from "../../../components/InstrukturComponents/HeadInstruktur";

const InstrukturDataInterpreter = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Redux dispatch and selector
    const dispatch = useDispatch();
    const { languages, loading, error } = useSelector(
        (state) => state.interpreterLanguages
    );

    // Fetch languages on component mount
    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed inset-0 z-50 transition-transform transform bg-white md:relative md:translate-x-0 md:bg-transparent ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Sidebar />
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className="flex-1 p-4 md:p-6 bg-secondary min-h-screen font-poppins">
                {/* header */}
                <div className="bg-[#F3F7FB] p-4 flex justify-between items-center mb-4 shadow-sm">
                    {/* menu button on mobile */}
                    <button
                        className="text-[#0a61aa] md:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                        <FaBars className="text-2xl" />
                    </button>
                    <HeadInstruktur />
                </div>

                {/* Section Data Interpreter Language */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                    <h2 className="flex items-center py-2 px-4 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white font-semibold rounded-md text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                        Data Bahasa Interpreter
                    </h2>
                </div>

                {/* Success and Error Messages */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Tabel Data Bahasa Interpreter */}
                <div className="overflow-x-auto bg-white p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100 text-left text-xs md:text-sm font-semibold">
                                    <th className="px-2 md:px-4 py-2">Nomor</th>
                                    <th className="px-2 md:px-4 py-2">
                                        Bahasa Interpreter
                                    </th>
                                    <th className="px-2 md:px-4 py-2">Versi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map((language, index) => (
                                    <tr
                                        key={index}
                                        className="border-t text-xs md:text-sm"
                                    >
                                        <td className="px-2 md:px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="px-2 md:px-4 py-2">
                                            {language.languageInterpreter}
                                        </td>
                                        <td className="px-2 md:px-4 py-2">
                                            {language.version}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstrukturDataInterpreter;
