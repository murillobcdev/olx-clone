import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents';

const Page = () => {
    return (
        <PageContainer>
            <h1>Página Sobre</h1>

            <Link to="/">Home</Link>
        </PageContainer>
    );
}

export default Page;