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
                <meta name="description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
                <meta name="keywords" content="Alura, Aluraquiz, NextJS, ReactJS, Typescript" />
                <meta name="author" content="AluraQuizzes" />
                <meta property="og:site_name" content="AluraQuizzes" />
                <meta property="og:title" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
                <meta property="og:description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
                <meta property="og:image" content="https://quizzes.vercel.app/img/logo-alura.png" />
                <meta property="og:type" content="website" />
            </Head>
            <H1>
                All Right V2
            </H1>
        </>
    )
}

export default App;