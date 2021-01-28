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
                <meta name="description" content="Grátis! Sua nova plafaforma de criação de lojas virtuais e delivery do bico do papagaio." />
                <meta name="keywords" content="GlinDoor, glindoor, delivery, bico, papagaio" />
                <meta name="author" content="GlinDoor" />
                <meta property="og:site_name" content="Glindoor - delivery e vendas" />
                <meta property="og:title" content="Glindoor - O seu melhor aplicativo de delivery da região do bico do papagaio" />
                <meta property="og:description" content="Grátis! Sua nova plafaforma de criação de lojas virtuais e delivery do bico do papagaio." />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/friendlychat-a879a.appspot.com/o/favicon%2Fapple-icon-57x57.png?alt=media" />
                <meta property="og:type" content="website" />
            </Head>
            <H1>
                All Right
            </H1>
        </>
    )
}

export default App;