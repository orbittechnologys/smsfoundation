import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { BASE_URL } from '../../constants';

const Counter = () => {
    const [counters,setCounters] = useState([
        {
            id: 1,
            title: '200',
            suffix: 'k',
            text: 'Students'
        },
        {
            id: 2,
            title: '1200',
            suffix: '%',
            text: 'Online Courses'
        },
        {
            id: 3,
            title: '2256',
            suffix: '',
            text: 'Tests'
        },
        {
            id: 4,
            title: '100',
            suffix: '%',
            text: 'Satisfaction'
        }
    ]);

    const fetchMetrics = async () => {
        try {
            const res = await axios.get(`${BASE_URL}user/metrics`);
            console.log(res.data);
            setCounters([{
                id: 1,
                title: res.data.data.totalStudents,
                suffix: '+',
                text: 'Students'
            },
            {
                id: 2,
                title: res.data.data.totalChapters,
                suffix: '+',
                text: 'Online Courses'
            },
            {
                id: 3,
                title: res.data.data.totalTests,
                suffix: '',
                text: 'Tests'
            },
            {
                id: 4,
                title: '100',
                suffix: '%',
                text: 'Satisfaction'
            }])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        fetchMetrics();
    },[])

    return (
        <section className="py-12 bg-yellow-300 w-full ">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full">
                        <div className="flex flex-wrap">
                            {counters.map((data) => (
                                <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 lg:mb-0" key={data.id}>
                                    <div className="text-center p-6 bg-white rounded shadow">
                                        <div className="text-4xl font-semibold text-gray-800">
                                            <CountUp end={data.title} enableScrollSpy />
                                            {data.suffix}
                                        </div>
                                        <p className="mt-2 text-lg text-gray-600">{data.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Counter;