import React, { useState } from 'react';
import UbahInstruktur from './UbahInstruktur';

const InstrukturList = () => {
  const [instructors, setInstructors] = useState([
    { id: 99, name: 'John Doe' }, // Contoh data
  ]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const updateInstructor = async (formData) => {
    // Panggil API untuk update data
    const response = await fetch(`https://backend-course-production-9a7a.up.railway.app/auth/update-instruktur/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Gagal memperbarui instruktur');
    }

    return await response.json(); // Mengembalikan data yang diperbarui
  };

  const handleUpdateSuccess = (updatedData) => {
    // Memperbarui state instruktur dengan data terbaru
    setInstructors((prevInstructors) => 
      prevInstructors.map((instructor) => 
        instructor.id === updatedData.id ? updatedData : instructor
      )
    );
  };

  return (
    <div>
      {instructors.map((instructor) => (
        <div key={instructor.id}>
          <span>{instructor.name}</span>
          <button onClick={() => setSelectedInstructor(instructor)}>Edit</button>
        </div>
      ))}

      {selectedInstructor && (
        <UbahInstruktur
          show={!!selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
          existingData={selectedInstructor}
          updateInstructor={updateInstructor}
          onUpdateSuccess={handleUpdateSuccess} // Callback untuk update
        />
      )}
    </div>
  );
};

export default InstrukturList;
