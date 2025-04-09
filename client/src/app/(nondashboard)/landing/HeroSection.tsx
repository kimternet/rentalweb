"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <div className="relative h-screen">
        
        <Image
            src="/landing-splash.png"
            alt="Rentiful Rental Platform Hero Section"
            fill
            className="object-cover object-center"
            priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
            >
                <div className="max-w-4xl mx-auto px-16 sm:px-12">

                    <h1 className="text-5xl font-bold text-white mb-4">
                        당신의 새로운 시작, 완벽한 집에서 시작하세요.
                    </h1>
                    <p className="text-xl text-white mb-8">
                        머무는 곳이 아닌, 사는 곳을 찾다
                    </p>

                    <div className="flex justify-center">
                        <Input
                            type="text"
                            value="search query"
                            onChange={() => {}}
                            placeholder="Search by cith, neighborhood"
                            className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"                        
                        />
                        <Button
                            onClick={() => {}}
                            className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default HeroSection
