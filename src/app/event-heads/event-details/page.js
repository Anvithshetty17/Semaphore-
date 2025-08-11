"use client";

import React from 'react';
import { useCached } from '@/hooks/useCached';
import { useGetData } from '@/hooks/useGetData';
import { useQueryConfig } from '@/config/useQuery.config';
import { Loading } from '@/components/loading';

const EventDetails = () => {
    const { cached } = useCached('isAuthenticated')

    const { data: eventDetails, isLoading: isEventLoading } = useGetData(
        'eventDetails',
        `${process.env.NEXT_PUBLIC_URL}/web/api/events/v1/GetEventDetailsForHead?userId=${cached?.userId}`,
        useQueryConfig,
    )

    if (isEventLoading) return <Loading />

    return (
        <div className="bg-white rounded-lg p-5 shadow-md mx-0.5 my-1">
            <div className="border-b pb-2 mb-4">
                <h2 className="text-2xl font-dosisBold font-semibold text-gray-800">Event Details</h2>
            </div>
            <div className="mb-4">
                <p className="text-lg font-dosisMedium text-gray-700"><strong>Title:</strong> {eventDetails.title}</p>
                <p className="text-lg font-dosisMedium text-gray-700"><strong>Event:</strong> {eventDetails.eventName}</p>
            </div>
            <div>
                <h3 className="text-xl font-dosisBold font-medium text-gray-800 mb-2">Rules</h3>
                <ul className="list-none font-dosisRegular space-y-2 text-gray-700 text-base">
                    {eventDetails.eventRules.map((rule, index) => (
                        <li key={rule.eventRulesId}>{rule.ruleNo}. {rule.eventRule}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventDetails;
