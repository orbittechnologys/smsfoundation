import React, { Component } from 'react';
import CountUp from 'react-countup';

class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter: [
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
                    text: 'Finished Seasons'
                },
                {
                    id: 4,
                    title: '100',
                    suffix: '%',
                    text: 'Satisfaction'
                }
            ]
        }
    }

    render() {
        return (

            <section className="py-12 bg-yellow-300 w-full ">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full">
                            <div className="flex flex-wrap">
                                {
                                    this.state.counter.map((data, i) => (
                                        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 lg:mb-0" key={data.id}>
                                            <div className="text-center p-6 bg-white rounded shadow">
                                                <div className="text-4xl font-semibold text-gray-800">
                                                    <CountUp end={data.title} enableScrollSpy />
                                                    {data.suffix}
                                                </div>
                                                <p className="mt-2 text-lg text-gray-600">{data.text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Counter;
