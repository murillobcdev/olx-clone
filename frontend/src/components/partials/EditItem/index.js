import { Item } from './styled';
import { Link } from 'react-router-dom';
import useApi from '../../../helpers/MBSApi';
import Modal from "react-bootstrap/Modal";
import React, { useState, useRef, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


export default (props) => {
    const api = useApi();
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    //dados para edição de anuncios
    const fileField = useRef();
    const [newTitle, setTitle] = useState('');
    const [newCategory, setCategory] = useState('');
    const [newPrice, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [newDesc, setDesc] = useState('');
    const [itemId, setItemId] = useState('');

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });

    const handleClick = () => {
        window.location.href = `/ad/${props.data.id}`;
    }

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [])

    const handleNewAd = async (e) => {

        e.preventDefault();
        setDisabled(true);
        setError('');

        let errors = [];

        if (!newTitle.trim()) {
            errors.push("Sem título");
        }

        if (!newCategory) {
            errors.push("Sem Categoria");
        }

        const fData = new FormData();

        fData.append('title', newTitle);
        fData.append('price', newPrice);
        fData.append('priceneg', priceNegotiable);
        fData.append('desc', newDesc);
        fData.append('cat', newCategory);

        if (fileField.current.files.length > 0) {
            for (let i = 0; i < fileField.current.files.length; i++) {
                fData.append('img', fileField.current.files[i]);
            }
        }

        const json = await api.updateAdd(fData, itemId);


        if (!json.error) {
            window.location.href = `/ad/${itemId}`;
            return;

        } else {
            setError(json.error);
        }

        setIsOpen(false);
        setDisabled(false);

    }

    let price = '';

    if (props.data.priceNegotiable) {
        price = "Preço negociável";
    } else {
        price = `R$ ${props.data.price} `
    }

    const showModal = (props) => {
        setIsOpen(true)
        setItemId(props)
    }

    const hideModal = () => {
        setDisabled(false);
        setIsOpen(false)
    }

    return (
        <Item className="aditem">
            <Link to={`/ ad / ${props.data.id} `} onClick={handleClick}>
                <div className="p-2 m-2">
                    <div className="item-image">

                        {
                            props.data.images &&

                            props.data.images
                                .slice(0, 2)
                                .filter(value => Object.keys(value).length !== 0)
                                .map((image, index) =>
                                    <img key={index} src={`http://alunos.b7web.com.br:501/media/${image.url}`} alt="" />
                                )
                        }

                        <img src={props.data.image} alt="" />

                    </div >
                    <div className="item-name">
                        {props.data.title}
                    </div>
                    <div className="item-price">
                        {price}
                    </div>
                </div >

            </Link >
            <button onClick={() => showModal(props.data.id)} type="button" className="btn btn-primary">Editar</button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    Edite seu anúncio
                </Modal.Header>
                <form onSubmit={handleNewAd}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="inputTitle" className="form-label">
                                Título do anúncio:
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputTitle"
                                    aria-describedby="Help"
                                    disabled={disabled}
                                    value={newTitle}
                                    onChange={e => setTitle(e.target.value)} />
                                <div id="Help" className="form-text">Título atual: {props.data.title}</div>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">
                                Categoria:
                                <select
                                    className="form-control"
                                    disabled={disabled}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {categories && categories.map(i =>
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    )}
                                </select>
                                <div id="Help" className="form-text">Categoria atual: {props.data.category}</div>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPrice" className="form-label">
                                Preço:
                                <MaskedInput
                                    className="form-control"
                                    id="inputPrice"
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={newPrice}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputNegotiable" className="form-label">
                                Negociável?
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="inputNegotiable"
                                    aria-describedby="Help"
                                    disabled={disabled}
                                    checked={priceNegotiable}
                                    onChange={e => setPriceNegotiable(!priceNegotiable)}
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDesc" className="form-label">
                                Descrição:
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    disabled={disabled}
                                    value={newDesc}
                                    onChange={e => setDesc(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="inputFiles" className="form-label">
                                Imagens:
                                <input
                                    disabled={disabled}
                                    type="file"
                                    className="form-control"
                                    id="inputTitle"
                                    aria-describedby="titleHelp"
                                    multiple
                                    ref={fileField} />
                                <div id="Help" className="form-text">Quantidade de imagens que o anúncio já possui: {props.data.images.length}</div>
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger" onClick={hideModal}>Cancelar</button>
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </Item >
    );
}