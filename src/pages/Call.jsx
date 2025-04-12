import React from 'react';

const employees = [
  {
    id: 1,
    name: "Balaji",
    age: 21,
    gender: "Male",
    phNo: "9342874173",
  },
  {
    id: 2,
    name: "sandy",
    age: 28,
    gender: "male",
    phNo: "9362622255",
  },
  {
    id: 3,
    name: "dhanush",
    age: 35,
    gender: "Male",
    phNo: "8838319686",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    phNo: "9566319064",
  },
  {
    id: 5,
    name: "Chris Wilson",
    age: 29,
    gender: "Male",
    phNo: "333-444-5555",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    age: 31,
    gender: "Female",
    phNo: "222-333-4444",
  },
];

const Call = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pt-20 px-4 pb-10">
      {employees.map((employee) => (
        <div key={employee.id} className="bg-white shadow-lg rounded-lg p-4 w-80 flex flex-col items-start mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Name: {employee.name}</h2>
          <p className="text-sm text-gray-600">Age: {employee.age}</p>
          <p className="text-sm text-gray-600">Gender: {employee.gender}</p>
          <p className="text-sm text-gray-600">Ph No: {employee.phNo}</p>
          <a href={`tel:${employee.phNo}`} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center">
            Call
          </a>
        </div>
      ))}
    </div>
  );
};

export default Call;
