import Head from 'next/head';
import React from 'react';
import db from '../db.json'
import styled from 'styled-components';

const H1 = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
`
const App = () => {
    return (
        <>
            <Head>

                <title>AluraQuizzes</title>
                <meta name="title" content="AluraQuizzes" />
                <meta name="description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />


                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aluraquizzes.vercel.app/c" />
                <meta property="og:title" content="AluraQuizzes" />
                <meta property="og:description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
                <meta property="og:image" content="https://aluraquizzes.vercel.app/img/logo-alura.png" />
                

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://aluraquizzes.vercel.app/c" />
                <meta property="twitter:title" content="AluraQuizzes" />
                <meta property="twitter:description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
                <meta property="twitter:image" content="https://aluraquizzes.vercel.app/img/logo-alura.png" />
            </Head>
            <H1>
                All Right V2
            </H1>
            <img src="/img/logo-alura.png" alt="" />
        </>
    )
}

export default App;