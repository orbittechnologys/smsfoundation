import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const InstSchool = () => {
    const [schoolDoc, setSchoolDoc] = useState(null);

    const fetchSchool = async (userId) => {
        try {
            const res = await axios.get(`${BASE_URL}instructor/getByUserId/${userId}`);
            console.log(res.data);
            if (Array.isArray(res.data.instructorDoc?.school)) {
                setSchoolDoc(res.data.instructorDoc.school[0]);
            }
        } catch (error) {
            console.error("Error fetching school data", error);
        }
    }

    useEffect(() => {
        fetchSchool(localStorage.getItem('user_id'));
    }, []);

    const renderJsonData = (data) => {
        const excludeKeys = ['_id', '__v'];
        return Object.entries(data)
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, value]) => (
                <div key={key} className="w-full md:w-3/4 lg:w-1/2 xl:w-1/2 p-2">
                    <span className="font-semibold text-gray-700">{key?.toUpperCase()}:</span>
                    <span className="text-gray-600 ml-2">{String(value)}</span>
                </div>
            ));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Instructor's School Information</h1>
            {schoolDoc ? (
                <div className="bg-gray-100 p-4 mt-10 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-orange-200 transition duration-300 ease-in-out">
                    <div className="flex flex-wrap">
                        {renderJsonData(schoolDoc)}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading school information...</p>
            )}
        </div>
    );
}

export default InstSchool;
