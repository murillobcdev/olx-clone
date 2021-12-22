import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents';

const Page = () => {
    return (
        <PageContainer>
            <h1>Página não encontrada!</h1>

            <Link to="/">Voltar para a Página Inicial.</Link>
        </PageContainer>
    );
}

export default Page;