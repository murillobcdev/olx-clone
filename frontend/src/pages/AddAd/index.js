import { PageArea } from './styled';
import { PageContainer, PageTitle } from '../../components/MainComponents';
import useApi from '../../helpers/MBSApi';
import React, { useState, useRef, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useHistory } from 'react-router-dom';

const Page = () => {

    const api = useApi();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const fileField = useRef();


    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if (!title.trim()) {
            errors.push('Sem título');
        }

        if (!category) {
            errors.push('Sem categoria');
        }

        if (errors.length === 0) {

            const fData = new FormData();

            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if (fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if (!json.error) {
                history.push(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);

    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);


    return (
        <PageContainer>
            <PageTitle>
                Faça um anúncio
            </PageTitle>
            <PageArea>

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            Título:
                        </div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Categoria:
                        </div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                {categories && categories.map(i =>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço:
                        </div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$"
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Negociável?
                        </div>
                        <div className="area--input">
                            <input
                                type='checkbox'
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            >
                            </input>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Descrição:
                        </div>
                        <div className="area--input">
                            <textarea cols="500" rows="10"
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                required></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Imagens:
                        </div>
                        <div className="area--input">
                            <input type="file"
                                disabled={disabled}
                                multiple
                                ref={fileField}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--input">
                            <button
                                disabled={disabled}
                            >Anunciar</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;