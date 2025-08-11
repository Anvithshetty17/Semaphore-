"use client"
import { Loading } from '@/components/loading'
import { MainLayout } from '@/components/main_layout'
import { registrationMenu } from '@/config/route.config'
import { useQueryConfig } from '@/config/useQuery.config'
import { useCached } from '@/hooks/useCached'
import { useGetData } from '@/hooks/useGetData'
import React, { useState } from 'react'

export default function registration({ children }) {



    return (
        <MainLayout menuItems={registrationMenu} routeType={8}>
            {children}
        </MainLayout>
    );
}

