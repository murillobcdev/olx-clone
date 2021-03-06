import React from 'react';
import { FooterArea } from './styled';

const Footer = () => {
    return (
        <FooterArea>
            <div className="social">
                <ul className="list">
                    <li>
                        <a target="_blank" href="https://www.instagram.com/myrullo/">
                            <img src="https://i.imgur.com/aceiaeJ.png" />
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/in/murillobcampos/">
                            <img src="https://i.imgur.com/ewcitpM.png" />
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://github.com/murillobcdev">
                            <img src="https://i.imgur.com/18bvzMd.png" />
                        </a>
                    </li>
                </ul>
            </div>
            <text>2021 @ Murillo</text>
        </FooterArea>
    );
}

export default Footer;