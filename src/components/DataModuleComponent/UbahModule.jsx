import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UbahModule = ({ show, onClose, existingData }) => {
    const [formData, setFormData] = useState({
        judulChapter: "",
    });

    useEffect(() => {
        if (existingData) {
            setFormData({
                judulChapter: existingData.judulChapter,
            });
        }
    }, [existingData]);

    if (!show) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tambah Chapter Module:", formData);
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-2 right-2 text-xl font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold text-[#0a61aa] mb-4 text-center">
                    Ubah Chapter
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Judul Chapter
                        </label>
                        <input
                            type="text"
                            name="judulChapter"
                            value={formData.judulChapter}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-xl"
                            placeholder="Masukkan judul chapter"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="py-2 px-6 bg-[#0a61aa] text-white rounded-xl"
                        >
                            Ubah
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UbahModule.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    existingData: PropTypes.object,
};

export default UbahModule;
